import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createShipment, getShipmentByTrackingCode, listShipments, updateShipment, createTrackingEvent, getTrackingEventsByShipmentId, getShipmentById, getShipmentCount, getDb } from "./db";
import { nanoid } from "nanoid";
import { generateInvoice, generateReceipt } from "./pdf-generator";
import { eq, sql } from "drizzle-orm";
import { shipments } from "../drizzle/schema";
import { COOKIE_NAME } from "../shared/const";
import { verifyAdminCredentials } from "./_core/adminAuth";
import { generateTrackingCode } from "./_core/trackingCodeGenerator";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    // Admin login with email and password
    adminLogin: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const admin = await verifyAdminCredentials(input.email, input.password);
        
        if (!admin) {
          throw new Error("Invalid email or password");
        }

        // Create session token
        const sessionToken = nanoid(32);
        const cookieOptions = getSessionCookieOptions(ctx.req);
        
        // Set session cookie
        ctx.res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return {
          success: true,
          admin: {
            id: admin.id,
            email: admin.email,
            role: admin.role,
          },
        };
      }),
    // Admin logout
    adminLogout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Logistics routers
  shipments: router({
    // Public: Get shipment by tracking code
    getByTrackingCode: publicProcedure
      .input(z.object({ trackingCode: z.string() }))
      .query(async ({ input }) => {
        return await getShipmentByTrackingCode(input.trackingCode);
      }),
    
    // Admin: List all shipments with search and filtering
    list: protectedProcedure
      .input(z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
        searchTerm: z.string().optional(),
        status: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return await listShipments(input.limit, input.offset, input.searchTerm, input.status);
      }),
    
    // Admin: Create new shipment with comprehensive details
    create: protectedProcedure
      .input(z.object({
        senderName: z.string().min(1),
        senderEmail: z.string().email(),
        senderPhone: z.string().min(1),
        senderAddress: z.string().min(1),
        senderCity: z.string().min(1),
        senderCountry: z.string().min(1),
        receiverName: z.string().min(1),
        receiverEmail: z.string().email(),
        receiverPhone: z.string().min(1),
        receiverAddress: z.string().min(1),
        receiverCity: z.string().min(1),
        receiverCountry: z.string().min(1),
        packageDescription: z.string().min(1),
        packageWeight: z.number().positive(),
        packageDimensions: z.string().min(1),
        packageValue: z.number().nonnegative(),
        shippingMethod: z.enum(["Air Freight", "Ocean Freight", "Ground", "Express"]),
        origin: z.string().min(1),
        destination: z.string().min(1),
        currentLocation: z.string().min(1),
        estimatedDeliveryDays: z.number().positive(),
        status: z.enum(["pending", "in_transit", "out_for_delivery", "on_hold", "delivered", "cancelled"]).default("pending"),
        milestones: z.array(z.object({
          location: z.string(),
          description: z.string(),
        })).optional(),
      }))
      .mutation(async ({ input }) => {
        // Generate unique tracking code with MWL prefix
        const trackingCode = generateTrackingCode();
        
        // Calculate estimated delivery date
        const estimatedDeliveryDate = new Date();
        estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + input.estimatedDeliveryDays);
        
        const shipmentId = await createShipment({
          trackingCode,
          senderDetails: {
            name: input.senderName,
            email: input.senderEmail,
            phone: input.senderPhone,
            address: input.senderAddress,
            city: input.senderCity,
            country: input.senderCountry,
          },
          receiverDetails: {
            name: input.receiverName,
            email: input.receiverEmail,
            phone: input.receiverPhone,
            address: input.receiverAddress,
            city: input.receiverCity,
            country: input.receiverCountry,
          },
          packageInfo: {
            description: input.packageDescription,
            weight: input.packageWeight,
            dimensions: input.packageDimensions,
            value: input.packageValue,
            shippingMethod: input.shippingMethod,
          },
          origin: input.origin,
          destination: input.destination,
          currentLocation: input.currentLocation,
          estimatedDeliveryDate,
          status: input.status,
        });
        
        // Add initial milestones if provided
        if (input.milestones && input.milestones.length > 0) {
          for (const milestone of input.milestones) {
            await createTrackingEvent(Number(shipmentId), milestone.location, milestone.description);
          }
        }
        
        return { trackingCode, estimatedDeliveryDate };
      }),
    
    // Admin: Update shipment
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "in_transit", "out_for_delivery", "on_hold", "delivered", "cancelled"]).optional(),
        currentLocation: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const updates: any = {};
        if (input.status) updates.status = input.status;
        if (input.currentLocation) updates.currentLocation = input.currentLocation;
        await updateShipment(input.id, updates);
        return { success: true };
      }),
    
    // Admin: Get shipment details
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getShipmentById(input.id);
      }),
    
    // Admin: Get shipment count
    count: protectedProcedure.query(async () => {
      return await getShipmentCount();
    }),
    
    // Admin: Get shipment counts by status
    countByStatus: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { pending: 0, in_transit: 0, out_for_delivery: 0, on_hold: 0, delivered: 0, cancelled: 0 };
      
      const pending = await db.select({ count: sql`COUNT(*)` }).from(shipments).where(eq(shipments.status, 'pending'));
      const inTransit = await db.select({ count: sql`COUNT(*)` }).from(shipments).where(eq(shipments.status, 'in_transit'));
      const outForDelivery = await db.select({ count: sql`COUNT(*)` }).from(shipments).where(eq(shipments.status, 'out_for_delivery'));
      const onHold = await db.select({ count: sql`COUNT(*)` }).from(shipments).where(eq(shipments.status, 'on_hold'));
      const delivered = await db.select({ count: sql`COUNT(*)` }).from(shipments).where(eq(shipments.status, 'delivered'));
      const cancelled = await db.select({ count: sql`COUNT(*)` }).from(shipments).where(eq(shipments.status, 'cancelled'));
      
      return {
        pending: (pending[0]?.count as number) || 0,
        in_transit: (inTransit[0]?.count as number) || 0,
        out_for_delivery: (outForDelivery[0]?.count as number) || 0,
        on_hold: (onHold[0]?.count as number) || 0,
        delivered: (delivered[0]?.count as number) || 0,
        cancelled: (cancelled[0]?.count as number) || 0,
      };
    }),
  }),
  
  trackingEvents: router({
    // Public: Get tracking events for a shipment
    getByShipmentCode: publicProcedure
      .input(z.object({ trackingCode: z.string() }))
      .query(async ({ input }) => {
        const shipment = await getShipmentByTrackingCode(input.trackingCode);
        if (!shipment) return [];
        return await getTrackingEventsByShipmentId(shipment.id);
      }),
    
    // Admin: Add tracking event (milestone update)
    create: protectedProcedure
      .input(z.object({
        shipmentId: z.number(),
        location: z.string().min(1),
        description: z.string().min(1),
        status: z.enum(["update", "milestone", "alert"]).default("update"),
      }))
      .mutation(async ({ input }) => {
        await createTrackingEvent(input.shipmentId, input.location, input.description);
        return { success: true };
      }),
    
    // Admin: Get tracking events for a shipment
    getByShipmentId: protectedProcedure
      .input(z.object({ shipmentId: z.number() }))
      .query(async ({ input }) => {
        return await getTrackingEventsByShipmentId(input.shipmentId);
      }),
  }),

  documents: router({
    generateInvoice: protectedProcedure
      .input(z.object({ shipmentId: z.number() }))
      .mutation(async ({ input }) => {
        const shipment = await getShipmentById(input.shipmentId);
        if (!shipment) throw new Error("Shipment not found");
        await generateInvoice(shipment);
        return { success: true, fileName: `invoice-${shipment.trackingCode}.pdf` };
      }),
    
    generateReceipt: protectedProcedure
      .input(z.object({ shipmentId: z.number() }))
      .mutation(async ({ input }) => {
        const shipment = await getShipmentById(input.shipmentId);
        if (!shipment) throw new Error("Shipment not found");
        await generateReceipt(shipment);
        return { success: true, fileName: `receipt-${shipment.trackingCode}.pdf` };
      }),
  }),
});

export type AppRouter = typeof appRouter;

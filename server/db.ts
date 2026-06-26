import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, admins, shipments, trackingEvents, Shipment, TrackingEvent } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Admin queries
export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAdmin(email: string, passwordHash: string, role: "admin" | "manager" | "operator" = "admin") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(admins).values({ email, password: passwordHash, role });
  return result;
}

export async function updateAdmin(id: number, data: Partial<any>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(admins).set(data).where(eq(admins.id, id));
  return result;
}

export async function deleteAdmin(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.delete(admins).where(eq(admins.id, id));
  return result;
}

// Shipment queries
export async function createShipment(data: {
  trackingCode: string;
  senderDetails: any;
  receiverDetails: any;
  packageInfo: any;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDeliveryDate?: Date;
  status?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(shipments).values({
    trackingCode: data.trackingCode,
    senderDetails: data.senderDetails,
    receiverDetails: data.receiverDetails,
    packageInfo: data.packageInfo,
    origin: data.origin,
    destination: data.destination,
    currentLocation: data.currentLocation,
    estimatedDeliveryDate: data.estimatedDeliveryDate,
    status: (data.status as any) || "pending",
  });
  return result[0].insertId;
}

export async function getShipmentByTrackingCode(trackingCode: string): Promise<Shipment | undefined> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(shipments).where(eq(shipments.trackingCode, trackingCode)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getShipmentById(id: number): Promise<Shipment | undefined> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(shipments).where(eq(shipments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listShipments(limit: number = 20, offset: number = 0, searchTerm?: string, status?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const conditions: any[] = [];
  if (searchTerm) {
    conditions.push(
      like(shipments.trackingCode, `%${searchTerm}%`)
    );
  }
  if (status) {
    conditions.push(eq(shipments.status, status as any));
  }
  
  let query: any = db.select().from(shipments);
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }
  
  const result = await query.orderBy(desc(shipments.createdAt)).limit(limit).offset(offset);
  return result;
}

export async function updateShipment(id: number, data: Partial<any>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(shipments).set(data).where(eq(shipments.id, id));
  return result;
}

// TrackingEvent queries
export async function createTrackingEvent(shipmentId: number, location: string, description: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(trackingEvents).values({
    shipmentId,
    location,
    description,
  });
  return result;
}

export async function getTrackingEventsByShipmentId(shipmentId: number): Promise<TrackingEvent[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(trackingEvents).where(eq(trackingEvents.shipmentId, shipmentId)).orderBy(desc(trackingEvents.timestamp));
  return result;
}

export async function getShipmentCount(): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select({ count: sql`COUNT(*)` }).from(shipments);
  return result[0]?.count as number || 0;
}

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
function createMockContext(): TrpcContext {
  const user = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "test",
    role: "admin" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as any,
    res: {
      clearCookie: () => {},
    } as any,
  };
}

describe("Shipments API", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let createdShipmentId: number;
  let trackingCode: string;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should create a new shipment", async () => {
    const result = await caller.shipments.create({
      senderName: "John Doe",
      senderEmail: "john@example.com",
      senderPhone: "+1-555-0100",
      senderAddress: "123 Main St",
      senderCity: "New York",
      senderCountry: "USA",
      receiverName: "Jane Smith",
      receiverEmail: "jane@example.com",
      receiverPhone: "+1-555-0101",
      receiverAddress: "456 Oak Ave",
      receiverCity: "Los Angeles",
      receiverCountry: "USA",
      packageDescription: "Electronics",
      packageWeight: 5.5,
      packageDimensions: "20x15x10cm",
      packageValue: 500,
      status: "pending",
    });

    expect(result.trackingCode).toBeDefined();
    expect(result.trackingCode).toMatch(/^[A-Z0-9]{12}$/);
    trackingCode = result.trackingCode;
  });

  it("should retrieve shipment by tracking code", async () => {
    const result = await caller.shipments.getByTrackingCode({
      trackingCode,
    });

    expect(result).toBeDefined();
    expect(result?.trackingCode).toBe(trackingCode);
    expect(result?.status).toBe("pending");
    expect(result?.senderDetails.name).toBe("John Doe");
    expect(result?.receiverDetails.name).toBe("Jane Smith");
    expect(result?.packageInfo.description).toBe("Electronics");
    createdShipmentId = result?.id || 0;
  });

  it("should list shipments", async () => {
    const result = await caller.shipments.list({
      limit: 20,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should search shipments by tracking code", async () => {
    const result = await caller.shipments.list({
      limit: 20,
      offset: 0,
      searchTerm: trackingCode.substring(0, 6),
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.some((s: any) => s.trackingCode === trackingCode)).toBe(true);
  });

  it("should filter shipments by status", async () => {
    const result = await caller.shipments.list({
      limit: 20,
      offset: 0,
      status: "pending",
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.every((s: any) => s.status === "pending")).toBe(true);
  });

  it("should update shipment status", async () => {
    const result = await caller.shipments.update({
      id: createdShipmentId,
      status: "in_transit",
    });

    expect(result.success).toBe(true);

    // Verify the update
    const updated = await caller.shipments.getById({
      id: createdShipmentId,
    });

    expect(updated?.status).toBe("in_transit");
  });

  it("should get shipment by ID", async () => {
    const result = await caller.shipments.getById({
      id: createdShipmentId,
    });

    expect(result).toBeDefined();
    expect(result?.id).toBe(createdShipmentId);
    expect(result?.trackingCode).toBe(trackingCode);
  });

  it("should get shipment count", async () => {
    const result = await caller.shipments.count();

    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });
});

describe("Tracking Events API", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let shipmentId: number;

  beforeAll(async () => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);

    // Create a shipment first
    const shipmentResult = await caller.shipments.create({
      senderName: "Test Sender",
      senderEmail: "sender@test.com",
      senderPhone: "+1-555-0200",
      senderAddress: "789 Pine Rd",
      senderCity: "Chicago",
      senderCountry: "USA",
      receiverName: "Test Receiver",
      receiverEmail: "receiver@test.com",
      receiverPhone: "+1-555-0201",
      receiverAddress: "321 Elm St",
      receiverCity: "Houston",
      receiverCountry: "USA",
      packageDescription: "Books",
      packageWeight: 2.0,
      packageDimensions: "30x20x15cm",
      packageValue: 100,
    });

    const shipment = await caller.shipments.getByTrackingCode({
      trackingCode: shipmentResult.trackingCode,
    });

    shipmentId = shipment?.id || 0;
  });

  it("should add tracking event", async () => {
    const result = await caller.trackingEvents.create({
      shipmentId,
      location: "New York Distribution Center",
      description: "Package received and sorted",
    });

    expect(result.success).toBe(true);
  });

  it("should get tracking events by shipment ID", async () => {
    const result = await caller.trackingEvents.getByShipmentId({
      shipmentId,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].location).toBe("New York Distribution Center");
  });

  it("should get tracking events by tracking code", async () => {
    // First get the shipment to get tracking code
    const shipment = await caller.shipments.getById({
      id: shipmentId,
    });

    const result = await caller.trackingEvents.getByShipmentCode({
      trackingCode: shipment?.trackingCode || "",
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

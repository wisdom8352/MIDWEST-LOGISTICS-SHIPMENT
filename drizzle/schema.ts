import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Admin table for logistics company staff.
 * Stores email/password credentials for admin authentication.
 */
export const admins = mysqlTable("admins", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: text("password").notNull(), // bcrypt hashed
  role: mysqlEnum("role", ["admin", "manager", "operator"]).default("operator").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = typeof admins.$inferInsert;

/**
 * Shipment table for tracking logistics shipments.
 * Uses JSON fields for flexible sender/receiver/package data.
 * Includes comprehensive logistics details for tracking.
 */
export const shipments = mysqlTable("shipments", {
  id: int("id").autoincrement().primaryKey(),
  trackingCode: varchar("trackingCode", { length: 64 }).notNull().unique(),
  senderDetails: json("senderDetails").$type<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  }>().notNull(),
  receiverDetails: json("receiverDetails").$type<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  }>().notNull(),
  packageInfo: json("packageInfo").$type<{
    description: string;
    weight: number; // in kg
    dimensions: string; // e.g., "10x10x10 cm"
    value: number; // in USD
    shippingMethod: string; // e.g., "Air Freight", "Ocean Freight", "Ground"
  }>().notNull(),
  origin: varchar("origin", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  currentLocation: varchar("currentLocation", { length: 255 }).notNull(),
  estimatedDeliveryDate: timestamp("estimatedDeliveryDate"),
  status: mysqlEnum("status", ["pending", "in_transit", "out_for_delivery", "on_hold", "delivered", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Shipment = typeof shipments.$inferSelect;
export type InsertShipment = typeof shipments.$inferInsert;

/**
 * TrackingEvent table for recording shipment location and status updates.
 * Stores timestamped milestone updates for the tracking timeline.
 */
export const trackingEvents = mysqlTable("trackingEvents", {
  id: int("id").autoincrement().primaryKey(),
  shipmentId: int("shipmentId").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 64 }).default("update").notNull(), // e.g., "update", "milestone", "alert"
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrackingEvent = typeof trackingEvents.$inferSelect;
export type InsertTrackingEvent = typeof trackingEvents.$inferInsert;

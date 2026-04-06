import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  date,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

// ─── VEHICLES ────────────────────────────────────────────
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  make: varchar("make", { length: 50 }).notNull(),
  model: varchar("model", { length: 50 }).notNull(),
  year: integer("year"),
  color: varchar("color", { length: 30 }),
  category: varchar("category", { length: 20 }).notNull(), // economy | midrange | suv
  transmission: varchar("transmission", { length: 10 }).notNull(), // auto | manual
  fuel: varchar("fuel", { length: 10 }).notNull(), // diesel | essence
  hasAC: boolean("has_ac").default(true),
  dailyRate: integer("daily_rate").notNull(),
  weeklyRate: integer("weekly_rate"),
  monthlyRate: integer("monthly_rate"),
  features: json("features").$type<string[]>().default([]),
  images: json("images").$type<string[]>().default([]),
  coverImage: varchar("cover_image", { length: 500 }),
  status: varchar("status", { length: 15 }).default("available").notNull(),
  // available | rented | maintenance
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── BOOKINGS ────────────────────────────────────────────
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id")
    .references(() => vehicles.id)
    .notNull(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  customerEmail: varchar("customer_email", { length: 100 }),
  pickupDate: date("pickup_date").notNull(),
  pickupTime: varchar("pickup_time", { length: 5 }),
  pickupLocation: varchar("pickup_location", { length: 50 }),
  dropoffDate: date("dropoff_date").notNull(),
  dropoffTime: varchar("dropoff_time", { length: 5 }),
  dropoffLocation: varchar("dropoff_location", { length: 50 }),
  totalDays: integer("total_days").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: varchar("status", { length: 15 }).default("pending").notNull(),
  // pending | confirmed | active | completed | cancelled
  notes: text("notes"),
  source: varchar("source", { length: 20 }).default("website"),
  // website | whatsapp | phone | walkin
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── BLOCKED DATES ───────────────────────────────────────
export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id")
    .references(() => vehicles.id)
    .notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: varchar("reason", { length: 50 }),
  // maintenance | personal | other
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── SETTINGS ────────────────────────────────────────────
export const settings = pgTable("settings", {
  key: varchar("key", { length: 50 }).primaryKey(),
  value: json("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── TYPES ───────────────────────────────────────────────
export type Vehicle = typeof vehicles.$inferSelect;
export type NewVehicle = typeof vehicles.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type BlockedDate = typeof blockedDates.$inferSelect;
export type Setting = typeof settings.$inferSelect;

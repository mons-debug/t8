"use server";

import { db } from "@/db";
import { bookings, vehicles, type NewBooking } from "@/db/schema";
import { eq, desc, and, inArray, lte, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkAvailability, calculatePrice, daysBetween } from "@/lib/booking";

export async function createBooking(data: {
  vehicleId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime?: string;
  dropoffTime?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  notes?: string;
  source?: string;
}) {
  // Check availability
  const available = await checkAvailability(
    data.vehicleId,
    data.pickupDate,
    data.dropoffDate
  );

  if (!available) {
    return { error: "Cette voiture n'est pas disponible pour ces dates." };
  }

  // Get vehicle for price calc
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, data.vehicleId));

  if (!vehicle) {
    return { error: "Voiture non trouvée." };
  }

  const days = daysBetween(data.pickupDate, data.dropoffDate);
  const totalPrice = calculatePrice(vehicle, days);

  const booking: NewBooking = {
    vehicleId: data.vehicleId,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail || null,
    pickupDate: data.pickupDate,
    dropoffDate: data.dropoffDate,
    pickupTime: data.pickupTime || null,
    dropoffTime: data.dropoffTime || null,
    pickupLocation: data.pickupLocation || null,
    dropoffLocation: data.dropoffLocation || null,
    totalDays: days,
    totalPrice,
    status: "pending",
    notes: data.notes || null,
    source: data.source || "website",
  };

  const [created] = await db.insert(bookings).values(booking).returning();

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");

  return { success: true, booking: created };
}

export async function updateBookingStatus(
  id: number,
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled"
) {
  await db
    .update(bookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(bookings.id, id));

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export async function deleteBooking(id: number) {
  await db.delete(bookings).where(eq(bookings.id, id));
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

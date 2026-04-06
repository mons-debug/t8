import { db } from "@/db";
import { bookings, blockedDates, type Vehicle } from "@/db/schema";
import { and, eq, lte, gte, inArray } from "drizzle-orm";

/**
 * Check if a vehicle is available for a date range.
 * Returns true if no conflicting bookings or blocks exist.
 */
export async function checkAvailability(
  vehicleId: number,
  startDate: string,
  endDate: string
): Promise<boolean> {
  // Check confirmed/active bookings that overlap
  const conflictingBookings = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(
      and(
        eq(bookings.vehicleId, vehicleId),
        inArray(bookings.status, ["confirmed", "active"]),
        lte(bookings.pickupDate, endDate),
        gte(bookings.dropoffDate, startDate)
      )
    );

  if (conflictingBookings.length > 0) return false;

  // Check blocked dates that overlap
  const conflictingBlocks = await db
    .select({ id: blockedDates.id })
    .from(blockedDates)
    .where(
      and(
        eq(blockedDates.vehicleId, vehicleId),
        lte(blockedDates.startDate, endDate),
        gte(blockedDates.endDate, startDate)
      )
    );

  return conflictingBlocks.length === 0;
}

/**
 * Calculate rental price with weekly/monthly discounts.
 */
export function calculatePrice(
  vehicle: Pick<Vehicle, "dailyRate" | "weeklyRate" | "monthlyRate">,
  days: number
): number {
  if (days <= 0) return 0;

  if (days >= 30 && vehicle.monthlyRate) {
    const months = Math.floor(days / 30);
    const remaining = days % 30;
    return months * vehicle.monthlyRate + remaining * vehicle.dailyRate;
  }

  if (days >= 7 && vehicle.weeklyRate) {
    const weeks = Math.floor(days / 7);
    const remaining = days % 7;
    return weeks * vehicle.weeklyRate + remaining * vehicle.dailyRate;
  }

  return days * vehicle.dailyRate;
}

/**
 * Calculate number of days between two dates (inclusive).
 */
export function daysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

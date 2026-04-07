import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { bookings, vehicles, blockedDates } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const [allBookings, allVehicles, allBlocked] = await Promise.all([
    db
      .select({
        id: bookings.id,
        vehicleId: bookings.vehicleId,
        customerName: bookings.customerName,
        pickupDate: bookings.pickupDate,
        dropoffDate: bookings.dropoffDate,
        status: bookings.status,
        totalPrice: bookings.totalPrice,
      })
      .from(bookings)
      .where(inArray(bookings.status, ["pending", "confirmed", "active"])),
    db
      .select({ id: vehicles.id, make: vehicles.make, model: vehicles.model })
      .from(vehicles),
    db.select().from(blockedDates),
  ]);

  const vehicleMap = Object.fromEntries(
    allVehicles.map((v) => [v.id, `${v.make} ${v.model}`])
  );

  const STATUS_COLORS: Record<string, string> = {
    pending: "#eab308",
    confirmed: "#16a34a",
    active: "#2563eb",
  };

  const events = [
    ...allBookings.map((b) => ({
      id: `booking-${b.id}`,
      title: `${vehicleMap[b.vehicleId] || "?"} — ${b.customerName}`,
      start: b.pickupDate,
      end: b.dropoffDate,
      backgroundColor: STATUS_COLORS[b.status] || "#6b7280",
      borderColor: STATUS_COLORS[b.status] || "#6b7280",
      extendedProps: {
        type: "booking",
        status: b.status,
        price: b.totalPrice,
      },
    })),
    ...allBlocked.map((bl) => ({
      id: `blocked-${bl.id}`,
      title: `${vehicleMap[bl.vehicleId] || "?"} — Bloqué (${bl.reason || "autre"})`,
      start: bl.startDate,
      end: bl.endDate,
      backgroundColor: "#94a3b8",
      borderColor: "#94a3b8",
      extendedProps: {
        type: "blocked",
        reason: bl.reason,
      },
    })),
  ];

  return NextResponse.json(events);
}

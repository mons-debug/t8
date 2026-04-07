import { db } from "@/db";
import { bookings, vehicles } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ClipboardList, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { BookingStatusToggle } from "@/components/admin/booking-status-toggle";

const LOCATION_LABELS: Record<string, string> = {
  airport: "Aéroport",
  tgv: "Gare TGV",
  port: "Port Tanger Med",
  office: "Bureau T8",
};

export default async function BookingsPage() {
  const allBookings = await db
    .select({
      booking: bookings,
      vehicle: {
        make: vehicles.make,
        model: vehicles.model,
      },
    })
    .from(bookings)
    .leftJoin(vehicles, eq(bookings.vehicleId, vehicles.id))
    .orderBy(desc(bookings.createdAt));

  const pendingCount = allBookings.filter(
    (b) => b.booking.status === "pending"
  ).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Réservations</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {allBookings.length} réservation{allBookings.length !== 1 && "s"}
          {pendingCount > 0 && (
            <> — <span className="font-semibold text-yellow-600">{pendingCount} en attente</span></>
          )}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-xl border bg-white md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Voiture</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Dates</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Lieu</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map(({ booking: b, vehicle: v }) => (
              <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium">{b.customerName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" /> {b.customerPhone}
                  </div>
                  {b.customerEmail && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" /> {b.customerEmail}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">
                  {v ? `${v.make} ${v.model}` : `#${b.vehicleId}`}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {b.pickupDate} → {b.dropoffDate}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {b.totalDays} jour{b.totalDays > 1 && "s"}
                    {b.pickupTime && ` · ${b.pickupTime}`}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {LOCATION_LABELS[b.pickupLocation || ""] || b.pickupLocation || "—"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-[#e53935]">
                    {b.totalPrice.toLocaleString()} DH
                  </span>
                </td>
                <td className="px-4 py-3">
                  <BookingStatusToggle bookingId={b.id} currentStatus={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allBookings.length === 0 && (
          <div className="py-16 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-sm text-muted-foreground">
              Aucune réservation pour le moment
            </p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {allBookings.map(({ booking: b, vehicle: v }) => (
          <div key={b.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{b.customerName}</p>
                <p className="text-xs text-muted-foreground">{b.customerPhone}</p>
              </div>
              <BookingStatusToggle bookingId={b.id} currentStatus={b.status} />
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p className="font-medium">
                {v ? `${v.make} ${v.model}` : `Voiture #${b.vehicleId}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {b.pickupDate} → {b.dropoffDate} · {b.totalDays} jour{b.totalDays > 1 && "s"}
              </p>
              <p className="text-xs text-muted-foreground">
                {LOCATION_LABELS[b.pickupLocation || ""] || "—"} → {LOCATION_LABELS[b.dropoffLocation || ""] || "—"}
              </p>
            </div>
            <div className="mt-2 text-right">
              <span className="text-lg font-bold text-[#e53935]">
                {b.totalPrice.toLocaleString()} DH
              </span>
            </div>
          </div>
        ))}

        {allBookings.length === 0 && (
          <div className="rounded-xl border bg-white py-16 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-sm text-muted-foreground">
              Aucune réservation pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

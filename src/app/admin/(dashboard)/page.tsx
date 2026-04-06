import { db } from "@/db";
import { vehicles, bookings } from "@/db/schema";
import { eq, sql, gte, and } from "drizzle-orm";
import { Car, CalendarDays, DollarSign, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const today = now.toISOString().split("T")[0];

  // Fetch stats in parallel
  const [allVehicles, monthlyBookings, todayPickups] = await Promise.all([
    db.select().from(vehicles),
    db
      .select({
        count: sql<number>`count(*)`,
        revenue: sql<number>`coalesce(sum(${bookings.totalPrice}), 0)`,
      })
      .from(bookings)
      .where(gte(bookings.createdAt, new Date(startOfMonth))),
    db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.pickupDate, today),
          eq(bookings.status, "confirmed")
        )
      ),
  ]);

  const availableCount = allVehicles.filter(
    (v) => v.status === "available"
  ).length;

  const stats = [
    {
      label: "Voitures",
      value: `${availableCount}/${allVehicles.length}`,
      sub: "disponibles",
      icon: Car,
      color: "text-status-available",
      bg: "bg-green-50",
    },
    {
      label: "Réservations",
      value: monthlyBookings[0]?.count ?? 0,
      sub: "ce mois",
      icon: CalendarDays,
      color: "text-status-rented",
      bg: "bg-blue-50",
    },
    {
      label: "Revenu",
      value: `${(monthlyBookings[0]?.revenue ?? 0).toLocaleString()} DH`,
      sub: "ce mois",
      icon: DollarSign,
      color: "text-t8-red",
      bg: "bg-t8-red-light",
    },
    {
      label: "Aujourd'hui",
      value: todayPickups.length,
      sub: "pickups",
      icon: Clock,
      color: "text-status-pending",
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Tableau de bord</h2>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
              <div className={`rounded-lg p-3 ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fleet Status */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">État de la flotte</h3>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Voiture
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Couleur
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Tarif/jour
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {allVehicles.map((v) => (
                <tr key={v.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {v.make} {v.model}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {v.color}
                  </td>
                  <td className="px-4 py-3 font-semibold text-t8-red">
                    {v.dailyRate} DH
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        v.status === "available"
                          ? "bg-green-50 text-status-available"
                          : v.status === "rented"
                            ? "bg-blue-50 text-status-rented"
                            : "bg-gray-100 text-status-maintenance"
                      }`}
                    >
                      {v.status === "available"
                        ? "Disponible"
                        : v.status === "rented"
                          ? "Loué"
                          : "Maintenance"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

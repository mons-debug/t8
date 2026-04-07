import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Car, Fuel, Gauge, ImageIcon } from "lucide-react";
import Link from "next/link";
import { VehicleForm } from "@/components/admin/vehicle-form";
import { VehicleEditButton } from "@/components/admin/vehicle-form";
import { VehicleStatusToggle } from "@/components/admin/vehicle-status-toggle";
import { VehicleDeleteButton } from "@/components/admin/vehicle-delete-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function VehiclesPage() {
  const allVehicles = await db
    .select()
    .from(vehicles)
    .orderBy(asc(vehicles.sortOrder), asc(vehicles.id));

  const availableCount = allVehicles.filter((v) => v.status === "available").length;
  const rentedCount = allVehicles.filter((v) => v.status === "rented").length;
  const maintenanceCount = allVehicles.filter((v) => v.status === "maintenance").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Voitures</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {allVehicles.length} voiture{allVehicles.length !== 1 && "s"} —{" "}
            <span className="text-green-600">{availableCount} disponible{availableCount !== 1 && "s"}</span>
            {rentedCount > 0 && (
              <>, <span className="text-blue-600">{rentedCount} louée{rentedCount !== 1 && "s"}</span></>
            )}
            {maintenanceCount > 0 && (
              <>, <span className="text-gray-500">{maintenanceCount} en maintenance</span></>
            )}
          </p>
        </div>
        <VehicleForm />
      </div>

      {/* Vehicle Table — Desktop */}
      <div className="hidden overflow-x-auto rounded-xl border bg-white md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Voiture
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Détails
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Tarif/jour
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Statut
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allVehicles.map((v) => (
              <tr key={v.id} className="border-b last:border-0 hover:bg-gray-50/50">
                {/* Car name + category */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {v.coverImage ? (
                      <img
                        src={v.coverImage}
                        alt={`${v.make} ${v.model}`}
                        className="h-10 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gray-100">
                        <Car className="h-5 w-5 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">
                        {v.make} {v.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {v.year} — {v.color}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Details */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Gauge className="h-3.5 w-3.5" />
                      {v.transmission === "auto" ? "Auto" : "Manuelle"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="h-3.5 w-3.5" />
                      {v.fuel === "diesel" ? "Diesel" : "Essence"}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {v.category === "economy"
                        ? "Eco"
                        : v.category === "midrange"
                          ? "Milieu"
                          : "SUV"}
                    </Badge>
                  </div>
                </td>

                {/* Price */}
                <td className="px-4 py-3">
                  <span className="font-bold text-[#e53935]">{v.dailyRate} DH</span>
                  {v.weeklyRate && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      / {v.weeklyRate} sem
                    </span>
                  )}
                </td>

                {/* Status toggle */}
                <td className="px-4 py-3">
                  <VehicleStatusToggle vehicleId={v.id} currentStatus={v.status} />
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/vehicles/${v.id}/photos`}>
                      <Button variant="ghost" size="icon-xs" className="relative">
                        <ImageIcon className="h-3.5 w-3.5" />
                        {((v.images as string[]) || []).length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#e53935] text-[8px] font-bold text-white">
                            {((v.images as string[]) || []).length}
                          </span>
                        )}
                      </Button>
                    </Link>
                    <VehicleEditButton vehicle={v} />
                    <VehicleDeleteButton
                      vehicleId={v.id}
                      vehicleName={`${v.make} ${v.model}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allVehicles.length === 0 && (
          <div className="py-16 text-center">
            <Car className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-sm text-muted-foreground">
              Aucune voiture pour le moment
            </p>
          </div>
        )}
      </div>

      {/* Vehicle Cards — Mobile */}
      <div className="space-y-3 md:hidden">
        {allVehicles.map((v) => (
          <div
            key={v.id}
            className="rounded-xl border bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">
                  {v.make} {v.model}
                </p>
                <p className="text-xs text-muted-foreground">
                  {v.year} — {v.color} — {v.transmission === "auto" ? "Auto" : "Manuelle"} — {v.fuel === "diesel" ? "Diesel" : "Essence"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Link href={`/admin/vehicles/${v.id}/photos`}>
                  <Button variant="ghost" size="icon-xs" className="relative">
                    <ImageIcon className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <VehicleEditButton vehicle={v} />
                <VehicleDeleteButton
                  vehicleId={v.id}
                  vehicleName={`${v.make} ${v.model}`}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-[#e53935]">
                {v.dailyRate} DH<span className="text-xs font-normal text-muted-foreground">/jour</span>
              </span>
              <VehicleStatusToggle vehicleId={v.id} currentStatus={v.status} />
            </div>
          </div>
        ))}

        {allVehicles.length === 0 && (
          <div className="rounded-xl border bg-white py-16 text-center">
            <Car className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-sm text-muted-foreground">
              Aucune voiture pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

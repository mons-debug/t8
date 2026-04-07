import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PhotoManager } from "@/components/admin/photo-manager";

export default async function VehiclePhotosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, parseInt(id)));

  if (!vehicle) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/vehicles"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux voitures
        </Link>
        <h2 className="text-2xl font-bold">
          Photos — {vehicle.make} {vehicle.model}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {((vehicle.images as string[]) || []).length} photo(s) —{" "}
          {vehicle.year} — {vehicle.color}
        </p>
      </div>

      <PhotoManager
        vehicleId={vehicle.id}
        images={(vehicle.images as string[]) || []}
        coverImage={vehicle.coverImage}
      />
    </div>
  );
}

"use server";

import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function setCoverImage(vehicleId: number, imageUrl: string) {
  await db
    .update(vehicles)
    .set({ coverImage: imageUrl, updatedAt: new Date() })
    .where(eq(vehicles.id, vehicleId));

  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${vehicleId}/photos`);
  revalidatePath("/admin");
}

export async function deletePhoto(vehicleId: number, imageUrl: string) {
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));

  if (!vehicle) return;

  const currentImages = (vehicle.images as string[]) || [];
  const updatedImages = currentImages.filter((img) => img !== imageUrl);
  const newCover =
    vehicle.coverImage === imageUrl
      ? updatedImages[0] || null
      : vehicle.coverImage;

  await db
    .update(vehicles)
    .set({
      images: updatedImages,
      coverImage: newCover,
      updatedAt: new Date(),
    })
    .where(eq(vehicles.id, vehicleId));

  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${vehicleId}/photos`);
  revalidatePath("/admin");
}

export async function reorderPhotos(vehicleId: number, imageUrls: string[]) {
  await db
    .update(vehicles)
    .set({
      images: imageUrls,
      coverImage: imageUrls[0] || null,
      updatedAt: new Date(),
    })
    .where(eq(vehicles.id, vehicleId));

  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${vehicleId}/photos`);
}

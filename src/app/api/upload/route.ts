import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const vehicleId = formData.get("vehicleId") as string | null;

  if (!file || !vehicleId) {
    return NextResponse.json({ error: "Fichier et vehicleId requis" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { url } = await uploadImage(buffer, `t8-auto/vehicles/${vehicleId}`);

  // Add to vehicle images array
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, parseInt(vehicleId)));

  if (!vehicle) {
    return NextResponse.json({ error: "Voiture non trouvée" }, { status: 404 });
  }

  const currentImages = (vehicle.images as string[]) || [];
  const updatedImages = [...currentImages, url];
  const isCover = !vehicle.coverImage;

  await db
    .update(vehicles)
    .set({
      images: updatedImages,
      ...(isCover ? { coverImage: url } : {}),
      updatedAt: new Date(),
    })
    .where(eq(vehicles.id, parseInt(vehicleId)));

  return NextResponse.json({ url, isCover });
}

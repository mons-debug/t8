"use server";

import { db } from "@/db";
import { vehicles, type NewVehicle } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── CREATE ─────────────────────────────────────────────
export async function createVehicle(data: {
  make: string;
  model: string;
  year: number;
  color: string;
  category: string;
  transmission: string;
  fuel: string;
  hasAC: boolean;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  features: string[];
}) {
  const vehicle: NewVehicle = {
    make: data.make,
    model: data.model,
    year: data.year,
    color: data.color,
    category: data.category,
    transmission: data.transmission,
    fuel: data.fuel,
    hasAC: data.hasAC,
    dailyRate: data.dailyRate,
    weeklyRate: data.weeklyRate || null,
    monthlyRate: data.monthlyRate || null,
    features: data.features,
    status: "available",
  };

  await db.insert(vehicles).values(vehicle);
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
}

// ─── UPDATE ─────────────────────────────────────────────
export async function updateVehicle(
  id: number,
  data: {
    make: string;
    model: string;
    year: number;
    color: string;
    category: string;
    transmission: string;
    fuel: string;
    hasAC: boolean;
    dailyRate: number;
    weeklyRate?: number;
    monthlyRate?: number;
    features: string[];
  }
) {
  await db
    .update(vehicles)
    .set({
      make: data.make,
      model: data.model,
      year: data.year,
      color: data.color,
      category: data.category,
      transmission: data.transmission,
      fuel: data.fuel,
      hasAC: data.hasAC,
      dailyRate: data.dailyRate,
      weeklyRate: data.weeklyRate || null,
      monthlyRate: data.monthlyRate || null,
      features: data.features,
      updatedAt: new Date(),
    })
    .where(eq(vehicles.id, id));

  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
}

// ─── UPDATE STATUS ──────────────────────────────────────
export async function updateVehicleStatus(
  id: number,
  status: "available" | "rented" | "maintenance"
) {
  await db
    .update(vehicles)
    .set({ status, updatedAt: new Date() })
    .where(eq(vehicles.id, id));

  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
}

// ─── DELETE ─────────────────────────────────────────────
export async function deleteVehicle(id: number) {
  await db.delete(vehicles).where(eq(vehicles.id, id));
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
}

"use server";

import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSetting(key: string) {
  const [row] = await db
    .select()
    .from(settings)
    .where(eq(settings.key, key));
  return row?.value ?? null;
}

export async function updateSetting(key: string, value: unknown) {
  await db
    .update(settings)
    .set({ value, updatedAt: new Date() })
    .where(eq(settings.key, key));

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

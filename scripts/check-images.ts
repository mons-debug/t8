import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { vehicles } from "../src/db/schema";
import { asc } from "drizzle-orm";

async function check() {
  const db = drizzle(neon(process.env.DATABASE_URL!));
  const cars = await db
    .select({
      id: vehicles.id,
      make: vehicles.make,
      model: vehicles.model,
      color: vehicles.color,
      coverImage: vehicles.coverImage,
    })
    .from(vehicles)
    .orderBy(asc(vehicles.sortOrder));

  cars.forEach((c) =>
    console.log(
      `${c.id} ${c.make} ${c.model} (${c.color}) — ${c.coverImage ? "✓ has image" : "✗ no image"}`
    )
  );
}

check().catch(console.error);

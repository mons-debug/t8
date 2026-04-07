import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { HomePage } from "@/components/sections/home-page";

export default async function Page() {
  const cars = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.status, "available"))
    .orderBy(asc(vehicles.sortOrder))
    .limit(7);

  return <HomePage cars={cars} />;
}

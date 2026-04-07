import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { HomepageClient } from "@/components/homepage-client";

export default async function Home() {
  const cars = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.status, "available"))
    .orderBy(asc(vehicles.sortOrder))
    .limit(7);

  return <HomepageClient cars={cars} />;
}

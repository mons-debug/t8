import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Snowflake, MapPin, Phone, ArrowRight } from "lucide-react";
import { HomepageClient } from "@/components/homepage-client";

export default async function Home() {
  const featuredCars = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.status, "available"))
    .orderBy(asc(vehicles.sortOrder))
    .limit(6);

  return <HomepageClient cars={featuredCars} />;
}

"use client";

import { Hero } from "@/components/sections/hero";
import { Brands } from "@/components/sections/brands";
import { Fleet } from "@/components/sections/fleet";
import { Features } from "@/components/sections/features";
import { Reviews } from "@/components/sections/reviews";
import { Locations } from "@/components/sections/locations";
import { CTA } from "@/components/sections/cta";
import { SiteFooter } from "@/components/sections/site-footer";
import type { Vehicle } from "@/db/schema";

export function HomePage({ cars }: { cars: Vehicle[] }) {
  return (
    <main className="flex-1 dark:bg-[#0a0a0f]">
      <Hero car={cars[0]} />
      <Brands />
      <Fleet cars={cars} />
      <Features />
      <Reviews />
      <Locations />
      <CTA />
      <SiteFooter />
    </main>
  );
}

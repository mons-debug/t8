import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Fuel, Gauge, Snowflake } from "lucide-react";

export const metadata = {
  title: "Nos Voitures — T8 Auto | Location de voitures à Tanger",
  description:
    "Découvrez notre flotte de voitures disponibles à la location à Tanger. Dacia Duster, Hyundai Accent, Renault Clio et plus.",
};

export default async function CarsPage() {
  const allCars = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.status, "available"))
    .orderBy(asc(vehicles.sortOrder), asc(vehicles.id));

  return (
    <main className="flex-1">
      {/* Header */}
      <section className="bg-t8-cream px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Nos voitures
          </h1>
          <p className="mt-2 text-muted-foreground">
            {allCars.length} voiture{allCars.length !== 1 && "s"} disponible
            {allCars.length !== 1 && "s"} à la location
          </p>
        </div>
      </section>

      {/* Car Grid */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allCars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className="group overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg"
              >
                {/* Image */}
                {car.coverImage ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={car.coverImage}
                      alt={`${car.make} ${car.model}`}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
                      {car.category === "economy"
                        ? "Economique"
                        : car.category === "midrange"
                          ? "Berline"
                          : "SUV"}
                    </span>
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-gray-100">
                    <Car className="h-16 w-16 text-gray-300" />
                  </div>
                )}

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {car.year} — {car.color}
                  </p>

                  {/* Specs */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      <Gauge className="h-3 w-3" />
                      {car.transmission === "auto" ? "Automatique" : "Manuelle"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      <Fuel className="h-3 w-3" />
                      {car.fuel === "diesel" ? "Diesel" : "Essence"}
                    </span>
                    {car.hasAC && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        <Snowflake className="h-3 w-3" />
                        A/C
                      </span>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#e53935]">
                        {car.dailyRate} DH
                      </span>
                      <span className="text-sm text-muted-foreground">/jour</span>
                    </div>
                    <Button size="sm">Voir</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {allCars.length === 0 && (
            <div className="py-20 text-center">
              <Car className="mx-auto h-16 w-16 text-gray-300" />
              <p className="mt-4 text-lg text-muted-foreground">
                Aucune voiture disponible pour le moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e53935] px-4 py-10 text-center text-white">
        <h2 className="text-xl font-bold md:text-2xl">
          Besoin d&apos;aide pour choisir ?
        </h2>
        <p className="mt-2 opacity-90">
          Appelez-nous ou envoyez un message WhatsApp
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <a href="tel:+212660027233">
            <Button variant="secondary" size="lg">
              +212 660 027 233
            </Button>
          </a>
          <a
            href="https://wa.me/212660027233"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}

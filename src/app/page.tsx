import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Fuel, Gauge, Snowflake } from "lucide-react";

export default async function Home() {
  const featuredCars = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.status, "available"))
    .orderBy(asc(vehicles.sortOrder))
    .limit(3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-t8-cream px-4 py-20 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Location de voitures
            <span className="block text-t8-red">à Tanger</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Votre solution fiable pour la location de voitures. Livraison
            aéroport, gare TGV, port Tanger Med.
          </p>

          {/* Search Form Placeholder */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-card p-6 shadow-lg">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-left">
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Date de prise en charge
                </label>
                <div className="rounded-lg border border-input bg-background px-4 py-3 text-sm">
                  Sélectionner...
                </div>
              </div>
              <div className="text-left">
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Date de retour
                </label>
                <div className="rounded-lg border border-input bg-background px-4 py-3 text-sm">
                  Sélectionner...
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full" size="lg">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Badges */}
      <section className="border-b bg-card px-4 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: "✈️", label: "Aéroport", desc: "Livraison & récupération" },
            { icon: "🚄", label: "Gare TGV", desc: "Service gare Tanger" },
            { icon: "⚓", label: "Port", desc: "Tanger Med" },
            { icon: "💬", label: "WhatsApp", desc: "Réservation 24/7" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl">{s.icon}</div>
              <div className="mt-2 font-semibold">{s.label}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="bg-t8-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Nos voitures en vedette
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className="group overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {car.coverImage ? (
                  <div className="overflow-hidden">
                    <img
                      src={car.coverImage}
                      alt={`${car.make} ${car.model}`}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-muted">
                    <Car className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-sm text-muted-foreground">
                    {car.category === "economy"
                      ? "Economique"
                      : car.category === "midrange"
                        ? "Berline"
                        : "SUV"}
                  </div>
                  <h3 className="text-lg font-bold">
                    {car.make} {car.model}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-t8-red-light px-2 py-0.5 text-xs font-medium text-t8-red">
                      <Gauge className="h-3 w-3" />
                      {car.transmission === "auto" ? "Auto" : "Manuel"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-t8-red-light px-2 py-0.5 text-xs font-medium text-t8-red">
                      <Fuel className="h-3 w-3" />
                      {car.fuel === "diesel" ? "Diesel" : "Essence"}
                    </span>
                    {car.hasAC && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-t8-red-light px-2 py-0.5 text-xs font-medium text-t8-red">
                        <Snowflake className="h-3 w-3" />
                        A/C
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-t8-red">
                      {car.dailyRate} DH
                      <span className="text-sm font-normal text-muted-foreground">
                        /jour
                      </span>
                    </div>
                    <Button size="sm">Voir</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/cars">
              <Button variant="outline" size="lg">
                Voir toutes nos voitures
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-t8-red px-4 py-10 text-center text-white">
        <h2 className="text-xl font-bold md:text-2xl">
          Besoin d&apos;une voiture ? Appelez-nous
        </h2>
        <p className="mt-2 text-lg opacity-90">
          +212 660 027 233 · +212 672 400 030
        </p>
        <a
          href="https://wa.me/212660027233?text=Bonjour%2C%20je%20souhaite%20louer%20une%20voiture%20%C3%A0%20Tanger"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="lg" className="mt-4">
            WhatsApp
          </Button>
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-4 py-10 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-bold text-white">T8 Auto</div>
          <div>Boulevard Hanane Idrissi, Tanger 90000</div>
          <div>contact@t8-auto.com</div>
        </div>
      </footer>
    </main>
  );
}

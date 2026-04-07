"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Snowflake, MapPin, Phone, ArrowRight, Plane, TrainFront, Ship, MessageCircle } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, ScaleOnHover, motion } from "@/components/motion";
import { HeroSection } from "@/components/hero-section";
import { BrandMarquee } from "@/components/brand-marquee";
import type { Vehicle } from "@/db/schema";

export function HomepageClient({ cars }: { cars: Vehicle[] }) {
  // Split into hero car + grid
  const heroCar = cars[0];
  const gridCars = cars.slice(1, 5);

  return (
    <main className="flex-1">
      {/* ── HERO ── Cinematic with parallax + 3D tilt */}
      <HeroSection heroCar={heroCar} />

      {/* ── BRAND MARQUEE ── */}
      <BrandMarquee />

      {/* ── SERVICES ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <span className="text-xs font-medium tracking-wider text-[#e53935] uppercase">Services</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              Livraison partout à Tanger
            </h2>
          </FadeUp>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
            {[
              { icon: Plane, title: "Aéroport", desc: "Ibn Battouta — livraison et récupération directe" },
              { icon: TrainFront, title: "Gare TGV", desc: "Service gare Tanger — arrivée ou départ" },
              { icon: Ship, title: "Port Tanger Med", desc: "Transfert port — facilitez votre voyage" },
              { icon: MessageCircle, title: "WhatsApp 24/7", desc: "Réservation et assistance à toute heure" },
            ].map((s) => (
              <StaggerItem key={s.title}>
                <div className="group rounded-2xl border border-gray-100 p-6 transition-all hover:border-[#e53935]/20 hover:shadow-lg hover:shadow-[#e53935]/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffebee] transition-colors group-hover:bg-[#e53935]">
                    <s.icon className="h-6 w-6 text-[#e53935] transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FLEET ── Bento-style grid, not equal 3-col */}
      <section className="bg-[#faf6f1] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between">
            <FadeUp>
              <span className="text-xs font-medium tracking-wider text-[#e53935] uppercase">Flotte</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                Nos voitures
              </h2>
            </FadeUp>
            <FadeUp>
              <Link href="/cars">
                <Button variant="outline" className="gap-2">
                  Tout voir <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </FadeUp>
          </div>

          {/* Bento grid — 2fr 1fr 1fr pattern */}
          <StaggerContainer
            className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2"
            staggerDelay={0.08}
          >
            {gridCars.map((car, i) => (
              <StaggerItem
                key={car.id}
                className={
                  i === 0
                    ? "md:col-span-2 md:row-span-2"
                    : "md:col-span-2"
                }
              >
                <Link href={`/cars/${car.id}`} className="group block h-full">
                  <ScaleOnHover className="h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl border bg-white">
                      {car.coverImage ? (
                        <img
                          src={car.coverImage}
                          alt={`${car.make} ${car.model}`}
                          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                            i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-[16/10]"
                          }`}
                        />
                      ) : (
                        <div className={`bg-gray-100 ${i === 0 ? "aspect-square md:h-full" : "aspect-[16/10]"}`} />
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-300">
                              {car.year} — {car.color}
                            </p>
                            <h3 className="text-lg font-bold text-white">
                              {car.make} {car.model}
                            </h3>
                            <div className="mt-1 flex gap-2">
                              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                <Gauge className="h-3 w-3" />
                                {car.transmission === "auto" ? "Auto" : "Manuelle"}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                <Fuel className="h-3 w-3" />
                                {car.fuel === "diesel" ? "Diesel" : "Essence"}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              {car.dailyRate}
                            </div>
                            <div className="text-xs text-gray-300">DH/jour</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScaleOnHover>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── WHY T8 ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 md:grid-cols-5">
            <FadeUp className="md:col-span-2">
              <span className="text-xs font-medium tracking-wider text-[#e53935] uppercase">Pourquoi T8</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                La confiance,{" "}
                <span className="text-[#e53935]">depuis des années</span>
              </h2>
              <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-gray-500">
                Des véhicules entretenus, des prix transparents, et un service
                client disponible 7 jours sur 7.
              </p>
            </FadeUp>

            <StaggerContainer className="space-y-6 md:col-span-3" staggerDelay={0.1}>
              {[
                { num: "01", title: "Prix transparents", desc: "Tarifs journaliers, hebdomadaires et mensuels affichés. Pas de frais cachés." },
                { num: "02", title: "Flotte entretenue", desc: "Véhicules récents, inspectés régulièrement. Diesel, climatisation, kilométrage illimité." },
                { num: "03", title: "Livraison flexible", desc: "Aéroport, gare TGV, port ou à votre adresse. Nous nous adaptons à vous." },
                { num: "04", title: "Réservation simple", desc: "En ligne, par WhatsApp ou par téléphone. Confirmation rapide, paiement sur place." },
              ].map((item) => (
                <StaggerItem key={item.num}>
                  <div className="group flex gap-6 rounded-2xl border border-transparent p-5 transition-all hover:border-gray-100 hover:bg-gray-50/50">
                    <span className="text-3xl font-extrabold text-gray-200 transition-colors group-hover:text-[#e53935]">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#0f172a] px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e53935]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1400px]">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Prêt à prendre la route ?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Réservez en ligne ou contactez-nous directement
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/cars">
                  <Button size="lg" className="gap-2 text-base">
                    Réserver maintenant
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="tel:+212660027233">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-white/10 text-base text-white hover:bg-white/5"
                  >
                    <Phone className="h-4 w-4" />
                    +212 660 027 233
                  </Button>
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a0f1a] px-6 py-12 text-sm text-gray-500">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="text-xl font-bold text-white">T8 Auto</div>
              <div className="mt-1">Boulevard Hanane Idrissi, Tanger 90000</div>
            </div>
            <div className="flex gap-8">
              <Link href="/cars" className="transition-colors hover:text-white">Voitures</Link>
              <Link href="/about" className="transition-colors hover:text-white">Qui sommes-nous</Link>
              <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
              <Link href="/terms" className="transition-colors hover:text-white">Conditions</Link>
            </div>
            <div className="text-right">
              <div>+212 660 027 233</div>
              <div>contact@t8-auto.com</div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-gray-600">
            {new Date().getFullYear()} T8 Auto. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}

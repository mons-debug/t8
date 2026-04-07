"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Snowflake, Phone, ArrowRight, Plane, TrainFront, Ship, MessageCircle, Shield, Clock, CreditCard, MapPin } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, ScaleOnHover, motion } from "@/components/motion";
import { HeroSection } from "@/components/hero-section";
import { BrandMarquee } from "@/components/brand-marquee";
import type { Vehicle } from "@/db/schema";

export function HomepageClient({ cars }: { cars: Vehicle[] }) {
  return (
    <main className="flex-1 bg-white">
      {/* ── HERO ── */}
      <HeroSection cars={cars} />

      {/* ── BRAND MARQUEE ── */}
      <BrandMarquee />

      {/* ── VEHICLE FLEET ── */}
      <section className="bg-[#fafafa] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <FadeUp>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#e53935]">Flotte</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
                Nos véhicules
              </h2>
              <p className="mt-3 max-w-[50ch] text-base text-gray-500">
                Une flotte entretenue et diversifiée pour tous vos besoins.
                Du SUV au véhicule économique.
              </p>
            </FadeUp>
            <FadeUp>
              <Link href="/cars">
                <Button variant="outline" className="gap-2 rounded-full">
                  Voir tout <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </FadeUp>
          </div>

          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
            {cars.slice(0, 6).map((car) => (
              <StaggerItem key={car.id}>
                <Link href={`/cars/${car.id}`} className="group block">
                  <ScaleOnHover>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg">
                      {car.coverImage ? (
                        <div className="overflow-hidden bg-[#f5f5f5]">
                          <img
                            src={car.coverImage}
                            alt={`${car.make} ${car.model}`}
                            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gray-100" />
                      )}
                      <div className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-[#0f172a]">
                              {car.make} {car.model}
                            </h3>
                            <p className="text-sm text-gray-400">{car.year} · {car.color}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#e53935]">{car.dailyRate}</p>
                            <p className="text-xs text-gray-400">DH/jour</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            <Gauge className="h-3 w-3" />
                            {car.transmission === "auto" ? "Auto" : "Manuelle"}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            <Fuel className="h-3 w-3" />
                            {car.fuel === "diesel" ? "Diesel" : "Essence"}
                          </span>
                          {car.hasAC && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                              <Snowflake className="h-3 w-3" />
                              A/C
                            </span>
                          )}
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

      {/* ── KEY FEATURES ── */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e53935]">Pourquoi nous</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
              Nos avantages
            </h2>
          </FadeUp>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
            {[
              { icon: Shield, title: "Assurance incluse", desc: "Tous nos véhicules sont assurés. Roulez l'esprit tranquille." },
              { icon: CreditCard, title: "Prix transparents", desc: "Pas de frais cachés. Tarifs affichés pour jour, semaine et mois." },
              { icon: MapPin, title: "Livraison flexible", desc: "Aéroport, gare TGV, port Tanger Med ou à votre adresse." },
              { icon: Clock, title: "Disponible 7j/7", desc: "Réservation par WhatsApp, téléphone ou en ligne à toute heure." },
            ].map((feat) => (
              <StaggerItem key={feat.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffebee]">
                    <feat.icon className="h-6 w-6 text-[#e53935]" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0f172a]">{feat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{feat.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SERVICES / DELIVERY ── */}
      <section className="bg-[#fafafa] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeUp>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#e53935]">Livraison</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
                Partout à Tanger
              </h2>
              <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-gray-500">
                Nous livrons et récupérons votre véhicule où vous le souhaitez.
                Service rapide et ponctuel.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Plane, title: "Aéroport Ibn Battouta", desc: "Livraison directe à votre arrivée" },
                  { icon: TrainFront, title: "Gare TGV Tanger", desc: "Service à la descente du train" },
                  { icon: Ship, title: "Port Tanger Med", desc: "Transfert port facilité" },
                  { icon: MessageCircle, title: "WhatsApp 24/7", desc: "Réservation et assistance en temps réel" },
                ].map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffebee]">
                      <s.icon className="h-5 w-5 text-[#e53935]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">{s.title}</p>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Right — image grid */}
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                {cars.slice(0, 4).map((car, i) => (
                  <motion.div
                    key={car.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`overflow-hidden rounded-2xl bg-[#f0f0f0] ${i === 0 ? "col-span-2" : ""}`}
                  >
                    {car.coverImage && (
                      <img
                        src={car.coverImage}
                        alt={`${car.make} ${car.model}`}
                        className={`w-full object-cover ${i === 0 ? "aspect-[2/1]" : "aspect-[4/3]"}`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA — only dark section ── */}
      <section className="bg-[#0f172a] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Réservez votre voiture <span className="text-[#e53935]">aujourd'hui</span>
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                En ligne, par WhatsApp ou par téléphone. Confirmation rapide.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/cars">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="gap-2 rounded-full bg-[#e53935] px-8 text-base hover:bg-[#c62828]">
                      Explorer la flotte
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <a
                  href="https://wa.me/212660027233?text=Bonjour%2C%20je%20souhaite%20louer%20une%20voiture"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" variant="outline" className="gap-2 rounded-full border-white/20 px-8 text-base text-white hover:bg-white/5">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </motion.div>
                </a>
              </div>
              <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
                <span>+212 660 027 233</span>
                <span>contact@t8-auto.com</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a0f1a] px-6 py-10 text-sm text-gray-500">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-lg font-bold text-white">T8 Auto</div>
            <div className="flex gap-8">
              <Link href="/cars" className="transition-colors hover:text-white">Voitures</Link>
              <Link href="/about" className="transition-colors hover:text-white">Qui sommes-nous</Link>
              <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
              <Link href="/terms" className="transition-colors hover:text-white">Conditions</Link>
            </div>
            <div>Boulevard Hanane Idrissi, Tanger 90000</div>
          </div>
          <div className="mt-6 border-t border-white/5 pt-4 text-center text-xs text-gray-600">
            {new Date().getFullYear()} T8 Auto. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}

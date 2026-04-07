"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Snowflake, ArrowRight, Shield, Clock, CreditCard, MapPin, Zap, Headphones, Truck, Lock } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, motion } from "@/components/motion";
import { HeroSection } from "@/components/hero-section";
import { BrandMarquee } from "@/components/brand-marquee";
import type { Vehicle } from "@/db/schema";

export function HomepageClient({ cars }: { cars: Vehicle[] }) {
  return (
    <main className="flex-1 bg-white">
      {/* ── HERO ── */}
      <HeroSection cars={cars} />

      {/* ── BRAND LOGOS ── */}
      <BrandMarquee />

      {/* ── OUR VEHICLE FLEET ── Centered, exactly like reference */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] text-center">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Seulement les meilleures
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
              Notre flotte
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-gray-500">
              Des véhicules fiables et bien entretenus pour tous vos déplacements à Tanger.
            </p>
          </FadeUp>

          {/* Category pills */}
          <FadeUp delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Tous", "SUV", "Berline", "Economique"].map((cat, i) => (
                <span
                  key={cat}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    i === 0
                      ? "bg-[#0f172a] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Car grid — varied sizes like reference */}
          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
            {cars.slice(0, 6).map((car, i) => (
              <StaggerItem key={car.id}>
                <Link href={`/cars/${car.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="overflow-hidden rounded-2xl bg-[#f5f5f5] transition-shadow hover:shadow-lg"
                  >
                    {car.coverImage ? (
                      <img
                        src={car.coverImage}
                        alt={`${car.make} ${car.model}`}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          i === 0 ? "aspect-[4/3]" : "aspect-[4/3]"
                        }`}
                      />
                    ) : (
                      <div className="aspect-[4/3] bg-gray-200" />
                    )}
                    <div className="bg-white p-4 text-left">
                      <h3 className="font-bold text-[#0f172a]">{car.make} {car.model}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm text-gray-400">{car.year} · {car.color}</span>
                        <span className="font-bold text-[#e53935]">{car.dailyRate} DH<span className="text-xs font-normal text-gray-400">/jour</span></span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Show all button */}
          <FadeUp delay={0.2}>
            <Link href="/cars" className="mt-10 inline-block">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="gap-2 rounded-full px-8">
                  Voir tout ({cars.length} voitures) <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── KEY FEATURES ── Exactly like reference: subtitle, title, desc left + 4 icon cards */}
      <section className="bg-[#fafafa] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left text */}
            <FadeUp>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Au service de chaque client
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
                Nos avantages
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-gray-500">
                Nous mettons tout en place pour votre confort et votre sécurité.
                C'est pourquoi nous offrons le meilleur service que vous pouvez imaginer.
              </p>
            </FadeUp>

            {/* Right — 2x2 feature cards */}
            <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
              {[
                { icon: Zap, title: "Véhicules premium", desc: "Flotte récente et entretenue" },
                { icon: Headphones, title: "Support 24/7", desc: "WhatsApp et téléphone" },
                { icon: Truck, title: "Livraison 24h", desc: "Aéroport, TGV, port" },
                { icon: Lock, title: "Confidentialité", desc: "Vos données protégées" },
              ].map((feat) => (
                <StaggerItem key={feat.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200">
                      <feat.icon className="h-5 w-5 text-[#0f172a]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-[#0f172a]">{feat.title}</h3>
                    <p className="mt-1 text-xs text-gray-400">{feat.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── Dark rounded card like reference */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative overflow-hidden rounded-3xl bg-[#0f172a] px-8 py-16 text-center md:px-16 md:py-20"
            >
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#e53935]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#e53935]/5 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                  Réservez avec T8 Auto
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base text-gray-400">
                  Explorez notre flotte et réservez votre voiture idéale à Tanger.
                  Confirmation rapide, paiement sur place.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/cars">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <Button size="lg" className="gap-2 rounded-full bg-white px-8 text-sm text-[#0f172a] hover:bg-gray-100">
                        Réserver maintenant <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── Clean minimal like reference */}
      <footer className="border-t bg-white px-6 py-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            {/* Left links */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Navigation</p>
                <div className="flex gap-6">
                  <Link href="/about" className="text-sm text-gray-600 hover:text-[#0f172a]">Qui sommes-nous</Link>
                  <Link href="/cars" className="text-sm text-gray-600 hover:text-[#0f172a]">Voitures</Link>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-[#0f172a]">Contact</Link>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Légal</p>
                <div className="flex gap-6">
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-[#0f172a]">Conditions</Link>
                </div>
              </div>
            </div>

            {/* Right — brand */}
            <div className="text-right">
              <span className="text-xl font-extrabold text-[#0f172a]">T8 <span className="text-[#e53935]">Auto</span></span>
              <p className="mt-1 text-xs text-gray-400">Tanger, Maroc</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 text-center text-xs text-gray-400">
            {new Date().getFullYear()} T8 Auto. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Snowflake, ArrowRight, Zap, Headphones, Truck, Lock } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, motion } from "@/components/motion";
import { HeroSection } from "@/components/hero-section";
import { BrandMarquee } from "@/components/brand-marquee";
import { ReviewsSection } from "@/components/reviews-section";
import { MapSection } from "@/components/map-section";
import type { Vehicle } from "@/db/schema";

function CarCard({ car, index }: { car: Vehicle; index: number }) {
  return (
    <Link href={`/cars/${car.id}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="overflow-hidden rounded-2xl transition-shadow hover:shadow-xl"
      >
        {car.coverImage && (
          <img
            src={car.coverImage}
            alt={`${car.make} ${car.model}`}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </motion.div>
    </Link>
  );
}

export function HomepageClient({ cars }: { cars: Vehicle[] }) {
  return (
    <main className="flex-1 bg-white">
      {/* 1. HERO */}
      <HeroSection cars={cars} />

      {/* 2. BRAND MARQUEE */}
      <BrandMarquee />

      {/* 3. FLEET — pure images, staggered reveal */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] text-center">
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Seulement les meilleures
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
              Notre flotte
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-gray-500">
              Nous offrons à nos clients les meilleures émotions de conduite.
              C'est pourquoi nous n'avons que des voitures de qualité dans notre flotte.
            </p>
          </FadeUp>

          {/* Category pills */}
          <FadeUp delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Premium", "SUV", "Berline", "Economique", "Diesel", "Automatique"].map((cat, i) => (
                <span
                  key={cat}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] ${
                    i === 0
                      ? "bg-[#0f172a] text-white border-[#0f172a]"
                      : i === 4
                        ? "bg-[#e53935] text-white border-[#e53935]"
                        : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Row 1 — 3 images */}
          <div className="mt-10 grid gap-3 md:grid-cols-[1fr_1.4fr_1fr]">
            {cars.slice(0, 3).map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>

          {/* Row 2 — 4 images */}
          <div className="mt-3 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {cars.slice(3, 7).map((car, i) => (
              <CarCard key={car.id} car={car} index={i + 3} />
            ))}
          </div>

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

      {/* 4. KEY FEATURES */}
      <section className="bg-[#fafafa] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 md:grid-cols-2">
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

      {/* 5. REVIEWS */}
      <ReviewsSection />

      {/* 6. MAP + LOCATION */}
      <MapSection />

      {/* 7. CTA BANNER */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <FadeUp>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative overflow-hidden rounded-3xl bg-[#0f172a] px-8 py-16 text-center md:px-16 md:py-20"
            >
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#e53935]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#e53935]/5 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                  Réservez avec T8 Auto
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base text-gray-400">
                  Explorez notre flotte et réservez votre voiture idéale.
                  Confirmation rapide, paiement sur place.
                </p>
                <div className="mt-8">
                  <Link href="/cars">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
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

      {/* 8. FOOTER */}
      <footer className="border-t bg-white px-6 py-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-extrabold text-[#0f172a]">T8 <span className="text-[#e53935]">Auto</span></span>
              <p className="mt-2 text-sm text-gray-500">Votre solution fiable pour la location de voitures à Tanger.</p>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Navigation</p>
              <div className="space-y-2">
                <Link href="/cars" className="block text-sm text-gray-600 hover:text-[#0f172a]">Voitures</Link>
                <Link href="/about" className="block text-sm text-gray-600 hover:text-[#0f172a]">Qui sommes-nous</Link>
                <Link href="/contact" className="block text-sm text-gray-600 hover:text-[#0f172a]">Contact</Link>
                <Link href="/terms" className="block text-sm text-gray-600 hover:text-[#0f172a]">Conditions</Link>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Livraison</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Aéroport Ibn Battouta</p>
                <p>Gare TGV Tanger</p>
                <p>Port Tanger Med</p>
                <p>Centre-ville Tanger</p>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>+212 660 027 233</p>
                <p>+212 672 400 030</p>
                <p>contact@t8-auto.com</p>
                <a
                  href="https://wa.me/212660027233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2"
                >
                  <Button size="sm" className="rounded-full bg-[#25d366] text-xs hover:bg-[#20bd5a]">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 text-center text-xs text-gray-400">
            {new Date().getFullYear()} T8 Auto. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}

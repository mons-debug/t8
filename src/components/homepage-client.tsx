"use client";

import Link from "next/link";
import { ArrowRight, Fuel, Gauge, Snowflake, Star, Zap, Headphones, Truck, Lock, MapPin, Phone, Clock, Plane, TrainFront, Ship, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { BrandMarquee } from "@/components/brand-marquee";
import type { Vehicle } from "@/db/schema";

const EASE = [0.32, 0.72, 0, 1] as const;

/* ─── Reusable: Section reveal wrapper ───────────────────────── */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Car card with Double-Bezel pattern ─────────────────────── */
function CarCard({ car, index }: { car: Vehicle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: EASE }}
    >
      <Link href={`/cars/${car.id}`} className="group block">
        <motion.div
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="overflow-hidden rounded-[1.5rem] bg-white/60 p-1.5 ring-1 ring-black/[0.04] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >
          <div className="overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-[#f3f3f3]">
            {car.coverImage && (
              <img
                src={car.coverImage}
                alt={`${car.make} ${car.model}`}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
              />
            )}
          </div>
          <div className="px-4 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-[#0f172a]">{car.make} {car.model}</h3>
                <p className="mt-0.5 text-xs text-[#94a3b8]">{car.year} · {car.color}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#e53935]">{car.dailyRate}</p>
                <p className="text-[10px] text-[#94a3b8]">DH/jour</p>
              </div>
            </div>
            <div className="mt-3 flex gap-1.5">
              {[
                { icon: Gauge, label: car.transmission === "auto" ? "Auto" : "Manuelle" },
                { icon: Fuel, label: car.fuel === "diesel" ? "Diesel" : "Essence" },
                ...(car.hasAC ? [{ icon: Snowflake, label: "A/C" }] : []),
              ].map((spec) => (
                <span key={spec.label} className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f5] px-2.5 py-1 text-[10px] font-medium text-[#64748b]">
                  <spec.icon className="h-3 w-3" strokeWidth={1.5} />
                  {spec.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ─── Stars ──────────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
      ))}
    </div>
  );
}

const REVIEWS = [
  { name: "Ahmed B.", rating: 5, text: "Service excellent, voiture propre et bien entretenue. Livraison à l'aéroport sans problème.", city: "Casablanca" },
  { name: "Sophie M.", rating: 5, text: "Très professionnel. La Dacia Duster était parfaite pour notre road trip.", city: "Paris" },
  { name: "Karim T.", rating: 5, text: "Je loue toujours chez T8 Auto. Confiance totale.", city: "Tanger" },
  { name: "Maria L.", rating: 4, text: "Bon rapport qualité-prix. Livraison rapide au port Tanger Med.", city: "Madrid" },
  { name: "Youssef A.", rating: 5, text: "Le meilleur service de location à Tanger. Je recommande.", city: "Rabat" },
  { name: "Claire D.", rating: 5, text: "Réservation simple via WhatsApp, voiture prête à la gare TGV.", city: "Lyon" },
];

const FEATURES = [
  { icon: Zap, title: "Véhicules premium", desc: "Flotte récente, entretenue, climatisée" },
  { icon: Headphones, title: "Support 24/7", desc: "WhatsApp et téléphone non-stop" },
  { icon: Truck, title: "Livraison flexible", desc: "Aéroport, TGV, port, hôtel" },
  { icon: Lock, title: "Confiance totale", desc: "Assurance incluse, prix transparents" },
];

/* ═══════════════════════════════════════════════════════════════ */
/* HOMEPAGE                                                       */
/* ═══════════════════════════════════════════════════════════════ */
export function HomepageClient({ cars }: { cars: Vehicle[] }) {
  return (
    <main className="flex-1">

      {/* ── 1. HERO ── */}
      <HeroSection cars={cars} />

      {/* ── 2. BRAND MARQUEE ── */}
      <BrandMarquee />

      {/* ── 3. FLEET ─────────────────────────────────────────── */}
      <section className="bg-white px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#faf6f1] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8] ring-1 ring-black/[0.03]">
                Notre flotte
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.05] text-[#0f172a]">
                Des voitures que vous<br className="hidden md:block" /> allez adorer conduire
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#94a3b8]">
                Une flotte entretenue et diversifiée — du SUV au véhicule économique.
                Toutes équipées, climatisées, prêtes à partir.
              </p>
            </Reveal>
          </div>

          {/* Grid — asymmetric bento: 2fr + 1fr / 1fr + 1fr + 1fr */}
          <div className="mt-14 grid gap-4 md:grid-cols-[1.4fr_1fr]">
            {cars[0] && <CarCard car={cars[0]} index={0} />}
            {cars[1] && <CarCard car={cars[1]} index={1} />}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.slice(2, 5).map((car, i) => (
              <CarCard key={car.id} car={car} index={i + 2} />
            ))}
          </div>
          {cars.length > 5 && (
            <div className="mt-4 grid gap-4 grid-cols-2">
              {cars.slice(5, 7).map((car, i) => (
                <CarCard key={car.id} car={car} index={i + 5} />
              ))}
            </div>
          )}

          <Reveal delay={0.1} className="mt-12 text-center">
            <Link href="/cars">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full border border-black/10 bg-white py-3 pl-7 pr-3 text-sm font-medium text-[#0f172a] shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-black/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
              >
                Voir toute la flotte
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5] transition-all duration-500 group-hover:bg-[#0f172a] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FEATURES ──────────────────────────────────────── */}
      <section className="bg-[#faf6f1] px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8] ring-1 ring-black/[0.03]">
                  Nos avantages
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.05] text-[#0f172a]">
                  Pourquoi choisir<br /> T8 Auto
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-[#94a3b8]">
                  Nous mettons tout en place pour votre confort et sécurité. Un service pensé pour vous, du premier clic à la remise des clés.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  whileHover={{ y: -6 }}
                  className="rounded-[1.5rem] bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.03] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.07)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#faf6f1] ring-1 ring-black/[0.03]">
                    <feat.icon className="h-5 w-5 text-[#0f172a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-[#0f172a]">{feat.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. REVIEWS ───────────────────────────────────────── */}
      <section className="bg-white px-6 py-28 md:px-10 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#faf6f1] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8] ring-1 ring-black/[0.03]">
                Témoignages
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-[#0f172a]">
                Ce que disent nos clients
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 -mx-6 px-6">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden">
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  className="min-w-[300px] snap-start md:min-w-0"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full rounded-[1.5rem] bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.03] transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                  >
                    <Stars count={review.rating} />
                    <p className="mt-4 text-sm leading-relaxed text-[#475569]">&ldquo;{review.text}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-black/[0.04] pt-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffebee] text-xs font-bold text-[#e53935]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{review.name}</p>
                        <p className="text-[11px] text-[#94a3b8]">{review.city}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MAP + LOCATION ────────────────────────────────── */}
      <section className="bg-[#faf6f1] px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8] ring-1 ring-black/[0.03]">
                  Localisation
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-[#0f172a]">
                  Nous trouver
                </h2>
              </Reveal>

              <div className="mt-8 space-y-3">
                {[
                  { icon: MapPin, title: "Boulevard Hanane Idrissi", sub: "Tanger 90000, Maroc" },
                  { icon: Phone, title: "+212 660 027 233", sub: "+212 672 400 030" },
                  { icon: Clock, title: "08:00 — 20:00", sub: "7 jours / 7" },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={0.15 + i * 0.07}>
                    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/[0.03]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffebee]">
                        <item.icon className="h-5 w-5 text-[#e53935]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{item.title}</p>
                        <p className="text-xs text-[#94a3b8]">{item.sub}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.4}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { icon: Plane, name: "Aéroport" },
                    { icon: TrainFront, name: "Gare TGV" },
                    { icon: Ship, name: "Port Tanger Med" },
                  ].map((loc) => (
                    <span key={loc.name} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#0f172a] ring-1 ring-black/[0.03]">
                      <loc.icon className="h-3.5 w-3.5 text-[#e53935]" strokeWidth={1.5} />
                      {loc.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-black/[0.04]" style={{ minHeight: 420 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.8!2d-5.8128!3d35.7595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzM0LjIiTiA1wrA0OCc0Ni4xIlc!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 420 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="T8 Auto — Tanger"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER — Double-bezel dark card ───────────── */}
      <section className="bg-white px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="rounded-[2rem] bg-[#0f172a] p-2">
              <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#0f172a] px-8 py-20 text-center md:px-16 md:py-24">
                <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#e53935]/8 blur-[100px]" />
                <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#e53935]/5 blur-[80px]" />
                <div className="relative">
                  <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-white">
                    Prêt à prendre la route ?
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-base text-[#94a3b8]">
                    Explorez notre flotte et réservez votre voiture idéale. Confirmation rapide, paiement sur place.
                  </p>
                  <div className="mt-10">
                    <Link href="/cars">
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex items-center gap-3 rounded-full bg-white py-3.5 pl-8 pr-4 text-sm font-medium text-[#0f172a] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
                      >
                        Réserver maintenant
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f172a] text-white transition-all duration-500 group-hover:translate-x-0.5 group-hover:scale-105">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-black/[0.04] bg-white px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <span className="text-xl font-extrabold text-[#0f172a]">T8 <span className="text-[#e53935]">Auto</span></span>
              <p className="mt-3 max-w-[25ch] text-sm leading-relaxed text-[#94a3b8]">Votre solution fiable pour la location de voitures à Tanger.</p>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">Navigation</p>
              <div className="space-y-3">
                {[
                  { href: "/cars", label: "Voitures" },
                  { href: "/about", label: "Qui sommes-nous" },
                  { href: "/contact", label: "Contact" },
                  { href: "/terms", label: "Conditions" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-[#64748b] transition-colors duration-300 hover:text-[#0f172a]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">Livraison</p>
              <div className="space-y-3 text-sm text-[#64748b]">
                <p>Aéroport Ibn Battouta</p>
                <p>Gare TGV Tanger</p>
                <p>Port Tanger Med</p>
                <p>Centre-ville Tanger</p>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">Contact</p>
              <div className="space-y-3 text-sm text-[#64748b]">
                <p>+212 660 027 233</p>
                <p>+212 672 400 030</p>
                <p>contact@t8-auto.com</p>
              </div>
              <a href="https://wa.me/212660027233" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-[#25d366] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-[#20bd5a]"
                >
                  WhatsApp
                </motion.button>
              </a>
            </div>
          </div>
          <div className="mt-14 border-t border-black/[0.04] pt-6 text-center text-xs text-[#cbd5e1]">
            {new Date().getFullYear()} T8 Auto. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}

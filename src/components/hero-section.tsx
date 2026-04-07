"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion, animate } from "framer-motion";
import type { Vehicle } from "@/db/schema";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const c = animate(0, target, {
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => c.stop();
  }, [target]);
  return <>{count}{suffix}</>;
}

export function HeroSection({ cars }: { cars: Vehicle[] }) {
  const heroCar = cars[0];

  return (
    <section className="relative overflow-hidden bg-white px-6 pt-12 pb-0 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#ffebee] px-4 py-1.5"
            >
              <Star className="h-3.5 w-3.5 fill-[#e53935] text-[#e53935]" />
              <span className="text-xs font-semibold text-[#e53935]">N°1 à Tanger</span>
            </motion.div>

            <div className="mt-6 overflow-hidden">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-6xl lg:text-7xl"
              >
                Location de
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-6xl lg:text-7xl"
              >
                voitures <span className="text-[#e53935]">premium</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-6xl lg:text-7xl"
              >
                à Tanger
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-[48ch] text-base leading-relaxed text-gray-500 md:text-lg"
            >
              Des véhicules fiables livrés à l'aéroport, la gare TGV ou le port.
              Réservez en ligne en 2 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link href="/cars">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gap-2 rounded-full bg-[#e53935] px-8 text-base hover:bg-[#c62828]">
                    Voir les voitures
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <a href="tel:+212660027233">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-base">
                    +212 660 027 233
                  </Button>
                </motion.div>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 flex gap-10"
            >
              {[
                { value: 500, suffix: "+", label: "Clients" },
                { value: 7, suffix: "+", label: "Voitures" },
                { value: 4, suffix: "", label: "Lieux de livraison" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-[#0f172a] md:text-3xl">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Car images stack */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main car */}
            {heroCar?.coverImage && (
              <Link href={`/cars/${heroCar.id}`} className="group block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative overflow-hidden rounded-3xl bg-[#f8f8f8]"
                >
                  <img
                    src={heroCar.coverImage}
                    alt={`${heroCar.make} ${heroCar.model}`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-2 backdrop-blur-sm">
                    <p className="text-sm font-bold text-[#0f172a]">{heroCar.make} {heroCar.model}</p>
                    <p className="text-xs text-gray-500">{heroCar.dailyRate} DH/jour</p>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Floating small car cards */}
            {cars.slice(1, 4).map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
                className="mt-3"
              >
                <Link href={`/cars/${car.id}`} className="group block">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {car.coverImage && (
                      <img
                        src={car.coverImage}
                        alt={`${car.make} ${car.model}`}
                        className="h-14 w-20 rounded-xl object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0f172a]">{car.make} {car.model}</p>
                      <p className="text-xs text-gray-400">{car.transmission === "auto" ? "Automatique" : "Manuelle"} · {car.fuel === "diesel" ? "Diesel" : "Essence"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#e53935]">{car.dailyRate} DH</p>
                      <p className="text-[10px] text-gray-400">/jour</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

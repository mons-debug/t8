"use client";

import Link from "next/link";
import { ArrowUpRight, Gauge, Fuel, Snowflake } from "lucide-react";
import { motion } from "framer-motion";
import type { Vehicle } from "@/db/schema";

const ease = [0.32, 0.72, 0, 1] as const;

function In({ children, className, d = 0 }: { children: React.ReactNode; className?: string; d?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: d, ease }}
      className={className}
    >{children}</motion.div>
  );
}

function Card({ car, i, large }: { car: Vehicle; i: number; large?: boolean }) {
  return (
    <In d={i * 0.06}>
      <Link href={`/cars/${car.id}`} className="group block h-full">
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="h-full overflow-hidden rounded-[1.75rem] bg-[#f5f4f0] p-1.5 ring-1 ring-black/[0.04] transition-shadow duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
        >
          <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
            {car.coverImage && (
              <img
                src={car.coverImage}
                alt={`${car.make} ${car.model}`}
                className={`w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.07] ${large ? "aspect-[3/2]" : "aspect-[4/3]"}`}
              />
            )}
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <h3 className="text-[15px] font-bold text-[#0a0a0f]">{car.make} {car.model}</h3>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#94a3b8]">
                <span>{car.year}</span>
                <span className="h-1 w-1 rounded-full bg-[#d4d4d4]" />
                <span>{car.color}</span>
                <span className="h-1 w-1 rounded-full bg-[#d4d4d4]" />
                <span>{car.transmission === "auto" ? "Auto" : "Manuelle"}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#e53935]">{car.dailyRate}</div>
              <div className="text-[10px] text-[#94a3b8]">DH/jour</div>
            </div>
          </div>
        </motion.div>
      </Link>
    </In>
  );
}

export function Fleet({ cars }: { cars: Vehicle[] }) {
  return (
    <section className="bg-white px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <In>
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-[#e53935]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e53935]">Notre flotte</span>
          </div>
        </In>

        <div className="mt-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <In d={0.06}>
            <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.02em] text-[#0a0a0f]">
              Des voitures que vous<br className="hidden md:block" /> allez adorer.
            </h2>
          </In>
          <In d={0.12}>
            <Link href="/cars">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2 rounded-full bg-[#0a0a0f] py-3 pl-6 pr-3 text-[13px] font-semibold text-white"
              >
                Voir tout
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.12] transition-all duration-500 group-hover:bg-[#e53935]">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </motion.div>
            </Link>
          </In>
        </div>

        {/* Row 1 — 2 large cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {cars.slice(0, 2).map((car, i) => (
            <Card key={car.id} car={car} i={i} large />
          ))}
        </div>

        {/* Row 2 — 3 medium cards */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {cars.slice(2, 5).map((car, i) => (
            <Card key={car.id} car={car} i={i + 2} />
          ))}
        </div>

        {/* Row 3 — 2 small cards */}
        {cars.length > 5 && (
          <div className="mt-4 grid gap-4 grid-cols-2">
            {cars.slice(5, 7).map((car, i) => (
              <Card key={car.id} car={car} i={i + 5} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

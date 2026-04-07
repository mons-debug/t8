"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Vehicle } from "@/db/schema";

const ease = [0.32, 0.72, 0, 1] as const;

function Card({ car, i }: { car: Vehicle; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: i * 0.06, ease }}
    >
      <Link href={`/cars/${car.id}`} className="group block">
        <motion.div
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            {car.coverImage && (
              <img
                src={car.coverImage}
                alt={`${car.make} ${car.model}`}
                className="aspect-[3/2] w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
              />
            )}
          </div>

          {/* Info below image — clean, no card wrapper */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div>
              <h3 className="text-[15px] font-bold text-[#0a0a0f]">{car.make} {car.model}</h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                <span>{car.year}</span>
                <span className="text-[#d4d4d4]">/</span>
                <span>{car.color}</span>
                <span className="text-[#d4d4d4]">/</span>
                <span>{car.transmission === "auto" ? "Auto" : "Manuelle"}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#e53935]">{car.dailyRate}</span>
              <span className="ml-0.5 text-[11px] text-[#94a3b8]">DH/j</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Fleet({ cars }: { cars: Vehicle[] }) {
  return (
    <section className="bg-white px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-[#e53935]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e53935]">Notre flotte</span>
          </div>
        </motion.div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.06, ease }}
          >
            <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.02em] text-[#0a0a0f]">
              Des voitures que vous<br className="hidden md:block" /> allez adorer.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-[#94a3b8]">
              Flotte entretenue et diversifiée — SUV, berlines, économiques. Toutes climatisées, prêtes à partir.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
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
          </motion.div>
        </div>

        {/* Grid — 3 columns top, 4 columns bottom */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cars.slice(0, 3).map((car, i) => (
            <Card key={car.id} car={car} i={i} />
          ))}
        </div>
        {cars.length > 3 && (
          <div className="mt-6 grid gap-6 grid-cols-2 md:grid-cols-4">
            {cars.slice(3, 7).map((car, i) => (
              <Card key={car.id} car={car} i={i + 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

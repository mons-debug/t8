"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Plane, TrainFront, Ship } from "lucide-react";
import { FadeUp } from "@/components/motion";

const LOCATIONS = [
  { icon: Plane, name: "Aéroport Ibn Battouta", time: "20 min" },
  { icon: TrainFront, name: "Gare TGV Tanger", time: "10 min" },
  { icon: Ship, name: "Port Tanger Med", time: "45 min" },
];

export function MapSection() {
  return (
    <section className="bg-[#fafafa] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left — Info */}
          <FadeUp>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Localisation
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-4xl">
              Nous trouver
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-white p-4 border border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffebee]">
                  <MapPin className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">Boulevard Hanane Idrissi</p>
                  <p className="text-xs text-gray-400">Tanger 90000, Maroc</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-white p-4 border border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffebee]">
                  <Phone className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">+212 660 027 233</p>
                  <p className="text-xs text-gray-400">+212 672 400 030</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-white p-4 border border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffebee]">
                  <Clock className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">08:00 — 20:00</p>
                  <p className="text-xs text-gray-400">7 jours / 7</p>
                </div>
              </div>
            </div>

            {/* Delivery locations */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Zones de livraison</p>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <motion.div
                    key={loc.name}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2"
                  >
                    <loc.icon className="h-4 w-4 text-[#e53935]" />
                    <span className="text-xs font-medium text-[#0f172a]">{loc.name}</span>
                    <span className="text-[10px] text-gray-400">{loc.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-gray-200"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

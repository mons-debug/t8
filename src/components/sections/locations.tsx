"use client";

import { MapPin, Phone, Clock, Plane, TrainFront, Ship } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

function In({ children, className, d = 0 }: { children: React.ReactNode; className?: string; d?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: d, ease }}
      className={className}
    >{children}</motion.div>
  );
}

export function Locations() {
  return (
    <section className="bg-[#faf6f1] px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <In>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-[#e53935]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e53935]">Localisation</span>
              </div>
            </In>
            <In d={0.06}>
              <h2 className="mt-5 text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.02em] text-[#0a0a0f]">
                Nous trouver.
              </h2>
            </In>

            <div className="mt-10 space-y-3">
              {[
                { icon: MapPin, t: "Boulevard Hanane Idrissi", s: "Tanger 90000, Maroc" },
                { icon: Phone, t: "+212 660 027 233", s: "+212 672 400 030" },
                { icon: Clock, t: "08:00 — 20:00", s: "7 jours / 7" },
              ].map((item, i) => (
                <In key={item.t} d={0.12 + i * 0.06}>
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/[0.03]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffebee]">
                      <item.icon className="h-[18px] w-[18px] text-[#e53935]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#0a0a0f]">{item.t}</div>
                      <div className="text-[12px] text-[#94a3b8]">{item.s}</div>
                    </div>
                  </div>
                </In>
              ))}
            </div>

            <In d={0.35}>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  { icon: Plane, name: "Aéroport" },
                  { icon: TrainFront, name: "Gare TGV" },
                  { icon: Ship, name: "Port Tanger Med" },
                ].map((loc) => (
                  <span key={loc.name} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#0a0a0f] ring-1 ring-black/[0.03]">
                    <loc.icon className="h-3.5 w-3.5 text-[#e53935]" strokeWidth={1.5} />
                    {loc.name}
                  </span>
                ))}
              </div>
            </In>
          </div>

          <In d={0.15}>
            <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-black/[0.04]" style={{ minHeight: 440 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.8!2d-5.8128!3d35.7595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzM0LjIiTiA1wrA0OCc0Ni4xIlc!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 440 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="T8 Auto — Tanger"
              />
            </div>
          </In>
        </div>
      </div>
    </section>
  );
}

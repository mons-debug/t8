"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import type { Vehicle } from "@/db/schema";

const EASE = [0.32, 0.72, 0, 1] as const;

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) return;
    const c = animate(0, target, { duration: 2, ease: EASE, onUpdate: (v) => setCount(Math.round(v)) });
    return () => c.stop();
  }, [target, started]);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function HeroSection({ cars }: { cars: Vehicle[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const carY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax on car
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden bg-[#faf6f1]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.015);
        my.set((e.clientY - r.top - r.height / 2) * 0.015);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div style={{ opacity: fadeOut }} className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid min-h-[100dvh] items-center gap-6 md:grid-cols-[1.1fr_1fr]">

          {/* LEFT — Editorial text block */}
          <motion.div style={{ y: textY }} className="relative z-10 pt-28 pb-8 md:pt-0 md:pb-0">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e53935] shadow-[0_2px_20px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.03]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e53935]" />
                Location premium
              </span>
            </motion.div>

            {/* Massive headline — staggered reveal */}
            <div className="mt-8 space-y-1">
              {["Location de", "voitures"].map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 120 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: EASE }}
                    className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold tracking-tight leading-[0.95] text-[#0f172a]"
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.54, ease: EASE }}
                  className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold tracking-tight leading-[0.95] text-[#e53935]"
                >
                  à Tanger
                </motion.h1>
              </div>
            </div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 max-w-[38ch] text-base leading-relaxed text-[#64748b]"
            >
              Des véhicules fiables livrés à l'aéroport, gare TGV ou port Tanger Med. Réservez en ligne ou par WhatsApp.
            </motion.p>

            {/* CTA — Button-in-button pattern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/cars">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 rounded-full bg-[#0f172a] py-3 pl-7 pr-3 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#1e293b]"
                >
                  Voir les voitures
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.button>
              </Link>
              <a href="tel:+212660027233">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-[#0f172a]/10 bg-white px-7 py-3 text-sm font-medium text-[#0f172a] shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#0f172a]/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
                >
                  +212 660 027 233
                </motion.button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-14 flex gap-12"
            >
              {[
                { value: 500, suffix: "+", label: "Clients" },
                { value: 15, suffix: "+", label: "Voitures" },
                { value: 5, suffix: "+", label: "Ans" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-[#0f172a]">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-[#94a3b8]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Floating car with depth */}
          <motion.div
            style={{ y: carY, x: sx }}
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
            className="relative"
          >
            {/* Soft shadow underneath */}
            <motion.div
              className="absolute bottom-[-5%] left-[10%] right-[10%] h-[15%] rounded-[50%] bg-[#0f172a]/[0.07] blur-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Car — gentle float */}
            <motion.img
              src="/hero/hero-car.png"
              alt="SUV premium — T8 Auto Tanger"
              className="relative w-full max-w-[640px] object-contain ml-auto"
              draggable={false}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating glass tag — price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
              className="absolute right-4 top-[20%] rounded-2xl bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] md:right-8"
            >
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#94a3b8]">À partir de</p>
              <p className="text-2xl font-bold text-[#0f172a]">300 <span className="text-sm font-normal text-[#94a3b8]">DH/jour</span></p>
            </motion.div>

            {/* Floating glass tag — location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35, ease: EASE }}
              className="absolute left-0 bottom-[25%] rounded-2xl bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] md:left-4"
            >
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#94a3b8]">Livraison</p>
              <p className="text-sm font-bold text-[#0f172a]">Aéroport · TGV · Port</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
      >
        <ChevronDown className="h-5 w-5 text-[#94a3b8]" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}

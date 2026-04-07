"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import type { Vehicle } from "@/db/schema";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const c = animate(0, target, {
      duration: 2.5,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => c.stop();
  }, [target]);
  return <>{count}{suffix}</>;
}

export function HeroSection({ heroCar }: { heroCar: Vehicle | undefined }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const carY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const carScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  // Mouse parallax on car
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 15 });
  const sy = useSpring(my, { stiffness: 40, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.02);
    my.set((e.clientY - r.top - r.height / 2) * 0.02);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Radial glow behind car */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(229,57,53,0.15) 0%, rgba(229,57,53,0.05) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid lines for depth */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <motion.div style={{ opacity: bgOpacity }} className="relative mx-auto max-w-[1400px] px-6">
        {/* Top content */}
        <div className="pt-28 md:pt-36">
          {/* Small tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-8 bg-[#e53935]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#e53935]">
              Premium Car Rental
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.div style={{ y: textY }}>
            <div className="mt-6 overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tighter leading-[0.9] text-white md:text-8xl"
              >
                Louez votre
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tighter leading-[0.9] text-white md:text-8xl"
              >
                voiture <span className="text-[#e53935]">idéale</span>
              </motion.h1>
            </div>
          </motion.div>
        </div>

        {/* Center — HUGE CAR IMAGE */}
        {heroCar && (
          <motion.div
            className="relative mx-auto mt-8 max-w-4xl md:-mt-4"
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: carY, scale: carScale, x: sx, rotateY: sx }}
          >
            <Link href={`/cars/${heroCar.id}`} className="block">
              {heroCar.coverImage && (
                <img
                  src={heroCar.coverImage}
                  alt={`${heroCar.make} ${heroCar.model}`}
                  className="w-full object-contain drop-shadow-[0_20px_60px_rgba(229,57,53,0.3)]"
                  draggable={false}
                />
              )}
            </Link>

            {/* Floating price tag */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -right-4 top-1/4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl md:right-0"
            >
              <p className="text-xs text-gray-400">À partir de</p>
              <p className="text-2xl font-bold text-white">
                {heroCar.dailyRate} <span className="text-sm font-normal text-gray-400">DH/jour</span>
              </p>
            </motion.div>

            {/* Floating car name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="absolute -left-4 bottom-1/4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl md:left-0"
            >
              <p className="text-xs text-gray-400">
                {heroCar.category === "suv" ? "SUV" : heroCar.category === "midrange" ? "Berline" : "Economique"}
              </p>
              <p className="text-lg font-bold text-white">{heroCar.make} {heroCar.model}</p>
            </motion.div>

            {/* Animated shine */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 6 }}
            />
          </motion.div>
        )}

        {/* Bottom — Stats + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-8 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-8 pb-12 md:flex-row md:pb-16"
        >
          {/* Stats */}
          <div className="flex gap-10 md:gap-16">
            {[
              { value: 500, suffix: "+", label: "Clients satisfaits" },
              { value: 7, suffix: "", label: "Véhicules" },
              { value: 4, suffix: "", label: "Points de livraison" },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="text-3xl font-bold text-white md:text-4xl">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link href="/cars">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="gap-2 bg-[#e53935] px-8 text-base hover:bg-[#c62828]">
                  Explorer la flotte
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
            <a href="tel:+212660027233">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" className="border-white/10 px-6 text-base text-white hover:bg-white/5">
                  +212 660 027 233
                </Button>
              </motion.div>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

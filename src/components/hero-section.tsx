"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import type { Vehicle } from "@/db/schema";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const c = animate(0, target, {
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => c.stop();
  }, [target, started]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function HeroSection({ cars }: { cars: Vehicle[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const carY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#faf6f1]"
    >
      <motion.div style={{ opacity: heroOpacity }} className="relative mx-auto max-w-[1400px] px-6">
        <div className="grid min-h-[100dvh] items-center gap-6 md:grid-cols-2">
          {/* Left — Text with parallax */}
          <motion.div style={{ y: textY }} className="relative z-10 pt-24 md:pt-0">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-7xl lg:text-[80px]"
              >
                Location
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-7xl lg:text-[80px]"
              >
                de voitures
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tight leading-[1.05] text-[#e53935] md:text-7xl lg:text-[80px]"
              >
                à Tanger
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-[40ch] text-base leading-relaxed text-gray-500"
            >
              Des véhicules fiables livrés à l'aéroport, gare TGV ou port Tanger Med. Réservez en ligne ou par WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex items-center gap-4"
            >
              <Link href="/cars">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gap-2 rounded-full bg-[#0f172a] px-8 text-sm hover:bg-[#1e293b]">
                    Voir les voitures
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              <a href="tel:+212660027233">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-sm border-[#0f172a]/20">
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
              className="mt-12 flex gap-10"
            >
              {[
                { value: 500, suffix: "+", label: "Clients" },
                { value: 15, suffix: "+", label: "Voitures" },
                { value: 5, suffix: " ans", label: "D'expérience" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-[#0f172a]">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Car with parallax + float */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: carY, scale: carScale }}
            className="relative -mr-6 md:-mr-20"
          >
            {/* Shadow under car */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-8 w-[80%] rounded-[50%] bg-black/10 blur-xl" />

            <motion.img
              src="/hero/hero-car.png"
              alt="SUV premium — T8 Auto Tanger"
              className="relative w-full max-w-[700px] object-contain ml-auto"
              draggable={false}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <ChevronDown className="h-6 w-6 text-gray-400" />
      </motion.div>
    </section>
  );
}

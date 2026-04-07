"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import type { Vehicle } from "@/db/schema";

const ease = [0.32, 0.72, 0, 1] as const;

function AnimNum({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!go) return;
    const c = animate(0, to, { duration: 2.2, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [to, go]);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Hero({ car }: { car?: Vehicle }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 15 });

  return (
    <section
      ref={container}
      className="relative min-h-[100dvh] overflow-hidden bg-[#faf6f1] dark:bg-[#0a0a0f]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.012);
        my.set((e.clientY - r.top - r.height / 2) * 0.012);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="flex min-h-[100dvh] flex-col justify-center gap-4 md:flex-row md:items-center md:gap-0">

          {/* ─── LEFT TEXT ─── */}
          <motion.div style={{ y: textY }} className="relative z-10 w-full pt-28 md:w-[48%] md:pt-0">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15, ease }}>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-[#e53935]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e53935]">T8 Auto · Tanger</span>
              </div>
            </motion.div>

            <div className="mt-7">
              {["Louez la", "voiture", "parfaite."].map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 130, rotateX: -10 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.1, ease }}
                  >
                    <h1 className={`text-[clamp(3rem,9vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em] ${
                      i === 2 ? "text-[#e53935]" : "text-[#0a0a0f] dark:text-white"
                    }`}>
                      {line}
                    </h1>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.65 }}
              className="mt-8 max-w-[34ch] text-[15px] leading-[1.7] text-[#64748b] dark:text-[#94a3b8]"
            >
              Livraison aéroport, gare TGV, port Tanger Med. Flotte fiable, prix transparents, réservation instantanée.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-10 flex items-center gap-5"
            >
              <Link href="/cars">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="group flex items-center gap-2 rounded-full bg-[#0a0a0f] py-3.5 pl-7 pr-4 text-[13px] font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:pr-3"
                >
                  Explorer la flotte
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-white/5/[0.12] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#e53935] group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </motion.div>
              </Link>
              <a href="https://wa.me/212660027233?text=Bonjour%2C%20je%20souhaite%20louer%20une%20voiture" target="_blank" rel="noopener noreferrer">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 rounded-full bg-white dark:bg-white/5 py-3.5 px-6 text-[13px] font-semibold text-[#0a0a0f] dark:text-white ring-1 ring-[#0a0a0f]/[0.06] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[#0a0a0f]/[0.12] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25d366]">
                    <Play className="h-2.5 w-2.5 fill-white text-white ml-[1px]" />
                  </span>
                  WhatsApp
                </motion.div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-16 flex items-center gap-12 border-t border-[#0a0a0f]/[0.06] pt-8"
            >
              {[
                { n: 500, s: "+", l: "Clients satisfaits" },
                { n: 15, s: "+", l: "Véhicules" },
                { n: 5, s: " ans", l: "D'expérience" },
              ].map((stat) => (
                <div key={stat.l}>
                  <div className="text-[28px] font-bold tracking-tight text-[#0a0a0f] dark:text-white">
                    <AnimNum to={stat.n} suffix={stat.s} />
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#94a3b8]">{stat.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT CAR ─── */}
          <motion.div
            style={{ y: imgY, x: springX }}
            initial={{ opacity: 0, x: 100, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.35, ease }}
            className="relative w-full md:w-[52%]"
          >
            <motion.div
              className="absolute bottom-[-8%] left-[8%] right-[8%] h-[12%] rounded-[50%] bg-[#0a0a0f]/[0.06] blur-3xl"
              animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src="/hero/hero-car.png"
              alt="T8 Auto — Location de voitures à Tanger"
              className="relative w-full object-contain"
              draggable={false}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glass tag top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease }}
              className="absolute right-2 top-[15%] rounded-2xl bg-white dark:bg-white/5/90 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.03] backdrop-blur-lg md:right-8"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">À partir de</div>
              <div className="mt-1 text-[22px] font-bold tracking-tight text-[#0a0a0f] dark:text-white">300 <span className="text-[13px] font-normal text-[#94a3b8]">DH/jour</span></div>
            </motion.div>

            {/* Glass tag bottom-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.45, ease }}
              className="absolute bottom-[20%] left-0 rounded-2xl bg-white dark:bg-white/5/90 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.03] backdrop-blur-lg md:left-4"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">Livraison</div>
              <div className="mt-1 text-[13px] font-semibold text-[#0a0a0f] dark:text-white">Aéroport · TGV · Port</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

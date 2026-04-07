"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import type { Vehicle } from "@/db/schema";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function HeroSection({ heroCar }: { heroCar: Vehicle | undefined }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.4]);

  // Mouse parallax on car image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [3, -3]);
  const rotateY = useTransform(springX, [-300, 300], [-3, 3]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#0f172a]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(229,57,53,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(229,57,53,0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(229,57,53,0.08) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-6 pt-32 pb-20 md:grid-cols-5 md:gap-12 md:pt-40 md:pb-32">
        {/* Text — 2 cols with parallax */}
        <motion.div className="md:col-span-2" style={{ y: textY }}>
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-400 uppercase"
          >
            Location de voitures
          </motion.span>

          {/* Headline — letter by letter reveal */}
          <div className="mt-6 overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="text-4xl font-extrabold tracking-tighter leading-none text-white md:text-6xl"
            >
              Roulez libre
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="text-4xl font-extrabold tracking-tighter leading-none text-[#e53935] md:text-6xl"
            >
              à Tanger
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-[45ch] text-lg leading-relaxed text-gray-400"
          >
            Flotte fiable. Livraison aéroport, gare TGV, port Tanger Med.
            Réservez en ligne ou via WhatsApp.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/cars">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="gap-2 text-base">
                  Voir les voitures
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
            <a
              href="https://wa.me/212660027233?text=Bonjour%2C%20je%20souhaite%20louer%20une%20voiture"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/10 text-base text-white hover:bg-white/5"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex gap-8 border-t border-white/10 pt-8"
          >
            {[
              { value: 7, suffix: "+", label: "Voitures" },
              { value: 300, suffix: "", label: "DH/jour min" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero car — 3 cols with 3D tilt + parallax */}
        {heroCar && (
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            style={{ y: imageY }}
          >
            <Link href={`/cars/${heroCar.id}`} className="group block">
              <motion.div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  rotateX,
                  rotateY,
                  scale: imageScale,
                  transformPerspective: 1200,
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {heroCar.coverImage ? (
                  <img
                    src={heroCar.coverImage}
                    alt={`${heroCar.make} ${heroCar.model}`}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[16/10] bg-gray-800" />
                )}

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatDelay: 5 }}
                />

                {/* Scroll-reactive overlay */}
                <motion.div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: overlayOpacity }}
                />

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex items-end justify-between"
                  >
                    <div>
                      <p className="text-sm text-gray-300">
                        {heroCar.category === "suv" ? "SUV" : heroCar.category === "midrange" ? "Berline" : "Economique"}
                      </p>
                      <h2 className="text-2xl font-bold text-white md:text-3xl">
                        {heroCar.make} {heroCar.model}
                      </h2>
                    </div>
                    <div className="text-right">
                      <motion.div
                        className="text-3xl font-bold text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1.2 }}
                      >
                        {heroCar.dailyRate}{" "}
                        <span className="text-base font-normal text-gray-300">DH/jour</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

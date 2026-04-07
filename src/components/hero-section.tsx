"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, animate } from "framer-motion";
import type { Vehicle } from "@/db/schema";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const c = animate(0, target, { duration: 2, ease: [0.32, 0.72, 0, 1], onUpdate: (v) => setCount(Math.round(v)) });
    return () => c.stop();
  }, [target]);
  return <>{count}{suffix}</>;
}

export function HeroSection({ cars }: { cars: Vehicle[] }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-10 md:pt-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-6 md:grid-cols-2">
          {/* Left — Big headline */}
          <div className="relative z-10">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-7xl lg:text-[80px]"
              >
                Location
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-extrabold tracking-tight leading-[1.05] text-[#0f172a] md:text-7xl lg:text-[80px]"
              >
                de voitures
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
            </motion.div>
          </div>

          {/* Right — Big car PNG */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative -mr-6 md:-mr-20"
          >
            <img
              src="/hero/porsche.png"
              alt="Voiture premium"
              className="w-full max-w-[700px] object-contain ml-auto"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

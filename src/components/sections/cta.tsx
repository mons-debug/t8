"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

export function CTA() {
  return (
    <section className="bg-white px-5 py-20 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
        >
          {/* Double-Bezel dark card */}
          <div className="rounded-[2.25rem] bg-[#0a0a0f] p-2">
            <div className="relative overflow-hidden rounded-[calc(2.25rem-0.5rem)] px-8 py-20 text-center md:px-20 md:py-28">
              {/* Glow orbs */}
              <div className="absolute top-[-20%] right-[-10%] h-80 w-80 rounded-full bg-[#e53935]/[0.08] blur-[120px]" />
              <div className="absolute bottom-[-20%] left-[-10%] h-64 w-64 rounded-full bg-[#e53935]/[0.05] blur-[100px]" />

              <div className="relative">
                <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.02em] text-white">
                  Prêt à rouler ?
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.7] text-[#64748b]">
                  Réservez en ligne, par WhatsApp ou téléphone. Confirmation en minutes, paiement sur place.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/cars">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="group flex items-center gap-2 rounded-full bg-white py-3.5 pl-7 pr-4 text-[13px] font-semibold text-[#0a0a0f] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
                    >
                      Réserver maintenant
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0f] text-white transition-all duration-500 group-hover:bg-[#e53935] group-hover:translate-x-0.5">
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                    </motion.div>
                  </Link>
                  <a href="tel:+212660027233">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="rounded-full border border-white/[0.1] px-7 py-3.5 text-[13px] font-semibold text-white/70 transition-all duration-500 hover:border-white/[0.2] hover:text-white"
                    >
                      +212 660 027 233
                    </motion.div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

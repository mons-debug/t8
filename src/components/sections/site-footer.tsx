"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0f] px-5 py-16 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#0a0a0f] dark:text-white">T8 <span className="text-[#e53935]">Auto</span></span>
            <p className="mt-3 max-w-[24ch] text-[13px] leading-[1.7] text-[#94a3b8]">
              Location de voitures fiable à Tanger depuis plus de 5 ans.
            </p>
          </div>
          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4c4c4] dark:text-[#64748b]">Navigation</div>
            <div className="space-y-2.5">
              {[
                { href: "/cars", label: "Voitures" },
                { href: "/about", label: "Qui sommes-nous" },
                { href: "/contact", label: "Contact" },
                { href: "/terms", label: "Conditions" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-[13px] text-[#64748b] dark:text-[#94a3b8] transition-colors duration-300 hover:text-[#0a0a0f] dark:hover:text-white dark:text-white">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4c4c4] dark:text-[#64748b]">Livraison</div>
            <div className="space-y-2.5 text-[13px] text-[#64748b] dark:text-[#94a3b8]">
              <p>Aéroport Ibn Battouta</p>
              <p>Gare TGV Tanger</p>
              <p>Port Tanger Med</p>
              <p>Centre-ville Tanger</p>
            </div>
          </div>
          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4c4c4] dark:text-[#64748b]">Contact</div>
            <div className="space-y-2.5 text-[13px] text-[#64748b] dark:text-[#94a3b8]">
              <p>+212 660 027 233</p>
              <p>+212 672 400 030</p>
              <p>contact@t8-auto.com</p>
            </div>
            <a href="https://wa.me/212660027233" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="rounded-full bg-[#25d366] px-5 py-2 text-[11px] font-semibold text-white transition-colors duration-300 hover:bg-[#20bd5a]"
              >
                WhatsApp
              </motion.div>
            </a>
          </div>
        </div>
        <div className="mt-14 border-t border-black/[0.04] dark:border-white/[0.06] pt-6 text-center text-[11px] text-[#cbd5e1] dark:text-[#475569]">
          {new Date().getFullYear()} T8 Auto. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

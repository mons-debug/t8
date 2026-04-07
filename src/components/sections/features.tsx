"use client";

import { Shield, Clock, Banknote, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

const ITEMS = [
  { icon: Shield, title: "Assurance incluse", body: "Roulez l'esprit tranquille. Tous nos véhicules sont assurés tous risques." },
  { icon: Banknote, title: "Prix transparents", body: "Tarifs jour, semaine, mois affichés. Aucun frais caché, jamais." },
  { icon: MapPinned, title: "Livraison flexible", body: "Aéroport, gare TGV, port ou votre hôtel. On s'adapte à vous." },
  { icon: Clock, title: "Dispo 7j/7", body: "Réservation WhatsApp, téléphone ou en ligne. Réponse en minutes." },
];

export function Features() {
  return (
    <section className="bg-[#faf6f1] px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-[#e53935]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e53935]">Avantages</span>
            </div>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.02em] text-[#0a0a0f]">
              Pourquoi<br /> T8 Auto.
            </h2>
            <p className="mt-6 max-w-[30ch] text-[15px] leading-[1.7] text-[#64748b]">
              Un service pensé pour vous, du premier clic à la remise des clés. Tout est simple.
            </p>
          </motion.div>

          {/* Right — 2x2 feature grid */}
          <div className="grid grid-cols-2 gap-3">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.09, ease }}
                whileHover={{ y: -6 }}
                className="rounded-[1.5rem] bg-white p-6 ring-1 ring-black/[0.03] transition-shadow duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[0.875rem] bg-[#faf6f1] ring-1 ring-black/[0.03]">
                  <item.icon className="h-5 w-5 text-[#0a0a0f]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-[14px] font-bold text-[#0a0a0f]">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.6] text-[#94a3b8]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

const DATA = [
  { name: "Ahmed B.", city: "Casablanca", stars: 5, text: "Service excellent, voiture propre et bien entretenue. Livraison à l'aéroport sans problème." },
  { name: "Sophie M.", city: "Paris", stars: 5, text: "Très professionnel. La Dacia Duster était parfaite pour notre road trip au Maroc." },
  { name: "Karim T.", city: "Tanger", stars: 5, text: "Je loue toujours chez T8 Auto. Confiance totale, véhicules fiables, prix corrects." },
  { name: "Maria L.", city: "Madrid", stars: 4, text: "Bon rapport qualité-prix. Livraison rapide au port Tanger Med. Je recommande." },
  { name: "Youssef A.", city: "Rabat", stars: 5, text: "Le meilleur service de location à Tanger. Simple, rapide, efficace." },
  { name: "Claire D.", city: "Lyon", stars: 5, text: "Réservation WhatsApp ultra simple, voiture prête à la gare TGV. Top." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < n ? "fill-amber-400 text-amber-400" : "fill-[#e5e5e5] text-[#e5e5e5]"}`} />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-white px-5 py-28 md:px-12 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-[#e53935]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e53935]">Témoignages</span>
            <div className="h-px w-6 bg-[#e53935]" />
          </div>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.02em] text-[#0a0a0f]">
            Ils nous font confiance.
          </h2>
        </motion.div>

        <div className="mt-14 -mx-5 px-5">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {DATA.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease }}
                className="min-w-[290px] snap-start md:min-w-0"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="h-full rounded-[1.5rem] bg-white p-6 ring-1 ring-black/[0.04] transition-shadow duration-700 hover:shadow-[0_16px_50px_rgba(0,0,0,0.06)]"
                >
                  <Stars n={r.stars} />
                  <p className="mt-4 text-[13px] leading-[1.7] text-[#475569]">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-black/[0.04] pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffebee] text-[12px] font-bold text-[#e53935]">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#0a0a0f]">{r.name}</div>
                      <div className="text-[11px] text-[#94a3b8]">{r.city}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

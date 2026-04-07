"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";

const REVIEWS = [
  { name: "Ahmed B.", rating: 5, text: "Service excellent, voiture propre et bien entretenue. Livraison à l'aéroport sans problème.", city: "Casablanca" },
  { name: "Sophie M.", rating: 5, text: "Très professionnel. La Dacia Duster était parfaite pour notre road trip. Prix imbattable.", city: "Paris" },
  { name: "Karim T.", rating: 5, text: "Je loue toujours chez T8 Auto. Confiance totale, véhicules fiables.", city: "Tanger" },
  { name: "Maria L.", rating: 4, text: "Bon rapport qualité-prix. Livraison rapide au port Tanger Med.", city: "Madrid" },
  { name: "Youssef A.", rating: 5, text: "Le meilleur service de location à Tanger. Je recommande vivement.", city: "Rabat" },
  { name: "Claire D.", rating: 5, text: "Réservation simple via WhatsApp, voiture prête à la gare TGV. Parfait.", city: "Lyon" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-white px-6 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Témoignages
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
              Ce que disent nos clients
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-gray-500">
              Plus de 500 clients satisfaits nous font confiance pour leurs déplacements à Tanger.
            </p>
          </div>
        </FadeUp>

        {/* Scrollable reviews */}
        <div className="mt-12 -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="min-w-[280px] snap-start md:min-w-0"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <Stars count={review.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffebee] text-sm font-bold text-[#e53935]">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a]">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.city}</p>
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

"use client";

import { motion } from "framer-motion";

const BRANDS = [
  { name: "Dacia", logo: "/brands/dacia.png" },
  { name: "Renault", logo: "/brands/renault.png" },
  { name: "Hyundai", logo: "/brands/hyundai.png" },
  { name: "Kia", logo: "/brands/kia.png" },
  { name: "Citroen", logo: "/brands/citroen.png" },
];

export function Brands() {
  const row = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden border-y border-black/[0.04] bg-white py-10">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          className="flex items-center gap-28"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
        >
          {row.map((b, i) => (
            <img
              key={`${b.name}-${i}`}
              src={b.logo}
              alt={b.name}
              className="h-12 w-auto flex-shrink-0 object-contain opacity-40 grayscale transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-80 hover:grayscale-0 md:h-16"
              draggable={false}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

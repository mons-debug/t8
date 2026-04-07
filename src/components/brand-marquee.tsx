"use client";

import { motion } from "framer-motion";

const BRANDS = [
  { name: "Dacia", svg: `<path d="M20 8h-4l-4 8-4-8H4l6 12h4l6-12z" fill="currentColor"/>` },
  { name: "Renault", svg: `<path d="M12 2L3 12l9 10 9-10L12 2zm0 3.5L17.5 12 12 18.5 6.5 12 12 5.5z" fill="currentColor"/>` },
  { name: "Hyundai", svg: `<path d="M12 4C8.5 4 5.4 5.8 3.5 8.5c2.2-1.5 5-2.5 8.5-2.5s6.3 1 8.5 2.5C18.6 5.8 15.5 4 12 4zm0 16c3.5 0 6.6-1.8 8.5-4.5-2.2 1.5-5 2.5-8.5 2.5s-6.3-1-8.5-2.5C5.4 18.2 8.5 20 12 20z" fill="currentColor"/><ellipse cx="12" cy="12" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/>` },
  { name: "Kia", svg: `<text x="12" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" font-family="sans-serif">KIA</text>` },
  { name: "Citroen", svg: `<path d="M12 4l-2 4 2 4-2 4 2 4m2-16l-2 4 2 4-2 4 2 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>` },
];

// Text-based logos for clean rendering
const BRAND_LOGOS = [
  "DACIA",
  "RENAULT",
  "HYUNDAI",
  "KIA",
  "CITROEN",
];

export function BrandMarquee() {
  // Double the array for seamless loop
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section className="overflow-hidden border-y bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-gray-400">
          Nos partenaires et marques
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex items-center gap-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {logos.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="flex-shrink-0 text-3xl font-extrabold tracking-wider text-gray-300 transition-colors hover:text-gray-500 select-none md:text-4xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const BRANDS = [
  { name: "Dacia", logo: "/brands/dacia.png" },
  { name: "Renault", logo: "/brands/renault.png" },
  { name: "Hyundai", logo: "/brands/hyundai.png" },
  { name: "Kia", logo: "/brands/kia.png" },
  { name: "Citroen", logo: "/brands/citroen.png" },
];

export function BrandMarquee() {
  // Triple for seamless infinite loop
  const logos = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden border-y bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-gray-400">
          Nos partenaires et marques
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex items-center gap-24 md:gap-32"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {logos.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-20"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

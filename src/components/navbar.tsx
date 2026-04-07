"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/cars", label: "Voitures" },
  { href: "/about", label: "Qui sommes-nous" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : isHome
              ? "bg-transparent"
              : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold">
            <span className={scrolled || !isHome ? "text-[#0f172a]" : "text-[#0f172a]"}>T8 </span>
            <span className="text-[#e53935]">Auto</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#e53935]"
                    : scrolled || !isHome
                      ? "text-gray-600 hover:text-[#0f172a]"
                      : "text-gray-600 hover:text-[#0f172a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/212660027233"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <Button size="sm" className="rounded-full bg-[#0f172a] text-xs hover:bg-[#1e293b]">
                WhatsApp
              </Button>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="rounded-lg p-2 hover:bg-black/5 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="text-xl font-extrabold">
                T8 <span className="text-[#e53935]">Auto</span>
              </Link>
              <button className="rounded-lg p-2" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 pt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-4 text-2xl font-bold transition-colors ${
                      pathname === link.href ? "text-[#e53935]" : "text-[#0f172a]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/212660027233"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full rounded-full bg-[#25d366] text-base hover:bg-[#20bd5a]" size="lg">
                    WhatsApp
                  </Button>
                </a>
                <a href="tel:+212660027233" className="mt-3 block text-center text-sm text-gray-500">
                  +212 660 027 233
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

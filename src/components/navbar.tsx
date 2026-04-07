"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/cars", label: "Voitures" },
  { href: "/about", label: "Qui sommes-nous" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const isHome = pathname === "/";

  useEffect(() => {
    const saved = localStorage.getItem("t8-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("t8-theme", next ? "dark" : "light");
  }

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.06]"
            : isHome
              ? "bg-transparent"
              : "bg-white dark:bg-[#0a0a0f] border-b border-black/[0.04] dark:border-white/[0.06]"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-12">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            <span className="text-[#0a0a0f] dark:text-white">T8 </span>
            <span className="text-[#e53935]">Auto</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "text-[#e53935]"
                    : "text-[#64748b] hover:text-[#0a0a0f] dark:text-[#94a3b8] dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-[#64748b] transition-colors hover:bg-black/5 dark:text-[#94a3b8] dark:hover:bg-white/5"
            >
              {dark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
            </button>

            <a href="https://wa.me/212660027233" target="_blank" rel="noopener noreferrer" className="ml-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="rounded-full bg-[#0a0a0f] dark:bg-white px-5 py-2 text-[12px] font-semibold text-white dark:text-[#0a0a0f] transition-colors"
              >
                WhatsApp
              </motion.div>
            </a>
          </nav>

          {/* Mobile — dark toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#64748b] dark:text-[#94a3b8]"
            >
              {dark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => setOpen(!open)}
            >
              <Menu className="h-5 w-5 text-[#0a0a0f] dark:text-white" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE FULLSCREEN MENU ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />

            {/* Content */}
            <div className="relative flex h-full flex-col">
              {/* Close button */}
              <div className="flex justify-end px-5 py-4">
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, ease }}
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                >
                  <X className="h-5 w-5 text-white" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Nav links — centered */}
              <nav className="flex flex-1 flex-col items-center justify-center gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block py-3 text-center text-[clamp(2rem,8vw,3.5rem)] font-extrabold tracking-tight transition-colors duration-300 ${
                        pathname === link.href
                          ? "text-[#e53935]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease }}
                className="px-8 pb-12 text-center"
              >
                <a
                  href="https://wa.me/212660027233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <div className="rounded-full bg-[#25d366] px-10 py-3.5 text-[14px] font-semibold text-white">
                    WhatsApp
                  </div>
                </a>
                <a href="tel:+212660027233" className="mt-4 block text-[14px] text-white/40">
                  +212 660 027 233
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

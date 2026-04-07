"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/cars", label: "Voitures" },
  { href: "/about", label: "Qui sommes-nous" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-[#e53935]">
          T8 Auto
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 ${
                pathname === link.href
                  ? "text-[#e53935]"
                  : "text-gray-600"
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
            <Button size="sm" className="bg-[#25d366] hover:bg-[#20bd5a]">
              WhatsApp
            </Button>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t bg-white px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname === link.href
                  ? "text-[#e53935]"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/212660027233"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block"
          >
            <Button className="w-full bg-[#25d366] hover:bg-[#20bd5a]">
              WhatsApp
            </Button>
          </a>
        </nav>
      )}
    </header>
  );
}

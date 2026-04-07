import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T8 Auto — Location de voitures à Tanger",
  description:
    "Votre solution fiable pour la location de voitures à Tanger. Livraison aéroport, gare TGV, port. Réservez en ligne.",
  keywords: ["location voiture", "tanger", "rent car", "morocco", "t8 auto"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("h-full antialiased", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Navbar />
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}

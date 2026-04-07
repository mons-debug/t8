import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Shield, Car, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Qui sommes-nous — T8 Auto | Location de voitures à Tanger",
  description: "T8 Auto, votre partenaire fiable pour la location de voitures à Tanger depuis des années. Service aéroport, gare TGV, port Tanger Med.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="bg-t8-cream px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Qui sommes-nous
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            T8 Auto est votre solution fiable pour la location de voitures à Tanger.
            Nous offrons un service de qualité avec une flotte diversifiée pour répondre
            à tous vos besoins de déplacement.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Car, title: "Flotte Diversifiée", desc: "Du SUV à l'économique, nous avons la voiture qu'il vous faut." },
              { icon: Shield, title: "Fiabilité", desc: "Véhicules entretenus régulièrement pour votre sécurité." },
              { icon: Users, title: "Service Client", desc: "Disponibles 7j/7 par téléphone et WhatsApp." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-white p-6">
                <item.icon className="h-8 w-8 text-[#e53935]" />
                <h3 className="mt-3 font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4 text-muted-foreground">
            <h2 className="text-xl font-bold text-foreground">Nos Services</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { icon: MapPin, text: "Livraison Aéroport Ibn Battouta" },
                { icon: MapPin, text: "Service Gare TGV Tanger" },
                { icon: MapPin, text: "Transfert Port Tanger Med" },
                { icon: Clock, text: "Service disponible 08h - 20h" },
                { icon: Phone, text: "Réservation WhatsApp 24/7" },
                { icon: Mail, text: "Réponse email sous 24h" },
              ].map((s) => (
                <div key={s.text} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <s.icon className="h-5 w-5 text-[#e53935]" />
                  <span className="text-sm">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/cars">
              <Button size="lg">Voir nos voitures</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

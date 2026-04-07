import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact — T8 Auto | Location de voitures à Tanger",
  description: "Contactez T8 Auto pour réserver une voiture à Tanger. Téléphone, WhatsApp, email. Boulevard Hanane Idrissi, Tanger.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="bg-t8-cream px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Contact
          </h1>
          <p className="mt-2 text-muted-foreground">
            N'hésitez pas à nous contacter pour toute question ou réservation.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ffebee] p-2.5">
                  <Phone className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <a href="tel:+212660027233" className="font-semibold hover:text-[#e53935]">
                    +212 660 027 233
                  </a>
                  <br />
                  <a href="tel:+212672400030" className="text-sm hover:text-[#e53935]">
                    +212 672 400 030
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ffebee] p-2.5">
                  <Mail className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:contact@t8-auto.com" className="font-semibold hover:text-[#e53935]">
                    contact@t8-auto.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ffebee] p-2.5">
                  <MapPin className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="font-semibold">Boulevard Hanane Idrissi</p>
                  <p className="text-sm text-muted-foreground">Tanger 90000, Maroc</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ffebee] p-2.5">
                  <Clock className="h-5 w-5 text-[#e53935]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horaires</p>
                  <p className="font-semibold">08:00 — 20:00</p>
                  <p className="text-sm text-muted-foreground">7 jours / 7</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA + Map */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-white p-6 text-center">
              <h3 className="text-lg font-bold">Réservation rapide</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Le moyen le plus rapide de nous contacter
              </p>
              <a
                href="https://wa.me/212660027233?text=Bonjour%2C%20je%20souhaite%20louer%20une%20voiture%20%C3%A0%20Tanger"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-4 w-full bg-[#25d366] hover:bg-[#20bd5a]" size="lg">
                  WhatsApp
                </Button>
              </a>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.8!2d-5.8128!3d35.7595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzM0LjIiTiA1wrA0OCc0Ni4xIlc!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="T8 Auto — Tanger"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-t8-cream px-4 py-20 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Location de voitures
            <span className="block text-t8-red">à Tanger</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Votre solution fiable pour la location de voitures. Livraison
            aéroport, gare TGV, port Tanger Med.
          </p>

          {/* Search Form Placeholder */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-card p-6 shadow-lg">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-left">
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Date de prise en charge
                </label>
                <div className="rounded-lg border border-input bg-background px-4 py-3 text-sm">
                  Sélectionner...
                </div>
              </div>
              <div className="text-left">
                <label className="mb-1 block text-sm font-medium text-muted-foreground">
                  Date de retour
                </label>
                <div className="rounded-lg border border-input bg-background px-4 py-3 text-sm">
                  Sélectionner...
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full" size="lg">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Badges */}
      <section className="border-b bg-card px-4 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: "✈️", label: "Aéroport", desc: "Livraison & récupération" },
            { icon: "🚄", label: "Gare TGV", desc: "Service gare Tanger" },
            { icon: "⚓", label: "Port", desc: "Tanger Med" },
            { icon: "💬", label: "WhatsApp", desc: "Réservation 24/7" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl">{s.icon}</div>
              <div className="mt-2 font-semibold">{s.label}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="bg-t8-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Nos voitures en vedette
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Dacia Duster", cat: "SUV", price: 500, trans: "Auto" },
              { name: "Hyundai Accent", cat: "Berline", price: 400, trans: "Auto" },
              { name: "Renault Clio 5", cat: "Économique", price: 350, trans: "Manuel" },
            ].map((car) => (
              <div
                key={car.name}
                className="overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] bg-muted" />
                <div className="p-5">
                  <div className="text-sm text-muted-foreground">{car.cat}</div>
                  <h3 className="text-lg font-bold">{car.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="rounded-md bg-t8-red-light px-2 py-0.5 text-xs font-medium text-t8-red">
                      {car.trans}
                    </span>
                    <span className="rounded-md bg-t8-red-light px-2 py-0.5 text-xs font-medium text-t8-red">
                      Diesel
                    </span>
                    <span className="rounded-md bg-t8-red-light px-2 py-0.5 text-xs font-medium text-t8-red">
                      A/C
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-t8-red">
                      {car.price} DH
                      <span className="text-sm font-normal text-muted-foreground">
                        /jour
                      </span>
                    </div>
                    <Button size="sm">Réserver</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-t8-red px-4 py-10 text-center text-white">
        <h2 className="text-xl font-bold md:text-2xl">
          Besoin d&apos;une voiture ? Appelez-nous
        </h2>
        <p className="mt-2 text-lg opacity-90">
          +212 660 027 233 · +212 672 400 030
        </p>
        <Button variant="secondary" size="lg" className="mt-4">
          WhatsApp
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-4 py-10 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-bold text-white">T8 Auto</div>
          <div>Boulevard Hanane Idrissi, Tanger 90000</div>
          <div>contact@t8-auto.com</div>
        </div>
      </footer>
    </main>
  );
}

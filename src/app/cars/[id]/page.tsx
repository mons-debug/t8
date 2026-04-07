import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  Snowflake,
  Calendar,
  CheckCircle,
  Phone,
} from "lucide-react";
import { BookingForm } from "@/components/booking-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [car] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, parseInt(id)));

  if (!car) return { title: "Voiture non trouvée" };

  return {
    title: `${car.make} ${car.model} ${car.year} — ${car.dailyRate} DH/jour | T8 Auto`,
    description: `Louez la ${car.make} ${car.model} ${car.year} à Tanger. ${car.transmission === "auto" ? "Automatique" : "Manuelle"}, ${car.fuel}, climatisation. À partir de ${car.dailyRate} DH/jour.`,
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [car] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, parseInt(id)));

  if (!car || car.status === "maintenance") notFound();

  const images = (car.images as string[]) || [];
  const features = (car.features as string[]) || [];

  const whatsappMsg = encodeURIComponent(
    `Bonjour, je suis intéressé par la ${car.make} ${car.model} ${car.year} (${car.dailyRate} DH/jour). Est-elle disponible ?`
  );

  return (
    <main className="flex-1">
      {/* Back */}
      <div className="bg-t8-cream px-4 pt-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/cars"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les voitures
          </Link>
        </div>
      </div>

      <section className="bg-t8-cream px-4 pb-10 pt-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Gallery — 3 cols */}
            <div className="lg:col-span-3">
              {/* Main image */}
              {car.coverImage ? (
                <img
                  src={car.coverImage}
                  alt={`${car.make} ${car.model}`}
                  className="w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gray-100">
                  <Car className="h-24 w-24 text-gray-300" />
                </div>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {images.map((url, i) => (
                    <img
                      key={url}
                      src={url}
                      alt={`Photo ${i + 1}`}
                      className={`h-16 w-24 flex-shrink-0 rounded-lg object-cover ${
                        url === car.coverImage
                          ? "ring-2 ring-[#e53935]"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info — 2 cols */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-extrabold">
                  {car.make} {car.model}
                </h1>
                <p className="text-muted-foreground">
                  {car.year} — {car.color}
                </p>

                {/* Price */}
                <div className="mt-5 rounded-xl bg-[#ffebee] p-4">
                  <div className="text-3xl font-extrabold text-[#e53935]">
                    {car.dailyRate} DH
                    <span className="text-base font-normal text-[#c62828]">
                      /jour
                    </span>
                  </div>
                  <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                    {car.weeklyRate && <span>{car.weeklyRate} DH/semaine</span>}
                    {car.monthlyRate && <span>{car.monthlyRate} DH/mois</span>}
                  </div>
                </div>

                {/* Specs */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                    <Gauge className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Transmission
                      </p>
                      <p className="text-sm font-medium">
                        {car.transmission === "auto"
                          ? "Automatique"
                          : "Manuelle"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Carburant</p>
                      <p className="text-sm font-medium">
                        {car.fuel === "diesel" ? "Diesel" : "Essence"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                    <Snowflake className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Climatisation
                      </p>
                      <p className="text-sm font-medium">
                        {car.hasAC ? "Oui" : "Non"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Catégorie</p>
                      <p className="text-sm font-medium">
                        {car.category === "economy"
                          ? "Economique"
                          : car.category === "midrange"
                            ? "Berline"
                            : "SUV"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                {features.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-2 text-sm font-medium">Équipements</p>
                    <div className="flex flex-wrap gap-2">
                      {features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                        >
                          <CheckCircle className="h-3 w-3" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-6 space-y-2">
                  <a
                    href={`https://wa.me/212660027233?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#25d366] hover:bg-[#20bd5a]" size="lg">
                      Réserver via WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+212660027233" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler maintenant
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="mx-auto mt-8 max-w-2xl">
            <BookingForm
              vehicleId={car.id}
              carName={`${car.make} ${car.model} ${car.year}`}
              dailyRate={car.dailyRate}
              weeklyRate={car.weeklyRate}
              monthlyRate={car.monthlyRate}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, useTransition, useMemo } from "react";
import { createBooking } from "@/actions/bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, CheckCircle, Loader2, AlertCircle } from "lucide-react";

type BookingFormProps = {
  vehicleId: number;
  carName: string;
  dailyRate: number;
  weeklyRate: number | null;
  monthlyRate: number | null;
};

const LOCATIONS = [
  { id: "airport", label: "Aéroport Ibn Battouta" },
  { id: "tgv", label: "Gare TGV Tanger" },
  { id: "port", label: "Port Tanger Med" },
  { id: "office", label: "Bureau T8 — Bd Hanane Idrissi" },
];

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
];

function calcPrice(dailyRate: number, weeklyRate: number | null, monthlyRate: number | null, days: number) {
  if (days <= 0) return 0;
  if (days >= 30 && monthlyRate) {
    const months = Math.floor(days / 30);
    const remaining = days % 30;
    return months * monthlyRate + remaining * dailyRate;
  }
  if (days >= 7 && weeklyRate) {
    const weeks = Math.floor(days / 7);
    const remaining = days % 7;
    return weeks * weeklyRate + remaining * dailyRate;
  }
  return days * dailyRate;
}

export function BookingForm({
  vehicleId,
  carName,
  dailyRate,
  weeklyRate,
  monthlyRate,
}: BookingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [dropoffTime, setDropoffTime] = useState("09:00");
  const [pickupLocation, setPickupLocation] = useState("airport");
  const [dropoffLocation, setDropoffLocation] = useState("airport");

  const today = new Date().toISOString().split("T")[0];

  const { days, total } = useMemo(() => {
    if (!pickupDate || !dropoffDate) return { days: 0, total: 0 };
    const d = Math.max(1, Math.ceil(
      (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) / 86400000
    ));
    return { days: d, total: calcPrice(dailyRate, weeklyRate, monthlyRate, d) };
  }, [pickupDate, dropoffDate, dailyRate, weeklyRate, monthlyRate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    startTransition(async () => {
      const res = await createBooking({
        vehicleId,
        customerName: name,
        customerPhone: phone,
        customerEmail: email || undefined,
        pickupDate,
        dropoffDate,
        pickupTime,
        dropoffTime,
        pickupLocation,
        dropoffLocation,
        source: "website",
      });

      if ("error" in res) {
        setResult({ error: res.error });
      } else {
        setResult({ success: true });
      }
    });
  }

  if (result?.success) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="mt-3 text-lg font-bold">Demande envoyée</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Votre demande de réservation pour la {carName} a été envoyée.
          Nous vous contacterons sous peu pour confirmer.
        </p>
        <p className="mt-3 text-sm">
          <strong>{days} jours</strong> — <strong className="text-[#e53935]">{total.toLocaleString()} DH</strong>
        </p>
        <a
          href={`https://wa.me/212660027233?text=${encodeURIComponent(
            `Bonjour, je viens de faire une réservation en ligne pour la ${carName} du ${pickupDate} au ${dropoffDate}. Merci de confirmer.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-4 bg-[#25d366] hover:bg-[#20bd5a]">
            Confirmer via WhatsApp
          </Button>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
        <Calendar className="h-5 w-5 text-[#e53935]" />
        Réserver cette voiture
      </h3>

      {result?.error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {result.error}
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="pickupDate">Date de prise en charge</Label>
          <Input
            id="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e) => {
              setPickupDate(e.target.value);
              if (dropoffDate && e.target.value >= dropoffDate) setDropoffDate("");
            }}
            min={today}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dropoffDate">Date de retour</Label>
          <Input
            id="dropoffDate"
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            min={pickupDate || today}
            required
          />
        </div>
      </div>

      {/* Times */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Heure prise en charge</Label>
          <Select value={pickupTime} onValueChange={setPickupTime}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Heure retour</Label>
          <Select value={dropoffTime} onValueChange={setDropoffTime}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Locations */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Lieu prise en charge</Label>
          <Select value={pickupLocation} onValueChange={setPickupLocation}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((l) => (
                <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Lieu retour</Label>
          <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((l) => (
                <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price preview */}
      {days > 0 && (
        <div className="mt-4 rounded-lg bg-[#ffebee] p-3 text-center">
          <span className="text-sm text-muted-foreground">{days} jour{days > 1 && "s"} —</span>{" "}
          <span className="text-xl font-bold text-[#e53935]">{total.toLocaleString()} DH</span>
          {days >= 7 && weeklyRate && (
            <span className="ml-1 text-xs text-green-600">(tarif semaine appliqué)</span>
          )}
          {days >= 30 && monthlyRate && (
            <span className="ml-1 text-xs text-green-600">(tarif mois appliqué)</span>
          )}
        </div>
      )}

      {/* Customer info */}
      <div className="mt-4 space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+212 6..."
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email (optionnel)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-5 w-full"
        size="lg"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer la demande"
        )}
      </Button>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Réservation soumise à confirmation. Paiement sur place.
      </p>
    </form>
  );
}

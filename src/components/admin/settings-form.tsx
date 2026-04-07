"use client";

import { useState, useTransition } from "react";
import { updateSetting } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

type SettingsFormProps = {
  settings: Record<string, any>;
};

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const biz = (settings.business_info ?? {}) as Record<string, string>;
  const pricing = (settings.pricing_rules ?? {}) as Record<string, number>;
  const hours = (settings.working_hours ?? {}) as Record<string, string | number>;

  const [name, setName] = useState(biz.name ?? "");
  const [tagline, setTagline] = useState(biz.tagline ?? "");
  const [phone1, setPhone1] = useState(biz.phone1 ?? "");
  const [phone2, setPhone2] = useState(biz.phone2 ?? "");
  const [email, setEmail] = useState(biz.email ?? "");
  const [address, setAddress] = useState(biz.address ?? "");
  const [instagram, setInstagram] = useState(biz.instagram ?? "");
  const [whatsapp, setWhatsapp] = useState(biz.whatsapp ?? "");
  const [weeklyDiscount, setWeeklyDiscount] = useState(
    pricing.weeklyDiscountPercent?.toString() ?? "15"
  );
  const [monthlyDiscount, setMonthlyDiscount] = useState(
    pricing.monthlyDiscountPercent?.toString() ?? "25"
  );
  const [openTime, setOpenTime] = useState((hours.open as string) ?? "08:00");
  const [closeTime, setCloseTime] = useState((hours.close as string) ?? "20:00");

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      await updateSetting("business_info", {
        name, tagline, phone1, phone2, email, address, instagram, whatsapp,
      });
      await updateSetting("pricing_rules", {
        weeklyDiscountPercent: parseInt(weeklyDiscount),
        monthlyDiscountPercent: parseInt(monthlyDiscount),
      });
      await updateSetting("working_hours", {
        open: openTime,
        close: closeTime,
        timeSlotMinutes: 30,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* Business Info */}
      <section className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Informations</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Nom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Slogan</Label>
              <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Téléphone 1</Label>
              <Input value={phone1} onChange={(e) => setPhone1(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Téléphone 2</Label>
              <Input value={phone2} onChange={(e) => setPhone2(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Adresse</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Instagram</Label>
              <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>WhatsApp</Label>
              <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Rules */}
      <section className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Tarification</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Réduction semaine (%)</Label>
            <Input
              type="number"
              value={weeklyDiscount}
              onChange={(e) => setWeeklyDiscount(e.target.value)}
              min="0"
              max="50"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Réduction mois (%)</Label>
            <Input
              type="number"
              value={monthlyDiscount}
              onChange={(e) => setMonthlyDiscount(e.target.value)}
              min="0"
              max="50"
            />
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Horaires</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Ouverture</Label>
            <Input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Fermeture</Label>
            <Input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isPending} size="lg">
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" /> Enregistré
          </span>
        )}
      </div>
    </div>
  );
}

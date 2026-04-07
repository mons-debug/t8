"use client";

import { useState, useTransition } from "react";
import { createVehicle, updateVehicle } from "@/actions/vehicles";
import type { Vehicle } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, Pencil, X } from "lucide-react";

type VehicleFormProps = {
  vehicle?: Vehicle;
  trigger?: React.ReactNode;
};

const CATEGORIES = [
  { value: "economy", label: "Economique" },
  { value: "midrange", label: "Milieu de gamme" },
  { value: "suv", label: "SUV" },
];

const TRANSMISSIONS = [
  { value: "manual", label: "Manuelle" },
  { value: "auto", label: "Automatique" },
];

const FUELS = [
  { value: "diesel", label: "Diesel" },
  { value: "essence", label: "Essence" },
];

const COMMON_FEATURES = [
  "GPS",
  "Bluetooth",
  "USB",
  "Caméra de recul",
  "Radar de recul",
  "Climatisation",
  "Vitres électriques",
  "Verrouillage central",
  "ABS",
  "Airbags",
];

export function VehicleForm({ vehicle, trigger }: VehicleFormProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEditing = !!vehicle;

  const [make, setMake] = useState(vehicle?.make ?? "");
  const [model, setModel] = useState(vehicle?.model ?? "");
  const [year, setYear] = useState(vehicle?.year?.toString() ?? new Date().getFullYear().toString());
  const [color, setColor] = useState(vehicle?.color ?? "");
  const [category, setCategory] = useState(vehicle?.category ?? "economy");
  const [transmission, setTransmission] = useState(vehicle?.transmission ?? "manual");
  const [fuel, setFuel] = useState(vehicle?.fuel ?? "diesel");
  const [hasAC, setHasAC] = useState(vehicle?.hasAC ?? true);
  const [dailyRate, setDailyRate] = useState(vehicle?.dailyRate?.toString() ?? "");
  const [weeklyRate, setWeeklyRate] = useState(vehicle?.weeklyRate?.toString() ?? "");
  const [monthlyRate, setMonthlyRate] = useState(vehicle?.monthlyRate?.toString() ?? "");
  const [features, setFeatures] = useState<string[]>(
    (vehicle?.features as string[]) ?? []
  );

  function resetForm() {
    if (!isEditing) {
      setMake("");
      setModel("");
      setYear(new Date().getFullYear().toString());
      setColor("");
      setCategory("economy");
      setTransmission("manual");
      setFuel("diesel");
      setHasAC(true);
      setDailyRate("");
      setWeeklyRate("");
      setMonthlyRate("");
      setFeatures([]);
    }
  }

  function toggleFeature(feat: string) {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      make,
      model,
      year: parseInt(year),
      color,
      category,
      transmission,
      fuel,
      hasAC,
      dailyRate: parseInt(dailyRate),
      weeklyRate: weeklyRate ? parseInt(weeklyRate) : undefined,
      monthlyRate: monthlyRate ? parseInt(monthlyRate) : undefined,
      features,
    };

    startTransition(async () => {
      if (isEditing) {
        await updateVehicle(vehicle.id, data);
      } else {
        await createVehicle(data);
      }
      setOpen(false);
      resetForm();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Ajouter une voiture
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier la voiture" : "Nouvelle voiture"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Make & Model */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="make">Marque</Label>
              <Input
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Dacia"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Duster"
                required
              />
            </div>
          </div>

          {/* Year & Color */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="year">Année</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="2015"
                max="2030"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="color">Couleur</Label>
              <Input
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Gris"
                required
              />
            </div>
          </div>

          {/* Category, Transmission, Fuel */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Transmission</Label>
              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRANSMISSIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Carburant</Label>
              <Select value={fuel} onValueChange={setFuel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FUELS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* AC Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-[#e53935]"
            />
            <span className="text-sm">Climatisation</span>
          </label>

          {/* Pricing */}
          <div>
            <Label className="mb-2 block text-sm font-medium">Tarifs (DH)</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Par jour</span>
                <Input
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  placeholder="350"
                  required
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Par semaine</span>
                <Input
                  type="number"
                  value={weeklyRate}
                  onChange={(e) => setWeeklyRate(e.target.value)}
                  placeholder="2000"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Par mois</span>
                <Input
                  type="number"
                  value={monthlyRate}
                  onChange={(e) => setMonthlyRate(e.target.value)}
                  placeholder="7000"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <Label className="mb-2 block text-sm font-medium">Équipements</Label>
            <div className="flex flex-wrap gap-2">
              {COMMON_FEATURES.map((feat) => (
                <button
                  key={feat}
                  type="button"
                  onClick={() => toggleFeature(feat)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    features.includes(feat)
                      ? "border-[#e53935] bg-[#ffebee] text-[#e53935]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {feat}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Enregistrement..."
                : isEditing
                  ? "Enregistrer"
                  : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Smaller edit button trigger
export function VehicleEditButton({ vehicle }: { vehicle: Vehicle }) {
  return (
    <VehicleForm
      vehicle={vehicle}
      trigger={
        <Button variant="ghost" size="icon-xs">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      }
    />
  );
}

"use client";

import { useTransition } from "react";
import { updateVehicleStatus } from "@/actions/vehicles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = [
  { value: "available", label: "Disponible", color: "text-green-600" },
  { value: "rented", label: "Loué", color: "text-blue-600" },
  { value: "maintenance", label: "Maintenance", color: "text-gray-500" },
] as const;

export function VehicleStatusToggle({
  vehicleId,
  currentStatus,
}: {
  vehicleId: number;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    startTransition(async () => {
      await updateVehicleStatus(
        vehicleId,
        value as "available" | "rented" | "maintenance"
      );
    });
  }

  return (
    <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        className={`h-7 w-[130px] text-xs font-semibold ${
          currentStatus === "available"
            ? "border-green-200 bg-green-50 text-green-700"
            : currentStatus === "rented"
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value} className={s.color}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

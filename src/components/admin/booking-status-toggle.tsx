"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/actions/bookings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = [
  { value: "pending", label: "En attente", bg: "border-yellow-200 bg-yellow-50 text-yellow-700" },
  { value: "confirmed", label: "Confirmé", bg: "border-green-200 bg-green-50 text-green-700" },
  { value: "active", label: "En cours", bg: "border-blue-200 bg-blue-50 text-blue-700" },
  { value: "completed", label: "Terminé", bg: "border-gray-200 bg-gray-50 text-gray-600" },
  { value: "cancelled", label: "Annulé", bg: "border-red-200 bg-red-50 text-red-700" },
] as const;

export function BookingStatusToggle({
  bookingId,
  currentStatus,
}: {
  bookingId: number;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const current = STATUSES.find((s) => s.value === currentStatus) ?? STATUSES[0];

  function handleChange(value: string) {
    startTransition(async () => {
      await updateBookingStatus(
        bookingId,
        value as "pending" | "confirmed" | "active" | "completed" | "cancelled"
      );
    });
  }

  return (
    <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className={`h-7 w-[120px] text-xs font-semibold ${current.bg}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

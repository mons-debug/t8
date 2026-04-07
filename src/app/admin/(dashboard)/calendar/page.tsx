import { CalendarView } from "@/components/admin/calendar-view";

export default function CalendarPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Calendrier</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visualisez les réservations et les dates bloquées
        </p>
      </div>
      <CalendarView />
    </div>
  );
}

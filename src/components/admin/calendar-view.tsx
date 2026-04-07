"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Loader2 } from "lucide-react";

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    type: string;
    status?: string;
    price?: number;
    reason?: string;
  };
};

export function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4 [&_.fc-toolbar-title]:text-lg [&_.fc-toolbar-title]:font-bold [&_.fc-button]:rounded-lg [&_.fc-button]:border-gray-200 [&_.fc-button]:bg-white [&_.fc-button]:px-3 [&_.fc-button]:py-1.5 [&_.fc-button]:text-sm [&_.fc-button]:font-medium [&_.fc-button]:text-gray-700 [&_.fc-button:hover]:bg-gray-50 [&_.fc-button-active]:bg-[#e53935] [&_.fc-button-active]:text-white [&_.fc-button-active:hover]:bg-[#c62828] [&_.fc-event]:cursor-pointer [&_.fc-event]:rounded-md [&_.fc-event]:px-2 [&_.fc-event]:py-0.5 [&_.fc-event]:text-xs [&_.fc-event]:font-medium [&_.fc-daygrid-day-number]:text-sm [&_.fc-daygrid-day-number]:font-medium [&_.fc-col-header-cell-cushion]:text-xs [&_.fc-col-header-cell-cushion]:font-semibold [&_.fc-col-header-cell-cushion]:uppercase [&_.fc-col-header-cell-cushion]:text-gray-500 [&_.fc-day-today]:bg-[#ffebee]/30">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale="fr"
        firstDay={1}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        buttonText={{
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
        }}
        height="auto"
        dayMaxEvents={3}
        eventDisplay="block"
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 border-t pt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#eab308]" />
          En attente
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#16a34a]" />
          Confirmé
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#2563eb]" />
          En cours
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#94a3b8]" />
          Bloqué
        </div>
      </div>
    </div>
  );
}

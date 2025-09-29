"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { EventDropArg } from "@fullcalendar/interaction";
import { useRouter } from "next/navigation";

export interface Schedule {
  id: string;
  routeName: string;
  type: string;
  scheduledDate: string;
  team: string;
  status: "Pending" | "Completed" | "Cancelled";
}

interface CalendarProps {
  schedules: Schedule[];
}

export default function Calendar({ schedules }: CalendarProps) {
  const router = useRouter();

  const [events, setEvents] = useState(
    schedules.map((sched) => ({
      id: sched.id,
      title: `${sched.routeName} (${sched.type})`,
      date: sched.scheduledDate,
      color:
        sched.status === "Completed"
          ? "#22c55e" // green
          : sched.status === "Pending"
          ? "#facc15" // yellow
          : "#ef4444", // red
    }))
  );

  useEffect(() => {
    setEvents(
      schedules.map((sched) => ({
        id: sched.id,
        title: `${sched.routeName} (${sched.type})`,
        date: sched.scheduledDate,
        color:
          sched.status === "Completed"
            ? "#22c55e"
            : sched.status === "Pending"
            ? "#facc15"
            : "#ef4444",
      }))
    );
  }, [schedules]);

  const handleEventClick = (clickInfo: any) => {
    router.push(`/dashboard/waste-collection/routes/${clickInfo.event.id}`);
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    const newDate = dropInfo.event.startStr;
    console.log(`Schedule ${dropInfo.event.id} moved to ${newDate}`);
    // TODO: Call your API here to persist the new schedule date
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
      />
    </div>
  );
}

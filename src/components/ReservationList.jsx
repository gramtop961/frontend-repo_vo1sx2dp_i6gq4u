import { Trash2, Phone, User, CalendarClock } from "lucide-react";
import { minutesToHHMM } from "./BookingForm";

export default function ReservationList({ reservations, onCancel, selectedDate }) {
  const dayReservations = reservations
    .filter((r) => r.date === selectedDate)
    .sort((a, b) => a.start - b.start);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Reservations</h2>
        <p className="text-xs text-slate-500">{dayReservations.length} for selected date</p>
      </div>

      {dayReservations.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          No reservations yet for this date.
        </div>
      ) : (
        <ul className="space-y-3">
          {dayReservations.map((r) => (
            <li
              key={r.id}
              className="flex items-start justify-between gap-4 border border-slate-200 rounded-xl p-3 hover:shadow-sm"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                <div className="sm:col-span-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Court</div>
                  <div className="font-medium">{r.courtId}</div>
                </div>
                <div className="sm:col-span-1 flex items-center gap-2 text-slate-700"><CalendarClock className="w-4 h-4"/> {minutesToHHMM(r.start)}–{minutesToHHMM(r.end)}</div>
                <div className="sm:col-span-1 flex items-center gap-2 text-slate-700"><User className="w-4 h-4"/> {r.name}</div>
                <div className="sm:col-span-1 flex items-center gap-2 text-slate-700"><Phone className="w-4 h-4"/> {r.phone}</div>
                {r.note && (
                  <div className="sm:col-span-4 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                    {r.note}
                  </div>
                )}
              </div>
              <button
                onClick={() => onCancel(r.id)}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-rose-600 text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <Trash2 className="w-4 h-4"/>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

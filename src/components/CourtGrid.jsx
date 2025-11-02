import { CheckCircle2, Circle } from "lucide-react";

const COURTS = [
  { id: "A1", surface: "Panoramic" },
  { id: "A2", surface: "Panoramic" },
  { id: "B1", surface: "Semi-panoramic" },
  { id: "B2", surface: "Semi-panoramic" },
  { id: "C1", surface: "Indoor" },
  { id: "C2", surface: "Indoor" },
];

export default function CourtGrid({ selectedCourt, setSelectedCourt, reservations, selectedDate }) {
  const isCourtBusyNow = (courtId) => {
    const now = new Date();
    const todayStr = new Date(selectedDate).toISOString().slice(0, 10);
    const currentStr = now.toISOString().slice(0, 10);
    if (todayStr !== currentStr) return false;

    const minutesNow = now.getHours() * 60 + now.getMinutes();
    return reservations.some((r) => r.courtId === courtId && minutesNow >= r.start && minutesNow < r.end);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Choose a court</h2>
        <span className="text-xs text-slate-500">Tap to select</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COURTS.map((court) => {
          const selected = selectedCourt === court.id;
          const busy = isCourtBusyNow(court.id);
          return (
            <button
              key={court.id}
              onClick={() => setSelectedCourt(court.id)}
              className={`group rounded-xl border p-3 text-left transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                selected ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{court.id}</span>
                {selected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <p className="text-xs text-slate-500">{court.surface}</p>
              {busy && (
                <p className="mt-2 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 inline-block">
                  Currently booked
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export { COURTS };

import { useMemo, useState } from "react";
import { Clock, User, Phone, CalendarDays } from "lucide-react";

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
}

function minutesToHHMM(mins) {
  const h = String(Math.floor(mins / 60)).padStart(2, "0");
  const m = String(mins % 60).padStart(2, "0");
  return `${h}:${m}`;
}

export default function BookingForm({
  selectedDate,
  setSelectedDate,
  selectedCourt,
  reservations,
  onCreate,
}) {
  const [time, setTime] = useState("18:00");
  const [duration, setDuration] = useState(90);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const sameDayReservations = useMemo(
    () => reservations.filter((r) => r.date === selectedDate && r.courtId === selectedCourt),
    [reservations, selectedDate, selectedCourt]
  );

  const opening = 7 * 60; // 07:00
  const closing = 23 * 60; // 23:00

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!selectedCourt) return setError("Please select a court first.");
    if (!name.trim()) return setError("Please enter your name.");
    if (!phone.trim()) return setError("Please enter a contact number.");

    const start = parseTimeToMinutes(time);
    const end = start + Number(duration);

    if (start < opening || end > closing) {
      return setError("Selected time is outside of opening hours (07:00–23:00).");
    }

    const conflict = sameDayReservations.some((r) => Math.max(r.start, start) < Math.min(r.end, end));
    if (conflict) {
      return setError("This time overlaps with an existing booking on this court.");
    }

    const payload = {
      id: crypto.randomUUID(),
      date: selectedDate,
      courtId: selectedCourt,
      name: name.trim(),
      phone: phone.trim(),
      start,
      end,
      note: note.trim(),
      createdAt: Date.now(),
    };
    onCreate(payload);

    // Reset only the necessary fields
    setNote("");
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Book your slot</h2>
        <p className="text-xs text-slate-500">All fields required</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium flex items-center gap-2"><CalendarDays className="w-4 h-4"/>Date</span>
          <input
            type="date"
            value={selectedDate}
            min={minDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4"/>Start</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Duration</span>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={60}>60 min</option>
              <option value={90}>90 min</option>
              <option value={120}>120 min</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium flex items-center gap-2"><User className="w-4 h-4"/>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium flex items-center gap-2"><Phone className="w-4 h-4"/>Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Contact number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        <label className="md:col-span-2 flex flex-col gap-1">
          <span className="text-sm font-medium">Note (optional)</span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for the staff (e.g., need extra balls)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>

        {error && (
          <div className="md:col-span-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div className="md:col-span-2 flex items-center justify-between pt-2">
          <p className="text-sm text-slate-600">
            Opening hours: 07:00–23:00. Your booking will end at {minutesToHHMM(parseTimeToMinutes(time) + Number(duration))}.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2 font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Reserve slot
          </button>
        </div>
      </form>
    </section>
  );
}

export { minutesToHHMM };

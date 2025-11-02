import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CourtGrid from "./components/CourtGrid";
import BookingForm from "./components/BookingForm";
import ReservationList from "./components/ReservationList";

export default function App() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [reservations, setReservations] = useState(() => {
    try {
      const raw = localStorage.getItem("padel-reservations");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("padel-reservations", JSON.stringify(reservations));
  }, [reservations]);

  function handleCreate(res) {
    setReservations((prev) => [...prev, res]);
  }

  function handleCancel(id) {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CourtGrid
              selectedCourt={selectedCourt}
              setSelectedCourt={setSelectedCourt}
              reservations={reservations}
              selectedDate={selectedDate}
            />
            <ReservationList
              reservations={reservations}
              onCancel={handleCancel}
              selectedDate={selectedDate}
            />
          </div>
          <div className="lg:col-span-1">
            <BookingForm
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedCourt={selectedCourt}
              reservations={reservations}
              onCreate={handleCreate}
            />
            <div className="mt-4 text-xs text-slate-500">
              Tip: Select a court first, then pick a start time and duration.
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Padel Pro Courts — Smooth reservations for your next match.
      </footer>
    </div>
  );
}

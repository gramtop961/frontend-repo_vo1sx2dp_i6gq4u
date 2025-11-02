import { CalendarDays, MapPin, Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Padel Pro Courts</h1>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4"/> Riverside Sports Complex
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-white/90">
          <CalendarDays className="w-4 h-4" />
          Open daily 7:00 — 23:00
        </div>
      </div>
    </header>
  );
}

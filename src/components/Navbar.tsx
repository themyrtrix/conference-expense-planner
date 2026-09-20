import React from 'react';
import { Building2 } from 'lucide-react';

interface NavbarProps {
  onNavigateLanding: () => void;
  onOpenModal: () => void;
}

export default function Navbar({ onNavigateLanding, onOpenModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={onNavigateLanding}>
          <div className="bg-zinc-900 text-white p-2 rounded-xl shadow-sm">
            <Building2 size={18} />
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-900">Conference Planner</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-normal text-zinc-600 text-xs tracking-wide">
          <a href="#venue" className="hover:text-zinc-950 transition">Venue</a>
          <a href="#addons" className="hover:text-zinc-950 transition">Add-ons</a>
          <a href="#meals" className="hover:text-zinc-950 transition">Catering</a>
        </nav>

        <button
          onClick={onOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full transition-all shadow-sm text-xs tracking-wide"
        >
          View Summary
        </button>
      </div>
    </header>
  );
}
import React from 'react';
import { venueRooms, addOns, mealOptions } from '../data';
import { Building2, Utensils, Monitor, Users, Plus, Minus } from 'lucide-react';

interface ProductSelectionProps {
  roomQuantities: Record<string, number>;
  addonQuantities: Record<string, number>;
  numberOfPeople: number | string;
  selectedMeals: Record<string, boolean>;
  onRoomChange: (id: string, delta: number) => void;
  onAddonChange: (id: string, delta: number) => void;
  onPeopleChange: (value: string) => void;
  onMealToggle: (id: string) => void;
  roomSubtotal: number;
  addonSubtotal: number;
  mealSubtotal: number;
}

export default function ProductSelection({
  roomQuantities,
  addonQuantities,
  numberOfPeople,
  selectedMeals,
  onRoomChange,
  onAddonChange,
  onPeopleChange,
  onMealToggle,
  roomSubtotal,
  addonSubtotal,
  mealSubtotal
}: ProductSelectionProps) {
  return (
    <main className="max-w-6xl mx-auto px-6 mt-12 space-y-16 pb-24">
      
      {/* 1. Venue Selection Section */}
      <section id="venue" className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2 text-zinc-900">
            <Building2 className="text-blue-600" size={18} /> Venue Room Selection
          </h2>
          <span className="text-xs font-semibold tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Subtotal: ${roomSubtotal.toLocaleString()}</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venueRooms.map(room => {
            const qty = roomQuantities[room.id] || 0;
            return (
              <div key={room.id} className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <img src={room.image} alt={room.name} className="h-40 w-full object-cover" />
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-sm">{room.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Capacity: {room.capacity} Guests</p>
                    <p className="text-blue-600 font-semibold mt-2 text-sm">${room.cost} <span className="text-xs text-zinc-400 font-normal">/ unit</span></p>
                  </div>
                  <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/60 p-1.5 rounded-xl">
                    <button onClick={() => onRoomChange(room.id, -1)} className="p-2 bg-white hover:bg-zinc-100 text-zinc-700 rounded-lg shadow-xs transition"><Minus size={14} /></button>
                    <span className="font-semibold text-xs px-4 text-zinc-900">{qty}</span>
                    <button onClick={() => onRoomChange(room.id, 1)} className="p-2 bg-white hover:bg-zinc-100 text-zinc-700 rounded-lg shadow-xs transition"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Add-ons Selection Section */}
      <section id="addons" className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2 text-zinc-900">
            <Monitor className="text-blue-600" size={18} /> Presentation Add-ons
          </h2>
          <span className="text-xs font-semibold tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Subtotal: ${addonSubtotal.toLocaleString()}</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map(addon => {
            const qty = addonQuantities[addon.id] || 0;
            return (
              <div key={addon.id} className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                <img src={addon.image} alt={addon.name} className="h-40 w-full object-cover" />
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-sm">{addon.name}</h3>
                    <p className="text-blue-600 font-semibold mt-2 text-sm">${addon.cost} <span className="text-xs text-zinc-400 font-normal">/ unit</span></p>
                  </div>
                  <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/60 p-1.5 rounded-xl">
                    <button onClick={() => onAddonChange(addon.id, -1)} className="p-2 bg-white hover:bg-zinc-100 text-zinc-700 rounded-lg shadow-xs transition"><Minus size={14} /></button>
                    <span className="font-semibold text-xs px-4 text-zinc-900">{qty}</span>
                    <button onClick={() => onAddonChange(addon.id, 1)} className="p-2 bg-white hover:bg-zinc-100 text-zinc-700 rounded-lg shadow-xs transition"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Meals Selection Section */}
      <section id="meals" className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2 text-zinc-900">
            <Utensils className="text-blue-600" size={18} /> Catering & Dining
          </h2>
          <span className="text-xs font-semibold tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Subtotal: ${mealSubtotal.toLocaleString()}</span>
        </div>

        <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl space-y-6 shadow-sm">
          <div className="max-w-xs">
            <label className="block text-xs font-medium text-zinc-500 mb-2">Number of Attendees</label>
            <div className="relative">
              <Users className="absolute left-3.5 top-3 text-zinc-400" size={16} />
              <input
                type="number"
                min="0"
                value={numberOfPeople}
                onChange={(e) => onPeopleChange(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 text-xs focus:outline-none focus:border-blue-600 transition"
                placeholder="Enter count"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mealOptions.map(meal => (
              <label key={meal.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${selectedMeals[meal.id] ? 'bg-blue-50/50 border-blue-600' : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!selectedMeals[meal.id]}
                    onChange={() => onMealToggle(meal.id)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-white border-zinc-300 accent-blue-600"
                  />
                  <span className="font-medium text-xs text-zinc-800">{meal.name}</span>
                </div>
                <span className="text-blue-600 font-semibold text-xs">${meal.cost}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
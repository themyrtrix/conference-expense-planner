import { venueRooms, addOns, mealOptions } from '../data';
import { X } from 'lucide-react';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomQuantities: Record<string, number>;
  addonQuantities: Record<string, number>;
  numberOfPeople: number | string;
  selectedMeals: Record<string, boolean>;
  grandTotal: number;
}

export default function SummaryModal({
  isOpen,
  onClose,
  roomQuantities,
  addonQuantities,
  numberOfPeople,
  selectedMeals,
  grandTotal
}: SummaryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 tracking-tight">Event Expense Summary</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Itemized statement of your configured selections</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full bg-zinc-100 hover:bg-zinc-200 transition"><X size={16} /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-400 text-xs font-medium">
                <th className="pb-3">Item Name</th>
                <th className="pb-3">Unit Price</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {/* Venue Rows */}
              {venueRooms.map(room => {
                const qty = roomQuantities[room.id] || 0;
                if (qty === 0) return null;
                return (
                  <tr key={room.id}>
                    <td className="py-3.5 font-medium text-zinc-900">{room.name} <span className="text-zinc-400 font-normal">(Cap: {room.capacity})</span></td>
                    <td className="py-3.5 text-zinc-500">${room.cost}</td>
                    <td className="py-3.5 text-zinc-500">{qty}</td>
                    <td className="py-3.5 text-right font-semibold text-zinc-900">${qty * room.cost}</td>
                  </tr>
                );
              })}

              {/* Add-on Rows */}
              {addOns.map(addon => {
                const qty = addonQuantities[addon.id] || 0;
                if (qty === 0) return null;
                return (
                  <tr key={addon.id}>
                    <td className="py-3.5 font-medium text-zinc-900">{addon.name}</td>
                    <td className="py-3.5 text-zinc-500">${addon.cost}</td>
                    <td className="py-3.5 text-zinc-500">{qty}</td>
                    <td className="py-3.5 text-right font-semibold text-zinc-900">${qty * addon.cost}</td>
                  </tr>
                );
              })}

              {/* Meal Rows */}
              {mealOptions.map(meal => {
                if (!selectedMeals[meal.id] || !numberOfPeople || Number(numberOfPeople) <= 0) return null;
                const totalMealCost = Number(numberOfPeople) * meal.cost;
                return (
                  <tr key={meal.id}>
                    <td className="py-3.5 font-medium text-zinc-900">{meal.name} (Catering)</td>
                    <td className="py-3.5 text-zinc-500">${meal.cost}</td>
                    <td className="py-3.5 text-zinc-500">{numberOfPeople} Guests</td>
                    <td className="py-3.5 text-right font-semibold text-zinc-900">${totalMealCost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Investment:</span>
          <span className="text-xl font-bold tracking-tight text-blue-600">${grandTotal.toLocaleString()}</span>
        </div>

      </div>
    </div>
  );
}
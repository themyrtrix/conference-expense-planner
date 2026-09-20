import React, { useState } from 'react';
import { venueRooms, addOns, mealOptions } from './data';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import ProductSelection from './components/ProductSelection';
import SummaryModal from './components/SummaryModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});
  const [numberOfPeople, setNumberOfPeople] = useState<number | string>(0);
  const [selectedMeals, setSelectedMeals] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRoomChange = (id: string, delta: number) => {
    setRoomQuantities(prev => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const handleAddonChange = (id: string, delta: number) => {
    setAddonQuantities(prev => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const handleMealToggle = (id: string) => {
    setSelectedMeals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const roomSubtotal = venueRooms.reduce((sum, room) => sum + (roomQuantities[room.id] || 0) * room.cost, 0);
  const addonSubtotal = addOns.reduce((sum, addon) => sum + (addonQuantities[addon.id] || 0) * addon.cost, 0);
  const mealSubtotal = mealOptions.reduce((sum, meal) => {
    if (selectedMeals[meal.id]) {
      return sum + (Number(numberOfPeople) || 0) * meal.cost;
    }
    return sum;
  }, 0);

  const grandTotal = roomSubtotal + addonSubtotal + mealSubtotal;

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('products')} />;
  }

  return (
    /* Removed the dark slate background, using transparent container to let index.css shine */
    <div className="min-h-screen text-zinc-900 selection:bg-blue-100 font-sans">
      <Navbar 
        onNavigateLanding={() => setCurrentPage('landing')} 
        onOpenModal={() => setIsModalOpen(true)} 
      />

      <ProductSelection 
        roomQuantities={roomQuantities}
        addonQuantities={addonQuantities}
        numberOfPeople={numberOfPeople}
        selectedMeals={selectedMeals}
        onRoomChange={handleRoomChange}
        onAddonChange={handleAddonChange}
        onPeopleChange={setNumberOfPeople}
        onMealToggle={handleMealToggle}
        roomSubtotal={roomSubtotal}
        addonSubtotal={addonSubtotal}
        mealSubtotal={mealSubtotal}
      />

      <SummaryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roomQuantities={roomQuantities}
        addonQuantities={addonQuantities}
        numberOfPeople={numberOfPeople}
        selectedMeals={selectedMeals}
        grandTotal={grandTotal}
      />
    </div>
  );
}
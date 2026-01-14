import React, { useState } from 'react';
import { TradingInterface } from './components/TradingInterface';
import { ApplicationForm } from './components/ApplicationForm';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white overflow-hidden">
      <TradingInterface onApply={() => setShowForm(true)} />

      {/* Application Form Section */}
      <AnimatePresence mode="wait">
        {showForm && (
          <ApplicationForm onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

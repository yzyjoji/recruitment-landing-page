import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Trade {
  id: number;
  price: number;
  amount: number;
  time: string;
  isBuy: boolean;
}

export function TradesPanel() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Generate initial trades
    const initialTrades: Trade[] = [];
    const basePrice = 2847.52;
    
    for (let i = 0; i < 20; i++) {
      const now = new Date();
      now.setSeconds(now.getSeconds() - i * 3);
      
      initialTrades.push({
        id: i,
        price: basePrice + (Math.random() - 0.5) * 10,
        amount: Math.random() * 5,
        time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
        isBuy: Math.random() > 0.5
      });
    }
    
    setTrades(initialTrades);

    // Add new trades periodically
    const interval = setInterval(() => {
      const now = new Date();
      const newTrade: Trade = {
        id: Date.now(),
        price: basePrice + (Math.random() - 0.5) * 10,
        amount: Math.random() * 5,
        time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
        isBuy: Math.random() > 0.5
      };

      setTrades(prev => [newTrade, ...prev.slice(0, 19)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-10 border-b border-[#2B3139] flex items-center justify-between px-3">
        <span className="text-sm text-gray-400">Trades</span>
      </div>

      {/* Column Headers */}
      <div className="h-8 flex items-center px-3 text-xs text-gray-500 border-b border-[#2B3139]">
        <div className="flex-1">Price (USDT)</div>
        <div className="flex-1 text-right">Amount</div>
        <div className="flex-1 text-right">Time</div>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {trades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="h-5 flex items-center px-3 text-xs hover:bg-[#2B3139]/30 cursor-pointer"
            >
              <div className={`flex-1 ${trade.isBuy ? 'text-green-400' : 'text-red-400'}`}>
                {trade.price.toFixed(2)}
              </div>
              <div className="flex-1 text-right text-white">
                {trade.amount.toFixed(3)}
              </div>
              <div className="flex-1 text-right text-gray-500">
                {trade.time}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

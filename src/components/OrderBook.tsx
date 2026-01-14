import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export function OrderBook() {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);

  useEffect(() => {
    // Generate mock order book data
    const basePrice = 2847.52;
    const newAsks: OrderBookEntry[] = [];
    const newBids: OrderBookEntry[] = [];

    for (let i = 0; i < 12; i++) {
      const askPrice = basePrice + (i + 1) * 0.5;
      const bidPrice = basePrice - (i + 1) * 0.5;
      const amount = Math.random() * 10 + 0.5;
      
      newAsks.push({
        price: askPrice,
        amount: amount,
        total: amount * askPrice
      });

      newBids.push({
        price: bidPrice,
        amount: amount,
        total: amount * bidPrice
      });
    }

    setAsks(newAsks.reverse());
    setBids(newBids);

    // Update periodically
    const interval = setInterval(() => {
      const updatedAsks = newAsks.map(ask => ({
        ...ask,
        amount: Math.random() * 10 + 0.5,
        price: ask.price + (Math.random() - 0.5) * 0.1
      }));
      const updatedBids = newBids.map(bid => ({
        ...bid,
        amount: Math.random() * 10 + 0.5,
        price: bid.price + (Math.random() - 0.5) * 0.1
      }));
      
      setAsks(updatedAsks);
      setBids(updatedBids);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 border-b border-[#2B3139] flex flex-col">
      {/* Header */}
      <div className="h-10 border-b border-[#2B3139] flex items-center justify-between px-3">
        <span className="text-sm text-gray-400">Order Book</span>
        <button className="text-xs text-gray-500 hover:text-white">0.01</button>
      </div>

      {/* Column Headers */}
      <div className="h-8 flex items-center px-3 text-xs text-gray-500 border-b border-[#2B3139]">
        <div className="flex-1">Price (USDT)</div>
        <div className="flex-1 text-right">Size (USDT)</div>
        <div className="flex-1 text-right">Sum (USDT)</div>
      </div>

      {/* Order Book Entries */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Asks (Sell Orders) */}
        <div className="flex-1 flex flex-col-reverse overflow-hidden">
          {asks.map((ask, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-5 flex items-center px-3 text-xs relative group hover:bg-[#2B3139]/30 cursor-pointer"
            >
              {/* Background bar */}
              <div 
                className="absolute right-0 top-0 bottom-0 bg-red-500/10"
                style={{ width: `${(ask.amount / 15) * 100}%` }}
              />
              
              <div className="flex-1 text-red-400 relative z-10">{ask.price.toFixed(2)}</div>
              <div className="flex-1 text-right text-white relative z-10">{ask.amount.toFixed(3)}</div>
              <div className="flex-1 text-right text-gray-400 relative z-10">{ask.total.toFixed(2)}</div>
            </motion.div>
          ))}
        </div>

        {/* Current Price */}
        <div className="h-8 flex items-center justify-between px-3 bg-[#2B3139]/30">
          <span className="text-lg text-green-400">2847.52</span>
          <span className="text-xs text-green-400">↑</span>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="flex-1 overflow-hidden">
          {bids.map((bid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-5 flex items-center px-3 text-xs relative group hover:bg-[#2B3139]/30 cursor-pointer"
            >
              {/* Background bar */}
              <div 
                className="absolute right-0 top-0 bottom-0 bg-green-500/10"
                style={{ width: `${(bid.amount / 15) * 100}%` }}
              />
              
              <div className="flex-1 text-green-400 relative z-10">{bid.price.toFixed(2)}</div>
              <div className="flex-1 text-right text-white relative z-10">{bid.amount.toFixed(3)}</div>
              <div className="flex-1 text-right text-gray-400 relative z-10">{bid.total.toFixed(2)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

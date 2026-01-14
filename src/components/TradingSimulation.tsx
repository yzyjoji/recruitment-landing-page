import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CandlestickChart } from './CandlestickChart';
import { TrendingUp, TrendingDown, Rocket } from 'lucide-react';

interface TradingSimulationProps {
  onApply: () => void;
}

type TradeState = 'idle' | 'long' | 'short' | 'resetting';

export function TradingSimulation({ onApply }: TradingSimulationProps) {
  const [tradeState, setTradeState] = useState<TradeState>('idle');
  const [showProfitOverlay, setShowProfitOverlay] = useState(false);
  const [showLiquidationOverlay, setShowLiquidationOverlay] = useState(false);
  const [pnl, setPnl] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(2847.52);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    // Animate PNL counter when long - 6 seconds
    if (tradeState === 'long') {
      let count = 0;
      const target = 8750;
      const duration = 6000; // 6 seconds
      const steps = 120;
      const increment = target / steps;
      const stepDuration = duration / steps;

      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          setPnl(target);
          clearInterval(interval);
        } else {
          setPnl(Math.floor(count));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else {
      setPnl(0);
    }
  }, [tradeState]);

  useEffect(() => {
    // Animate ROI counter when long - 6 seconds
    if (tradeState === 'long') {
      let count = 0;
      const target = 350;
      const duration = 6000;
      const steps = 120;
      const increment = target / steps;
      const stepDuration = duration / steps;

      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          setRoi(target);
          clearInterval(interval);
        } else {
          setRoi(Math.floor(count));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else {
      setRoi(0);
    }
  }, [tradeState]);

  useEffect(() => {
    // Animate price when long - 6 seconds
    if (tradeState === 'long') {
      let price = 2847.52;
      const target = 3850;
      const duration = 6000;
      const steps = 120;
      const increment = (target - price) / steps;
      const stepDuration = duration / steps;

      const interval = setInterval(() => {
        price += increment;
        if (price >= target) {
          setCurrentPrice(target);
          clearInterval(interval);
        } else {
          setCurrentPrice(price);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else if (tradeState === 'idle') {
      setCurrentPrice(2847.52);
    }
  }, [tradeState]);

  const handleLongClick = () => {
    setTradeState('long');
    
    // Show PNL overlay after 6 seconds of chart animation
    setTimeout(() => {
      setShowProfitOverlay(true);
    }, 6000);
    
    // Transition to application form after PNL display
    setTimeout(() => {
      setShowProfitOverlay(false);
      setTimeout(() => {
        onApply();
        setTradeState('idle');
      }, 500);
    }, 10000); // Show PNL for 4 seconds
  };

  const handleShortClick = () => {
    setTradeState('short');
    setShowLiquidationOverlay(true);
    
    // Show liquidation, then reset
    setTimeout(() => {
      setShowLiquidationOverlay(false);
      setTradeState('resetting');
      setTimeout(() => {
        setTradeState('idle');
      }, 500);
    }, 4000);
  };

  const priceChange = tradeState === 'long' ? `+${((currentPrice - 2847.52) / 2847.52 * 100).toFixed(1)}%` : '+12.4%';
  const priceColor = tradeState === 'long' ? 'text-green-400' : 'text-green-400';

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl text-blue-300">FD/USDT Perpetual</h2>
            <p className="text-gray-400 mt-1">Interactive Trading Simulation</p>
          </div>
          <div className="text-right">
            <motion.div 
              key={currentPrice}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-2xl ${priceColor}`}
            >
              ${currentPrice.toFixed(2)}
            </motion.div>
            <div className={`text-sm ${priceColor}`}>{priceChange}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative mb-8">
          <CandlestickChart tradeState={tradeState} />
        </div>

        {/* Trading Buttons */}
        <div className="flex gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLongClick}
            disabled={tradeState !== 'idle'}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl text-xl shadow-lg shadow-green-500/50 transition-all"
          >
            <TrendingUp className="w-6 h-6" />
            <div className="text-left">
              <div>LONG</div>
              <div className="text-sm opacity-80">(Apply)</div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShortClick}
            disabled={tradeState !== 'idle'}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl text-xl shadow-lg shadow-red-500/50 transition-all"
          >
            <TrendingDown className="w-6 h-6" />
            <div className="text-left">
              <div>SHORT</div>
              <div className="text-sm opacity-80">(Learn More)</div>
            </div>
          </motion.button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Interactive simulation for demonstration purposes only
        </p>
      </motion.div>

      {/* Rocket Animation Overlay - Shows during chart animation */}
      <AnimatePresence>
        {tradeState === 'long' && !showProfitOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
            {/* Multiple rockets */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 100,
                  rotate: -45,
                  scale: 0.5 + Math.random() * 0.5
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -200,
                  rotate: -45
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
                className="absolute"
              >
                <Rocket className="w-12 h-12 text-yellow-400" fill="currentColor" />
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-orange-500 text-2xl"
                >
                  🔥
                </motion.div>
              </motion.div>
            ))}
            
            {/* "TO THE MOON" text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  textShadow: [
                    '0 0 20px rgba(234, 179, 8, 0.5)',
                    '0 0 40px rgba(234, 179, 8, 0.8)',
                    '0 0 20px rgba(234, 179, 8, 0.5)'
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-7xl text-yellow-400 drop-shadow-2xl"
              >
                TO THE MOON
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profit PNL Overlay - Shows after 6 second chart animation */}
      <AnimatePresence>
        {showProfitOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg rounded-2xl z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -50 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="bg-gradient-to-br from-green-900/40 to-green-950/40 border-2 border-green-500/50 rounded-3xl p-12 backdrop-blur-sm shadow-2xl shadow-green-500/30 max-w-2xl"
            >
              {/* Position Info */}
              <div className="text-center mb-8">
                <div className="text-gray-300 mb-2">Position Closed</div>
                <div className="text-3xl text-green-400">LONG FD/USDT</div>
              </div>

              {/* PNL Display */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="text-sm text-gray-400 mb-2">Unrealized PNL</div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      textShadow: [
                        '0 0 20px rgba(34, 197, 94, 0.5)',
                        '0 0 30px rgba(34, 197, 94, 0.8)',
                        '0 0 20px rgba(34, 197, 94, 0.5)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl text-green-400"
                  >
                    +${pnl.toLocaleString()}.00
                  </motion.div>
                </div>

                <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="text-sm text-gray-400 mb-2">ROI</div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      textShadow: [
                        '0 0 20px rgba(34, 197, 94, 0.5)',
                        '0 0 30px rgba(34, 197, 94, 0.8)',
                        '0 0 20px rgba(34, 197, 94, 0.5)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="text-5xl text-green-400"
                  >
                    +{roi}%
                  </motion.div>
                </div>
              </div>

              {/* Position Details */}
              <div className="space-y-3 mb-8 p-6 bg-slate-900/50 rounded-xl border border-green-500/20">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Entry Price</span>
                  <span className="text-white">$2,847.52</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Exit Price</span>
                  <span className="text-green-400">${currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Leverage</span>
                  <span className="text-white">10x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Position Size</span>
                  <span className="text-white">$25,000</span>
                </div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-2xl text-green-300 mb-4">Excellent Trade!</div>
                <div className="text-lg text-gray-300">
                  Ready to help others achieve similar results?
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liquidation Overlay */}
      <AnimatePresence>
        {showLiquidationOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-red-900/90 backdrop-blur-md rounded-2xl z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-center px-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-7xl mb-6 text-red-400"
              >
                ⚠
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div className="text-6xl text-red-300 tracking-wider">
                  LIQUIDATION CONFIRMED
                </div>
                <div className="text-4xl text-red-400">
                  Balance: $0.00
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 pt-8 border-t border-red-500/50"
                >
                  <p className="text-2xl text-gray-200 mb-4">
                    Mistakes happen. That's why we need you to help our clients navigate volatility.
                  </p>
                  <p className="text-3xl text-yellow-400">
                    Click <span className="text-green-400">LONG</span> to secure your role.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

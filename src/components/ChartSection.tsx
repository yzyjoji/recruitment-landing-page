import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, TrendingUp, TrendingDown, Rocket } from 'lucide-react';
import { BinanceChart } from './BinanceChart';

interface ChartSectionProps {
  onApply: () => void;
}

type TradeState = 'idle' | 'long' | 'short' | 'resetting';

export function ChartSection({ onApply }: ChartSectionProps) {
  const [tradeState, setTradeState] = useState<TradeState>('idle');
  const [showProfitOverlay, setShowProfitOverlay] = useState(false);
  const [showLiquidationOverlay, setShowLiquidationOverlay] = useState(false);
  const [pnl, setPnl] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(2847.52);
  const [roi, setRoi] = useState(0);

  React.useEffect(() => {
    if (tradeState === 'long') {
      let count = 0;
      const target = 8750;
      const duration = 6000;
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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
    
    setTimeout(() => {
      setShowProfitOverlay(true);
    }, 6000);
    
    setTimeout(() => {
      setShowProfitOverlay(false);
      setTimeout(() => {
        onApply();
        setTradeState('idle');
      }, 500);
    }, 10000);
  };

  const handleShortClick = () => {
    setTradeState('short');
    setShowLiquidationOverlay(true);
    
    setTimeout(() => {
      setShowLiquidationOverlay(false);
      setTradeState('resetting');
      setTimeout(() => {
        setTradeState('idle');
      }, 500);
    }, 5000); // Show cat slap for 5 seconds
  };

  const priceChangePercent = ((currentPrice - 2847.52) / 2847.52 * 100).toFixed(2);
  const priceChangeValue = (currentPrice - 2847.52).toFixed(2);

  return (
    <div className="flex-1 flex flex-col bg-[#0B0E11] relative overflow-hidden">
      {/* Trading Pair Header */}
      <div className="h-16 border-b border-[#2B3139] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-6">
          {/* Pair Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-lg">FD/USDT</span>
              <button className="text-gray-500 hover:text-white">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-gray-500 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded">
              Perpetual
            </span>
          </div>

          {/* Price Info */}
          <div className="flex items-center gap-6 text-sm">
            <div>
              <motion.div 
                key={currentPrice}
                className={`text-2xl ${tradeState === 'long' ? 'text-green-400' : 'text-green-400'}`}
              >
                {currentPrice.toFixed(2)}
              </motion.div>
              <div className={`text-xs ${parseFloat(priceChangeValue) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(priceChangeValue) >= 0 ? '+' : ''}{priceChangeValue} {parseFloat(priceChangePercent) >= 0 ? '+' : ''}{priceChangePercent}%
              </div>
            </div>

            <div className="flex gap-4 text-xs text-gray-400">
              <div>
                <div className="text-gray-500">24h High</div>
                <div className="text-white">3,921.50</div>
              </div>
              <div>
                <div className="text-gray-500">24h Low</div>
                <div className="text-white">2,756.30</div>
              </div>
              <div>
                <div className="text-gray-500">24h Volume</div>
                <div className="text-white">532,051,372.19</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLongClick}
            disabled={tradeState !== 'idle'}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-sm transition-colors flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>LONG</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShortClick}
            disabled={tradeState !== 'idle'}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-sm transition-colors flex items-center gap-2"
          >
            <TrendingDown className="w-4 h-4" />
            <span>SHORT</span>
          </motion.button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative">
        <BinanceChart tradeState={tradeState} />
      </div>

      {/* Rocket Animation */}
      <AnimatePresence>
        {tradeState === 'long' && !showProfitOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
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
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  textShadow: [
                    '0 0 20px rgba(234, 179, 8, 0.8)',
                    '0 0 40px rgba(234, 179, 8, 1)',
                    '0 0 20px rgba(234, 179, 8, 0.8)'
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl text-yellow-400"
              >
                TO THE MOON
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PNL Overlay */}
      <AnimatePresence>
        {showProfitOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-lg z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="bg-gradient-to-br from-green-900/40 to-green-950/40 border-2 border-green-500/50 rounded-2xl p-12 backdrop-blur-sm shadow-2xl max-w-2xl"
            >
              <div className="text-center mb-8">
                <div className="text-gray-300 mb-2">Position Closed</div>
                <div className="text-3xl text-green-400">LONG FD/USDT</div>
              </div>

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
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl text-green-400"
                  >
                    +{roi}%
                  </motion.div>
                </div>
              </div>

              <div className="space-y-3 mb-8 p-6 bg-[#0B0E11]/50 rounded-xl border border-green-500/20">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-2xl text-green-300 mb-2">Excellent Trade!</div>
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
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/95 via-orange-900/95 to-red-900/95 backdrop-blur-md z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-center px-8 relative"
            >
              {/* Angry Cat Slapping */}
              <motion.div
                initial={{ x: -200, rotate: 0 }}
                animate={{ 
                  x: [0, 50, 0],
                  rotate: [-15, 15, -15]
                }}
                transition={{ duration: 0.4, repeat: 5 }}
                className="text-9xl mb-4"
              >
                😾
              </motion.div>

              {/* Slap Effect */}
              <motion.div
                initial={{ scale: 0, x: 100 }}
                animate={{ 
                  scale: [0, 2, 0],
                  x: [100, 50, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 0.3, repeat: 5, repeatDelay: 0.3 }}
                className="absolute top-32 left-1/2 -translate-x-1/2 text-6xl"
              >
                💥
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-7xl text-red-300 tracking-wider mb-6"
                >
                  SLAPPED!
                </motion.div>

                <div className="text-5xl text-orange-400 mb-4">
                  -$25,000.00
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="space-y-4"
                >
                  <p className="text-3xl text-red-200">
                    You just got slapped for trying to SHORT!
                  </p>
                  <p className="text-2xl text-gray-300">
                    Instead of losing money, why not help others AVOID losses?
                  </p>
                  <div className="mt-8 pt-6 border-t border-red-500/50">
                    <p className="text-3xl text-yellow-400 mb-2">
                      Don't miss this opportunity twice!
                    </p>
                    <p className="text-xl text-green-400">
                      Click <span className="text-white bg-green-500 px-3 py-1 rounded">LONG</span> to join the winning team
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
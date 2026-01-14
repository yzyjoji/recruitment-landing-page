import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  tradeState: 'idle' | 'long' | 'short' | 'resetting';
}

export function CandlestickChart({ tradeState }: CandlestickChartProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Generate initial candle data
  const baseCandles = useMemo(() => {
    const candles: CandleData[] = [];
    let price = 2500;
    
    for (let i = 0; i < 40; i++) {
      const volatility = 30;
      const change = (Math.random() - 0.48) * volatility;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 20;
      const low = Math.min(open, close) - Math.random() * 20;
      
      candles.push({
        time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10}`,
        open,
        high,
        low,
        close
      });
      
      price = close;
    }
    
    return candles;
  }, []);

  // Animate candles when trade state changes - 6 seconds
  useEffect(() => {
    if (tradeState === 'long' || tradeState === 'short') {
      setAnimationProgress(0);
      const duration = 6000; // 6 seconds
      const steps = 120;
      const stepDuration = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step += 1;
        setAnimationProgress(step / steps);
        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else {
      setAnimationProgress(0);
    }
  }, [tradeState]);

  // Modify candles based on trade state with smooth 6-second animation
  const candles = useMemo(() => {
    if (tradeState === 'long') {
      // Make candles green and rising with animation
      return baseCandles.map((candle, i) => {
        const boost = i * 15 * animationProgress;
        return {
          ...candle,
          open: candle.open + boost,
          close: candle.close + boost + (30 * animationProgress),
          high: candle.high + boost + (40 * animationProgress),
          low: candle.low + boost + (20 * animationProgress)
        };
      });
    } else if (tradeState === 'short') {
      // Make candles red and falling
      return baseCandles.map((candle, i) => {
        const drop = i * 20 * animationProgress;
        return {
          ...candle,
          open: candle.open - drop,
          close: candle.close - drop - (40 * animationProgress),
          high: candle.high - drop - (10 * animationProgress),
          low: candle.low - drop - (50 * animationProgress)
        };
      });
    }
    
    return baseCandles;
  }, [baseCandles, tradeState, animationProgress]);

  // Auto-update time for "live" effect
  useEffect(() => {
    if (tradeState === 'idle') {
      const interval = setInterval(() => {
        setCurrentTime(t => t + 1);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [tradeState]);

  const width = 1000;
  const height = 400;
  const padding = { top: 20, right: 60, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate price range
  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...allPrices) * 0.98;
  const maxPrice = Math.max(...allPrices) * 1.02;
  const priceRange = maxPrice - minPrice;

  // Scale functions
  const scaleX = (index: number) => padding.left + (index / (candles.length - 1)) * chartWidth;
  const scaleY = (price: number) => padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

  const candleWidth = chartWidth / candles.length * 0.6;

  return (
    <div className="relative bg-slate-950/50 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
      <svg width="100%" height="400" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio;
          const price = maxPrice - (priceRange * ratio);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text
                x={width - padding.right + 10}
                y={y + 4}
                fill="rgba(156, 163, 175, 0.8)"
                fontSize="12"
              >
                ${price.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {candles.map((candle, index) => {
          const x = scaleX(index);
          const isGreen = candle.close > candle.open;
          const color = tradeState === 'long' ? '#22c55e' : 
                       tradeState === 'short' ? '#ef4444' : 
                       isGreen ? '#22c55e' : '#ef4444';
          
          const openY = scaleY(candle.open);
          const closeY = scaleY(candle.close);
          const highY = scaleY(candle.high);
          const lowY = scaleY(candle.low);
          
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);
          
          const isHovered = hoveredCandle === index;

          return (
            <motion.g
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01, duration: 0.3 }}
              onMouseEnter={() => setHoveredCandle(index)}
              onMouseLeave={() => setHoveredCandle(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Wick */}
              <motion.line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth={isHovered ? "3" : "2"}
                opacity={isHovered ? "1" : "0.8"}
                animate={isHovered ? { strokeWidth: [2, 3, 2] } : {}}
                transition={{ duration: 0.3 }}
              />
              
              {/* Body */}
              <motion.rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 2)}
                fill={color}
                stroke={color}
                strokeWidth="1"
                animate={
                  tradeState !== 'idle' ? {
                    filter: [
                      `drop-shadow(0 0 0px ${color})`,
                      `drop-shadow(0 0 8px ${color})`,
                      `drop-shadow(0 0 0px ${color})`
                    ]
                  } : isHovered ? {
                    filter: [
                      `drop-shadow(0 0 5px ${color})`,
                      `drop-shadow(0 0 10px ${color})`,
                      `drop-shadow(0 0 5px ${color})`
                    ]
                  } : {}
                }
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ 
                  opacity: isHovered ? 1 : 0.9,
                  transition: 'opacity 0.2s'
                }}
              />

              {/* Hover tooltip */}
              {isHovered && tradeState === 'idle' && (
                <g>
                  <rect
                    x={x + 15}
                    y={bodyTop - 60}
                    width="120"
                    height="50"
                    fill="rgba(15, 23, 42, 0.95)"
                    stroke={color}
                    strokeWidth="1"
                    rx="4"
                  />
                  <text x={x + 20} y={bodyTop - 40} fill="#fff" fontSize="10">
                    O: ${candle.open.toFixed(2)}
                  </text>
                  <text x={x + 20} y={bodyTop - 28} fill="#fff" fontSize="10">
                    H: ${candle.high.toFixed(2)}
                  </text>
                  <text x={x + 20} y={bodyTop - 16} fill="#fff" fontSize="10">
                    L: ${candle.low.toFixed(2)}
                  </text>
                  <text x={x + 20} y={bodyTop - 4} fill="#fff" fontSize="10">
                    C: ${candle.close.toFixed(2)}
                  </text>
                </g>
              )}
            </motion.g>
          );
        })}

        {/* X-axis labels */}
        {candles.filter((_, i) => i % 8 === 0).map((candle, i, arr) => {
          const index = i * 8;
          const x = scaleX(index);
          return (
            <text
              key={index}
              x={x}
              y={height - padding.bottom + 25}
              fill="rgba(156, 163, 175, 0.8)"
              fontSize="12"
              textAnchor="middle"
            >
              {candle.time}
            </text>
          );
        })}

        {/* Live indicator */}
        {tradeState === 'idle' && (
          <motion.circle
            cx={width - padding.right - 20}
            cy={padding.top + 10}
            r="4"
            fill="#22c55e"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Trend line overlay when trading */}
        {tradeState !== 'idle' && animationProgress > 0.1 && (
          <motion.line
            x1={padding.left}
            y1={scaleY(candles[0].close)}
            x2={scaleX(candles.length - 1)}
            y2={scaleY(candles[candles.length - 1].close)}
            stroke={tradeState === 'long' ? '#22c55e' : '#ef4444'}
            strokeWidth="3"
            strokeDasharray="10,5"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: animationProgress }}
            transition={{ duration: 0.5, ease: 'linear' }}
          />
        )}

        {/* Price movement indicator during animation */}
        {tradeState === 'long' && animationProgress > 0 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <text
              x={width / 2}
              y={padding.top - 5}
              fill="#22c55e"
              fontSize="16"
              textAnchor="middle"
              style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))' }}
            >
              ↑ PRICE RISING
            </text>
          </motion.g>
        )}
      </svg>

      {/* Live label */}
      {tradeState === 'idle' && (
        <div className="absolute top-8 right-8 flex items-center gap-2 text-green-400 text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          LIVE
        </div>
      )}

      {/* Interactive hint */}
      {tradeState === 'idle' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-gray-500 text-xs"
        >
          Hover over candles for details
        </motion.div>
      )}

      {/* Volume bars */}
      <div className="flex gap-1 mt-4 px-2">
        {candles.slice(-20).map((candle, i) => {
          const isGreen = candle.close > candle.open;
          const volume = Math.random() * 100;
          const color = tradeState === 'long' ? 'bg-green-500' : 
                       tradeState === 'short' ? 'bg-red-500' : 
                       isGreen ? 'bg-green-500' : 'bg-red-500';
          
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${volume}%` }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ opacity: 0.8, scale: 1.1 }}
              className={`flex-1 ${color} opacity-30 rounded-t cursor-pointer`}
              style={{ maxHeight: '40px' }}
            />
          );
        })}
      </div>
      <p className="text-center text-gray-500 text-xs mt-2">Trading Volume</p>
    </div>
  );
}

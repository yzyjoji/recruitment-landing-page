import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface BinanceChartProps {
  tradeState: 'idle' | 'long' | 'short' | 'resetting';
}

export function BinanceChart({ tradeState }: BinanceChartProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
  const [liveUpdateTrigger, setLiveUpdateTrigger] = useState(0);

  // Auto-update chart even when idle
  useEffect(() => {
    if (tradeState === 'idle') {
      const interval = setInterval(() => {
        setLiveUpdateTrigger(prev => prev + 1);
      }, 1500); // Update every 1.5 seconds

      return () => clearInterval(interval);
    }
  }, [tradeState]);

  const baseCandles = useMemo(() => {
    const candles: CandleData[] = [];
    let price = 2500;

    for (let i = 0; i < 50; i++) {
      const volatility = 25;
      const change = (Math.random() - 0.48) * volatility;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 15;
      const low = Math.min(open, close) - Math.random() * 15;

      const hour = 9 + Math.floor(i / 6);
      const minute = (i % 6) * 10;

      candles.push({
        time: `${hour}:${minute.toString().padStart(2, '0')}`,
        open,
        high,
        low,
        close
      });

      price = close;
    }

    return candles;
  }, [liveUpdateTrigger]);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    const duration = 6000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    if (tradeState === 'long' || tradeState === 'short') {
      setAnimationProgress(0);
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    } else {
      setAnimationProgress(0);
    }
  }, [tradeState]);

  const candles = useMemo(() => {
    if (tradeState === 'long') {
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

  const width = 1200;
  const height = 500;
  const padding = { top: 30, right: 80, bottom: 50, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...allPrices) * 0.98;
  const maxPrice = Math.max(...allPrices) * 1.02;
  const priceRange = maxPrice - minPrice;

  const scaleX = (index: number) => padding.left + (index / (candles.length - 1)) * chartWidth;
  const scaleY = (price: number) => padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

  const candleWidth = chartWidth / candles.length * 0.7;

  return (
    <div className="w-full h-full bg-[#0B0E11] relative">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio;
          const price = maxPrice - (priceRange * ratio);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#2B3139"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x={width - padding.right + 10}
                y={y + 4}
                fill="#848E9C"
                fontSize="11"
              >
                {price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {candles.map((candle, index) => {
          const x = scaleX(index);
          const isGreen = candle.close > candle.open;
          const color = tradeState === 'long' ? '#0ECB81' :
            tradeState === 'short' ? '#F6465D' :
              isGreen ? '#0ECB81' : '#F6465D';

          const openY = scaleY(candle.open);
          const closeY = scaleY(candle.close);
          const highY = scaleY(candle.high);
          const lowY = scaleY(candle.low);

          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);

          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredCandle(index)}
              onMouseLeave={() => setHoveredCandle(null)}
              style={{ cursor: 'crosshair' }}
            >
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="1.5"
              />

              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)}
                fill={isGreen ? color : 'transparent'}
                stroke={color}
                strokeWidth="1.5"
              />

              {/* Crosshair on hover */}
              {hoveredCandle === index && (
                <>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={height - padding.bottom}
                    stroke="#848E9C"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1={padding.left}
                    y1={closeY}
                    x2={width - padding.right}
                    y2={closeY}
                    stroke="#848E9C"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />

                  {/* Price label */}
                  <rect
                    x={width - padding.right}
                    y={closeY - 12}
                    width="70"
                    height="24"
                    fill={color}
                    rx="2"
                  />
                  <text
                    x={width - padding.right + 35}
                    y={closeY + 5}
                    fill="#000"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {candle.close.toFixed(2)}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* X-axis time labels */}
        {candles.filter((_, i) => i % 10 === 0).map((candle, i) => {
          const index = i * 10;
          const x = scaleX(index);
          return (
            <text
              key={index}
              x={x}
              y={height - padding.bottom + 20}
              fill="#848E9C"
              fontSize="11"
              textAnchor="middle"
            >
              {candle.time}
            </text>
          );
        })}

        {/* Price movement indicator */}
        {tradeState === 'long' && animationProgress > 0 && (
          <text
            x={width / 2}
            y={padding.top - 10}
            fill="#0ECB81"
            fontSize="14"
            textAnchor="middle"
          >
            ↑ BULLISH MOMENTUM
          </text>
        )}
      </svg>

      {/* Volume bars */}
      <div className="absolute bottom-0 left-0 right-20 h-16 flex items-end gap-px px-2">
        {candles.slice(-50).map((candle, i) => {
          const isGreen = candle.close > candle.open;
          const volume = Math.random() * 100;
          const color = tradeState === 'long' ? 'bg-green-500/30' :
            tradeState === 'short' ? 'bg-red-500/30' :
              isGreen ? 'bg-green-500/30' : 'bg-red-500/30';

          return (
            <div
              key={i}
              className={`flex-1 ${color}`}
              style={{ height: `${volume}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Users, Copy, Star, Award, AlertTriangle } from 'lucide-react';

interface CopyTradingSectionProps {
  onApply: () => void;
}

interface Trader {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  verified: boolean;
  rank: number;
  pnl: number;
  pnlPercent: number;
  roi: number;
  followers: number;
  winRate: number;
  totalTrades: number;
  copiers: number;
  aum: number; // Assets under management
  maxDrawdown: number;
  sharpeRatio: number;
  tradingDays: number;
}

export function CopyTradingSection({ onApply }: CopyTradingSectionProps) {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');

  const topGainers: Trader[] = [
    {
      id: '1',
      name: 'somerandomchinesedude',
      nickname: 'Crypto Wizard',
      avatar: '🧙‍♂️',
      verified: true,
      rank: 1,
      pnl: 2847521.50,
      pnlPercent: 847.3,
      roi: 1247.8,
      followers: 45821,
      winRate: 94.5,
      totalTrades: 2847,
      copiers: 12847,
      aum: 8500000,
      maxDrawdown: -12.3,
      sharpeRatio: 4.82,
      tradingDays: 365
    },
    {
      id: '2',
      name: 'MoonMaster2024',
      nickname: 'Futures King',
      avatar: '👑',
      verified: true,
      rank: 2,
      pnl: 1523847.20,
      pnlPercent: 523.9,
      roi: 847.2,
      followers: 32145,
      winRate: 89.2,
      totalTrades: 1952,
      copiers: 8521,
      aum: 5200000,
      maxDrawdown: -18.5,
      sharpeRatio: 3.95,
      tradingDays: 320
    },
    {
      id: '3',
      name: 'DiamondHandsDAO',
      nickname: 'HODLer Supreme',
      avatar: '💎',
      verified: true,
      rank: 3,
      pnl: 987452.75,
      pnlPercent: 387.5,
      roi: 623.4,
      followers: 28754,
      winRate: 86.7,
      totalTrades: 1654,
      copiers: 6847,
      aum: 3800000,
      maxDrawdown: -15.2,
      sharpeRatio: 3.54,
      tradingDays: 280
    }
  ];

  const topLosers: Trader[] = [
    {
      id: '1',
      name: 'SL Onur',
      nickname: 'TR Quant-Hedging',
      avatar: '🇹🇷',
      verified: false,
      rank: 1,
      pnl: -4847521.50,
      pnlPercent: -99.8,
      roi: -99.2,
      followers: 847,
      winRate: 12.3,
      totalTrades: 8521,
      copiers: 23,
      aum: 50000,
      maxDrawdown: -99.8,
      sharpeRatio: -8.45,
      tradingDays: 45
    },
    {
      id: '2',
      name: 'LeverageLarry420',
      nickname: 'YOLO Trader',
      avatar: '🎲',
      verified: false,
      rank: 2,
      pnl: -2145789.30,
      pnlPercent: -95.4,
      roi: -94.7,
      followers: 452,
      winRate: 18.9,
      totalTrades: 5847,
      copiers: 12,
      aum: 125000,
      maxDrawdown: -96.2,
      sharpeRatio: -6.23,
      tradingDays: 60
    },
    {
      id: '3',
      name: 'ShortSqueezed247',
      nickname: 'Bear Hunter',
      avatar: '🐻',
      verified: false,
      rank: 3,
      pnl: -1847521.90,
      pnlPercent: -89.3,
      roi: -87.6,
      followers: 284,
      winRate: 22.1,
      totalTrades: 4521,
      copiers: 8,
      aum: 180000,
      maxDrawdown: -91.5,
      sharpeRatio: -5.12,
      tradingDays: 75
    }
  ];

  const currentTraders = activeTab === 'gainers' ? topGainers : topLosers;

  return (
    <div className="h-full flex flex-col bg-[#0B0E11]">
      {/* Header - Compact Version */}
      <div className="h-12 border-b border-[#2B3139] flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Copy className="w-4 h-4 text-yellow-400" />
          <h2 className="text-sm text-white">Copy Trading</h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#1E2329] p-0.5 rounded">
          <button
            onClick={() => setActiveTab('gainers')}
            className={`px-2 py-1 text-xs rounded transition-all ${
              activeTab === 'gainers'
                ? 'bg-green-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={() => setActiveTab('losers')}
            className={`px-2 py-1 text-xs rounded transition-all ${
              activeTab === 'losers'
                ? 'bg-red-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      {/* Traders List - Compact Version */}
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-3">
          {currentTraders.map((trader, index) => (
            <motion.div
              key={trader.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-[#1E2329] border rounded-lg p-3 hover:border-yellow-500/50 transition-all ${
                activeTab === 'gainers' 
                  ? 'border-green-500/30' 
                  : 'border-red-500/30'
              }`}
            >
              {/* Rank Badge */}
              <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeTab === 'gainers'
                  ? trader.rank === 1 ? 'bg-yellow-500 text-black' :
                    trader.rank === 2 ? 'bg-gray-400 text-black' :
                    'bg-orange-600 text-white'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                #{trader.rank}
              </div>

              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {trader.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h3 className="text-sm text-white truncate">{trader.name}</h3>
                    {trader.verified && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{trader.nickname}</div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">PNL (30D)</span>
                  <div className="text-right">
                    <div className={`text-sm ${trader.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trader.pnl >= 0 ? '+' : ''}${(Math.abs(trader.pnl) / 1000).toFixed(1)}K
                    </div>
                    <div className={`text-xs ${trader.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trader.pnlPercent >= 0 ? '+' : ''}{trader.pnlPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">ROI</span>
                  <div className={`text-sm ${trader.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trader.roi >= 0 ? '+' : ''}{trader.roi.toFixed(1)}%
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Win Rate</span>
                  <div className={`text-sm ${trader.winRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                    {trader.winRate.toFixed(1)}%
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Copiers</span>
                  <div className="text-sm text-white flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {(trader.copiers / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {activeTab === 'gainers' ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-xs rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-3 h-3" />
                  Copy Trade
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onApply}
                    className="w-full px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors mb-2"
                  >
                    Join CS Team & Help
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-2 bg-red-500/10 border border-red-500/30 rounded flex items-start gap-1.5"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-red-300">
                      Devastating losses! Help prevent this.
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Banner - Compact */}
        {activeTab === 'losers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 p-4 bg-gradient-to-r from-green-900/40 to-green-950/40 border-2 border-green-500/50 rounded-lg"
          >
            <h3 className="text-sm text-green-400 mb-2">Be Part of the Solution</h3>
            <p className="text-xs text-gray-300 mb-3">
              Join our CS team and help traders avoid devastating losses.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApply}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
            >
              Apply Now
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
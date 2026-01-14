import React, { useState } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { ChartSection } from './ChartSection';
import { OrderBook } from './OrderBook';
import { TradesPanel } from './TradesPanel';
import { NotificationBanner } from './NotificationBanner';
import { PositionsPanel } from './PositionsPanel';
import { CopyTradingSection } from './CopyTradingSection';
import { motion, AnimatePresence } from 'motion/react';
import { X, BarChart2, Copy } from 'lucide-react';

interface TradingInterfaceProps {
  onApply: () => void;
}

export function TradingInterface({ onApply }: TradingInterfaceProps) {
  const [showCopyTrading, setShowCopyTrading] = useState(false);
  const [rightPanelView, setRightPanelView] = useState<'orderbook' | 'copytrading'>('copytrading');

  return (
    <div className="h-screen flex flex-col bg-[#0B0E11]">
      {/* Top Navigation */}
      <TopNav onApply={onApply} />

      {/* Notification Banner (replacing recruitment banner) */}
      <NotificationBanner onApply={onApply} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar onApply={onApply} onShowCopyTrading={() => setRightPanelView('copytrading')} />

          {/* Chart Area */}
          <div className="flex-1 flex flex-col">
            <ChartSection onApply={onApply} />
          </div>

          {/* Right Panel - Tabs + Content */}
          <div className="w-96 flex flex-col border-l border-[#2B3139]">
            {/* Tab Header */}
            <div className="h-12 border-b border-[#2B3139] flex items-center px-2 gap-1 bg-[#0B0E11]">
              <button
                onClick={() => setRightPanelView('orderbook')}
                className={`flex-1 h-9 flex items-center justify-center gap-2 text-xs rounded transition-all ${
                  rightPanelView === 'orderbook'
                    ? 'bg-[#2B3139] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1E2329]'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                Order Book
              </button>
              <button
                onClick={() => setRightPanelView('copytrading')}
                className={`flex-1 h-9 flex items-center justify-center gap-2 text-xs rounded transition-all ${
                  rightPanelView === 'copytrading'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1E2329]'
                }`}
              >
                <Copy className="w-4 h-4" />
                Copy Trading
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-hidden">
              {rightPanelView === 'orderbook' ? (
                <>
                  <OrderBook />
                  <TradesPanel />
                </>
              ) : (
                <CopyTradingSection onApply={onApply} />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Panel - Positions & Orders */}
        <PositionsPanel onApply={onApply} />
      </div>

      {/* Copy Trading Modal */}
      <AnimatePresence>
        {showCopyTrading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowCopyTrading(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0E11] border border-[#2B3139] rounded-xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCopyTrading(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#2B3139] hover:bg-[#3B4149] rounded-full flex items-center justify-center z-10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <CopyTradingSection onApply={() => {
                setShowCopyTrading(false);
                onApply();
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
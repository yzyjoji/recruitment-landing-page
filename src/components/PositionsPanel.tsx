import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, X, Settings, ChevronDown } from 'lucide-react';

interface PositionsPanelProps {
  onApply: () => void;
}

interface Position {
  symbol: string;
  side: 'Long' | 'Short';
  size: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  margin: number;
  pnl: number;
  pnlPercent: number;
  leverage: number;
}

interface Order {
  symbol: string;
  type: string;
  side: 'Buy' | 'Sell';
  price: number;
  amount: number;
  filled: number;
  total: number;
  triggerConditions: string;
  time: string;
}

export function PositionsPanel({ onApply }: PositionsPanelProps) {
  const [activeTab, setActiveTab] = useState<'positions' | 'orders' | 'history' | 'assets'>('positions');

  const positions: Position[] = [
    {
      symbol: 'FD/USDT',
      side: 'Long',
      size: 2.5,
      entryPrice: 2847.52,
      markPrice: 2851.30,
      liquidationPrice: 2560.77,
      margin: 2500,
      pnl: 9.45,
      pnlPercent: 0.38,
      leverage: 10
    },
    {
      symbol: 'BTCUSDT',
      side: 'Long',
      size: 0.15,
      entryPrice: 98450.00,
      markPrice: 98725.50,
      liquidationPrice: 88605.00,
      margin: 1500,
      pnl: 41.33,
      pnlPercent: 2.76,
      leverage: 10
    }
  ];

  const orders: Order[] = [
    {
      symbol: 'ETHUSDT',
      type: 'Limit',
      side: 'Buy',
      price: 3650.00,
      amount: 1.5,
      filled: 0,
      total: 5475.00,
      triggerConditions: 'None',
      time: '2024-12-19 14:32:15'
    },
    {
      symbol: 'SOLUSDT',
      type: 'Stop Limit',
      side: 'Sell',
      price: 195.50,
      amount: 25,
      filled: 0,
      total: 4887.50,
      triggerConditions: 'Mark Price ≤ 196.00',
      time: '2024-12-19 13:45:22'
    }
  ];

  const tabs = [
    { id: 'positions', label: 'Positions', count: positions.length },
    { id: 'orders', label: 'Open Orders', count: orders.length },
    { id: 'history', label: 'Order History', count: 0 },
    { id: 'assets', label: 'Assets', count: null }
  ];

  return (
    <div className="h-64 border-t border-[#2B3139] flex flex-col bg-[#0B0E11]">
      {/* Tabs */}
      <div className="h-10 border-b border-[#2B3139] flex items-center px-4 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-sm flex items-center gap-2 transition-colors ${
              activeTab === tab.id 
                ? 'text-yellow-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                activeTab === tab.id 
                  ? 'bg-yellow-400/20 text-yellow-400' 
                  : 'bg-[#2B3139] text-gray-500'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button className="text-xs text-gray-400 hover:text-white transition-colors">
            Auto-Margin
          </button>
          <Settings className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'positions' && (
          <div>
            {positions.length > 0 ? (
              <>
                {/* Table Header */}
                <div className="h-9 flex items-center px-4 text-xs text-gray-500 bg-[#0B0E11] sticky top-0 border-b border-[#2B3139]">
                  <div className="w-32">Symbol</div>
                  <div className="w-24">Size</div>
                  <div className="w-28">Entry Price</div>
                  <div className="w-28">Mark Price</div>
                  <div className="w-28">Liq. Price</div>
                  <div className="w-24">Margin</div>
                  <div className="w-32">PNL (ROE %)</div>
                  <div className="flex-1"></div>
                </div>

                {/* Positions */}
                {positions.map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-12 flex items-center px-4 text-sm hover:bg-[#2B3139]/30 border-b border-[#2B3139]/50 group"
                  >
                    <div className="w-32 flex items-center gap-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        position.side === 'Long' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {position.side}
                      </span>
                      <span className="text-white">{position.symbol}</span>
                      <span className="text-xs text-gray-500">{position.leverage}x</span>
                    </div>
                    <div className="w-24 text-white">{position.size}</div>
                    <div className="w-28 text-gray-300">{position.entryPrice.toFixed(2)}</div>
                    <div className="w-28 text-white">{position.markPrice.toFixed(2)}</div>
                    <div className="w-28 text-orange-400">{position.liquidationPrice.toFixed(2)}</div>
                    <div className="w-24 text-white">{position.margin.toFixed(2)}</div>
                    <div className="w-32">
                      <div className={position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} USDT
                      </div>
                      <div className={`text-xs ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1 bg-[#2B3139] hover:bg-[#3B4149] text-xs rounded transition-colors">
                        Close
                      </button>
                      <button className="px-3 py-1 bg-[#2B3139] hover:bg-[#3B4149] text-xs rounded transition-colors">
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <EmptyState 
                icon={TrendingUp}
                title="No Open Positions"
                subtitle="Ready to start trading? Make your first move!"
                action="Start Trading"
                onAction={onApply}
              />
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            {orders.length > 0 ? (
              <>
                {/* Table Header */}
                <div className="h-9 flex items-center px-4 text-xs text-gray-500 bg-[#0B0E11] sticky top-0 border-b border-[#2B3139]">
                  <div className="w-32">Symbol</div>
                  <div className="w-24">Type</div>
                  <div className="w-24">Side</div>
                  <div className="w-28">Price</div>
                  <div className="w-28">Amount</div>
                  <div className="w-28">Filled</div>
                  <div className="w-32">Total</div>
                  <div className="flex-1">Trigger Conditions</div>
                  <div className="w-20"></div>
                </div>

                {/* Orders */}
                {orders.map((order, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-12 flex items-center px-4 text-sm hover:bg-[#2B3139]/30 border-b border-[#2B3139]/50 group"
                  >
                    <div className="w-32 text-white">{order.symbol}</div>
                    <div className="w-24 text-gray-400">{order.type}</div>
                    <div className="w-24">
                      <span className={order.side === 'Buy' ? 'text-green-400' : 'text-red-400'}>
                        {order.side}
                      </span>
                    </div>
                    <div className="w-28 text-white">{order.price.toFixed(2)}</div>
                    <div className="w-28 text-gray-300">{order.amount}</div>
                    <div className="w-28 text-gray-400">{order.filled}/{order.amount}</div>
                    <div className="w-32 text-white">{order.total.toFixed(2)}</div>
                    <div className="flex-1 text-xs text-gray-400">{order.triggerConditions}</div>
                    <div className="w-20 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-red-500/20 rounded transition-colors">
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <EmptyState 
                icon={TrendingUp}
                title="No Open Orders"
                subtitle="You don't have any open orders at the moment"
                action="Place Order"
                onAction={onApply}
              />
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <EmptyState 
            icon={TrendingUp}
            title="No Order History"
            subtitle="Your trading history will appear here"
            action="Explore Opportunities"
            onAction={onApply}
          />
        )}

        {activeTab === 'assets' && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <div className="text-xs text-gray-500 mb-1">Total Balance</div>
                <div className="text-2xl text-white">12,547.89 USDT</div>
                <div className="text-xs text-green-400 mt-1">+2.34% (24h)</div>
              </div>
              <div className="p-4 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <div className="text-xs text-gray-500 mb-1">Available Balance</div>
                <div className="text-2xl text-white">8,547.89 USDT</div>
              </div>
              <div className="p-4 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <div className="text-xs text-gray-500 mb-1">Margin in Use</div>
                <div className="text-2xl text-white">4,000.00 USDT</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  action: string;
  onAction: () => void;
}

function EmptyState({ icon: Icon, title, subtitle, action, onAction }: EmptyStateProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center py-8">
      <Icon className="w-12 h-12 text-gray-600 mb-4" />
      <h3 className="text-lg text-gray-400 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{subtitle}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAction}
        className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm rounded transition-colors"
      >
        {action}
      </motion.button>
    </div>
  );
}

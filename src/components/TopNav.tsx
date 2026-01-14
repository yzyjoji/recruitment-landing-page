import React from 'react';
import { ChevronDown, User } from 'lucide-react';
import { motion } from 'motion/react';

interface TopNavProps {
  onApply: () => void;
}

export function TopNav({ onApply }: TopNavProps) {
  return (
    <div className="h-12 bg-[#0B0E11] border-b border-[#2B3139] flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded"></div>
          <span className="text-sm">
            <span className="text-yellow-400">Binance</span>
            <span className="text-white ml-1">FUTURES</span>
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <button className="hover:text-white transition-colors flex items-center gap-1">
            Futures <ChevronDown className="w-3 h-3" />
          </button>
          <button className="hover:text-white transition-colors flex items-center gap-1">
            Options <ChevronDown className="w-3 h-3" />
          </button>
          <button className="hover:text-white transition-colors flex items-center gap-1">
            Trading Bots <ChevronDown className="w-3 h-3" />
          </button>
          <button className="hover:text-white transition-colors">Copy Trading</button>
          <button className="hover:text-white transition-colors">Smart Money</button>
          <button className="hover:text-white transition-colors">Campaigns</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-400">
          <span className="text-green-400">JOIN CS TEAM</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-1.5 bg-yellow-400 text-black text-xs rounded hover:bg-yellow-500 transition-colors"
          onClick={onApply}
        >
          Apply Now
        </motion.button>
        
        <div className="w-8 h-8 bg-[#2B3139] rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'motion/react';
import { X, Users, TrendingUp, Award } from 'lucide-react';

interface RecruitmentBannerProps {
  onClose: () => void;
}

export function RecruitmentBanner({ onClose }: RecruitmentBannerProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-yellow-500/10 border-b border-green-500/30"
    >
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-sm">
              <span className="text-green-400">NOW HIRING:</span>
              <span className="text-white ml-2">Customer Service Agents for Futures Trading Department</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-gray-400">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              <span>High-Impact Role</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Award className="w-3 h-3 text-yellow-400" />
              <span>Career Growth</span>
            </div>
            <div className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs">
              Interactive Demo Below
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-[#2B3139] rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </motion.div>
  );
}

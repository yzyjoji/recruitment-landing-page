import React from 'react';
import { BarChart3, TrendingUp, Zap, Settings, BookOpen, HelpCircle, Briefcase, Copy } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  onApply: () => void;
  onShowCopyTrading: () => void;
  onToggleRightPanel?: () => void;
}

export function Sidebar({ onApply, onShowCopyTrading, onToggleRightPanel }: SidebarProps) {
  const tools = [
    { icon: BarChart3, label: 'Chart' },
    { icon: TrendingUp, label: 'Indicators' },
    { icon: Zap, label: 'Orders' },
    { icon: Settings, label: 'Settings' },
    { icon: BookOpen, label: 'Learn' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="w-14 bg-[#0B0E11] border-r border-[#2B3139] flex flex-col items-center py-4 gap-4">
      {tools.map((tool, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(43, 49, 57, 0.5)' }}
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#2B3139]/50 transition-colors group relative"
          title={tool.label}
        >
          <tool.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-300" />
          
          {/* Tooltip */}
          <div className="absolute left-14 bg-[#2B3139] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
            {tool.label}
          </div>
        </motion.button>
      ))}

      {/* Recruitment Icon */}
      <div className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          animate={{ 
            boxShadow: [
              '0 0 0px rgba(34, 197, 94, 0)',
              '0 0 15px rgba(34, 197, 94, 0.5)',
              '0 0 0px rgba(34, 197, 94, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={onApply}
          className="w-10 h-10 flex items-center justify-center rounded bg-green-500/20 border border-green-500/50 group relative"
          title="Join Our Team"
        >
          <Briefcase className="w-5 h-5 text-green-400" />
          
          {/* Tooltip */}
          <div className="absolute left-14 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
            Join CS Team
          </div>
        </motion.button>
      </div>

      {/* Copy Trading Icon */}
      <div className="mt-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 flex items-center justify-center rounded bg-blue-500/20 border border-blue-500/50 group relative"
          title="Copy Trading"
          onClick={onShowCopyTrading}
        >
          <Copy className="w-5 h-5 text-blue-400" />
          
          {/* Tooltip */}
          <div className="absolute left-14 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
            Copy Trading
          </div>
        </motion.button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Briefcase, TrendingUp, Zap } from 'lucide-react';

interface NotificationBannerProps {
  onApply: () => void;
}

export function NotificationBanner({ onApply }: NotificationBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const notifications = [
    { 
      icon: Briefcase,
      text: "NOW HIRING: Customer Service Agents for Futures Trading Department",
      subtext: "Help traders navigate volatility • 24/7 Support • Competitive salary",
      action: "Apply Now",
      color: "green"
    },
    { 
      icon: TrendingUp,
      text: "Binance now supports using shampoo as collateral in Portfolio Margin",
      subtext: "Trade smarter, not harder • Use your bathroom supplies",
      color: "blue"
    },
    { 
      icon: Zap,
      text: "Binance Futures lists LIQUIDATEMEPLEASE/USDT",
      subtext: "New perpetual contract • 125x leverage available",
      color: "yellow"
    },
    { 
      icon: Briefcase,
      text: "CS Team Expansion: Join the frontline of crypto support",
      subtext: "Remote work • Career growth • Make a difference",
      action: "Join Now",
      color: "green"
    },
    { 
      icon: TrendingUp,
      text: "Portfolio Margin now accepts your mom's credit card",
      subtext: "Innovative collateral solutions for modern trading",
      color: "blue"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const current = notifications[currentIndex];
  const Icon = current.icon;

  const colorClasses = {
    green: "from-green-500/10 via-green-600/10 to-green-500/10 border-green-500/30",
    blue: "from-blue-500/10 via-blue-600/10 to-blue-500/10 border-blue-500/30",
    yellow: "from-yellow-500/10 via-yellow-600/10 to-yellow-500/10 border-yellow-500/30"
  };

  const iconColors = {
    green: "text-green-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400"
  };

  const textColors = {
    green: "text-green-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400"
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[current.color as keyof typeof colorClasses]} border-b`}>
      <div className="px-6 py-2.5 flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 flex-1"
          >
            <Icon className={`w-5 h-5 ${iconColors[current.color as keyof typeof iconColors]}`} />
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${textColors[current.color as keyof typeof textColors]}`}>
                  {current.text}
                </span>
                {current.action && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onApply}
                    className="ml-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md flex items-center gap-1 transition-colors"
                  >
                    {current.action}
                    <ChevronRight className="w-3 h-3" />
                  </motion.button>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {current.subtext}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex items-center gap-1.5 ml-4">
          {notifications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-green-400 w-4' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

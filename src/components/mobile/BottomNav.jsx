import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowLeftRight, Brain, User } from 'lucide-react';

const tabs = [
  { key: 'total', label: 'Home', icon: LayoutDashboard },
  { key: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { key: 'insights', label: 'AI', icon: Brain },
  { key: 'profile', label: 'Profile', icon: User },
];

const BottomNav = ({ activeTab, onTabChange }) => {
  // Map compound tabs to their bottom nav parent
  const getActiveNavKey = (tab) => {
    if (tab === 'expenseList' || tab === 'incomeList' || tab === 'transactions') return 'transactions';
    if (tab === 'settings' || tab === 'profile') return 'profile';
    if (tab === 'insights') return 'insights';
    return 'total';
  };

  const activeNavKey = getActiveNavKey(activeTab);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeNavKey === tab.key;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              whileTap={{ scale: 0.85 }}
              className={`relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-colors duration-200 ${
                isActive
                  ? 'text-indigo-600 dark:text-amber-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {/* Active indicator pill */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-1 w-8 h-1 rounded-full bg-indigo-600 dark:bg-amber-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className="transition-all duration-200"
              />
              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default React.memo(BottomNav);

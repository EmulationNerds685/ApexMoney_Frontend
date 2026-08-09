import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TransactionsScreen = ({ expenses, incomes, totalExpense, totalIncome, userCurrency, onEditExpense, onEditIncome, onDeleteExpense, onDeleteIncome, ExpenseListComponent, IncomeListComponent }) => {
  const [activeSegment, setActiveSegment] = useState('expenses');

  return (
    <div className="flex flex-col h-full">
      {/* Segmented Control */}
      <div className="sticky top-0 z-10 bg-slate-100/95 dark:bg-[#0f0e17]/95 backdrop-blur-xl pt-2 pb-3 px-4">
        <div className="flex bg-gray-200/80 dark:bg-gray-800 rounded-xl p-1 gap-1">
          {[
            { key: 'expenses', label: 'Expenses' },
            { key: 'income', label: 'Income' },
          ].map((seg) => (
            <button
              key={seg.key}
              onClick={() => setActiveSegment(seg.key)}
              className={`relative flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                activeSegment === seg.key
                  ? 'text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {activeSegment === seg.key && (
                <motion.div
                  layoutId="segmentIndicator"
                  className="absolute inset-0 bg-indigo-600 dark:bg-amber-500 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{seg.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeSegment}
        initial={{ opacity: 0, x: activeSegment === 'expenses' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 px-2"
      >
        {activeSegment === 'expenses' ? (
          <ExpenseListComponent
            expenses={expenses}
            totalExpense={totalExpense}
            userCurrency={userCurrency}
            onEdit={onEditExpense}
            onDelete={onDeleteExpense}
          />
        ) : (
          <IncomeListComponent
            incomes={incomes}
            totalIncome={totalIncome}
            userCurrency={userCurrency}
            onEdit={onEditIncome}
            onDelete={onDeleteIncome}
          />
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(TransactionsScreen);

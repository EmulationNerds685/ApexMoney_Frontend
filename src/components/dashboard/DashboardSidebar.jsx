import React from 'react';

const DashboardSidebar = ({ activeTab, handleTabChange }) => {
  const navItems = [
    { key: 'total', label: 'Overview' },
    { key: 'income', label: 'Income' },
    { key: 'expense', label: 'Expense' },
    { key: 'expenseList', label: 'Expense List' },
    { key: 'incomeList', label: 'Income List' },
  ];

  return (
    <aside className="relative bottom-6 left-2 w-60 bg-indigo-600 mt-12 text-white flex flex-col py-6 px-4 rounded-2xl shadow-md ">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleTabChange(item.key)}
            className={`py-2 px-4 rounded-lg text-left transition ${
              activeTab === item.key
                ? 'bg-white text-indigo-600 font-semibold'
                : 'hover:bg-indigo-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
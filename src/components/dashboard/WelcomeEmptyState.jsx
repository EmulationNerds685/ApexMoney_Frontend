import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeEmptyState = ({ user, handleTabChange }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-md text-center">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">
        Welcome, {user?.name || user?.email}!
      </h2>
      <p className="text-gray-500 mb-8 text-lg">
        No data available to display charts.
        <br />
        Let's get started by adding your first transaction.
      </p>
      <div className="flex gap-6">
        <Link to="/income" onClick={() => handleTabChange('incomeList')}>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 font-semibold shadow-lg">
            + Add Income
          </button>
        </Link>
        <Link to="/expense" onClick={() => handleTabChange('expenseList')}>
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 font-semibold shadow-lg">
            + Add Expense
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeEmptyState;
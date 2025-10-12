import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';

const DashboardOverview = ({ user, pieData, barData, lineData, totalIncome, totalExpense }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Welcome, {user?.name || user?.email} 👋
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
          <div className="w-[80%]">
            <h3 className="text-lg font-semibold mb-3 text-center">Income vs Expense</h3>
            <Pie data={pieData} />
          </div>
        </div>
        <div className="bg-purple-50 p-2 rounded-xl shadow-sm flex justify-center">
          <div className="w-[95%]">
            <h3 className="text-lg font-semibold mb-3 text-center">Expense by Category</h3>
            <Bar data={barData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
      <div className="mt-8 bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
        <div className="w-[90%]">
          <h3 className="text-lg font-semibold mb-3 text-center">Income Over Time</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>
      <div className="mt-8 flex justify-around text-center text-gray-800">
        <div>
          <h4 className="font-semibold text-green-600 text-xl">Total Income</h4>
          <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div>
          <h4 className="font-semibold text-red-600 text-xl">Total Expense</h4>
          <p className="text-2xl font-bold">₹{totalExpense.toLocaleString()}</p>
        </div>
        <div>
          <h4 className="font-semibold text-indigo-600 text-xl">Net Savings</h4>
          <p className="text-2xl font-bold">₹{(totalIncome - totalExpense).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
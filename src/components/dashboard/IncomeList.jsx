import React from 'react';
import { Link } from 'react-router-dom';

const IncomeList = ({ incomes, totalIncome, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Income List</h2>
        <Link to="/income">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            + Add Income
          </button>
        </Link>
      </div>

      {incomes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No incomes found. Add your first income!
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold">Amount</th>
                  <th className="p-3 text-left font-semibold">Source</th>
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-left font-semibold">Notes</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income) => (
                  <tr key={income._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">₹{income.amount}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {income.source || income.category || 'No Source'}
                      </span>
                    </td>
                    <td className="p-3">{new Date(income.date).toLocaleDateString('en-IN')}</td>
                    <td className="p-3 text-gray-600">{income.notes || '-'}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(income)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                          Edit
                        </button>
                        <button onClick={() => onDelete(income._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-green-700">Total Income</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeList;
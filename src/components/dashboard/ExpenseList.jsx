import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseList = ({ expenses, totalExpense, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Expense List</h2>
        <Link to="/expense">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            + Add Expense
          </button>
        </Link>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No expenses found. Add your first expense!
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold">Amount</th>
                  <th className="p-3 text-left font-semibold">Category</th>
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-left font-semibold">Notes</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">₹{expense.amount}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {expense.category}
                      </span>
                    </td>
                    <td className="p-3">{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                    <td className="p-3 text-gray-600">{expense.notes || '-'}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(expense)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                          Edit
                        </button>
                        <button onClick={() => onDelete(expense._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-red-700">Total Expenses</h3>
              <p className="text-2xl font-bold text-red-600">
                ₹{totalExpense.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
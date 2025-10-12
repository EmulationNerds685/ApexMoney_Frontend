import React from 'react';

const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('en-IN');

export function IncomeList({ incomes, onEdit, onDelete }) {
    if (!incomes || incomes.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No incomes to display.</p>;
    }
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Income History</h3>
            <ul className="space-y-4">
                {incomes.map((income) => (
                    <li key={income._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-gray-50">
                        <div className="flex-1 mb-3 sm:mb-0">
                            <div className="flex items-center gap-4">
                                <p className="font-bold text-lg text-gray-800">{income.category}</p>
                                <p className="text-sm text-gray-500">{formatDate(income.date)}</p>
                            </div>
                            <p className="text-gray-600 mt-1">{income.notes}</p>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <p className="font-semibold text-lg text-green-600 sm:mx-4">₹{income.amount.toLocaleString()}</p>
                            <button onClick={() => onEdit(income)} className="font-medium text-blue-600 hover:text-blue-800">Edit</button>
                            <button onClick={() => onDelete(income._id)} className="font-medium text-gray-600 hover:text-red-700">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
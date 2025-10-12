import React, { useState, useEffect } from 'react';

const EditExpenseModal = ({ expense, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(expense);

  useEffect(() => {
    setFormData(expense);
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-4">
        <h3 className="text-2xl font-bold mb-4">Edit Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" name="date" value={new Date(formData.date).toISOString().slice(0, 10)} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea name="notes" value={formData.notes || ''} onChange={handleChange} className="w-full p-2 border rounded" rows="3" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
import React, { useState } from 'react';

// Form component jahan user naya kharch add karega
 export function AddExpenseForm() {
  // State variables form ke har input field ke liye
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Aaj ki date by default
  const [notes, setNotes] = useState('');

  // Shuruaat ke liye kuch categories
  const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];

  // Form submit hone par yeh function chalega
  const handleSubmit = (event) => {
    event.preventDefault(); // Page ko reload hone se rokta hai
    
    // Yahan hum form data ko console par print kar rahe hain
    // Asal app mein aap yahan data ko database mein bhejenge
    console.log({
      amount: parseFloat(amount),
      category,
      date,
      notes,
    });
    
    // TODO: Yahan API call karke data backend mein save karein
    alert('Expense saved successfully! Check console for data.');

    // Form ko reset kar dein
    setAmount('');
    setCategory('Food');
    setDate(new Date().toISOString().slice(0, 10));
    setNotes('');
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Add New Expense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">
            Amount 
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">
            Category 
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">
            Date 
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            required
          />
        </div>

        {/* Notes Textarea */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-600 mb-1">
            Notes 
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            placeholder="e.g., Lunch with colleagues"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
}


// Main App component jo form ko display karega



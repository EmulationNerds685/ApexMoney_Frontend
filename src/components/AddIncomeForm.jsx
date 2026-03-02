import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseToast from "../toast/ExpenseToast";

export function AddIncomeForm() {
  const backend = import.meta.env.VITE_BACKENDURL;
  const { user } = useUser();
  const navigate = useNavigate();
  const initialState = {
    amount: "",
    category: "Salary",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  };

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const popularTags = ['recurring', 'one-time', 'passive', 'active', 'bonus', 'freelance', 'investment', 'side-hustle'];

  const [formData, setFormData] = useState(initialState);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const categories = [
    "Salary",
    "Freelance",
    "Investments",
    "Business",
    "Gifts",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backend}/income/add`, {
        userId: user._id,
        ...formData,
        amount: parseFloat(formData.amount),
        tags,
      });

      if (response.data) {

        setShowToast(true);
        setFormData(initialState);
        setTags([]);
        localStorage.setItem('dashboardActiveTab', 'incomeList');
        navigate('/dashboard');

      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error saving income. Please try again.");
    }
  };
  return !user ? (
    <div className="flex justify-center items-center">
      <div className="bg-white m-5 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Please Signup/Login before adding Income
        </h2>
        <Link to="/signup/login" className="text-blue-600 hover:text-blue-900">
          Signup/Login
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <ExpenseToast
        show={showToast}
        title="Success!"
        message="Your income has been saved."
        onClose={() => setShowToast(false)}
      />

      <div className="bg-white m-5 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Income
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              placeholder="e.g., Salary for October"
            ></textarea>
          </div>
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  #{tag}
                  <button type="button" onClick={() => setTags(tags.filter((_, idx) => idx !== i))} className="text-emerald-400 hover:text-emerald-700 ml-0.5 text-xs font-bold">✕</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && tagInput.trim()) {
                    e.preventDefault();
                    const t = tagInput.trim().toLowerCase();
                    if (!tags.includes(t)) setTags([...tags, t]);
                    setTagInput('');
                  }
                }}
                className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                placeholder="Type tag & press Enter"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {popularTags.filter(t => !tags.includes(t)).slice(0, 5).map(t => (
                <button key={t} type="button" onClick={() => setTags([...tags, t])} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition">
                  +{t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            Save Income
          </button>
        </form>
      </div>
    </div>
  );
}
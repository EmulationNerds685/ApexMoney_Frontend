import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseToast from "../toast/ExpenseToast";

export function AddExpenseForm({ expenseToEdit, onFormSubmit, onCancelEdit }) {
  const backend = import.meta.env.VITE_BACKENDURL;
  const { user } = useUser();
  const navigate = useNavigate();
  const initialState = {
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        _id: expenseToEdit._id,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        date: new Date(expenseToEdit.date).toISOString().slice(0, 10),
        notes: expenseToEdit.notes || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [expenseToEdit]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const categories = [
    "Food", "Travel", "Shopping", "Bills", "Health", "Entertainment", "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSubmit = {
      ...formData,
      amount: parseFloat(formData.amount),
      userId: user._id,
    };

    try {
      let response;
      if (formData._id) {

        response = await axios.put(
          `${backend}/expense/update/${formData._id}`,
          dataToSubmit
        );
        setToastMessage("Your expense has been updated.");
      } else {

        response = await axios.post(
          `${backend}/expense/add`,
          dataToSubmit
        );
        setToastMessage("Your expense has been saved.");
      }

      if (response.data) {
        if (onFormSubmit) {
          onFormSubmit();
        }
        if (!formData._id) {
          localStorage.setItem('dashboardActiveTab', 'expenseList');
          navigate('/dashboard');
        } else {

          setShowToast(true);
          setFormData(initialState);
        }

      } else {
        alert(response.data.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.log(error);
      alert("Error saving expense. Please try again.");
    }
  };
  if (!user) {
    return (
      <div className="flex justify-center items-center">
        <div className="bg-white m-5 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Please Log In
          </h2>
          <Link to="/signup/login" className="text-blue-600 hover:text-blue-900 font-semibold">
            Go to Login/Signup Page
          </Link>
        </div>
      </div>
    );
  }

  const isEditing = !!formData._id;
  return (
    <div className="flex justify-center items-center">
      <ExpenseToast
        show={showToast}
        title="Success!"
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
      <div className="bg-white m-5 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          {isEditing ? "Edit Expense" : "Add New Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" placeholder="0.00" required />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white" required>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" required />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" placeholder="e.g., Lunch with colleagues"></textarea>
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="flex-grow bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
              {isEditing ? "Update Expense" : "Save Expense"}
            </button>
            {isEditing && (
              <button type="button" onClick={onCancelEdit} className="bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
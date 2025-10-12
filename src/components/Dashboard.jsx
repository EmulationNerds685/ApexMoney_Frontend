import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Added navigate hook
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("total");
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const expenseRes = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/expense/get?userId=${user._id}`
      );
      const incomeRes = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/income/get?userId=${user._id}`
      );

      const expensesData = Array.isArray(expenseRes.data)
        ? expenseRes.data
        : expenseRes.data.expenses || expenseRes.data.data || expenseRes.data.documents || [];

      const incomesData = Array.isArray(incomeRes.data)
        ? incomeRes.data
        : incomeRes.data.incomes || incomeRes.data.data || incomeRes.data.documents || [];

      setExpenses(expensesData);
      setIncomes(incomesData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setExpenses([]);
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  // EXPENSE CRUD Operations
  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKENDURL}/expense/delete/${expenseId}`
      );
      
      setExpenses(prev => prev.filter(expense => expense._id !== expenseId));
      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense. Please try again.");
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEditExpense = () => {
    setEditingExpense(null);
  };

  // INCOME CRUD Operations
  const handleDeleteIncome = async (incomeId) => {
    if (!window.confirm("Are you sure you want to delete this income?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKENDURL}/income/delete/${incomeId}`
      );
      
      setIncomes(prev => prev.filter(income => income._id !== incomeId));
      alert("Income deleted successfully!");
    } catch (error) {
      console.error("Error deleting income:", error);
      alert("Failed to delete income. Please try again.");
    }
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income);
  };

  const handleCancelEditIncome = () => {
    setEditingIncome(null);
  };

  // Show loading or redirect if no user
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Redirecting to home page...
      </div>
    );
  }

  // Chart data preparation
  const totalIncome = incomes.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, t) => sum + (t.amount || 0), 0);

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4CAF50", "#F87171"],
        hoverBackgroundColor: ["#22C55E", "#EF4444"],
      },
    ],
  };

  const expenseCategories = [...new Set(expenses.map((e) => e.category))];
  const expenseAmounts = expenseCategories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + (e.amount || 0), 0)
  );

  const barData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expense by Category",
        data: expenseAmounts,
        backgroundColor: "#A855F7",
      },
    ],
  };

  const lineData = {
    labels: incomes.map((t) => new Date(t.date).toLocaleDateString("en-IN")),
    datasets: [
      {
        label: "Income Over Time",
        data: incomes.map((t) => t.amount),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="relative bottom-6 left-2 w-60 bg-indigo-600 mt-12 text-white flex flex-col py-6 px-4 rounded-2xl shadow-md ">
        <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          <button
            className={`py-2 px-4 rounded-lg text-left transition ${
              activeTab === "total"
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
            onClick={() => setActiveTab("total")}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-left transition ${
              activeTab === "income"
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
            onClick={() => setActiveTab("income")}
          >
            Income
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-left transition ${
              activeTab === "expense"
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
            onClick={() => setActiveTab("expense")}
          >
            Expense
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-left transition ${
              activeTab === "expenseList"
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
            onClick={() => setActiveTab("expenseList")}
          >
            Expense List
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-left transition ${
              activeTab === "incomeList"
                ? "bg-white text-indigo-600 font-semibold"
                : "hover:bg-indigo-500"
            }`}
            onClick={() => setActiveTab("incomeList")}
          >
            Income List
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        {!loading && expenses.length === 0 && incomes.length === 0 ? (
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
              <Link to="/income">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 font-semibold shadow-lg">
                  + Add Income
                </button>
              </Link>
              <Link to="/expense">
                <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 font-semibold shadow-lg">
                  + Add Expense
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "total" && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Welcome, {user?.name || user?.email} 👋
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
                    <div className="w-[80%]">
                      <h3 className="text-lg font-semibold mb-3 text-center">
                        Income vs Expense
                      </h3>
                      <Pie data={pieData} />
                    </div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-xl shadow-sm flex justify-center">
                    <div className="w-[95%]">
                      <h3 className="text-lg font-semibold mb-3 text-center">
                        Expense by Category
                      </h3>
                      <Bar data={barData} options={{ responsive: true }} />
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
                  <div className="w-[90%]">
                    <h3 className="text-lg font-semibold mb-3 text-center">
                      Income Over Time
                    </h3>
                    <Line data={lineData} options={{ responsive: true }} />
                  </div>
                </div>
                <div className="mt-8 flex justify-around text-center text-gray-800">
                  <div>
                    <h4 className="font-semibold text-green-600 text-xl">
                      Total Income
                    </h4>
                    <p className="text-2xl font-bold">
                      ₹{totalIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 text-xl">
                      Total Expense
                    </h4>
                    <p className="text-2xl font-bold">
                      ₹{totalExpense.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-600 text-xl">
                      Net Savings
                    </h4>
                    <p className="text-2xl font-bold">
                      ₹{(totalIncome - totalExpense).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expenseList" && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-700">
                    Expense List
                  </h2>
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
                  <div className="overflow-x-auto">
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
                            <td className="p-3">
                              {new Date(expense.date).toLocaleDateString("en-IN")}
                            </td>
                            <td className="p-3 text-gray-600">
                              {expense.notes || "-"}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditExpense(expense)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteExpense(expense._id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "incomeList" && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-700">
                    Income List
                  </h2>
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
                  <div className="overflow-x-auto">
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
                                {income.source || income.category || "No Source"}
                              </span>
                            </td>
                            <td className="p-3">
                              {new Date(income.date).toLocaleDateString("en-IN")}
                            </td>
                            <td className="p-3 text-gray-600">
                              {income.notes || "-"}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditIncome(income)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteIncome(income._id)}
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "income" && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-700">
                    Income Data
                  </h2>
                  <Link to="/income">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                      + Add Income
                    </button>
                  </Link>
                </div>
                <Line data={lineData} />
              </div>
            )}

            {activeTab === "expense" && (
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-700">
                    Expense Data
                  </h2>
                  <Link to="/expense">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                      + Add Expense
                    </button>
                  </Link>
                </div>
                <Bar data={barData} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Edit Expense Modal */}
      {editingExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-4">
            <h3 className="text-2xl font-bold mb-4">Edit Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={editingExpense.amount}
                  onChange={(e) => setEditingExpense({
                    ...editingExpense,
                    amount: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={editingExpense.category}
                  onChange={(e) => setEditingExpense({
                    ...editingExpense,
                    category: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                >
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
                <input
                  type="date"
                  value={new Date(editingExpense.date).toISOString().slice(0, 10)}
                  onChange={(e) => setEditingExpense({
                    ...editingExpense,
                    date: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={editingExpense.notes || ""}
                  onChange={(e) => setEditingExpense({
                    ...editingExpense,
                    notes: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      await axios.put(
                        `${import.meta.env.VITE_BACKENDURL}/expense/update/${editingExpense._id}`,
                        editingExpense
                      );
                      setEditingExpense(null);
                      fetchData();
                      alert("Expense updated successfully!");
                    } catch (error) {
                      console.error("Error updating expense:", error);
                      alert("Failed to update expense.");
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEditExpense}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Income Modal */}
      {editingIncome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-4">
            <h3 className="text-2xl font-bold mb-4">Edit Income</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={editingIncome.amount}
                  onChange={(e) => setEditingIncome({
                    ...editingIncome,
                    amount: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Source</label>
                <input
                  type="text"
                  value={editingIncome.source || editingIncome.category || ""}
                  onChange={(e) => setEditingIncome({
                    ...editingIncome,
                    source: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="Salary, Freelance, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={new Date(editingIncome.date).toISOString().slice(0, 10)}
                  onChange={(e) => setEditingIncome({
                    ...editingIncome,
                    date: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={editingIncome.notes || ""}
                  onChange={(e) => setEditingIncome({
                    ...editingIncome,
                    notes: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      await axios.put(
                        `${import.meta.env.VITE_BACKENDURL}/income/update/${editingIncome._id}`,
                        editingIncome
                      );
                      setEditingIncome(null);
                      fetchData();
                      alert("Income updated successfully!");
                    } catch (error) {
                      console.error("Error updating income:", error);
                      alert("Failed to update income.");
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEditIncome}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
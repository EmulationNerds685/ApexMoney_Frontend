import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
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
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("total");

  useEffect(() => {
    if (!user) return;

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
          : expenseRes.data.data || expenseRes.data.documents || [];

        const incomesData = Array.isArray(incomeRes.data)
          ? incomeRes.data
          : incomeRes.data.data || incomeRes.data.documents || [];

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

    fetchData();
  }, [user]);

  // --- Chart Data Preparation (Moved up for clarity) ---
  // This data is only used if there are transactions, but it's safe to define here.
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

  // --- Main Render Logic ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  // **The main layout is now always rendered**
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        {/* --- NEW: Conditional Rendering Logic --- */}
        {!loading && expenses.length === 0 && incomes.length === 0 ? (
          // --- NEW: "No Data Available" View ---
          <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-md text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Welcome, {user?.name || user?.email}!
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              No data available to display .
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
          // --- Original Chart View (renders if data exists) ---
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
                  <div className="bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
                    <div className="w-[85%]">
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
    </div>
  );
};

export default Dashboard;
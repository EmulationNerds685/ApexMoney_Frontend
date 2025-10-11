import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Bar, Pie, Line } from "react-chartjs-2";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!expenses.length && !incomes.length) {
    return (
      <div className="flex  justify-center items-center h-96 text-gray-500 text-lg">
        No transaction data available yet.
      </div>
    );
  }

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
    labels: incomes.map((t) =>
      new Date(t.date).toLocaleDateString("en-IN")
    ),
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

  return (
    <div className="min-w-full mx-auto my-8 mt-10 px-4 py-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Welcome, {user?.name || user?.email} 👋
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Income vs Expense */}
        <div className="bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
          <div className="w-[80%] md:w-[70%] lg:w-[60%]">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Income vs Expense
            </h3>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Expense by Category */}
        <div className="bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
          <div className="w-[85%] md:w-[75%] lg:w-[65%]">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Expense by Category
            </h3>
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.2,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>

      {/* Income Over Time */}
      <div className="mt-8 bg-purple-50 p-4 rounded-xl shadow-sm flex justify-center">
        <div className="w-[90%] md:w-[80%] lg:w-[70%]">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Income Over Time
          </h3>
          <Line
            data={lineData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 1.5,
            }}
          />
        </div>
      </div>

      {/* Summary Section */}
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
          <h4 className="font-semibold text-indigo-600 text-xl">
            Net Savings
          </h4>
          <p className="text-2xl font-bold">
            ₹{(totalIncome - totalExpense).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

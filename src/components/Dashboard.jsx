import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title,
} from 'chart.js';

// Import the new components
import DashboardSidebar from './dashboard/DashboardSidebar';
import WelcomeEmptyState from './dashboard/WelcomeEmptyState';
import DashboardOverview from './dashboard/DashboardOverview';
import ExpenseList from './dashboard/ExpenseList';
import IncomeList from './dashboard/IncomeList';
import EditExpenseModal from './dashboard/EditExpenseModal';
import EditIncomeModal from './dashboard/EditIncomeModal';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('total');
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Auth check and data fetching
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!user && !storedUser) {
      navigate('/');
    } else {
      setCheckingAuth(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  
  // Tab state persistence
  useEffect(() => {
    const savedTab = localStorage.getItem('dashboardActiveTab');
    if (savedTab) setActiveTab(savedTab);
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardActiveTab', activeTab);
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
   try {
      const [expenseRes, incomeRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKENDURL}/expense/get?userId=${user._id}`),
        axios.get(`${import.meta.env.VITE_BACKENDURL}/income/get?userId=${user._id}`),
      ]);

      // Correctly parse the expense data from the API response
      const expensesData = Array.isArray(expenseRes.data)
        ? expenseRes.data
        : expenseRes.data.expenses || expenseRes.data.data || expenseRes.data.documents || [];
      
      // Correctly parse the income data from the API response (THIS IS THE FIX)
      const incomesData = Array.isArray(incomeRes.data)
        ? incomeRes.data
        : incomeRes.data.incomes || incomeRes.data.data || incomeRes.data.documents || [];

      setExpenses(expensesData);
      setIncomes(incomesData);

    } catch (err) {
      console.error('Error fetching data:', err);
      // It's good practice to reset to empty arrays on error
      setExpenses([]);
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKENDURL}/${type}/delete/${id}`);
      if (type === 'expense') setExpenses(prev => prev.filter(item => item._id !== id));
      if (type === 'income') setIncomes(prev => prev.filter(item => item._id !== id));
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}. Please try again.`);
    }
  };
  
  const handleUpdate = async (type, data) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKENDURL}/${type}/update/${data._id}`, data);
      setEditingExpense(null);
      setEditingIncome(null);
      fetchData(); // Refetch to ensure data consistency
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      alert(`Failed to update ${type}.`);
    }
  };
  
  // Totals and Chart Data Preparation
  const totalExpense = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const totalIncome = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [{ data: [totalIncome, totalExpense], backgroundColor: ['#4CAF50', '#F87171'] }],
  };

  const expenseCategories = [...new Set(expenses.map((e) => e.category))];
  const barData = {
    labels: expenseCategories,
    datasets: [{
      label: 'Expense by Category',
      data: expenseCategories.map((cat) => expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + (e.amount || 0), 0)),
      backgroundColor: '#A855F7',
    }],
  };
  
  const lineData = {
    labels: incomes.map((t) => new Date(t.date).toLocaleDateString('en-IN')),
    datasets: [{
      label: 'Income Over Time',
      data: incomes.map((t) => t.amount),
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79,70,229,0.2)',
      tension: 0.3,
      fill: true,
    }],
  };

  // Conditional Rendering Logic
  if (checkingAuth) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
  if (loading) return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
  
  const renderContent = () => {
    if (!loading && expenses.length === 0 && incomes.length === 0) {
        return <WelcomeEmptyState user={user} handleTabChange={setActiveTab} />;
    }
    
    switch (activeTab) {
      case 'total':
        return <DashboardOverview user={user} pieData={pieData} barData={barData} lineData={lineData} totalIncome={totalIncome} totalExpense={totalExpense} />;
      case 'expenseList':
        return <ExpenseList expenses={expenses} totalExpense={totalExpense} onEdit={setEditingExpense} onDelete={(id) => handleDelete('expense', id)} />;
      case 'incomeList':
        return <IncomeList incomes={incomes} totalIncome={totalIncome} onEdit={setEditingIncome} onDelete={(id) => handleDelete('income', id)} />;
      case 'income':
        return <div className="bg-white p-6 rounded-2xl shadow-md"><h2 className="text-2xl font-bold text-indigo-700 mb-6">Income Data</h2><Line data={lineData} /></div>;
      case 'expense':
        return <div className="bg-white p-6 rounded-2xl shadow-md"><h2 className="text-2xl font-bold text-indigo-700 mb-6">Expense Data</h2><Bar data={barData} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar activeTab={activeTab} handleTabChange={setActiveTab} />
      
      <main className="flex-1 px-8 py-6">{renderContent()}</main>

      {editingExpense && <EditExpenseModal expense={editingExpense} onUpdate={(data) => handleUpdate('expense', data)} onCancel={() => setEditingExpense(null)} />}
      {editingIncome && <EditIncomeModal income={editingIncome} onUpdate={(data) => handleUpdate('income', data)} onCancel={() => setEditingIncome(null)} />}
    </div>
  );
};

export default Dashboard;
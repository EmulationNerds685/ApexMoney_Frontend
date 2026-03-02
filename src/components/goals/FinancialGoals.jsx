import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const FinancialGoals = ({ userId }) => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        goalName: '',
        targetAmount: '',
        currentAmount: 0,
        deadline: '',
        category: 'savings',
        monthlyContribution: ''
    });

    useEffect(() => {
        if (userId) {
            fetchGoals();
        }
    }, [userId]);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKENDURL}/goals/get`,
                { withCredentials: true }
            );
            setGoals(response.data || []);
        } catch (error) {
            console.error('Failed to fetch goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const addGoal = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKENDURL}/goals/create`,
                newGoal,
                { withCredentials: true }
            );
            setShowAddForm(false);
            setNewGoal({
                goalName: '',
                targetAmount: '',
                currentAmount: 0,
                deadline: '',
                category: 'savings',
                monthlyContribution: ''
            });
            fetchGoals();
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    const updateProgress = async (goalId, addAmount) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_BACKENDURL}/goals/update/${goalId}`,
                { addAmount: parseFloat(addAmount) },
                { withCredentials: true }
            );
            fetchGoals();
        } catch (error) {
            console.error('Failed to update goal:', error);
        }
    };

    const deleteGoal = async (goalId) => {
        if (!confirm('Are you sure you want to delete this goal?')) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKENDURL}/goals/delete/${goalId}`,
                { withCredentials: true }
            );
            fetchGoals();
        } catch (error) {
            console.error('Failed to delete goal:', error);
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            savings: '💰',
            debt_payoff: '💳',
            investment: '📈',
            emergency_fund: '🚨',
            vacation: '✈️',
            purchase: '🛍️',
            education: '📚',
            other: '🎯'
        };
        return icons[category] || icons.other;
    };

    const getCategoryColor = (category) => {
        const colors = {
            savings: 'from-green-500 to-emerald-500',
            debt_payoff: 'from-red-500 to-pink-500',
            investment: 'from-blue-500 to-cyan-500',
            emergency_fund: 'from-orange-500 to-yellow-500',
            vacation: 'from-purple-500 to-indigo-500',
            purchase: 'from-pink-500 to-rose-500',
            education: 'from-indigo-500 to-blue-500',
            other: 'from-gray-500 to-slate-500'
        };
        return colors[category] || colors.other;
    };

    const getProgressColor = (progress) => {
        if (progress >= 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        if (progress >= 25) return 'bg-orange-500';
        return 'bg-red-500';
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>🎯</span> Financial Goals
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Goal
                </button>
            </div>

            {/* Add Goal Form */}
            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Goal</h3>
                    <form onSubmit={addGoal} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Goal Name (e.g., Emergency Fund)"
                                value={newGoal.goalName}
                                onChange={(e) => setNewGoal({ ...newGoal, goalName: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Target Amount"
                                value={newGoal.targetAmount}
                                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                            <input
                                type="date"
                                value={newGoal.deadline}
                                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                            <select
                                value={newGoal.category}
                                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="savings">Savings</option>
                                <option value="debt_payoff">Debt Payoff</option>
                                <option value="investment">Investment</option>
                                <option value="emergency_fund">Emergency Fund</option>
                                <option value="vacation">Vacation</option>
                                <option value="purchase">Purchase</option>
                                <option value="education">Education</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Monthly Contribution (Optional)"
                                value={newGoal.monthlyContribution}
                                onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent md:col-span-2"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                            >
                                Create Goal
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Goals List */}
            {goals.length === 0 ? (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Goals Yet</h3>
                    <p className="text-gray-600 mb-4">
                        Set your first financial goal and start tracking your progress!
                    </p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                        Create Your First Goal
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {goals.map((goal, index) => {
                        const progress = parseFloat(goal.progressPercentage);
                        const remaining = parseFloat(goal.remainingAmount);
                        const daysLeft = goal.daysRemaining;

                        return (
                            <motion.div
                                key={goal._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className={`h-2 bg-gradient-to-r ${getCategoryColor(goal.category)}`}
                                    style={{ width: `${Math.min(progress, 100)}%` }}></div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`bg-gradient-to-br ${getCategoryColor(goal.category)} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                                                {getCategoryIcon(goal.category)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{goal.goalName}</h3>
                                                <span className="text-sm text-gray-500 capitalize">
                                                    {goal.category.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteGoal(goal._id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>${goal.currentAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}</span>
                                            <span className="font-semibold">{progress.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-full ${getProgressColor(progress)} transition-all duration-500 rounded-full`}
                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500">Remaining</div>
                                            <div className="font-bold text-gray-900">${remaining}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500">Days Left</div>
                                            <div className="font-bold text-gray-900">{daysLeft > 0 ? daysLeft : 'Overdue'}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500">Status</div>
                                            <div className={`font-bold ${progress >= 100 ? 'text-green-600' : daysLeft < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                                                {progress >= 100 ? '✅ Done' : daysLeft < 0 ? '⚠️ Overdue' : '🎯 Active'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add Progress Button */}
                                    {progress < 100 && (
                                        <button
                                            onClick={() => {
                                                const amount = prompt('How much would you like to add?');
                                                if (amount && !isNaN(amount)) {
                                                    updateProgress(goal._id, amount);
                                                }
                                            }}
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                                        >
                                            💰 Add Progress
                                        </button>
                                    )}

                                    {/* Celebration for completed goals */}
                                    {progress >= 100 && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                                            <div className="text-2xl mb-1">🎉</div>
                                            <div className="text-sm font-semibold text-green-700">
                                                Congratulations! Goal Achieved!
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FinancialGoals;

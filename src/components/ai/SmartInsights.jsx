import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SmartInsights = ({ userId }) => {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchInsights();
        }
    }, [userId]);

    const fetchInsights = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKENDURL}/ai/insights`,
                { withCredentials: true }
            );
            setInsights(response.data.insights || []);
            setSummary(response.data.summary || null);
        } catch (error) {
            console.error('Failed to fetch insights:', error);
            // If user doesn't have AI access, insights will be empty
            setInsights([]);
        } finally {
            setLoading(false);
        }
    };

    const dismissInsight = async (insightId) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_BACKENDURL}/ai/insights/${insightId}/dismiss`,
                {},
                { withCredentials: true }
            );
            setInsights(insights.filter(i => i._id !== insightId));
        } catch (error) {
            console.error('Failed to dismiss insight:', error);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'from-red-500 to-red-600';
            case 'high': return 'from-orange-500 to-orange-600';
            case 'medium': return 'from-blue-500 to-blue-600';
            case 'low': return 'from-green-500 to-green-600';
            default: return 'from-purple-500 to-purple-600';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'critical':
                return '🚨';
            case 'high':
                return '⚠️';
            case 'medium':
                return '💡';
            case 'low':
                return '✅';
            default:
                return '📊';
        }
    };

    const getInsightIcon = (type) => {
        switch (type) {
            case 'spending_pattern': return '📈';
            case 'budget_warning': return '⚠️';
            case 'savings_opportunity': return '💰';
            case 'unusual_activity': return '🔍';
            case 'prediction': return '🔮';
            case 'goal_suggestion': return '🎯';
            default: return '💡';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (insights.length === 0) {
        return (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No AI Insights Yet
                </h3>
                <p className="text-gray-600 mb-4">
                    Add some income and expense data, then generate personalized financial insights and recommendations!
                </p>
                <button
                    onClick={fetchInsights}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                    Generate AI Insights
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                        <div className="text-sm opacity-90">Savings Rate</div>
                        <div className="text-3xl font-bold">{summary.savingsRate}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                        <div className="text-sm opacity-90">Total Expenses</div>
                        <div className="text-3xl font-bold">₹{summary.totalExpenses?.toFixed(0)}</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                        <div className="text-sm opacity-90">New Insights</div>
                        <div className="text-3xl font-bold">{summary.insightCount}</div>
                    </div>
                </div>
            )}

            {/* Insights Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>💡</span> Smart Insights
                </h2>
                <button
                    onClick={fetchInsights}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Insights List */}
            <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <motion.div
                            key={insight._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-purple-500"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`bg-gradient-to-br ${getPriorityColor(insight.priority)} w-10 h-10 rounded-full flex items-center justify-center text-white text-xl`}>
                                            {getPriorityIcon(insight.priority)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                {getInsightIcon(insight.insightType)} {insight.title}
                                            </h3>
                                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                                                {insight.insightType.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => dismissInsight(insight._id)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    {insight.content}
                                </p>

                                {/* Related Data */}
                                {insight.relatedData && (
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {insight.relatedData.category && (
                                                <div>
                                                    <span className="text-gray-500">Category:</span>
                                                    <span className="ml-2 font-semibold text-gray-900">
                                                        {insight.relatedData.category}
                                                    </span>
                                                </div>
                                            )}
                                            {insight.relatedData.amount && (
                                                <div>
                                                    <span className="text-gray-500">Amount:</span>
                                                    <span className="ml-2 font-semibold text-gray-900">
                                                        ₹{insight.relatedData.amount.toFixed(2)}
                                                    </span>
                                                </div>
                                            )}
                                            {insight.relatedData.percentage && (
                                                <div>
                                                    <span className="text-gray-500">Impact:</span>
                                                    <span className="ml-2 font-semibold text-gray-900">
                                                        {insight.relatedData.percentage}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Recommendations */}
                                {insight.recommendations && insight.recommendations.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900 text-sm mb-2">
                                            💡 Recommended Actions:
                                        </h4>
                                        {insight.recommendations.map((rec, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-2 bg-purple-50 rounded-lg p-3"
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {rec.action}
                                                    </p>
                                                    {rec.estimatedImpact && (
                                                        <p className="text-xs text-green-600 mt-1">
                                                            ✓ {rec.estimatedImpact}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>
        </div>
    );
};

export default SmartInsights;

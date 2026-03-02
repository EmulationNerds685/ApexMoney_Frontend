import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SubscriptionTracker = ({ userId }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSubscription, setNewSubscription] = useState({
        name: '',
        amount: '',
        billingCycle: 'monthly',
        category: 'other',
        nextBillingDate: ''
    });

    useEffect(() => {
        if (userId) {
            fetchSubscriptions();
        }
    }, [userId]);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKENDURL}/subscriptions/get`,
                { withCredentials: true }
            );
            setSubscriptions(response.data.subscriptions || []);
            setSummary(response.data.summary || null);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const autoDetectSubscriptions = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKENDURL}/subscriptions/auto-detect`,
                { withCredentials: true }
            );

            if (response.data.detected > 0) {
                alert(`Found ${response.data.detected} potential subscriptions!`);
                // You can show a modal here to let user confirm detected subscriptions
                fetchSubscriptions();
            } else {
                alert('No recurring subscriptions detected. Add more expense history!');
            }
        } catch (error) {
            console.error('Auto-detect failed:', error);
        }
    };

    const addSubscription = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKENDURL}/subscriptions/create`,
                newSubscription,
                { withCredentials: true }
            );
            setShowAddForm(false);
            setNewSubscription({
                name: '',
                amount: '',
                billingCycle: 'monthly',
                category: 'other',
                nextBillingDate: ''
            });
            fetchSubscriptions();
        } catch (error) {
            console.error('Failed to add subscription:', error);
        }
    };

    const deleteSubscription = async (id) => {
        if (!confirm('Are you sure you want to delete this subscription?')) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKENDURL}/subscriptions/delete/${id}`,
                { withCredentials: true }
            );
            fetchSubscriptions();
        } catch (error) {
            console.error('Failed to delete subscription:', error);
        }
    };

    const getSubscriptionLogo = (name) => {
        const logos = {
            netflix: '🎬',
            spotify: '🎵',
            youtube: '📺',
            amazon: '📦',
            apple: '🍎',
            google: '🔍',
            microsoft: '💻',
            adobe: '🎨',
            dropbox: '☁️',
            github: '🐙',
            default: '💳'
        };

        const key = name.toLowerCase();
        for (const [service, logo] of Object.entries(logos)) {
            if (key.includes(service)) return logo;
        }
        return logos.default;
    };

    const getCategoryColor = (category) => {
        const colors = {
            streaming: 'from-red-500 to-pink-500',
            software: 'from-blue-500 to-cyan-500',
            gaming: 'from-purple-500 to-indigo-500',
            fitness: 'from-green-500 to-emerald-500',
            education: 'from-yellow-500 to-orange-500',
            news: 'from-gray-500 to-slate-500',
            cloud_storage: 'from-sky-500 to-blue-500',
            music: 'from-pink-500 to-rose-500',
            other: 'from-purple-500 to-purple-600'
        };
        return colors[category] || colors.other;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Summary */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span>💳</span> Subscription Tracker
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-sm opacity-90">Active Subscriptions</div>
                        <div className="text-3xl font-bold">{summary?.active || 0}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-sm opacity-90">Monthly Cost</div>
                        <div className="text-3xl font-bold">${summary?.monthlyTotal || '0.00'}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-sm opacity-90">Yearly Cost</div>
                        <div className="text-3xl font-bold">${summary?.yearlyTotal || '0.00'}</div>
                    </div>
                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Subscription
                    </button>
                    <button
                        onClick={autoDetectSubscriptions}
                        className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Auto-Detect
                    </button>
                </div>
            </div>

            {/* Add Subscription Form */}
            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Subscription</h3>
                    <form onSubmit={addSubscription} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Subscription Name (e.g., Netflix)"
                                value={newSubscription.name}
                                onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Amount"
                                value={newSubscription.amount}
                                onChange={(e) => setNewSubscription({ ...newSubscription, amount: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                            <select
                                value={newSubscription.billingCycle}
                                onChange={(e) => setNewSubscription({ ...newSubscription, billingCycle: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            <select
                                value={newSubscription.category}
                                onChange={(e) => setNewSubscription({ ...newSubscription, category: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="streaming">Streaming</option>
                                <option value="software">Software</option>
                                <option value="gaming">Gaming</option>
                                <option value="fitness">Fitness</option>
                                <option value="education">Education</option>
                                <option value="music">Music</option>
                                <option value="cloud_storage">Cloud Storage</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="date"
                                value={newSubscription.nextBillingDate}
                                onChange={(e) => setNewSubscription({ ...newSubscription, nextBillingDate: e.target.value })}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent md:col-span-2"
                                required
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                            >
                                Add Subscription
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

            {/* Subscriptions Grid */}
            {subscriptions.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">💳</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Subscriptions Yet</h3>
                    <p className="text-gray-600 mb-4">
                        Add your subscriptions manually or let AI auto-detect them from your expenses!
                    </p>
                    <button
                        onClick={autoDetectSubscriptions}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                        Auto-Detect Subscriptions
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subscriptions.map((sub, index) => (
                        <motion.div
                            key={sub._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={`bg-gradient-to-br ${getCategoryColor(sub.category)} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-4xl">{getSubscriptionLogo(sub.name)}</div>
                                    <div>
                                        <h3 className="font-bold text-lg">{sub.name}</h3>
                                        <span className="text-xs opacity-75 capitalize">{sub.category.replace('_', ' ')}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteSubscription(sub._id)}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm opacity-75">Amount</span>
                                    <span className="text-2xl font-bold">${sub.amount}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-75">Billing</span>
                                    <span className="capitalize">{sub.billingCycle}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-75">Next Bill</span>
                                    <span>{new Date(sub.nextBillingDate).toLocaleDateString()}</span>
                                </div>
                                {sub.autoDetected && (
                                    <div className="mt-2 bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-xs inline-block">
                                        🤖 Auto-detected
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubscriptionTracker;

import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ─── Plan Data ───────────────────────────────────────────────
const plansData = {
    starter: {
        name: 'Starter',
        tagline: 'Great for beginners who want to start budgeting smartly.',
        monthlyPrice: 9,
        annualPrice: 7,
        color: 'from-blue-500 to-cyan-400',
        colorLight: 'bg-blue-50',
        colorText: 'text-blue-600',
        colorRing: 'ring-blue-200',
        icon: '🚀',
        highlights: [
            { icon: '📊', title: 'Expense & Income Tracking', desc: 'Log and manage all your expenses and income in one place with a clean dashboard.' },
            { icon: '💰', title: 'Budget Management', desc: 'Create and manage budgets to keep your spending in check.' },
            { icon: '🎯', title: 'Up to 3 Financial Goals', desc: 'Set and track up to 3 savings or investment goals at a time.' },
            { icon: '📱', title: 'Mobile Friendly', desc: 'Access your finances on any device with our fully responsive design.' },
            { icon: '🏷️', title: 'Transaction Categorization', desc: 'Organize transactions into categories for clear spending visibility.' },
            { icon: '📧', title: 'Email Support', desc: 'Get help from our team via email whenever you need assistance.' },
        ],
        categories: [
            {
                name: 'Core Features',
                features: ['Expense & income tracking', 'Budget creation & management', 'Transaction categorization', 'Dashboard overview'],
            },
            {
                name: 'Goals & Planning',
                features: ['Up to 3 financial goals', 'Goal progress tracking'],
            },
            {
                name: 'General',
                features: ['Mobile responsive design', 'Email support'],
            },
        ],
    },
    pro: {
        name: 'Pro',
        tagline: 'Perfect for users who want AI-powered insights and more control.',
        monthlyPrice: 19,
        annualPrice: 15,
        color: 'from-purple-600 to-pink-500',
        colorLight: 'bg-purple-50',
        colorText: 'text-purple-600',
        colorRing: 'ring-purple-300',
        popular: true,
        icon: '⚡',
        highlights: [
            { icon: '🤖', title: 'AI Smart Insights', desc: 'Get AI-powered analysis of your spending habits and personalized financial tips.' },
            { icon: '♾️', title: 'Unlimited Financial Goals', desc: 'Create as many financial goals as you need — no limits.' },
            { icon: '📋', title: 'Subscription Tracker', desc: 'Track all your recurring subscriptions and see total monthly costs at a glance.' },
            { icon: '📤', title: 'PDF Report Export', desc: 'Export your financial data and reports as professional PDF documents.' },
            { icon: '🌙', title: 'Dark & Light Theme', desc: 'Switch between dark and light mode for comfortable viewing anytime.' },
            { icon: '⚡', title: 'Priority Support', desc: 'Get faster responses from our dedicated support team.' },
        ],
        categories: [
            {
                name: 'Everything in Starter, plus',
                features: ['All Starter plan features included'],
            },
            {
                name: 'AI & Insights',
                features: ['AI-powered spending analysis', 'Personalized financial tips', 'Smart budget recommendations'],
            },
            {
                name: 'Productivity',
                features: ['Unlimited financial goals', 'Subscription tracker', 'PDF report export', 'Dark & light theme'],
            },
            {
                name: 'Support',
                features: ['Priority email support', 'Faster response times'],
            },
        ],
    },
    enterprise: {
        name: 'Enterprise',
        tagline: 'For power users who want the complete financial toolkit.',
        monthlyPrice: 49,
        annualPrice: 39,
        color: 'from-amber-500 to-orange-500',
        colorLight: 'bg-amber-50',
        colorText: 'text-amber-600',
        colorRing: 'ring-amber-200',
        icon: '👑',
        highlights: [
            { icon: '📊', title: 'Advanced Analytics', desc: 'Interactive charts with detailed spending breakdowns and trend analysis.' },
            { icon: '🏷️', title: 'Custom Categories', desc: 'Create your own transaction categories tailored to your lifestyle.' },
            { icon: '📈', title: 'Detailed Financial Reports', desc: 'Generate comprehensive reports with custom date ranges and filters.' },
            { icon: '🔄', title: 'Edit & Manage Transactions', desc: 'Full control to edit, update, or delete any past transaction.' },
            { icon: '🧑‍💼', title: 'Dedicated Support', desc: 'Get top-priority, dedicated support for all your questions.' },
            { icon: '🚀', title: 'Early Access to Features', desc: 'Be the first to try new features before they go live for everyone.' },
        ],
        categories: [
            {
                name: 'Everything in Pro, plus',
                features: ['All Pro plan features included'],
            },
            {
                name: 'Advanced Analytics',
                features: ['Interactive spending charts', 'Category-wise breakdowns', 'Trend analysis over time', 'Custom date-range filtering'],
            },
            {
                name: 'Full Control',
                features: ['Custom transaction categories', 'Edit & delete any transaction', 'Detailed financial reports'],
            },
            {
                name: 'Premium Support',
                features: ['Dedicated support', 'Top-priority response', 'Early access to new features'],
            },
        ],
    },
};

// ─── Reusable Icons ──────────────────────────────────────────
const CheckCircle = () => (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ArrowLeft = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ArrowRight = () => (
    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

// ─── Component ───────────────────────────────────────────────
export default function PlanDetails() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planKey = searchParams.get('plan') || 'starter';
    const plan = plansData[planKey] || plansData.starter;

    const [billingCycle, setBillingCycle] = useState('monthly');
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const annualSavings = (plan.monthlyPrice - plan.annualPrice) * 12;

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' },
        }),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
            {/* ── Top Bar ─────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                    <ArrowLeft /> Back to Pricing
                </button>
            </div>

            {/* ── Hero ────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {plan.icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.name} Plan</h1>
                            {plan.popular && (
                                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide uppercase">
                                    Most Popular
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 mt-1 text-base">{plan.tagline}</p>
                    </div>
                </motion.div>
            </div>

            {/* ── Main Grid ───────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ──── Left: Benefits ──────────────────────── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Highlight Cards */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {plan.highlights.map((h, i) => (
                                <motion.div
                                    key={h.title}
                                    custom={i}
                                    variants={fadeUp}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300 group"
                                >
                                    <div className="text-2xl mb-3">{h.icon}</div>
                                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{h.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{h.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Detailed Feature Categories */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            <div className="px-6 py-5 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Everything You Get</h2>
                                <p className="text-sm text-gray-500 mt-1">Complete feature breakdown for the {plan.name} plan</p>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {plan.categories.map((cat, ci) => (
                                    <div key={cat.name} className="px-6 py-5">
                                        <h3 className={`font-semibold mb-3 ${plan.colorText}`}>{cat.name}</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                                            {cat.features.map((f) => (
                                                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                                                    <CheckCircle />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: '🔒', label: 'SSL Encrypted' },
                                { icon: '💰', label: '30-Day Money-Back' },
                                { icon: '🚫', label: 'Cancel Anytime' },
                                { icon: '🛡️', label: 'Secure Payments' },
                            ].map((b) => (
                                <div key={b.label} className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
                                    <span>{b.icon}</span>
                                    <span>{b.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ──── Right: Subscription CTA ─────────────── */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8"
                        >
                            {/* Price */}
                            <div className="text-center mb-6">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-extrabold text-gray-900">${price}</span>
                                    <span className="text-gray-500 text-base">/{billingCycle === 'monthly' ? 'mo' : 'mo'}</span>
                                </div>
                                {billingCycle === 'annual' && (
                                    <p className="text-sm text-green-600 font-medium mt-1">
                                        Save ${annualSavings}/year
                                    </p>
                                )}
                            </div>

                            {/* Billing Toggle */}
                            <div className="mb-6 p-1 bg-gray-100 rounded-xl flex">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'monthly'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('annual')}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all relative ${billingCycle === 'annual'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Annual
                                    <span className="block text-[10px] text-green-600 font-bold">Save 20%</span>
                                </button>
                            </div>

                            {/* Quick Feature Summary */}
                            <ul className="space-y-3 mb-6">
                                {plan.highlights.slice(0, 4).map((h) => (
                                    <li key={h.title} className="flex items-center gap-2.5 text-sm text-gray-700">
                                        <CheckCircle />
                                        <span>{h.title}</span>
                                    </li>
                                ))}
                                {plan.highlights.length > 4 && (
                                    <li className={`text-sm font-medium ${plan.colorText}`}>
                                        + {plan.highlights.length - 4} more features
                                    </li>
                                )}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                to={`/signup?plan=${planKey}&billing=${billingCycle}`}
                                className={`group w-full flex items-center justify-center bg-gradient-to-r ${plan.color} text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]`}
                            >
                                Take Subscription
                                <ArrowRight />
                            </Link>

                            {/* Guarantee */}
                            <div className="mt-5 p-4 bg-green-50 rounded-xl text-center">
                                <p className="text-sm font-semibold text-green-800">💰 30-Day Money-Back Guarantee</p>
                                <p className="text-xs text-green-600 mt-1">No questions asked — cancel anytime</p>
                            </div>

                            {/* Comparison Link */}
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="text-sm text-gray-400 hover:text-purple-600 transition-colors underline underline-offset-4"
                                >
                                    Compare all plans
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

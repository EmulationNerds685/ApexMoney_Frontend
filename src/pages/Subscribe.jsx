import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Subscribe = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const plan = searchParams.get('plan') || 'pro';

    const [billingCycle, setBillingCycle] = useState('monthly');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        email: '',
        country: ''
    });

    // Plan pricing data — unified with Pricing page
    const plans = {
        starter: { name: 'Starter', monthly: 9, annual: 7 },
        pro: { name: 'Pro', monthly: 19, annual: 15 },
        enterprise: { name: 'Enterprise', monthly: 49, annual: 39 },
    };

    const planFeatures = {
        starter: [
            'Expense & income tracking',
            'Budget management',
            'Up to 3 financial goals',
            'Transaction categorization',
            'Email support',
        ],
        pro: [
            'Everything in Starter',
            'AI Smart Insights',
            'Unlimited financial goals',
            'Subscription tracker',
            'PDF report export',
            'Dark & light theme',
        ],
        enterprise: [
            'Everything in Pro',
            'Advanced analytics & charts',
            'Custom transaction categories',
            'Detailed financial reports',
            'Edit & manage transactions',
            'Dedicated support',
        ],
    };

    const selectedPlan = plans[plan] || plans.starter;
    const features = planFeatures[plan] || planFeatures.starter;
    const price = billingCycle === 'monthly' ? selectedPlan.monthly : selectedPlan.annual;
    const savings = billingCycle === 'annual' ? Math.round(((selectedPlan.monthly * 12) - (selectedPlan.annual * 12)) * 100) / 100 : 0;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Here you would integrate with Stripe or your payment processor
        console.log('Processing payment for:', { plan, billingCycle, ...formData });

        // Simulate payment processing
        alert(`Payment processing for ${selectedPlan.name} plan!\nAmount: $${price}/${billingCycle}\n\nIn production, this would integrate with Stripe/PayPal.`);

        // After successful payment, redirect to dashboard
        // navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 mx-auto"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Plan Details
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Complete Your Subscription
                    </h1>
                    <p className="text-gray-600">
                        You're subscribing to <span className="font-semibold text-purple-600">{selectedPlan.name}</span> plan
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                {/* Card Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                            maxLength="19"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                        <div className="absolute right-3 top-3 flex gap-2">
                                            <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
                                            <img src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            required
                                            maxLength="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            required
                                            maxLength="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="123"
                                        />
                                    </div>
                                </div>

                                {/* Name on Card */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name on Card
                                    </label>
                                    <input
                                        type="text"
                                        name="nameOnCard"
                                        value={formData.nameOnCard}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="IN">India</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                                >
                                    Subscribe Now - ${price}/{billingCycle === 'monthly' ? 'month' : 'year'}
                                </button>

                                {/* Security Note */}
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    Payments are secure and encrypted
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-xl p-6 sticky top-8"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

                            {/* Billing Cycle Toggle */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Billing Cycle</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setBillingCycle('monthly')}
                                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${billingCycle === 'monthly'
                                            ? 'bg-purple-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 border border-gray-300'
                                            }`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBillingCycle('annual')}
                                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${billingCycle === 'annual'
                                            ? 'bg-purple-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 border border-gray-300'
                                            }`}
                                    >
                                        Annual
                                        <span className="block text-xs">Save 20%</span>
                                    </button>
                                </div>
                            </div>

                            {/* Plan Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Plan</span>
                                    <span className="font-semibold text-gray-900">{selectedPlan.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Billing</span>
                                    <span className="font-semibold text-gray-900 capitalize">{billingCycle}</span>
                                </div>
                                {billingCycle === 'annual' && savings > 0 && (
                                    <div className="flex justify-between items-center text-green-600">
                                        <span>Annual Savings</span>
                                        <span className="font-semibold">-${savings}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold text-gray-900">${price}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-semibold text-gray-900">$0.00</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-purple-600">${price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        Billed {billingCycle}
                                    </p>
                                </div>
                            </div>

                            {/* Features Included */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-0.5">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Money-back Guarantee */}
                            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                                <div className="text-2xl mb-2">💰</div>
                                <p className="text-sm font-semibold text-green-800">30-Day Money-Back Guarantee</p>
                                <p className="text-xs text-green-600 mt-1">Cancel anytime, full refund</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;

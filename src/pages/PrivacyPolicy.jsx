import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Brain, Clock, Trash2, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Section = ({ icon: Icon, title, children, delay = 0 }) => (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
    >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon className="w-5 h-5 text-indigo-600" /> {title}
        </h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </motion.section>
);

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition">
                        <ArrowLeft size={18} /> Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
                    <p className="text-gray-500 mt-2">Last updated: March 10, 2026</p>
                </motion.div>

                <Section icon={Shield} title="Overview" delay={0.05}>
                    <p>
                        ApexMoney ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains
                        how we collect, use, and safeguard your personal information when you use our financial tracking application.
                    </p>
                </Section>

                <Section icon={Mail} title="Data We Collect" delay={0.1}>
                    <p>We collect the following types of information:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li><strong>Account Information:</strong> Name, email address, and authentication credentials (password or Google OAuth token).</li>
                        <li><strong>Financial Data:</strong> Expense records, income entries, financial goals, subscription details, and bill reminders that you manually enter into the app.</li>
                        <li><strong>AI Interaction Data:</strong> Queries and data submitted to our AI features for generating financial insights.</li>
                        <li><strong>Usage Data:</strong> Basic analytics about how you interact with the app to improve our services.</li>
                    </ul>
                </Section>

                <Section icon={Lock} title="Password Security" delay={0.15}>
                    <p>
                        All passwords are hashed using <strong>bcrypt</strong> with a salt factor of 10 before being stored in our database.
                        We never store plaintext passwords. Even our team cannot access your original password.
                    </p>
                    <p>
                        If you sign in via Google OAuth, no password is stored — authentication is handled securely by Google's identity platform.
                    </p>
                </Section>

                <Section icon={Brain} title="AI Processing of Financial Data" delay={0.2}>
                    <p>
                        ApexMoney uses AI services (Grok / Groq) to provide financial insights, spending pattern analysis,
                        budget recommendations, and expense categorization.
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Your financial data is sent to AI APIs only when you request insights or use AI features.</li>
                        <li>Data sent to AI providers is used solely for generating your personalized insights.</li>
                        <li>AI-generated insights are <strong>informational only</strong> and do not constitute financial advice.</li>
                        <li>We do not sell or share your financial data with third parties for advertising purposes.</li>
                    </ul>
                </Section>

                <Section icon={Clock} title="Data Retention" delay={0.25}>
                    <p>
                        We retain your data for as long as your account is active. Once you delete your account,
                        all associated data is permanently removed from our systems, including:
                    </p>
                    <ul className="list-disc ml-5 space-y-1">
                        <li>Expense and income records</li>
                        <li>Financial goals and progress</li>
                        <li>Subscription tracking data</li>
                        <li>AI-generated insights</li>
                        <li>Bill reminders</li>
                        <li>Session data</li>
                    </ul>
                    <p className="mt-2">Data deletion is permanent and irreversible.</p>
                </Section>

                <Section icon={Trash2} title="Account Deletion" delay={0.3}>
                    <p>
                        You have the right to delete your account at any time from the <strong>Settings</strong> page in your dashboard.
                        Upon deletion:
                    </p>
                    <ul className="list-disc ml-5 space-y-1">
                        <li>Your user profile and credentials are permanently removed.</li>
                        <li>All financial data (expenses, income, goals, subscriptions, AI insights) is deleted.</li>
                        <li>Your session is terminated immediately.</li>
                        <li>This process cannot be reversed — no data recovery is possible after deletion.</li>
                    </ul>
                </Section>

                <Section icon={Shield} title="Your Rights" delay={0.35}>
                    <ul className="list-disc ml-5 space-y-2">
                        <li><strong>Access:</strong> You can view all your data through the dashboard at any time.</li>
                        <li><strong>Export:</strong> You can export your data in PDF, Excel, or CSV format from the Reports section.</li>
                        <li><strong>Deletion:</strong> You can permanently delete your account and all data from Settings.</li>
                        <li><strong>Correction:</strong> You can edit or delete individual entries at any time.</li>
                    </ul>
                </Section>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-sm text-gray-400 pb-8"
                >
                    <p>If you have questions about this Privacy Policy, contact us at support@apexmoney.app</p>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

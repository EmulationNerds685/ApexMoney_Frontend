import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Brain, AlertTriangle, Scale, Users, ArrowLeft } from 'lucide-react';
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

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition">
                        <ArrowLeft size={18} /> Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms of Service</h1>
                    <p className="text-gray-500 mt-2">Last updated: March 10, 2026</p>
                </motion.div>

                <Section icon={FileText} title="Acceptance of Terms" delay={0.05}>
                    <p>
                        By accessing or using ApexMoney ("the Service"), you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use the Service.
                    </p>
                </Section>

                <Section icon={Users} title="Use of Service" delay={0.1}>
                    <p>ApexMoney is a personal finance tracking application that helps you:</p>
                    <ul className="list-disc ml-5 space-y-1">
                        <li>Track expenses and income</li>
                        <li>Set and monitor financial goals</li>
                        <li>Manage subscriptions</li>
                        <li>Receive AI-powered financial insights</li>
                        <li>Export financial reports</li>
                    </ul>
                    <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
                </Section>

                <Section icon={Brain} title="AI-Powered Insights" delay={0.15}>
                    <p>
                        ApexMoney provides AI-generated financial insights, spending analysis, budget recommendations,
                        and predictive analytics. You acknowledge and agree that:
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>AI insights are <strong>informational only</strong> and provided for general guidance.</li>
                        <li>AI insights <strong>do not constitute professional financial advice</strong>, investment advice, tax advice, or any other form of professional advice.</li>
                        <li>You should consult with qualified financial professionals before making significant financial decisions.</li>
                        <li>AI predictions and recommendations may not be accurate and should not be relied upon as the sole basis for financial decisions.</li>
                    </ul>
                </Section>

                <Section icon={AlertTriangle} title="User Responsibility" delay={0.2}>
                    <p>You acknowledge and agree that:</p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li><strong>You are solely responsible for your financial decisions.</strong> ApexMoney and its AI features are tools to assist your planning, not replacements for professional advice.</li>
                        <li>The accuracy of insights depends on the data you provide. Incomplete or incorrect data will lead to less reliable insights.</li>
                        <li>ApexMoney is <strong>not liable</strong> for any financial losses, damages, or adverse outcomes resulting from decisions made based on AI insights or any other feature of the Service.</li>
                        <li>You will not use the Service for any illegal or unauthorized purpose.</li>
                    </ul>
                </Section>

                <Section icon={Scale} title="Limitation of Liability" delay={0.25}>
                    <p>
                        To the maximum extent permitted by law, ApexMoney shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages, including but not limited to:
                    </p>
                    <ul className="list-disc ml-5 space-y-1">
                        <li>Loss of profits or financial losses based on AI recommendations</li>
                        <li>Data loss or corruption</li>
                        <li>Service interruptions</li>
                        <li>Errors in AI-generated content</li>
                    </ul>
                </Section>

                <Section icon={FileText} title="Account Termination" delay={0.3}>
                    <p>
                        You may delete your account at any time from the Settings page. Upon deletion, all your data
                        will be permanently removed. We reserve the right to suspend or terminate accounts that violate
                        these Terms of Service.
                    </p>
                </Section>

                <Section icon={FileText} title="Changes to Terms" delay={0.35}>
                    <p>
                        We may update these Terms of Service from time to time. Continued use of the Service after
                        changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
                    </p>
                </Section>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-sm text-gray-400 pb-8"
                >
                    <p>If you have questions about these Terms, contact us at support@apexmoney.app</p>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;

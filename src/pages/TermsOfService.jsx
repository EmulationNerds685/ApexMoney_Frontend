import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10" style={{ boxShadow: '0 20px 60px -12px rgba(139, 92, 246, 0.15)' }}>

          {/* Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img src="/ApexLogo.png" alt="ApexMoney" className="h-10 w-auto" />
              <span className="text-xl font-semibold text-purple-800">ApexMoney</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
            <p className="text-sm text-gray-400 mt-2">Last updated: March 2026</p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">

            {/* 1. Use of Service */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">1</span>
                Use of Service
              </h2>
              <p>
                ApexMoney provides tools to help users manage personal finances, including tracking income, expenses,
                financial goals, subscriptions, and generating AI-powered financial insights.
              </p>
            </section>

            {/* 2. AI Disclaimer */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">2</span>
                AI Disclaimer
              </h2>
              <p>
                AI-generated insights are informational only and do not constitute financial advice.
                Users should consult qualified financial professionals before making significant financial decisions.
              </p>
            </section>

            {/* 3. User Responsibility */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">3</span>
                User Responsibility
              </h2>
              <p>
                Users are responsible for decisions made based on the application's insights and data.
                ApexMoney is a tool to assist in financial management but does not guarantee any financial outcomes.
              </p>
            </section>

            {/* 4. Account Security */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">4</span>
                Account Security
              </h2>
              <p>
                Users must maintain the confidentiality of their login credentials. You are responsible for all
                activity that occurs under your account. Notify us immediately if you suspect unauthorized access.
              </p>
            </section>

            {/* 5. Termination */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">5</span>
                Termination
              </h2>
              <p>
                Users may delete their account and all associated data at any time through the{' '}
                <Link to="/dashboard" className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors">
                  account settings
                </Link>.
                Upon deletion, all financial data will be permanently removed.
              </p>
            </section>
          </div>

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <Link to="/" className="hover:text-purple-600 transition-colors">← Back to Home</Link>
            <Link to="/privacy-policy" className="hover:text-purple-600 transition-colors">Privacy Policy →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mt-2">Last updated: March 2026</p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">

            {/* 1. Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">1</span>
                Introduction
              </h2>
              <p>
                ApexMoney is a personal finance management application that helps users track income, expenses, goals, and financial insights,
                empowering smarter financial decisions.
              </p>
            </section>

            {/* 2. Data Collected */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">2</span>
                Data Collected
              </h2>
              <p className="mb-3">The application may store the following information:</p>
              <ul className="list-none space-y-2 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  Email address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  Authentication credentials (securely hashed)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  Financial data entered by the user including income, expenses, goals, and subscriptions
                </li>
              </ul>
            </section>

            {/* 3. Authentication */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">3</span>
                Authentication
              </h2>
              <p className="mb-3">Users may sign in using:</p>
              <ul className="list-none space-y-2 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  Google Sign-In
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  Email and password
                </li>
              </ul>
              <p className="mt-3">Passwords are securely hashed and not stored in plain text.</p>
            </section>

            {/* 4. AI Processing */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">4</span>
                AI Processing
              </h2>
              <p>
                Financial data may be processed by AI services to generate insights, predictions, and recommendations for the user.
                This data is used solely to provide personalized financial analysis within the application.
              </p>
            </section>

            {/* 5. Data Security */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">5</span>
                Data Security
              </h2>
              <p>
                User data is stored securely and protected using authentication and secure database practices.
                We employ industry-standard measures to safeguard your information.
              </p>
            </section>

            {/* 6. User Rights */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">6</span>
                User Rights
              </h2>
              <p>
                Users can delete their account and all associated financial data at any time through the{' '}
                <Link to="/dashboard" className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors">
                  account settings
                </Link>.
              </p>
            </section>

            {/* 7. Contact */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">7</span>
                Contact
              </h2>
              <p>
                For questions or support, contact us at:{' '}
                <a
                  href="mailto:apexmoney2731@gmail.com"
                  className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors"
                >
                  apexmoney2731@gmail.com
                </a>
              </p>
            </section>
          </div>

          {/* Footer nav */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <Link to="/" className="hover:text-purple-600 transition-colors">← Back to Home</Link>
            <Link to="/terms-of-service" className="hover:text-purple-600 transition-colors">Terms of Service →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

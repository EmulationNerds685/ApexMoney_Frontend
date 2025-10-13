import React from 'react';

// --- Heroicon SVG Components ---

const UserPlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21c-2.305 0-4.47-.612-6.337-1.664z" />
  </svg>
);

const PresentationChartBarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h-1.5m1.5 0h1.5m-1.5 0l1.125-3.375m14.25 3.375l-1.125-3.375m-12 3.375l1.125-3.375m1.5-3.375l1.125-3.375m-1.5 3.375l-1.125 3.375m1.5-3.375l1.125 3.375M9 12l1.125-3.375M12 12l1.125-3.375M15 12l1.125-3.375M12 21v-9" />
  </svg>
);

const CursorArrowRaysIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m0 13.5v2.25m0-13.5c-1.381 0-2.5 1.119-2.5 2.5 0 .563.183 1.08.494 1.506L12 12.75l2.006-2.244A2.5 2.5 0 0014.5 6.75c0-1.381-1.119-2.5-2.5-2.5z" />
    </svg>
);


// --- How It Works Component ---

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlusIcon className="w-6 h-6 text-white" />,
      name: 'Create Your Free Account in Minutes',
      description: 'Get started instantly and securely connect all your bank accounts and financial tools in one place.',
    },
    {
      icon: <PresentationChartBarIcon className="w-6 h-6 text-white" />,
      name: 'See Smart Reports, Instantly',
      description: 'Receive detailed, automated reports that help you understand your finances and make informed decisions effortlessly.',
    },
    {
      icon: <CursorArrowRaysIcon className="w-6 h-6 text-white" />,
      name: 'Track Spending & Stay on Budget',
      description: 'Visualize your expenses, set clear budgets, and never lose track of where your money goes again.',
    },
  ]

  return (
    <div className="bg-gradient-to-br from-violet-500 to-indigo-600 font-sans">
      <div className="mx-auto max-w-7xl py-24 px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-y-16 gap-x-8 lg:grid-cols-2">
          
          {/* Left Column: Image */}
          <div className="relative h-full flex items-center justify-center">
            <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
                <img
                    src="./Transactions_Screen.png"
                    alt="App screenshot"
                    className="rounded-2xl shadow-2xl"
                />
            </div>
          </div>

          {/* Right Column: Content */}
          <div>
            <div className="mb-10">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/20">
                How It Works
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Manage Your Finances in 3 Simple Steps
              </h2>
              <p className="mt-4 text-lg leading-8 text-indigo-100">
                It's quick, easy, and stress-free to stay on top of your money — no technical skills required.
              </p>
            </div>
            
            <dl className="space-y-10">
              {steps.map((step) => (
                <div key={step.name} className="relative flex gap-x-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
                    {step.icon}
                  </div>
                  <div>
                    <dt className="font-semibold text-white">{step.name}</dt>
                    <dd className="mt-1 text-indigo-100">{step.description}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <button className="mt-12 bg-white text-violet-600 font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg">
                Try It for Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

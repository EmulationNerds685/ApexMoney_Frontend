// src/components/Pricing.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// --- Heroicon SVG Components (No changes needed) ---
const StarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.134-.662 1.456 0l1.96 4.048 4.458.647c.725.105 1.018.986.49 1.488l-3.226 3.143.76 4.44c.123.715-.63 1.255-1.282.913L10 15.347l-3.984 2.095c-.652.342-1.405-.198-1.282-.913l.76-4.44-3.226-3.143c-.528-.502-.235-1.383.49-1.488l4.458-.647 1.96-4.048z" clipRule="evenodd" />
  </svg>
);
const CheckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
  </svg>
);

// --- Pricing Plan Data (Refined for better separation of concerns) ---
const plans = [
  {
    name: 'Basic',
    href: '/signup?plan=basic',
    price: '$0',
    description: 'Perfect for individuals getting started.',
    features: [
      'Connect up to 2 bank accounts',
      'Basic expense tracking',
      'Monthly reports',
      'Budget planning tools',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    href: '/signup?plan=pro',
    price: '$19',
    description: 'Best for individuals & small teams.',
    features: [
      'Connect unlimited accounts',
      'Real-time expense tracking',
      'Automated reports & insights',
      'Smart budget alerts',
      'Priority email support',
    ],
    popular: true,
  },
  {
    name: 'Business',
    href: '/signup?plan=business',
    price: '$49',
    description: 'For growing businesses & advanced needs.',
    features: [
      'All Pro features included',
      'Multi-user access',
      'Custom financial reports',
      'Dedicated account manager',
      'Premium phone & email support',
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
            <p className="font-semibold leading-7 text-purple-600">Pricing</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                The Right Plan for Your Needs
            </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Simple, transparent pricing. Choose the plan that helps you achieve your financial goals.
        </p>

        {/* Pricing Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 transition-all duration-300 ${
                plan.popular 
                ? 'bg-white ring-2 ring-purple-600 shadow-2xl scale-105' 
                : 'bg-gray-50 ring-1 ring-gray-200 lg:hover:scale-105'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {plan.name}
                </h3>
                {plan.popular && (
                    <p className="flex items-center gap-x-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold leading-5 text-purple-600">
                      <StarIcon className="w-4 h-4" /> Most Popular
                    </p>
                )}
              </div>

              <p className="mt-4 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">{plan.description}</p>
              
              <Link
                to={plan.href}
                className={`mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
                  plan.popular
                    ? 'bg-purple-600 text-white shadow-sm hover:bg-purple-500 focus-visible:outline-purple-600'
                    : 'bg-white text-purple-600 ring-1 ring-inset ring-purple-200 hover:bg-purple-50 focus-visible:outline-purple-600'
                }`}
              >
                Get Started
              </Link>

              <ul role="list" className="mt-10 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-purple-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
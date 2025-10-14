// src/components/About.jsx

import React from 'react';

const About = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image */}
          <div className="order-last lg:order-first">
            {/* You can replace this with an image of your team or a relevant illustration */}
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop" 
              alt="ApexMoney Team discussing financial clarity"
              className="rounded-3xl shadow-xl w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Content */}
          <div className="text-center lg:text-left">
            <p className="font-semibold leading-7 text-purple-600">Our Mission</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              From Financial Stress to Financial Strength
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ApexMoney was born from a simple idea: everyone deserves financial clarity. We were tired of complicated spreadsheets and clunky software that made managing money feel like a chore. Our mission is to provide an intuitive, powerful, and secure platform that empowers you to understand your finances, achieve your goals, and build a stronger financial future.
            </p>

            {/* Key Stats/Values */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center lg:text-left">
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-600">Users Empowered</dt>
                <dd className="text-3xl font-bold leading-9 tracking-tight text-gray-900">500,000+</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-600">Commitment</dt>
                <dd className="text-3xl font-bold leading-9 tracking-tight text-gray-900">100% Secure</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
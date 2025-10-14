// src/components/Testimonials.jsx

import React from 'react';

// Star icon for ratings
const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.134-.662 1.456 0l1.96 4.048 4.458.647c.725.105 1.018.986.49 1.488l-3.226 3.143.76 4.44c.123.715-.63 1.255-1.282.913L10 15.347l-3.984 2.095c-.652.342-1.405-.198-1.282-.913l.76-4.44-3.226-3.143c-.528-.502-.235-1.383.49-1.488l4.458-.647 1.96-4.048z" clipRule="evenodd" />
  </svg>
);

// Testimonial data - easy to add or remove testimonials here
const testimonials = [
  {
    quote: "ApexMoney completely changed how I see my finances. For the first time, I feel in control and I'm actually saving money every month. It's a game-changer!",
    author: "Sarah L.",
    role: "Freelance Designer",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    quote: "As a small business owner, tracking expenses was my biggest headache. ApexMoney automated everything and the reports are incredibly insightful. I can't recommend it enough.",
    author: "Michael B.",
    role: "Small Business Owner",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    quote: "The budgeting tools are fantastic. The alerts have saved me from overspending multiple times. The app is simple, beautiful, and does exactly what it promises.",
    author: "Jessica T.",
    role: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold leading-7 text-purple-600">Testimonials</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What Our Users Are Saying
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're proud to have helped thousands of users gain financial clarity and confidence.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5">
              <div className="flex text-yellow-400 gap-x-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
              </div>
              <blockquote className="mt-6 text-lg leading-7 tracking-tight text-gray-700 flex-grow">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <div className="mt-8 flex items-center gap-x-4">
                <img src={testimonial.avatar} alt={testimonial.author} className="h-12 w-12 rounded-full bg-gray-50" />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
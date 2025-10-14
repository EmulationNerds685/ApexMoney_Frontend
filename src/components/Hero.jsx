// src/components/Hero.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { TypingAnimation } from "./ui/typing-animation";
import { BorderBeam } from "./ui/border-beam";

import { Particles } from "./ui/particles";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col-reverse md:flex-row items-center w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <Particles className="absolute ml-4"/>
        {/* Left Content: Headline, Sub-headline, and CTAs */}
        <div className="w-full max-w-xl text-center md:text-left mt-12 md:mt-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            <TypingAnimation words={["Financial Clarity 💸","Effortlessly Achieved ✔️ "]}/>
          </h1>

          <p className="mt-6 max-w-md mx-auto md:mx-0 text-lg text-gray-600">
            Stop wondering where your money goes. ApexMoney is the simple, smart app for tracking expenses, managing budgets, and growing your savings.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/signup/login"
              className="group inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-purple-700 transition"
            >
              Start for Free
              <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#demo" // Placeholder link for a future "Demo" section
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-purple-600 ring-1 ring-inset ring-purple-200 hover:bg-purple-50 transition"
            >
              See a Demo
            </a>
          </div>
        </div>

        {/* Right Content: Visual Mockup */}
        <div className="w-full max-w-lg flex justify-center">
            {/* Recommendation: Replace this static image with a dynamic one showcasing your actual dashboard charts! */}
            <div className="relative rounded-lg shadow-lg shadow-purple-500/50 box-shadow">
            <img
                src="./App_Mockup.png" // Using your existing image path
                alt="ApexMoney App Dashboard Mockup"
                 className="w-[300px] sm:w-[350px] drop-shadow-2xl rounded-lg"
            />
             <BorderBeam size={400} duration={12} delay={9} />
             </div>
           
        </div>
      </section>
      
      {/* Social Proof Section (Moved out of the hero for better hierarchy) */}
      <div className="text-center pb-12">
        <p className="text-gray-600 font-medium">
          Trusted by over 500,000+ users and teams worldwide
        </p>
        <div className="mt-6 flex justify-center items-center gap-8 opacity-70">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" alt="Notion" className="h-7" />
            <img src="./mchip.png" alt="Mailchimp" className="h-7" />
            <img src="./airtable.png" alt="Airtable" className="h-7" />
            <img src="./gumroad.png" alt="Gumroad" className="h-7" />
        </div>
      </div>
    </>
  );
};

export default Hero;
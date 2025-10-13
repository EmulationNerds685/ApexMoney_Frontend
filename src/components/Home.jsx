import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Features from "../HomePage_Components/Features";
import ChooseUs from "../HomePage_Components/ChooseUs";
import HowItWorks from "../HomePage_Components/HowItWorks";
import Pricing from "../HomePage_Components/Pricing";
import {Link} from 'react-router-dom'

const Home = () => {


  return (
    <>
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(90deg, rgba(226,185,235,1) 0%, rgba(213,237,237,1) 50%, rgba(215,185,237,1) 100%)",
      }}
    >
      
      <section className="flex flex-col-reverse md:flex-row justify-between items-center flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Left Content */}
        <div className="w-full max-w-lg text-center md:text-left mt-10 md:mt-0">
          <div className="inline-block bg-purple-200 text-purple-700 text-sm px-4 py-1 rounded-full font-medium mb-4">
            Your Money. Your Control.
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight mb-5">
            Take Control of Your <br /> Financial Future
          </h2>

          <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
            Take control of your money with ApexMoney. Track your spending, save
            smartly — all in one easy-to-use app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to='/expense'><button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors">
              Add Expense
              <ArrowRightIcon className="h-6 w-6 bg-white rounded-4xl p-1 text-black" />
            </button></Link>
            <Link to='/income'>
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-5 py-3 rounded-full font-medium transition-colors">
              Add your income
            </button>
            </Link>
          </div>

          <div className="mt-10">
            <p className="text-gray-500 text-sm mb-3">
              Trusted by 25K+ business teams
            </p>
            <div className="flex gap-6 flex-wrap justify-center md:justify-start">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
                alt="Notion"
                className="h-8"
              />
              <img src="./mchip.png" alt="Mailchimp" className="h-8" />
              <img src="./airtable.png" alt="Airtable" className="h-8" />
              <img src="./gumroad.png" alt="Gumroad" className="h-8" />
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="relative flex justify-center">
          <div className="relative">
            <img
              src="./App_Mockup.png"
              alt="App Mockup"
              className="w-[280px] sm:w-[300px] md:w-[380px] drop-shadow-2xl rounded-3xl"
            />
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-11/12 sm:w-auto sm:left-auto sm:translate-x-0 sm:bottom-[-40px] sm:right-[-20px] bg-white shadow-lg rounded-2xl px-5 py-3 text-sm flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-semibold">500K+</p>
                <p className="text-gray-500 text-xs whitespace-nowrap">
                  Trusted by users worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Features/>
    <ChooseUs/>
    <HowItWorks/>
    <Pricing/>
    </>

  );
};
export default Home;

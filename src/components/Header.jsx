import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useUser } from "../context/UserContext";
import { Logout } from "./Logout";

const Header = ({ isMenuOpen, toggleMenu }) => {

  const { user, loading } = useUser();

  return (
    <>
      <header className="relative bg-white/70 backdrop-blur-md shadow-sm rounded-4xl w-full max-w-7xl mx-auto mt-4 px-4 sm:px-6 py-3 flex justify-between items-center z-20">
        
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <h1 className="text-xl font-semibold text-gray-900">ApexMoney</h1>
        </div>

        
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium bg-purple-100 p-3 rounded-4xl">
          <Link to='/'
            className="text-purple-600 hover:text-purple-800 transition"
          >
            Home
          </Link>
          <a href="#" className="hover:text-purple-600 transition">
            About
          </a>
          <a href="#" className="hover:text-purple-600 transition">
            Services
          </a>
          <a href="#" className="hover:text-purple-600 transition">
            Tools
          </a>
          <a href="#" className="hover:text-purple-600 transition">
            Blog
          </a>
          <a href="#" className="hover:text-purple-600 transition">
            Testimonials
          </a>
        </nav>

        
        <div className="hidden md:flex items-center">
          {loading ? (

            <div className="h-12 w-24 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (

            <Link to='/'>
                {<Logout/>}
              
            </Link>
          ) : (

            <Link to='/signup/login'>
              <button className="flex bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-full font-medium items-center justify-center gap-2 transition-colors">
                Signup/Login{" "}
                <ArrowRightIcon className="h-6 w-6 bg-white rounded-full p-1 text-black" />
              </button>
            </Link>
          )}
        </div>

        
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-900" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>
      </header>

      
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md w-full max-w-7xl mx-auto rounded-xl shadow-lg z-10 mt-2">
          <nav className="flex flex-col items-center gap-6 text-gray-700 font-medium py-6">
            <Link to='/' className="hover:text-purple-600 transition">Home</Link>
            <a href="#" className="hover:text-purple-600 transition">About</a>
            <a href="#" className="hover:text-purple-600 transition">Services</a>
            <a href="#" className="hover:text-purple-600 transition">Tools</a>
            <a href="#" className="hover:text-purple-600 transition">Blog</a>
            <a href="#" className="hover:text-purple-600 transition">Testimonials</a>

            
            <div className="mt-4">
               {loading ? (
                 <div className="h-12 w-32 rounded-full bg-gray-200 animate-pulse" />
               ) : user ? (
                <Link to='/profile'>
                  <div
                    className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-xl hover:bg-purple-700 transition-colors"
                    title={`Logged in as ${user.name}`}
                  >
                    {user.name && user.name[0].toUpperCase()}
                  </div>
                </Link>
               ) : (
                <Link to='/signup/login'>
                  <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                    Signup/Login
                    <ArrowRightIcon className="h-5 w-5 bg-white rounded-full p-0.5 text-black" />
                  </button>
                </Link>
               )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
export default Header;
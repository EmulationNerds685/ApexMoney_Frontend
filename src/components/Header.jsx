import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};
const NavLinks = ({ onLinkClick }) => {
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
  };

  return (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={handleLinkClick}
            className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-full relative ${
              isActive
                ? "text-purple-700"
                : "text-gray-600 hover:text-purple-700"
            }`}
          >
            {item.name}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-purple-100 rounded-full -z-10"
                layoutId="active-nav-link"
              />
            )}
          </Link>
        );
      })}
    </>
  );
};
const UserProfileDropdown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const userInitial = user.name
    ? user.name[0].toUpperCase()
    : user.email[0].toUpperCase();

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {userInitial}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-40"
          >
            <div className="py-1">
              <div className="px-4 py-2 border-b">
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800 truncate">
                  {user.name || user.email}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left flex items-center gap-x-3 px-4 py-2 text-sm text-red-700 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-500" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const Header = ({ isMenuOpen, toggleMenu }) => {
  const { user, loading, logout } = useUser();

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <header className="sticky top-4 z-30 px-4  sm:px-6">
      <div className="relative w-full  max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white/80 backdrop-blur-lg  shadow-md rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex justify-between items-center"
        >
          {}
          <div className="flex items-center justify-between w-full lg:w-auto">
            {}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/ApexLogo.png"
                alt="ApexMoney Logo"
                className="w-auto h-10"
              />
              {}
              <span className="text-xl font-semibold text-purple-800 hidden sm:inline">
                ApexMoney
              </span>
            </Link>

            {}
            <span className="text-lg font-semibold text-purple-800 sm:hidden">
              ApexMoney
            </span>

            {}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="p-2"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isMenuOpen ? "x" : "bars"}
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100 p-1.5 rounded-full">
            <NavLinks />
          </nav>

          {}
          <div className="hidden lg:flex items-center gap-4">
            {loading ? (
              <div className="h-10 w-24 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <>
                <Link to="/dashboard">
                  <motion.button
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm transition-colors hover:bg-purple-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </motion.button>
                </Link>
                <UserProfileDropdown user={user} logout={logout} />
              </>
            ) : (
              <Link to="/signup/login">
                <motion.button
                  className="flex bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full font-semibold text-sm items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>

        {}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden absolute bg-white/95 backdrop-blur-xl w-full rounded-2xl shadow-xl z-20 mt-2 p-6"
            >
              <nav className="flex flex-col items-center gap-4 text-lg font-medium">
                <NavLinks onLinkClick={toggleMenu} />
                <div className="w-full border-t border-gray-200 my-4" />
                {user ? (
                  <>
                    <div className="text-center w-full mb-2">
                      <p className="text-sm text-gray-500">Logged in as</p>
                      <p className="font-semibold text-purple-700 truncate">
                        {user.name || user.email}
                      </p>
                    </div>

                    <Link to="/dashboard" onClick={toggleMenu} className="w-full">
                      <button className="bg-purple-600 text-white w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                        <UserCircleIcon className="h-5 w-5" /> Dashboard
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="bg-gray-100 text-red-700 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/signup/login" onClick={toggleMenu} className="w-full">
                    <button className="bg-gray-800 text-white w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                      Get Started <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
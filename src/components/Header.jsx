import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavLinks = ({ isMobile = false }) => (
  <>
    <Link to="/" className="px-3 py-1.5 text-gray-700 hover:text-purple-700 transition-colors rounded-full">Home</Link>
    <a href="#" className="px-3 py-1.5 text-gray-700 hover:text-purple-700 transition-colors rounded-full">About</a>
    <a href="#" className="px-3 py-1.5 text-gray-700 hover:text-purple-700 transition-colors rounded-full">Features</a>
    <a href="#" className="px-3 py-1.5 text-gray-700 hover:text-purple-700 transition-colors rounded-full">Testimonials</a>
  </>
);

const Header = ({ isMenuOpen, toggleMenu }) => {
  const { user, loading } = useUser();

  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.4, bounce: 0.5 } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
  };

  return (
    <>
      <header className="sticky top-4 z-30">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex justify-between items-center"
          >
            {/* Logo section */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="/ApexLogo.png" alt="ApexMoney Logo" className="w-auto h-11 " />
              <h1 className="text-2xl font-semibold text-purple-900 hidden sm:block ml-5">ApexMoney</h1>
            </Link>
 <Link to="/" className="text-xl font-semibold text-purple-900 sm:hidden">
              ApexMoney
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 text-gray-700 font-medium bg-gray-100 p-2 rounded-full">
              <NavLinks />
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {user && (
                 <Link to="/dashboard">
                    <motion.button
                      className="hidden sm:flex bg-purple-100 text-purple-700 px-5 py-2.5 rounded-full font-semibold items-center justify-center gap-2 transition-colors hover:bg-purple-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Dashboard
                      <ArrowRightIcon className="h-4 w-4" />
                    </motion.button>
                 </Link>
              )}

              <div className="hidden sm:flex items-center">
                {loading ? (
                  <div className="h-12 w-24 rounded-full bg-gray-200 animate-pulse" />
                ) : user ? (
                  <div title={`Logged in as ${user.name || user.email}`}>
                     <div className="h-11 w-11 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-colors cursor-pointer">
                        {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                      </div>
                  </div>
                ) : (
                  <Link to="/signup/login">
                    <motion.button
                      className="flex bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-medium items-center justify-center gap-2 transition-colors"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                      <ArrowRightIcon className="h-5 w-5 bg-white rounded-full p-0.5 text-black" />
                    </motion.button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-transform active:scale-90"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isMenuOpen ? "x" : "bars"}
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? (
                        <XMarkIcon className="h-6 w-6 text-gray-900" />
                      ) : (
                        <Bars3Icon className="h-6 w-6 text-gray-900" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden absolute bg-white/95 backdrop-blur-xl w-full max-w-7xl mx-auto rounded-2xl shadow-xl z-20 mt-3 p-6"
            >
              <nav className="flex flex-col items-center gap-6 text-gray-700 font-medium">
                <NavLinks isMobile />

                {user && (
                    <Link to="/dashboard">
                        <motion.button
                          className="flex sm:hidden bg-purple-600 text-white px-6 py-3 rounded-full font-semibold items-center justify-center gap-2 transition-colors hover:bg-purple-700 w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Go to Dashboard
                          <ArrowRightIcon className="h-5 w-5" />
                        </motion.button>
                    </Link>
                )}

                <div className="mt-4 sm:hidden">
                  {loading ? (
                    <div className="h-12 w-32 rounded-full bg-gray-200 animate-pulse" />
                  ) : user ? (

                     <div title={`Logged in as ${user.name || user.email}`} className="text-center">
                        <p className="text-sm text-gray-500">Logged in as</p>
                        <p className="font-bold text-purple-700">{user.name || user.email}</p>
                    </div>
                  ) : (
                    <Link to="/signup/login">
                      <motion.button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 w-full justify-center" whileTap={{scale: 0.95}}>
                        Signup / Login
                        <ArrowRightIcon className="h-5 w-5 bg-white rounded-full p-0.5 text-black" />
                      </motion.button>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
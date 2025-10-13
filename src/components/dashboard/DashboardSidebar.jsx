import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, LogOut, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const DashboardSidebar = ({ isOpen, setIsOpen, activeTab, handleTabChange }) => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const navItems = [
    { key: 'total', label: 'Overview' },
    { key: 'incomeList', label: 'Income List' },
    { key: 'expenseList', label: 'Expense List' },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (toggleButtonRef.current && toggleButtonRef.current.contains(event.target)) {
        return;
      }

      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const sidebarVariants = {
    open: { x: 0, width: '15rem', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', width: 0, transition: { type: 'spring', stiffness: 300, damping: 30, delay: 0.1 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.2 } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside

            ref={sidebarRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-screen z-40 bg-indigo-600 text-white flex flex-col py-6 px-4 shadow-xl"
          >
            <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
                className="flex flex-col h-full"
            >
              <Link to="/" className="text-center transition hover:opacity-80">
                <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
              </Link>

              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.key}

                    onClick={() => {
                      handleTabChange(item.key);
                      if (window.innerWidth <= 768) {
                        setIsOpen(false);
                      }
                    }}
                    className={`py-2 px-4 rounded-lg text-left transition ${
                      activeTab === item.key
                        ? 'bg-white text-indigo-600 font-semibold'
                        : 'hover:bg-indigo-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-auto"></div>

              <hr className="my-4 border-indigo-400" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full py-2 px-4 rounded-lg text-left text-red-200 hover:bg-red-500 hover:text-white transition"
              >
                <LogOut size={20} />
                <span className="font-semibold">Logout</span>
              </button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.button
  ref={toggleButtonRef}
  onClick={() => setIsOpen(!isOpen)}

  animate={{ left: isOpen ? '15.5rem' : '1rem' }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  whileHover={{ scale: 1.1, backgroundColor: '#4338ca' }}
  whileTap={{ scale: 0.9 }}

  className="fixed top-4 w-11 h-11 bg-indigo-600 text-white rounded-full flex items-center justify-center z-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
  aria-label="Toggle Sidebar"
>
  {}
  <AnimatePresence initial={false} mode="wait">
    <motion.div
      key={isOpen ? 'close' : 'menu'}
      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </motion.div>
  </AnimatePresence>
</motion.button>
    </>
  );
};

export default DashboardSidebar;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Calendar, Edit, Trash2, PlusCircle, TrendingUp } from 'lucide-react';

const IncomeList = ({ incomes, totalIncome, onEdit, onDelete }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } }
  };

  return (
    <motion.div
      className="bg-slate-50 p-4 sm:p-6 rounded-2xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Income Stream</h2>
        <Link to="/income">
          <motion.button
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={20} />
            Add Income
          </motion.button>
        </Link>
      </motion.div>

      {incomes.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-12 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">No income recorded yet.</h3>
          <p className="text-gray-400 mt-2">Click "Add Income" to get started!</p>
        </motion.div>
      ) : (
        <>
          {}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
          >
            <AnimatePresence>
              {incomes.map((income) => (
                <motion.div
                  key={income._id}
                  className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between transition-shadow hover:shadow-xl"
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {income.source || income.category || 'Uncategorized'}
                      </span>
                      <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onEdit(income)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></motion.button>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => onDelete(income._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></motion.button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 my-4">
                      <DollarSign className="text-green-500" size={24} />
                      <p className="text-3xl font-bold text-gray-800">₹{income.amount.toLocaleString()}</p>
                    </div>
                    <p className="text-gray-500 text-sm break-words mb-4 min-h-[40px]">{income.notes || 'No notes provided.'}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 border-t pt-3 mt-2">
                    <Calendar size={14} />
                    <span>{new Date(income.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Total Income</p>
                <h3 className="text-3xl font-bold text-green-600">
                  ₹{totalIncome.toLocaleString()}
                </h3>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default IncomeList;
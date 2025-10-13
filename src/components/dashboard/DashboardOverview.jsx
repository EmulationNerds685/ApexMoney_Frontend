import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
const StatCard = ({ title, amount, icon, color, bgColor }) => (
  <motion.div
    className="bg-white p-5 rounded-2xl shadow-lg flex items-center space-x-4 transition-transform transform hover:-translate-y-1"
    whileHover={{ scale: 1.03 }}
  >
    <div className={`p-3 rounded-full ${bgColor}`}>
      {React.cloneElement(icon, { className: `w-6 h-6 ${color}` })}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">₹{amount.toLocaleString()}</h3>
    </div>
  </motion.div>
);
const ChartCard = ({ title, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg ${className}`}>
    <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
    <div className="h-72 w-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

const DashboardOverview = ({ user, pieData, barData, lineData, totalIncome, totalExpense }) => {
  const netSavings = totalIncome - totalExpense;
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {

      legend: {
        position: 'bottom',
        labels: {
          padding: 25,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          font: {
            family: "'Inter', sans-serif",
            size: 13,
            weight: '500',
          },
          color: '#374151',
        },
      },

      tooltip: {
        enabled: true,
        backgroundColor: '#111827',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        border: {
          display: false,
        }
      },
      y: {
        grid: {
          color: '#E5E7EB',
          borderDash: [5, 5],
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },

          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        },
        border: {
          display: false,
          dash: [5, 5],
        }
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 4,
        hoverRadius: 8,
      },
      bar: {
        borderRadius: 8,
      }
    }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
  };

  return (
    <motion.div
        className="bg-slate-50 p-4 sm:p-6 rounded-2xl min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-6"
        variants={itemVariants}
      >
        Welcome Back, <span className="text-indigo-600">{user?.name || user?.email}</span> 👋
      </motion.h2>

      {}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Income"
            amount={totalIncome}
            icon={<TrendingUp />}
            color="text-green-600"
            bgColor="bg-green-100"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Expense"
            amount={totalExpense}
            icon={<TrendingDown />}
            color="text-red-600"
            bgColor="bg-red-100"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Net Savings"
            amount={netSavings}
            icon={<Wallet />}
            color="text-indigo-600"
            bgColor="bg-indigo-100"
          />
        </motion.div>
      </motion.div>

      {}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
            <ChartCard title="Income Over Time">
                <Line data={lineData} options={commonChartOptions} />
            </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
            <ChartCard title="Income vs Expense">
                <Pie data={pieData} options={{ ...commonChartOptions, scales: {} }} />
            </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-3">
             <ChartCard title="Expense by Category">
                <Bar data={barData} options={commonChartOptions} />
            </ChartCard>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
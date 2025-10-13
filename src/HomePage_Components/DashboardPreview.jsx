// src/components/DashboardPreview.jsx

import React, { useState } from 'react';
import { ChartBarIcon, ChartPieIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const DashboardPreview = () => {
  // State to manage which chart is currently visible. 'bar' is the default.
  const [activeTab, setActiveTab] = useState('bar');

  const tabs = [
    { id: 'bar', name: 'Expenses by Category', icon: <ChartBarIcon className="w-5 h-5 mr-2" /> },
    { id: 'line', name: 'Income Over Time', icon: <ArrowTrendingUpIcon className="w-5 h-5 mr-2" /> },
    { id: 'pie', name: 'Income vs. Expense', icon: <ChartPieIcon className="w-5 h-5 mr-2" /> },
  ];

  const renderContent = () => {
    // This function returns the image based on the active tab.
    // In a real app, these could be actual interactive chart components.
    // For a landing page, images are efficient and effective.
    switch (activeTab) {
      case 'line':
        return (
          <img
            src="./LineChart.png"
            alt="Line chart showing income over time"
            className="w-full h-auto rounded-b-lg"
          />
        );
      case 'pie':
        return (
          <img
            src="./PieChart.png"
            alt="Pie chart showing income vs expense summary"
            className="w-full h-auto rounded-b-lg"
          />
        );
      case 'bar':
      default:
        return (
          <img
            src="./BarChart.png"
            alt="Bar chart showing expenses by category"
            className="w-full h-auto rounded-b-lg"
          />
        );
    }
  };

  return (
    <section className="bg-gray-50 py-20 sm:py-24" id="demo">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            See Your Finances Come to Life
          </h2>
          <p className="text-lg text-gray-600">
            Our dashboard turns your numbers into knowledge. Toggle between views to see how ApexMoney visualizes your financial habits.
          </p>
        </div>

        {/* Browser Mockup */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl ring-1 ring-gray-200">
          {/* Browser Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-grow text-center text-sm font-medium text-gray-500">
              ApexMoney Dashboard
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="p-4 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="p-4 md:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const BalanceOverview: React.FC = () => {
  const { theme } = useTheme();
  const [period, setPeriod] = useState('monthly');
  
  // Simulated data for the chart
  const monthlyData = [4200, 3800, 5100, 4600, 6200, 5800];
  const weeklyData = [980, 1200, 850, 920, 1100, 950, 1050];
  
  const chartData = period === 'monthly' ? monthlyData : weeklyData;
  const labels = period === 'monthly' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const maxValue = Math.max(...chartData);
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-5`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Balance Overview</h3>
        <div className={`flex text-sm rounded-md overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <button 
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1 transition-colors ${period === 'weekly' 
              ? (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : ''}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1 transition-colors ${period === 'monthly' 
              ? (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
              : ''}`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="h-64 relative">
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {chartData.map((value, index) => (
            <div key={index} className="relative group flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm transition-all duration-700 ease-in-out hover:bg-blue-600"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none">
                ${value}
              </div>
              
              <span className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {labels[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total {period === 'monthly' ? 'Monthly' : 'Weekly'} Income</p>
          <p className="text-xl font-bold mt-1">${chartData.reduce((a, b) => a + b, 0).toLocaleString()}</p>
        </div>
        <div className="text-sm">
          <span className="text-green-500 font-medium">+8.2%</span>
          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}> vs last {period === 'monthly' ? 'month' : 'week'}</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;
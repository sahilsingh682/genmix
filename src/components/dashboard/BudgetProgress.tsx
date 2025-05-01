import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const BudgetProgress: React.FC = () => {
  const { theme } = useTheme();
  
  const budgets = [
    { id: 1, category: 'Housing', current: 1200, limit: 1300, color: 'bg-blue-500' },
    { id: 2, category: 'Food & Dining', current: 520, limit: 600, color: 'bg-teal-500' },
    { id: 3, category: 'Shopping', current: 450, limit: 400, color: 'bg-purple-500' },
    { id: 4, category: 'Entertainment', current: 180, limit: 200, color: 'bg-amber-500' },
  ];
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-5`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Budget Progress</h3>
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          June 2025
        </span>
      </div>
      
      <div className="space-y-5">
        {budgets.map(budget => {
          const percentage = Math.round((budget.current / budget.limit) * 100);
          const isOverBudget = budget.current > budget.limit;
          return (
            <div key={budget.id}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{budget.category}</span>
                <div>
                  <span className={isOverBudget ? 'text-red-500 font-medium' : ''}>${budget.current}</span>
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}> / ${budget.limit}</span>
                </div>
              </div>
              
              <div className={`h-2 w-full rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${isOverBudget ? 'bg-red-500' : budget.color}`}
                  style={{ width: `${isOverBudget ? 100 : percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-1">
                <span className={`text-xs ${
                  isOverBudget 
                    ? 'text-red-500' 
                    : percentage > 80 
                      ? 'text-amber-500' 
                      : 'text-green-500'
                }`}>
                  {isOverBudget 
                    ? `${percentage}% (Over budget)` 
                    : `${percentage}%`}
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  ${Math.max(0, budget.limit - budget.current)} remaining
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className={`mt-5 w-full py-2 rounded-md font-medium transition-colors ${
        theme === 'dark' 
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}>
        View All Budgets
      </button>
    </div>
  );
};

export default BudgetProgress;
import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import BalanceOverview from '../components/dashboard/BalanceOverview';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import FinancialInsight from '../components/dashboard/FinancialInsight';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  const stats = [
    { 
      id: 1, 
      title: 'Total Balance', 
      value: '$12,560.80', 
      change: '+2.5%',
      trend: 'up',
      icon: <Wallet size={20} />
    },
    { 
      id: 2, 
      title: 'Income', 
      value: '$4,200.00', 
      change: '+12.3%',
      trend: 'up',
      icon: <ArrowUpRight size={20} />
    },
    { 
      id: 3, 
      title: 'Expenses', 
      value: '$2,640.40', 
      change: '+8.1%',
      trend: 'down',
      icon: <ArrowDownRight size={20} />
    },
    { 
      id: 4, 
      title: 'Investments', 
      value: '$6,240.00', 
      change: '+4.3%',
      trend: 'up',
      icon: <TrendingUp size={20} />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-600'} px-3 py-1 rounded-full`}>
          <AlertCircle size={16} />
          <span>2 budget alerts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div 
            key={stat.id} 
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-5 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div 
                className={`p-2 rounded-md ${stat.trend === 'up' 
                  ? (theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600') 
                  : (theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600')}`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="mt-2">
              <span 
                className={`text-sm font-medium ${stat.trend === 'up' 
                  ? 'text-green-500' 
                  : 'text-red-500'}`}
              >
                {stat.change} 
              </span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}> vs last month</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceOverview />
        <BudgetProgress />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <FinancialInsight />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
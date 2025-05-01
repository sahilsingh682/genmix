import React from 'react';
import { Home, List, PieChart, BarChart3, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const { theme } = useTheme();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <List size={20} /> },
    { id: 'budgets', label: 'Budgets', icon: <PieChart size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <aside 
      className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
                  w-20 md:w-64 border-r overflow-hidden transition-all duration-200 ease-in-out`}
    >
      <nav className="flex flex-col h-full py-6">
        <div className="space-y-2 px-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-md transition-all duration-150
                ${currentPage === item.id 
                  ? `${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`
                  : `${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
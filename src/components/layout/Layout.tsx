import React from 'react';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 container mx-auto px-4 pb-20 max-w-6xl"
      >
        {children}
      </motion.div>
      
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.12),transparent),radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.13),transparent)] dark:bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.25),transparent)]"></div>
    </div>
  );
};

export default Layout;
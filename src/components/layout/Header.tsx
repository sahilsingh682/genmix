import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Music } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  return (
    <header className={`sticky top-0 z-10 w-full px-4 md:px-6 py-4 backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-gray-900/80 text-white border-gray-800' 
        : 'bg-white/80 text-gray-900 border-gray-200'
    } border-b transition-colors duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 10 }}
            className="p-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500"
          >
            <Music size={20} className="text-white" />
          </motion.div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
            GenMix
          </h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-1">
            <Link 
              to="/"
              className={`px-4 py-2 rounded-full transition-colors ${
                location.pathname === '/' 
                  ? (theme === 'dark' ? 'bg-gray-800 text-purple-400' : 'bg-purple-50 text-purple-600')
                  : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              Generate
            </Link>
            <Link 
              to="/my-playlists"
              className={`px-4 py-2 rounded-full transition-colors ${
                location.pathname === '/my-playlists' 
                  ? (theme === 'dark' ? 'bg-gray-800 text-purple-400' : 'bg-purple-50 text-purple-600')
                  : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
              }`}
            >
              My Playlists
            </Link>
          </nav>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="md:hidden">
            <nav className="flex gap-1 absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 rounded-full shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90">
              <Link 
                to="/"
                className={`p-3 rounded-full transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : (theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
                }`}
                aria-label="Generate Playlist"
              >
                <Music size={20} />
              </Link>
              <Link 
                to="/my-playlists"
                className={`p-3 rounded-full transition-colors ${
                  location.pathname === '/my-playlists' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : (theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
                }`}
                aria-label="My Playlists"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15V6"></path>
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                  <path d="M12 12H3"></path>
                  <path d="M16 6H3"></path>
                  <path d="M12 18H3"></path>
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
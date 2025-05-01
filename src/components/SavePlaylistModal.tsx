import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { generateMockPlaylistName } from '../services/mockAiService';

interface SavePlaylistModalProps {
  onSave: (name?: string) => void;
  onCancel: () => void;
  emotion: string;
}

const SavePlaylistModal: React.FC<SavePlaylistModalProps> = ({ onSave, onCancel, emotion }) => {
  const { theme } = useTheme();
  const [playlistName, setPlaylistName] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Generate 3 name suggestions
    const generateSuggestions = () => {
      const names = [];
      for (let i = 0; i < 3; i++) {
        names.push(generateMockPlaylistName(emotion));
      }
      setSuggestions(names);
      setIsGenerating(false);
    };

    // Focus the input when modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Simulate API delay
    const timer = setTimeout(generateSuggestions, 1000);
    return () => clearTimeout(timer);
  }, [emotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(playlistName);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPlaylistName(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`relative w-full max-w-md p-6 rounded-xl shadow-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <button
          onClick={onCancel}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Save Your Playlist</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="playlist-name" className="block text-sm font-medium mb-1">
              Playlist Name
            </label>
            <input
              ref={inputRef}
              id="playlist-name"
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter a name for your playlist"
              className={`w-full px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-gray-50 text-gray-900 border-gray-200'
              } border focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all`}
            />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">AI suggested names:</p>
            {isGenerating ? (
              <div className="flex space-x-2">
                {[1, 2, 3].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-8 flex-1 rounded animate-pulse ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } transition-colors`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg font-medium ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all"
            >
              Save Playlist
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SavePlaylistModal;
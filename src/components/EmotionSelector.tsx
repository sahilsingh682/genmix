import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { EmotionOption } from '../types';

interface EmotionSelectorProps {
  onSelectEmotion: (emotion: string) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ onSelectEmotion }) => {
  const { theme } = useTheme();
  const [customEmotion, setCustomEmotion] = useState('');
  
  const emotions: EmotionOption[] = [
    { label: 'Happy', value: 'happy', color: 'from-yellow-400 to-yellow-500', icon: '😊' },
    { label: 'Sad', value: 'sad', color: 'from-blue-400 to-blue-500', icon: '😢' },
    { label: 'Energetic', value: 'energetic', color: 'from-red-400 to-red-500', icon: '⚡' },
    { label: 'Calm', value: 'calm', color: 'from-green-400 to-green-500', icon: '😌' },
    { label: 'Romantic', value: 'romantic', color: 'from-pink-400 to-pink-500', icon: '❤️' },
    { label: 'Nostalgic', value: 'nostalgic', color: 'from-amber-400 to-amber-500', icon: '🕰️' },
    { label: 'Focus', value: 'focus', color: 'from-indigo-400 to-indigo-500', icon: '🧠' },
    { label: 'Party', value: 'party', color: 'from-purple-400 to-purple-500', icon: '🎉' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmotion.trim()) {
      onSelectEmotion(customEmotion);
      setCustomEmotion('');
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6 text-center">How are you feeling today?</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {emotions.map((emotion) => (
          <motion.button
            key={emotion.value}
            onClick={() => onSelectEmotion(emotion.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl shadow-sm transition-all overflow-hidden bg-gradient-to-br ${emotion.color} hover:shadow-md group`}
          >
            <span className="text-3xl mb-2">{emotion.icon}</span>
            <span className="font-medium text-white">{emotion.label}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </motion.button>
        ))}
      </div>
      
      <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-all`}>
        <h3 className="text-lg font-medium mb-3">Or describe your own feeling</h3>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            placeholder="E.g., contemplative, dreamy, motivated..."
            className={`flex-1 px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-purple-500' 
                : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-purple-500'
            } border focus:ring-2 focus:ring-purple-500/20 outline-none transition-all`}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!customEmotion.trim()}
            className={`px-5 py-2 rounded-lg font-medium ${
              customEmotion.trim() 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90' 
                : (theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500')
            } transition-all`}
          >
            Generate
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default EmotionSelector;
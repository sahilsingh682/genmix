import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Playlist } from '../types';
import { motion } from 'framer-motion';
import { Music, Trash2, Edit2, Play, CheckCircle, X } from 'lucide-react';

interface PlaylistCardProps {
  playlist: Playlist;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onLoad: (id: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onDelete, onRename, onLoad }) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(playlist.name);
  
  const formattedDate = new Date(playlist.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const handleRename = () => {
    if (newName.trim() && newName !== playlist.name) {
      onRename(playlist.id, newName);
    }
    setIsEditing(false);
  };
  
  const cancelEdit = () => {
    setNewName(playlist.name);
    setIsEditing(false);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-xl shadow-sm overflow-hidden ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div 
        className="h-24 bg-gradient-to-r from-purple-600 to-pink-500 p-5 flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <Music 
              key={i}
              size={24 + Math.random() * 24} 
              style={{ 
                position: 'absolute', 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.2 + Math.random() * 0.8
              }} 
            />
          ))}
        </div>
        
        <div className="z-10 text-white text-center">
          <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm mb-2">
            {playlist.emotion}
          </div>
          <p className="text-lg font-bold">{playlist.songs.length} songs</p>
        </div>
      </div>
      
      <div className="p-5">
        {isEditing ? (
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
              className={`flex-1 px-3 py-1 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-gray-50 text-gray-900 border-gray-200'
              } border focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none`}
            />
            <button
              onClick={handleRename}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={cancelEdit}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              } hover:opacity-80 transition-opacity`}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <h3 className="text-lg font-bold mb-1 truncate">{playlist.name}</h3>
        )}
        
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
          Created {formattedDate}
        </p>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLoad(playlist.id)}
            className="flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all"
          >
            <Play size={16} />
            Load
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <Edit2 size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(playlist.id)}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;
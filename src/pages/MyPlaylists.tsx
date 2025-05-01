import React from 'react';
import { usePlaylist } from '../context/PlaylistContext';
import { useTheme } from '../context/ThemeContext';
import PlaylistCard from '../components/PlaylistCard';
import { Music } from 'lucide-react';
import { motion } from 'framer-motion';

const MyPlaylists: React.FC = () => {
  const { savedPlaylists, deletePlaylist, renamePlaylist, loadPlaylist } = usePlaylist();
  const { theme } = useTheme();
  
  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Playlists</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your saved playlists
        </p>
      </motion.div>
      
      {savedPlaylists.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-12 text-center shadow-sm`}
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <Music size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">No playlists saved yet</h2>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            Generate a playlist based on your mood and save it to see it here.
          </p>
          <a
            href="/"
            className="inline-block px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all"
          >
            Create Your First Playlist
          </a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PlaylistCard
                playlist={playlist}
                onDelete={deletePlaylist}
                onRename={renamePlaylist}
                onLoad={loadPlaylist}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlaylists;
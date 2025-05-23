import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Song } from '../types';
import { motion } from 'framer-motion';
import { Play, Pause, Save, Music, ExternalLink } from 'lucide-react';
import SavePlaylistModal from './SavePlaylistModal';

interface PlaylistDisplayProps {
  playlist: Song[];
  emotion: string;
  onSavePlaylist: (name?: string) => void;
  isGenerating: boolean;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({ 
  playlist, 
  emotion, 
  onSavePlaylist, 
  isGenerating 
}) => {
  const { theme } = useTheme();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handlePlayPause = async (song: Song) => {
    if (!audioRef.current) return;
    
    try {
      if (playingSongId === song.id) {
        // If clicking the currently playing song
        if (audioRef.current.paused) {
          await audioRef.current.play();
        } else {
          audioRef.current.pause();
          setPlayingSongId(null);
        }
      } else {
        // If clicking a different song
        if (playingSongId) {
          audioRef.current.pause();
        }
        audioRef.current.src = song.streamingUrl || '';
        await audioRef.current.play();
        setPlayingSongId(song.id);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingSongId(null);
    }
  };
  
  if (isGenerating) {
    return (
      <div className={`w-full rounded-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm flex flex-col items-center justify-center h-64`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-lg">Generating your {emotion} playlist...</p>
      </div>
    );
  }
  
  if (!playlist.length) {
    return null;
  }

  return (
    <>
      <audio 
        ref={audioRef}
        onEnded={() => setPlayingSongId(null)}
        onError={() => setPlayingSongId(null)}
      />
      
      <div className={`w-full rounded-xl p-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold">Your {emotion} Playlist</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {playlist.length} songs generated by AI
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSaveModal(true)}
            className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all"
          >
            <Save size={16} />
            Save Playlist
          </motion.button>
        </div>
        
        <div className="space-y-2">
          {playlist.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handlePlayPause(song)}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } transition-colors group relative overflow-hidden cursor-pointer`}
            >
              <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white flex-shrink-0 ${
                playingSongId === song.id 
                  ? 'bg-green-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {playingSongId === song.id ? (
                  <Pause size={18} />
                ) : (
                  <Play size={18} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium truncate">{song.title}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{song.duration}</p>
                </div>
                <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {song.artist}
                </p>
              </div>
              
              {song.streamingUrl && (
                <a 
                  href={song.streamingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-2 rounded-full ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  } transition-all`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {showSaveModal && (
        <SavePlaylistModal 
          onSave={(name) => {
            onSavePlaylist(name);
            setShowSaveModal(false);
          }}
          onCancel={() => setShowSaveModal(false)}
          emotion={emotion}
        />
      )}
    </>
  );
};

export default PlaylistDisplay;
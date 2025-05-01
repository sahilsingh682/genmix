import React from 'react';
import { usePlaylist } from '../context/PlaylistContext';
import EmotionSelector from '../components/EmotionSelector';
import PlaylistDisplay from '../components/PlaylistDisplay';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { 
    currentPlaylist, 
    currentEmotion, 
    generatePlaylist, 
    savePlaylist,
    isGenerating
  } = usePlaylist();

  const handleEmotionSelect = (emotion: string) => {
    generatePlaylist(emotion);
  };

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
          AI-Powered Music for Every Mood
        </h1>
        <p className="text-lg opacity-80 max-w-xl mx-auto">
          Select your current emotional state, and our AI will craft the perfect playlist to match or enhance your mood.
        </p>
      </motion.div>
      
      <div className="space-y-8">
        <EmotionSelector onSelectEmotion={handleEmotionSelect} />
        
        {(currentPlaylist.length > 0 || isGenerating) && (
          <PlaylistDisplay 
            playlist={currentPlaylist}
            emotion={currentEmotion}
            onSavePlaylist={savePlaylist}
            isGenerating={isGenerating}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Playlist, Song } from '../types';
import { generateMockPlaylist, generateMockPlaylistName } from '../services/mockAiService';
import toast from 'react-hot-toast';

interface PlaylistContextType {
  currentPlaylist: Song[];
  savedPlaylists: Playlist[];
  currentEmotion: string;
  setCurrentEmotion: (emotion: string) => void;
  generatePlaylist: (emotion: string) => void;
  savePlaylist: (name?: string) => void;
  deletePlaylist: (id: string) => void;
  renamePlaylist: (id: string, newName: string) => void;
  loadPlaylist: (id: string) => void;
  isGenerating: boolean;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('savedPlaylists');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentEmotion, setCurrentEmotion] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Save playlists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedPlaylists', JSON.stringify(savedPlaylists));
  }, [savedPlaylists]);

  const generatePlaylist = (emotion: string) => {
    setIsGenerating(true);
    setCurrentEmotion(emotion);
    
    // Simulate API call delay
    setTimeout(() => {
      const newPlaylist = generateMockPlaylist(emotion);
      setCurrentPlaylist(newPlaylist);
      setIsGenerating(false);
      toast.success(`Generated playlist based on "${emotion}" mood`);
    }, 1500);
  };

  const savePlaylist = (customName?: string) => {
    if (currentPlaylist.length === 0) {
      toast.error('No playlist to save. Generate one first!');
      return;
    }

    const aiGeneratedName = generateMockPlaylistName(currentEmotion);
    const playlistName = customName || aiGeneratedName;
    
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: playlistName,
      emotion: currentEmotion,
      songs: currentPlaylist,
      createdAt: new Date().toISOString(),
    };

    setSavedPlaylists(prev => [newPlaylist, ...prev]);
    toast.success(`Playlist "${playlistName}" saved!`);
  };

  const deletePlaylist = (id: string) => {
    setSavedPlaylists(prev => prev.filter(playlist => playlist.id !== id));
    toast.success('Playlist deleted');
  };

  const renamePlaylist = (id: string, newName: string) => {
    setSavedPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === id ? { ...playlist, name: newName } : playlist
      )
    );
    toast.success('Playlist renamed');
  };

  const loadPlaylist = (id: string) => {
    const playlist = savedPlaylists.find(p => p.id === id);
    if (playlist) {
      setCurrentPlaylist(playlist.songs);
      setCurrentEmotion(playlist.emotion);
      toast.success(`Loaded playlist "${playlist.name}"`);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        currentPlaylist,
        savedPlaylists,
        currentEmotion,
        setCurrentEmotion,
        generatePlaylist,
        savePlaylist,
        deletePlaylist,
        renamePlaylist,
        loadPlaylist,
        isGenerating
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
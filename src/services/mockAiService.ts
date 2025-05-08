// import { Song } from '../types';

// // Mock data for artists and song titles with preview URLs
// const songs = [
//   {
//     title: 'Shape of You',
//     artist: 'Ed Sheeran',
//     previewUrl: 'https://p.scdn.co/mp3-preview/84462d8e1e4d0f9e5ccd06f0da390f65843774a2'
//   },
//   {
//     title: 'Blinding Lights',
//     artist: 'The Weeknd',
//     previewUrl: 'https://p.scdn.co/mp3-preview/3ebf4ef391b6762d1a4b64745a0c2f572e0d5bfb'
//   },
//   {
//     title: 'Bad Guy',
//     artist: 'Billie Eilish',
//     previewUrl: 'https://p.scdn.co/mp3-preview/6cca52fc12d833b25463f4b6e9567ef6f4ca8d92'
//   },
//   {
//     title: 'Watermelon Sugar',
//     artist: 'Harry Styles',
//     previewUrl: 'https://p.scdn.co/mp3-preview/9676d0155c207c12979b0025530d9ed3bb15e98b'
//   },
//   {
//     title: 'drivers license',
//     artist: 'Olivia Rodrigo',
//     previewUrl: 'https://p.scdn.co/mp3-preview/9076fca7b9713f6cc5c41e1c19b61b3948f08b74'
//   },
//   {
//     title: 'Stay',
//     artist: 'The Kid LAROI & Justin Bieber',
//     previewUrl: 'https://p.scdn.co/mp3-preview/dd4d8d66b97e22acf33c277f857f5f4611e55c87'
//   },
//   {
//     title: 'good 4 u',
//     artist: 'Olivia Rodrigo',
//     previewUrl: 'https://p.scdn.co/mp3-preview/6d3f40c60ab7302c5f461c26c14b835e4e4e804c'
//   },
//   {
//     title: 'Levitating',
//     artist: 'Dua Lipa',
//     previewUrl: 'https://p.scdn.co/mp3-preview/a690735072e85713c649f900d3d78bfa83c75e80'
//   },
//   {
//     title: 'Save Your Tears',
//     artist: 'The Weeknd',
//     previewUrl: 'https://p.scdn.co/mp3-preview/9c9e93b8dd4dbc9f64140e6d292666685c8de3a0'
//   },
//   {
//     title: 'Mood',
//     artist: '24kGoldn',
//     previewUrl: 'https://p.scdn.co/mp3-preview/5ee8d11447dd9829f4a37af4fb6ce5053d53f0b3'
//   }
// ];

// const emotionToMoodMap: { [key: string]: string[] } = {
//   happy: ['energetic', 'upbeat', 'cheerful', 'joyful'],
//   sad: ['melancholic', 'emotional', 'heartbreak', 'slow'],
//   energetic: ['upbeat', 'fast', 'dance', 'party'],
//   calm: ['peaceful', 'relaxing', 'ambient', 'soft'],
//   romantic: ['love', 'slow', 'emotional', 'passionate'],
//   nostalgic: ['retro', 'classic', 'memories', 'throwback'],
//   focus: ['instrumental', 'ambient', 'study', 'concentration'],
//   party: ['dance', 'upbeat', 'energetic', 'fun']
// };

// const shuffleArray = <T>(array: T[]): T[] => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// export const generateMockPlaylist = (emotion: string): Song[] => {
//   // Shuffle the songs array and take first 10 songs
//   const selectedSongs = shuffleArray(songs).slice(0, 10);
  
//   return selectedSongs.map((song, index) => ({
//     id: `song-${index}-${Date.now()}`,
//     title: song.title,
//     artist: song.artist,
//     duration: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
//     albumArt: `https://picsum.photos/seed/${song.artist.replace(/\s+/g, '')}/200`,
//     streamingUrl: song.previewUrl
//   }));
// };

// export const generateMockPlaylistName = (emotion: string): string => {
//   const lowerEmotion = emotion.toLowerCase();
  
//   const prefixes = ['Vibes of', 'Feeling', 'Moments of', 'Days of', 'Into the', 'Echoes of', 'Waves of'];
//   const suffixes = ['Journey', 'Escape', 'Reflection', 'Experience', 'Playlist', 'Collection', 'Mix'];
  
//   let emotionWord = lowerEmotion;
//   // Capitalize first letter
//   emotionWord = emotionWord.charAt(0).toUpperCase() + emotionWord.slice(1);
  
//   const randomChoice = Math.floor(Math.random() * 3);
  
//   if (randomChoice === 0) {
//     return `${getRandomElement(prefixes)} ${emotionWord}`;
//   } else if (randomChoice === 1) {
//     return `${emotionWord} ${getRandomElement(suffixes)}`;
//   } else {
//     return `${emotionWord} ${getRandomElement(prefixes).toLowerCase()} ${getRandomElement(suffixes).toLowerCase()}`;
//   }
// };

// const getRandomElement = <T>(array: T[]): T => {
//   return array[Math.floor(Math.random() * array.length)];
// };

import { Song } from '../types';

// Updated data for artists and song titles with working preview URLs
const songs = [
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    previewUrl: 'https://soundcloud.com/edsheeran/shape-of-you'
  },
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    previewUrl: 'https://soundcloud.com/theweeknd/blinding-lights'
  },
  {
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    previewUrl: 'https://www.youtube.com/watch?v=DyDfgMOUjCI'
  },
  {
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    previewUrl: 'https://www.youtube.com/watch?v=E07s5ZYygMg'
  },
  {
    title: 'drivers license',
    artist: 'Olivia Rodrigo',
    previewUrl: 'https://soundcloud.com/oliviarodrigo/drivers-license'
  },
  {
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    previewUrl: 'https://www.youtube.com/watch?v=kTJczUoc26U'
  },
  {
    title: 'good 4 u',
    artist: 'Olivia Rodrigo',
    previewUrl: 'https://soundcloud.com/oliviarodrigo/good-4-u-1'
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    previewUrl: 'https://soundcloud.com/dualipa/levitating'
  },
  {
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    previewUrl: 'https://www.youtube.com/watch?v=XXYlFuWEuKI'
  },
  {
    title: 'Mood',
    artist: '24kGoldn',
    previewUrl: 'https://soundcloud.com/24kgoldn/mood-feat-iann-dior'
  }
];

const emotionToMoodMap: { [key: string]: string[] } = {
  happy: ['energetic', 'upbeat', 'cheerful', 'joyful'],
  sad: ['melancholic', 'emotional', 'heartbreak', 'slow'],
  energetic: ['upbeat', 'fast', 'dance', 'party'],
  calm: ['peaceful', 'relaxing', 'ambient', 'soft'],
  romantic: ['love', 'slow', 'emotional', 'passionate'],
  nostalgic: ['retro', 'classic', 'memories', 'throwback'],
  focus: ['instrumental', 'ambient', 'study', 'concentration'],
  party: ['dance', 'upbeat', 'energetic', 'fun']
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateMockPlaylist = (emotion: string): Song[] => {
  const selectedSongs = shuffleArray(songs).slice(0, 10);
  return selectedSongs.map((song, index) => ({
    id: `song-${index}-${Date.now()}`,
    title: song.title,
    artist: song.artist,
    duration: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    albumArt: `https://picsum.photos/seed/${song.artist.replace(/\s+/g, '')}/200`,
    streamingUrl: song.previewUrl
  }));
};

export const generateMockPlaylistName = (emotion: string): string => {
  const lowerEmotion = emotion.toLowerCase();

  const prefixes = ['Vibes of', 'Feeling', 'Moments of', 'Days of', 'Into the', 'Echoes of', 'Waves of'];
  const suffixes = ['Journey', 'Escape', 'Reflection', 'Experience', 'Playlist', 'Collection', 'Mix'];

  let emotionWord = lowerEmotion.charAt(0).toUpperCase() + lowerEmotion.slice(1);

  const randomChoice = Math.floor(Math.random() * 3);
  if (randomChoice === 0) {
    return `${getRandomElement(prefixes)} ${emotionWord}`;
  } else if (randomChoice === 1) {
    return `${emotionWord} ${getRandomElement(suffixes)}`;
  } else {
    return `${emotionWord} ${getRandomElement(prefixes).toLowerCase()} ${getRandomElement(suffixes).toLowerCase()}`;
  }
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

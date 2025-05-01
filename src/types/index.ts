export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  duration?: string;
  streamingUrl?: string;
  albumArt?: string;
}

export interface Playlist {
  id: string;
  name: string;
  emotion: string;
  songs: Song[];
  createdAt: string;
}

export interface EmotionOption {
  label: string;
  value: string;
  color: string;
  icon: string;
}
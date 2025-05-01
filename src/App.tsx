import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { PlaylistProvider } from './context/PlaylistContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MyPlaylists from './pages/MyPlaylists';

function App() {
  return (
    <ThemeProvider>
      <PlaylistProvider>
        <Router>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#333',
                fontWeight: '500',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-playlists" element={<MyPlaylists />} />
            </Routes>
          </Layout>
        </Router>
      </PlaylistProvider>
    </ThemeProvider>
  );
}

export default App;
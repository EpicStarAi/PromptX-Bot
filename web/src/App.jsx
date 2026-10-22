import React, { useState, useEffect } from 'react';
import MainScreen from './pages/MainScreen';
import NeuralNetworks from './pages/NeuralNetworks';
import Astrology from './pages/Astrology';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Presets from './pages/Presets';
import './App.css';

// Pages enum
const PAGES = {
  MAIN: 'main',
  NEURAL: 'neural',
  ASTROLOGY: 'astrology',
  PROFILE: 'profile',
  FEED: 'feed',
  PRESETS: 'presets'
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.MAIN);
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(10);

  // Init Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      if (tg.initData) {
        fetch('/api/auth/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: tg.initData })
        })
          .then((response) => {
            if (!response.ok) throw new Error('Telegram authentication failed');
            return response.json();
          })
          .then((data) => setUser(data.user))
          .catch((error) => console.error(error.message));
      }
    }
    
  }, []);

  // Navigation
  const navigate = (page) => setCurrentPage(page);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case PAGES.NEURAL:
        return <NeuralNetworks onNavigate={navigate} tokens={tokens} setTokens={setTokens} />;
      case PAGES.ASTROLOGY:
        return <Astrology onNavigate={navigate} tokens={tokens} setTokens={setTokens} />;
      case PAGES.PROFILE:
        return <Profile onNavigate={navigate} user={user} tokens={tokens} />;
      case PAGES.FEED:
        return <Feed onNavigate={navigate} />;
      case PAGES.PRESETS:
        return <Presets onNavigate={navigate} tokens={tokens} setTokens={setTokens} />;
      default:
        return <MainScreen onNavigate={navigate} user={user} tokens={tokens} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import MainScreen from './pages/MainScreen';
import NeuralNetworks from './pages/NeuralNetworks';
import Astrology from './pages/Astrology';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Presets from './pages/Presets';
import Create from './pages/Create';
import History from './pages/History';
import './App.css';

// Pages enum
const PAGES = {
  MAIN: 'main',
  NEURAL: 'neural',
  ASTROLOGY: 'astrology',
  PROFILE: 'profile',
  FEED: 'feed',
  PRESETS: 'presets',
  CREATE: 'create',
  HISTORY: 'history'
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.MAIN);
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(100);
  const [history, setHistory] = useState([]);

  // Init Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
    
    // Parse URL params for user data (fallback)
    const urlParams = new URLSearchParams(window.location.search);
    const tgData = urlParams.get('tgWebAppData');
    if (tgData) {
      try {
        const parsed = JSON.parse(tgData);
        if (parsed.user) setUser(parsed.user);
      } catch {}
    }
    
    // Load history from localStorage
    const savedHistory = localStorage.getItem('promptx_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {}
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('promptx_history', JSON.stringify(history));
  }, [history]);

  // Navigation
  const navigate = (page) => setCurrentPage(page);

  // Add to history
  const addToHistory = (item) => {
    setHistory(prev => [{
      id: Date.now(),
      ...item,
      createdAt: new Date().toISOString()
    }, ...prev]);
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case PAGES.NEURAL:
        return <NeuralNetworks onNavigate={navigate} tokens={tokens} setTokens={setTokens} addToHistory={addToHistory} />;
      case PAGES.ASTROLOGY:
        return <Astrology onNavigate={navigate} tokens={tokens} setTokens={setTokens} user={user} addToHistory={addToHistory} />;
      case PAGES.PROFILE:
        return <Profile onNavigate={navigate} user={user} tokens={tokens} history={history} />;
      case PAGES.FEED:
        return <Feed onNavigate={navigate} />;
      case PAGES.PRESETS:
        return <Presets onNavigate={navigate} tokens={tokens} setTokens={setTokens} addToHistory={addToHistory} />;
      case PAGES.CREATE:
        return <Create onNavigate={navigate} tokens={tokens} setTokens={setTokens} addToHistory={addToHistory} />;
      case PAGES.HISTORY:
        return <History onNavigate={navigate} history={history} setHistory={setHistory} />;
      default:
        return <MainScreen onNavigate={navigate} user={user} tokens={tokens} />;
    }
  };

  const navItems = [
    { id: PAGES.MAIN, icon: '🏠', label: 'Главная' },
    { id: PAGES.FEED, icon: '📋', label: 'Лента' },
    { id: PAGES.CREATE, icon: '➕', label: 'Создать', primary: true },
    { id: PAGES.ASTROLOGY, icon: '✨', label: 'Астро' },
    { id: PAGES.HISTORY, icon: '🕐', label: 'История' },
    { id: PAGES.PROFILE, icon: '👤', label: 'Профиль' }
  ];

  return (
    <div className="app">
      {renderPage()}
      
      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''} ${item.primary ? 'nav-item-primary' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;

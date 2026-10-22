import React from 'react';

export default function MainScreen({ onNavigate, user, tokens }) {
  const firstName = user?.first_name || 'Друг';
  
  return (
    <div className="main-screen fade-in">
      {/* Header */}
      <div className="header">
        <span className="header-title">PromptX</span>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
      </div>

      {/* Greeting */}
      <div className="user-greeting">Привет, {firstName}! 👋</div>
      <div className="user-subtitle">Что создаём сегодня?</div>

      {/* Feature Cards */}
      <div className="feature-grid">
        <div 
          className="feature-card neural" 
          onClick={() => onNavigate('neural')}
        >
          <span className="feature-icon">🧠</span>
          <div className="feature-title">Нейросети</div>
          <div className="feature-desc">Генерация по шаблонам и своим промптам</div>
        </div>

        <div 
          className="feature-card astro" 
          onClick={() => onNavigate('astrology')}
        >
          <span className="feature-icon">✨</span>
          <div className="feature-title">Астрология</div>
          <div className="feature-desc">Натальная карта, совместимость, гороскоп</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn" onClick={() => onNavigate('presets')}>
          <div className="action-btn-left">
            <div className="action-btn-icon">🔥</div>
            <span>Тренды</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>

        <button className="action-btn" onClick={() => onNavigate('feed')}>
          <div className="action-btn-left">
            <div className="action-btn-icon">📰</div>
            <span>Моя лента</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>

        <button className="action-btn" onClick={() => onNavigate('profile')}>
          <div className="action-btn-left">
            <div className="action-btn-icon">👤</div>
            <span>Профиль</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>
      </div>
    </div>
  );
}

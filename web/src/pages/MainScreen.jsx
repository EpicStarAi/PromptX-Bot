import React from 'react';

// Trending templates
const TRENDS = [
  { id: 1, name: 'Киберпанк город', emoji: '🌃', views: '2.1K' },
  { id: 2, name: 'Магический лес', emoji: '🌲', views: '1.8K' },
  { id: 3, name: 'Космос 4K', emoji: '🚀', views: '1.5K' },
  { id: 4, name: 'Неоновый закат', emoji: '🌅', views: '1.2K' },
  { id: 5, name: 'Аниме портрет', emoji: '👤', views: '980' },
  { id: 6, name: 'Фэнтези дракон', emoji: '🐉', views: '890' },
  { id: 7, name: '3D абстракция', emoji: '🎨', views: '760' },
  { id: 8, name: 'Портрет в стиле', emoji: '🖌️', views: '650' }
];

// Tools
const TOOLS = [
  { id: 1, name: 'Промпт по фото', icon: '📷' },
  { id: 2, name: 'Расширение кадра', icon: '🖼️' },
  { id: 3, name: 'Pinterest AI', icon: '📌' }
];

export default function MainScreen({ onNavigate, user, tokens }) {
  const firstName = user?.first_name || 'Друг';
  
  return (
    <div className="main-screen fade-in">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <span className="header-title">PromptX</span>
        </div>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
      </div>

      {/* Greeting */}
      <div className="user-greeting">Привет, {firstName}! 👋</div>
      <div className="user-subtitle">Что создаём сегодня?</div>

      {/* Two Big Cards: By Template & From Scratch */}
      <div className="main-cards">
        <div 
          className="main-card" 
          onClick={() => onNavigate('create')}
        >
          <div className="main-card-icon">📋</div>
          <div className="main-card-content">
            <div className="main-card-title">По шаблону</div>
            <div className="main-card-desc">Быстро и просто — выбери готовый шаблон и загрузи фото</div>
          </div>
          <span className="main-card-arrow">›</span>
        </div>

        <div 
          className="main-card" 
          onClick={() => onNavigate('create')}
        >
          <div className="main-card-icon">✨</div>
          <div className="main-card-content">
            <div className="main-card-title">С нуля</div>
            <div className="main-card-desc">Опиши свою идею словами и мы создадим уникальное изображение</div>
          </div>
          <span className="main-card-arrow">›</span>
        </div>
      </div>

      {/* Tools Section */}
      <div className="tools-section">
        <div className="section-header" style={{ padding: '0 20px' }}>
          <span className="section-title">Инструменты</span>
        </div>
        <div className="tools-grid" style={{ padding: '0 20px' }}>
          {TOOLS.map(tool => (
            <div 
              key={tool.id} 
              className="tool-card"
              onClick={() => {
                if (tool.id === 1) onNavigate('create');
                else if (tool.id === 2) onNavigate('create');
                else onNavigate('create');
              }}
            >
              <div className="tool-icon">{tool.icon}</div>
              <div className="tool-name">{tool.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends Section */}
      <div className="trends-section">
        <div className="section-header" style={{ padding: '0 20px' }}>
          <span className="section-title">Тренды • {TRENDS.length}+ шаблонов</span>
          <span 
            className="section-link" 
            onClick={() => onNavigate('presets')}
          >
            Все ›
          </span>
        </div>
        <div className="trends-scroll">
          {TRENDS.map(trend => (
            <div 
              key={trend.id} 
              className="trend-card"
              onClick={() => onNavigate('presets')}
            >
              <div className="trend-thumbnail">
                <span className="trend-thumbnail-icon">{trend.emoji}</span>
                <span className="trend-play">▶</span>
              </div>
              <div className="trend-content">
                <div className="trend-name">{trend.name}</div>
                <div className="trend-meta">
                  <span className="trend-camera">📷</span>
                  <span>{trend.views} просмотров</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))',
          borderRadius: 'var(--radius)',
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
          marginBottom: 16
        }}
        onClick={() => onNavigate('astrology')}
        >
          <span style={{ fontSize: 40 }}>✨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
              Астрология AI
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Натальная карта, гороскоп, совместимость
            </div>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 24 }}>›</span>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.15), rgba(212, 168, 83, 0.05))',
          borderRadius: 'var(--radius)',
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer'
        }}
        onClick={() => onNavigate('feed')}
        >
          <span style={{ fontSize: 40 }}>📰</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
              Лента сообщества
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Лучшие работы и вдохновение
            </div>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 24 }}>›</span>
        </div>
      </div>
    </div>
  );
}

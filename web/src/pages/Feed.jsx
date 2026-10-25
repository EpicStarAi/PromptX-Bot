import React from 'react';

// Community feed items
const FEED_ITEMS = [
  {
    id: 1,
    type: 'generation',
    emoji: '🌃',
    prompt: 'Киберпанк город в стиле аниме, неоновые вывески, дождь',
    author: 'neuro_creator',
    likes: 1247,
    comments: 89,
    time: '2ч назад'
  },
  {
    id: 2,
    type: 'generation',
    emoji: '🧙',
    prompt: 'Эльф в лесу, золотой закат, магические частицы',
    author: 'fantasy_ai',
    likes: 892,
    comments: 45,
    time: '4ч назад'
  },
  {
    id: 3,
    type: 'generation',
    emoji: '🚀',
    prompt: 'Космический корабль на орбите Марса, реалистично',
    author: 'space_artist',
    likes: 756,
    comments: 32,
    time: '6ч назад'
  },
  {
    id: 4,
    type: 'generation',
    emoji: '🎨',
    prompt: 'Абстрактное искусство в стиле Пикассо, яркие цвета',
    author: 'abstract_pro',
    likes: 634,
    comments: 28,
    time: '8ч назад'
  },
  {
    id: 5,
    type: 'generation',
    emoji: '🏔️',
    prompt: 'Горы на закате, туман, реалистичная фотография',
    author: 'nature_photo',
    likes: 521,
    comments: 19,
    time: '12ч назад'
  },
  {
    id: 6,
    type: 'generation',
    emoji: '👤',
    prompt: 'Портрет в стиле Рембрандта, тёплое освещение',
    author: 'portrait_master',
    likes: 489,
    comments: 23,
    time: '1д назад'
  }
];

export default function Feed({ onNavigate }) {
  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Лента</span>
        <button 
          style={{
            background: 'var(--bg-card)',
            border: 'none',
            borderRadius: 8,
            padding: '6px 12px',
            color: 'var(--gold)',
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          🔍 Поиск
        </button>
      </div>

      {/* Feed Stats */}
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        padding: '12px 20px',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ 
          flex: 1, 
          textAlign: 'center',
          padding: '10px',
          background: 'var(--bg-card)',
          borderRadius: 10
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>82</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>шаблонов</div>
        </div>
        <div style={{ 
          flex: 1, 
          textAlign: 'center',
          padding: '10px',
          background: 'var(--bg-card)',
          borderRadius: 10
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>555K</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>пользователей</div>
        </div>
        <div style={{ 
          flex: 1, 
          textAlign: 'center',
          padding: '10px',
          background: 'var(--bg-card)',
          borderRadius: 10
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>1.2M</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>генераций</div>
        </div>
      </div>

      {/* Feed Grid */}
      <div className="feed-grid">
        {FEED_ITEMS.map(item => (
          <div key={item.id} className="feed-card">
            <div className="feed-card-image">
              {item.emoji}
            </div>
            <div className="feed-card-content">
              <div className="feed-card-author">@{item.author}</div>
              <div className="feed-card-prompt">{item.prompt}</div>
              <div className="feed-card-stats">
                <span>❤️ {item.likes}</span>
                <span>💬 {item.comments}</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom padding for nav */}
      <div style={{ height: 20 }} />
    </div>
  );
}

import React from 'react';

// Demo feed items
const FEED_ITEMS = [
  {
    id: 1,
    type: 'generation',
    prompt: 'Киберпанк город в стиле аниме, неон, дождь',
    author: 'neurogrickan_pro',
    likes: 234,
    time: '2ч назад'
  },
  {
    id: 2,
    type: 'generation',
    prompt: 'Портрет девушки в стиле фэнтези, магический лес',
    author: 'creative_ai',
    likes: 189,
    time: '5ч назад'
  },
  {
    id: 3,
    type: 'preset',
    name: 'Халлucing',
    category: 'Тренды',
    uses: 1200,
    time: '1д назад'
  }
];

export default function Feed({ onNavigate }) {
  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Моя лента</span>
      </div>

      {FEED_ITEMS.length === 0 ? (
        <div style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <p style={{ color: 'var(--text-secondary)' }}>
            Лента пуста. Создай что-нибудь!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
          {FEED_ITEMS.map(item => (
            <div key={item.id} className="result-card">
              <div 
                className="preset-image" 
                style={{
                  background: `linear-gradient(135deg, #1a1535, #252045)`,
                  minHeight: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: 40, opacity: 0.5 }}>🖼️</span>
              </div>
              <div className="result-content">
                {item.prompt && (
                  <div className="result-prompt">"{item.prompt}"</div>
                )}
                {item.name && (
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                )}
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: 12,
                  color: 'var(--text-secondary)',
                  fontSize: 13
                }}>
                  <span>@{item.author || 'unknown'}</span>
                  <span>❤️ {item.likes || item.uses}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

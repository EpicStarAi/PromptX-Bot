import React from 'react';

// Demo presets (82 trending templates like PromptX)
const PRESETS = [
  { id: 1, name: 'Халлucing', emoji: '😈', cost: 2, category: 'Тренды' },
  { id: 2, name: 'Фото Халлucing', emoji: '📸', cost: 3, category: 'По фото' },
  { id: 3, name: 'Тренды', emoji: '🔥', cost: 2, category: 'Популярное' },
  { id: 4, name: 'День рождения', emoji: '🎂', cost: 2, category: 'Праздники' },
  { id: 5, name: 'Киберпанк', emoji: '🌃', cost: 2, category: 'Стили' },
  { id: 6, name: 'Аниме', emoji: '🎌', cost: 2, category: 'Стили' },
  { id: 7, name: 'Фэнтези', emoji: '🧙', cost: 2, category: 'Стили' },
  { id: 8, name: 'Портрет', emoji: '👤', cost: 2, category: 'Тип' },
  { id: 9, name: 'Пейзаж', emoji: '🏔️', cost: 2, category: 'Тип' },
  { id: 10, name: '3D Арт', emoji: '🎨', cost: 2, category: 'Стили' },
];

export default function Presets({ onNavigate, tokens, setTokens }) {
  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Тренды</span>
      </div>

      {/* Categories */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        padding: '0 20px',
        overflowX: 'auto',
        marginBottom: 16
      }}>
        {['Все', 'Популярное', 'Тренды', 'Стили', 'Праздники'].map(cat => (
          <button
            key={cat}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: cat === 'Все' ? '1px solid var(--gold)' : '1px solid var(--border)',
              background: cat === 'Все' ? 'rgba(212,168,83,0.15)' : 'var(--bg-card)',
              color: cat === 'Все' ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Presets Grid */}
      <div className="presets-grid">
        {PRESETS.map(preset => (
          <div key={preset.id} className="preset-card" style={{
            background: `linear-gradient(135deg, hsl(${preset.id * 36}, 40%, 15%), hsl(${preset.id * 36 + 30}, 35%, 12%))`
          }}>
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              padding: 16
            }}>
              <span style={{ fontSize: 42, marginBottom: 8 }}>{preset.emoji}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{preset.name}</span>
              <span className="preset-cost">-{preset.cost} 💎</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
        <p>82+ готовых шаблонов для генерации</p>
        <p style={{ marginTop: 8 }}>Выбери шаблон и создай контент в один клик!</p>
      </div>
    </div>
  );
}

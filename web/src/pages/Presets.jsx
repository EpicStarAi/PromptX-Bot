import React, { useState, useMemo } from 'react';
import { PRESETS, CATEGORIES, getPresetsByCategory } from '../data/presets';

export default function Presets({ onNavigate, tokens, setSelectedPreset }) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = getPresetsByCategory(activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.prompt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const handleUsePreset = (preset) => {
    setSelectedPreset(preset);
    onNavigate('create');
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Пресеты</span>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
      </div>

      {/* Search */}
      <div className="input-group" style={{ marginTop: 12 }}>
        <input
          className="input-field"
          placeholder="Поиск пресетов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories-scroll">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="presets-grid" style={{ paddingTop: 8 }}>
        {filtered.map(preset => (
          <div
            key={preset.id}
            className="video-card"
            onClick={() => setSelected(preset)}
          >
            <div
              className="video-thumbnail"
              style={{ background: preset.gradient }}
            >
              <span style={{ fontSize: 48 }}>{preset.emoji}</span>
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: 10,
                  background: 'rgba(0,0,0,0.5)',
                  padding: '2px 6px',
                  borderRadius: 4
                }}>
                  {preset.category}
                </span>
              </div>
            </div>
            <div className="video-info">
              <h3>{preset.name}</h3>
              <div className="video-meta">
                <span className="video-cost">-{preset.cost} 💎</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          Ничего не найдено
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selected.name}</h2>
              <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              background: selected.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 80
            }}>
              {selected.emoji}
            </div>

            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 12px', background: 'var(--bg-secondary)', borderRadius: 12, fontSize: 13 }}>
                  📁 {selected.category}
                </span>
                <span style={{ padding: '4px 12px', background: 'rgba(212,168,83,0.15)', color: 'var(--gold)', borderRadius: 12, fontSize: 13, fontWeight: 600 }}>
                  💎 {selected.cost} токенов
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>
                {selected.prompt}
              </p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {selected.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 12, background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 8 }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => handleUsePreset(selected)}
                style={{ margin: 0, width: 'auto' }}
              >
                Использовать пресет →
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}

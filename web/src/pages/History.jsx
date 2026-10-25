import React, { useState } from 'react';

const FILTERS = ['Все', 'Изображения', 'Видео', 'Астрология'];

export default function History({ onNavigate, history, setHistory }) {
  const [activeFilter, setActiveFilter] = useState('Все');

  const filteredHistory = history.filter(item => {
    if (activeFilter === 'Все') return true;
    if (activeFilter === 'Изображения') return item.type === 'image';
    if (activeFilter === 'Видео') return item.type === 'video';
    if (activeFilter === 'Астрология') return item.type === 'astrology';
    return true;
  });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин. назад`;
    if (diffHours < 24) return `${diffHours} ч. назад`;
    if (diffDays < 7) return `${diffDays} дн. назад`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const getTypeIcon = (item) => {
    if (item.type === 'image') return '🖼️';
    if (item.type === 'video') return '🎬';
    if (item.type === 'astrology') return '✨';
    return '📄';
  };

  const getTypeLabel = (item) => {
    if (item.type === 'image') return 'Изображение';
    if (item.type === 'video') return 'Видео';
    if (item.type === 'astrology') return 'Астрология';
    return 'Текст';
  };

  const handleRepeat = (item) => {
    if (item.type === 'astrology') {
      onNavigate('astrology');
    } else if (item.type === 'image') {
      onNavigate('create');
    } else {
      onNavigate('presets');
    }
  };

  const handleDelete = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">История</span>
        <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          {history.length} шт.
        </span>
      </div>

      {/* Filters */}
      <div className="history-filters">
        {FILTERS.map(filter => (
          <button
            key={filter}
            className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="history-list">
        {filteredHistory.length === 0 ? (
          <div className="history-empty">
            <div className="history-empty-icon">📭</div>
            <div className="history-empty-text">
              {activeFilter === 'Все' 
                ? 'Вы ещё ничего не создавали.\nНачните с главной страницы!'
                : `В этой категории пока нет записей`
              }
            </div>
            {activeFilter === 'Все' && (
              <button 
                className="btn-primary" 
                style={{ marginTop: 24 }}
                onClick={() => onNavigate('create')}
              >
                ➕ Создать
              </button>
            )}
          </div>
        ) : (
          filteredHistory.map(item => (
            <div key={item.id} className="history-item">
              <div className="history-thumb">
                {getTypeIcon(item)}
              </div>
              <div className="history-content">
                <div className="history-title">
                  {item.title || item.prompt?.slice(0, 40) || 'Без названия'}
                </div>
                <div className="history-meta">
                  {formatDate(item.createdAt)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="history-type">
                    {getTypeLabel(item)}
                  </span>
                  <span className={`history-status ${item.status || 'done'}`}>
                    {item.status === 'done' ? '✅ Готово' : '⏳ В процессе'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button 
                  onClick={() => handleRepeat(item)}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 12,
                    color: 'var(--gold)',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Повторить
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

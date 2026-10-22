import React from 'react';

export default function Profile({ onNavigate, user, tokens }) {
  const firstName = user?.first_name || 'Пользователь';
  const lastName = user?.last_name || '';
  const initials = (firstName[0] + (lastName[0] || '')).toUpperCase();

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Профиль</span>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-name">{firstName} {lastName}</div>
        <div className="profile-id">ID: {user?.id || '---'}</div>
      </div>

      {/* Token Balance */}
      <div className="token-balance-large">
        <div className="token-balance-amount">{tokens}</div>
        <div className="token-balance-label">токенов</div>
        
        <div className="token-actions">
          <button className="token-btn primary">💰 Пополнить</button>
          <button className="token-btn secondary">🎁 Подарить</button>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Генераций</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Карт</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{tokens}</div>
          <div className="stat-label">Токенов</div>
        </div>
      </div>

      {/* Actions */}
      <div className="action-buttons" style={{ padding: '0 20px' }}>
        <button className="action-btn" onClick={() => onNavigate('feed')}>
          <div className="action-btn-left">
            <div className="action-btn-icon">📰</div>
            <span>Моя лента</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>

        <button className="action-btn" onClick={() => onNavigate('presets')}>
          <div className="action-btn-left">
            <div className="action-btn-icon">⭐</div>
            <span>Мои пресеты</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>

        <button className="action-btn">
          <div className="action-btn-left">
            <div className="action-btn-icon">🌐</div>
            <span>Веб-версия</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>

        <button className="action-btn">
          <div className="action-btn-left">
            <div className="action-btn-icon">💬</div>
            <span>Поддержка</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>

        <button className="action-btn">
          <div className="action-btn-left">
            <div className="action-btn-icon">ℹ️</div>
            <span>Инфо</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function Profile({ onNavigate, user, tokens, history }) {
  const firstName = user?.first_name || 'Пользователь';
  const lastName = user?.last_name || '';
  const initials = (firstName[0] + (lastName[0] || '')).toUpperCase();

  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoSave: false
  });

  const generationsCount = history.filter(h => h.type === 'image').length;
  const videosCount = history.filter(h => h.type === 'video').length;
  const astroCount = history.filter(h => h.type === 'astrology').length;

  // Demo works
  const works = ['🖼️', '🎨', '✨', '🌃', '🐉', '👤'];

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
          <div className="stat-value">{generationsCount}</div>
          <div className="stat-label">Изображений</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{videosCount}</div>
          <div className="stat-label">Видео</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{astroCount}</div>
          <div className="stat-label">Астрология</div>
        </div>
      </div>

      {/* Order Exchange */}
      <div className="profile-section">
        <div 
          className="action-btn"
          onClick={() => alert('Биржа заказов скоро! 🎨')}
        >
          <div className="action-btn-left">
            <div className="action-btn-icon">🎯</div>
            <span>Биржа заказов</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </div>
      </div>

      {/* Best Works Gallery */}
      <div className="profile-section">
        <div className="profile-section-title">
          🏆 Лучшие работы
        </div>
        <div className="works-gallery">
          {works.map((emoji, i) => (
            <div key={i} className="work-thumb">{emoji}</div>
          ))}
        </div>
      </div>

      {/* My Lists */}
      <div className="profile-section">
        <div className="profile-section-title">
          📁 Мои списки
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div 
            className="action-btn"
            onClick={() => onNavigate('history')}
          >
            <div className="action-btn-left">
              <div className="action-btn-icon">🕐</div>
              <span>История</span>
            </div>
            <span className="action-btn-arrow">{history.length} ›</span>
          </div>

          <div 
            className="action-btn"
            onClick={() => onNavigate('presets')}
          >
            <div className="action-btn-left">
              <div className="action-btn-icon">⭐</div>
              <span>Сохранённые шаблоны</span>
            </div>
            <span className="action-btn-arrow">›</span>
          </div>

          <div 
            className="action-btn"
            onClick={() => onNavigate('feed')}
          >
            <div className="action-btn-left">
              <div className="action-btn-icon">❤️</div>
              <span>Избранное</span>
            </div>
            <span className="action-btn-arrow">›</span>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="profile-section">
        <div className="profile-section-title">
          🔔 Уведомления
        </div>
        <div className="settings-item">
          <span className="settings-label">Уведомления о готовности</span>
          <div 
            className={`toggle ${settings.notifications ? 'active' : ''}`}
            onClick={() => toggleSetting('notifications')}
          />
        </div>
        <div className="settings-item">
          <span className="settings-label">Звуковые эффекты</span>
          <div 
            className={`toggle ${settings.soundEffects ? 'active' : ''}`}
            onClick={() => toggleSetting('soundEffects')}
          />
        </div>
        <div className="settings-item">
          <span className="settings-label">Автосохранение</span>
          <div 
            className={`toggle ${settings.autoSave ? 'active' : ''}`}
            onClick={() => toggleSetting('autoSave')}
          />
        </div>
      </div>

      {/* Other Actions */}
      <div className="profile-section">
        <div className="action-btn">
          <div className="action-btn-left">
            <div className="action-btn-icon">🌐</div>
            <span>Веб-версия</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </div>

        <div className="action-btn">
          <div className="action-btn-left">
            <div className="action-btn-icon">💬</div>
            <span>Поддержка</span>
          </div>
          <span className="action-btn-arrow">›</span>
        </div>

        <div className="action-btn">
          <div className="action-btn-left">
            <div className="action-btn-icon">ℹ️</div>
            <span>О приложении</span>
          </div>
          <span className="action-btn-arrow">v1.0.0</span>
        </div>
      </div>

      {/* Bottom padding for nav bar */}
      <div style={{ height: 20 }} />
    </div>
  );
}

import React from 'react';

// Real video templates with gradient thumbnails (like original PromptX)
const VIDEO_TEMPLATES = [
  { id: 1, name: "ПОКАЗ VICTORIA'S SECRET", gradient: 'linear-gradient(135deg, #ff6b9d, #c44569)', badge: null },
  { id: 2, name: "GANGNAM STYLE", gradient: 'linear-gradient(135deg, #667eea, #764ba2)', badge: null },
  { id: 3, name: "ЧЁРНО-БЕЛЫЙ ФИЛЬМ", gradient: 'linear-gradient(135deg, #434343, #000000)', badge: null },
  { id: 4, name: "TREND", gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', badge: 'Тренд' },
  { id: 5, name: "КОСМИЧЕСКОЕ ПУТЕШЕСТВИЕ", gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', badge: null },
  { id: 6, name: "НЕОНОВЫЙ ГОРОД", gradient: 'linear-gradient(135deg, #fc4a1a, #f7b733)', badge: 'Хит' },
  { id: 7, name: "МАГИЧЕСКИЙ ЛЕС", gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', badge: null },
  { id: 8, name: "КИБЕРПАНК 2077", gradient: 'linear-gradient(135deg, #8e2de2, #4a00e0)', badge: 'Новый' }
];

export default function MainScreen({ onNavigate, user, tokens }) {
  
  return (
    <div className="main-screen">
      {/* Header — like original: X Закрыть | ачать | v */}
      <div className="main-header">
        <button className="main-header-close" onClick={() => window.Telegram?.WebApp?.close?.()}>✕</button>
        <span className="main-header-title">Закрыть</span>
        <span className="main-header-title">ачать</span>
        <div style={{ flex: 1 }}></div>
        <span className="main-header-more">⋮</span>
      </div>

      {/* Two Big Cards — По шаблону & С нуля */}
      <div className="main-cards-row">
        {/* Card 1: По шаблону — BIG with gold icon */}
        <div 
          className="main-card-big"
          onClick={() => onNavigate('create')}
        >
          <div className="main-card-gold-icon">✦</div>
          <div className="main-card-label-top">ПРОЩЕ ВСЕГО</div>
          <div className="main-card-title">По шаблону</div>
          <div className="main-card-desc">Выбери готовый и загрузи фото</div>
        </div>

        {/* Card 2: С нуля */}
        <div 
          className="main-card-small"
          onClick={() => onNavigate('create')}
        >
          <div className="main-card-plus-icon">⊕</div>
          <div className="main-card-title-sm">С нуля</div>
          <div className="main-card-desc-sm">Свой промпт и выбор интересов</div>
        </div>
      </div>

      {/* Инструменты — full width card */}
      <div 
        className="tools-card"
        onClick={() => onNavigate('create')}
      >
        <div className="tools-icon">🔧</div>
        <div className="tools-content">
          <div className="tools-title">Инструменты</div>
          <div className="tools-desc">Промпт по фото, расширение кадра, Pinterest AI</div>
        </div>
        <span className="tools-arrow">›</span>
      </div>

      {/* Тренды • 82 шаблона */}
      <div className="trends-section-main">
        <div className="trends-header">
          <span className="trends-bar"></span>
          <span className="trends-title">Тренды  ·  82 шаблона</span>
        </div>
        
        <div className="trends-grid-main">
          {VIDEO_TEMPLATES.map(tmpl => (
            <div 
              key={tmpl.id} 
              className="trend-video-card"
              onClick={() => onNavigate('presets')}
            >
              <div 
                className="trend-video-thumb" 
                style={{ background: tmpl.gradient }}
              >
                <div className="trend-video-camera">📹</div>
                {tmpl.badge && (
                  <div className="trend-video-badge">{tmpl.badge}</div>
                )}
              </div>
              <div className="trend-video-name">{tmpl.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer for nav */}
      <div style={{ height: 90 }}></div>

      <style>{`
        .main-screen {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-bottom: 0;
        }

        /* Header */
        .main-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          gap: 12px;
          background: rgba(10, 10, 15, 0.95);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .main-header-close {
          font-size: 18px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .main-header-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .main-header-more {
          font-size: 24px;
          color: var(--text-secondary);
          cursor: pointer;
        }

        /* Two Cards Row */
        .main-cards-row {
          display: flex;
          gap: 12px;
          padding: 16px;
        }

        /* Big Card — По шаблону (left) */
        .main-card-big {
          flex: 1.3;
          background: linear-gradient(145deg, rgba(212,168,83,0.15), rgba(26,26,37,0.95));
          border: 1px solid rgba(212,168,83,0.25);
          border-radius: 20px;
          padding: 24px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .main-card-big:active {
          transform: scale(0.98);
          border-color: var(--gold);
        }
        .main-card-gold-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, var(--gold), #b8860b);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #000;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(212,168,83,0.35);
        }
        .main-card-label-top {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--gold);
          margin-bottom: 4px;
        }
        .main-card-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .main-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Small Card — С нуля (right) */
        .main-card-small {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .main-card-small:active {
          transform: scale(0.98);
          border-color: var(--gold-dark);
        }
        .main-card-plus-icon {
          width: 44px;
          height: 44px;
          background: var(--bg-secondary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--text-secondary);
          margin-bottom: 16px;
          border: 1px dashed var(--border);
        }
        .main-card-title-sm {
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .main-card-desc-sm {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Tools Card */
        .tools-card {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tools-card:active {
          transform: scale(0.99);
          border-color: var(--gold-dark);
        }
        .tools-icon {
          font-size: 28px;
          width: 48px;
          height: 48px;
          background: var(--bg-secondary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tools-content {
          flex: 1;
          min-width: 0;
        }
        .tools-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 3px;
        }
        .tools-desc {
          font-size: 13px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tools-arrow {
          font-size: 22px;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        /* Trends Section */
        .trends-section-main {
          padding: 0 16px;
        }
        .trends-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .trends-bar {
          width: 3px;
          height: 20px;
          background: var(--gold);
          border-radius: 2px;
        }
        .trends-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Video Grid — 2 columns like original */
        .trends-grid-main {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .trend-video-card {
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .trend-video-card:active {
          transform: scale(0.97);
        }
        .trend-video-thumb {
          width: 100%;
          aspect-ratio: 9/12;
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .trend-video-camera {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 16px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }
        .trend-video-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
        }
        .trend-video-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 8px;
          line-height: 1.25;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
      `}</style>
    </div>
  );
}

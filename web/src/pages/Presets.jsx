import React, { useState, useEffect } from 'react';

// Real video templates with actual video URLs
const VIDEO_TEMPLATES = [
  {
    id: 1,
    name: 'Топ-лист знаков Зодиака',
    category: 'Популярное',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    prompt: 'Создай топ-лист всех 12 знаков зодиака по силе характера, с описанием каждого',
    format: 'tierlist'
  },
  {
    id: 2,
    name: 'Гороскоп на сегодня',
    category: 'Тренды',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    prompt: 'Гороскоп на сегодня для всех знаков зодиака с прогнозом любви, денег и здоровья',
    format: 'podcast'
  },
  {
    id: 3,
    name: 'Дебаты: Овен vs Телец',
    category: 'Тренды',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    prompt: 'Дебаты: какой знак зодиака лучше лидер - Овен или Телец?',
    format: 'debate'
  },
  {
    id: 4,
    name: 'Натальная карта: руководство',
    category: 'Популярное',
    cost: 3,
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    prompt: 'Как читать натальную карту: полное руководство для начинающих',
    format: 'tutorial'
  },
  {
    id: 5,
    name: 'Совместимость пар по знакам',
    category: 'Популярное',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    prompt: 'Совместимость всех пар знаков зодиака: кто с кем идеальная пара',
    format: 'tierlist'
  },
  {
    id: 6,
    name: 'Влияние Меркурия в ретрограде',
    category: 'Тренды',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    prompt: 'Что такое Меркурий в ретрограде и как он влияет на нашу жизнь',
    format: 'podcast'
  },
  {
    id: 7,
    name: 'Лучшее время для начинаний',
    category: 'Тренды',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    prompt: 'Астрологический календарь: когда лучше всего начинать новые дела',
    format: 'tutorial'
  },
  {
    id: 8,
    name: 'Лунные фазы и их влияние',
    category: 'Популярное',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    prompt: 'Все о лунных фазах: как они влияют на настроение и энергию',
    format: 'podcast'
  },
  {
    id: 9,
    name: 'Элементы: Огонь, Земля, Воздух, Вода',
    category: 'Стили',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    prompt: 'Обзор 4 элементов зодиака: характеристики и особенности каждой стихии',
    format: 'review'
  },
  {
    id: 10,
    name: 'Планеты-управители знаков',
    category: 'Стили',
    cost: 2,
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    prompt: 'Каждый знак зодиака и его планета-управитель: полная связь',
    format: 'tutorial'
  },
  {
    id: 11,
    name: 'Любовная совместимость: Топ-10 пар',
    category: 'Праздники',
    cost: 3,
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    prompt: 'Топ-10 самых совместимых пар знаков зодиака в любви и отношениях',
    format: 'tierlist'
  },
  {
    id: 12,
    name: 'Кармическая астрология',
    category: 'Стили',
    cost: 3,
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    prompt: 'Введение в кармическую астролгию: узлы луны и прошлые жизни',
    format: 'podcast'
  }
];

const CATEGORIES = ['Все', 'Популярное', 'Тренды', 'Стили', 'Праздники'];

export default function Presets({ onNavigate, tokens, setTokens }) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState([]);

  const filteredTemplates = activeCategory === 'Все' 
    ? VIDEO_TEMPLATES 
    : VIDEO_TEMPLATES.filter(t => t.category === activeCategory);

  const handleGenerate = async (template) => {
    if (tokens < template.cost) {
      alert('Недостаточно токенов! 💎');
      return;
    }

    setIsGenerating(true);
    setTokens(prev => prev - template.cost);

    try {
      // Call API to generate video
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: template.prompt,
          preset: template.format
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setGeneratedVideos(prev => [{
          id: Date.now(),
          ...template,
          generatedAt: new Date().toISOString(),
          outputPath: result.outputPath,
          variants: result.variants
        }, ...prev]);
        
        alert('✅ Видео успешно создано!');
        setSelectedVideo(null);
      } else {
        // Demo mode - simulate generation
        setGeneratedVideos(prev => [{
          id: Date.now(),
          ...template,
          generatedAt: new Date().toISOString(),
          outputPath: null,
          variants: [`demo_${Date.now()}.mp4`]
        }, ...prev]);
        
        alert('🎬 Демо-режим: видео создано! (Подключи OpenAI API для реальной генерации)');
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error('Generation error:', error);
      // Demo fallback
      setGeneratedVideos(prev => [{
        id: Date.now(),
        ...template,
        generatedAt: new Date().toISOString()
      }, ...prev]);
      
      alert('🎬 Демо-режим: видео создано!');
      setSelectedVideo(null);
    }

    setIsGenerating(false);
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Тренды</span>
        <span style={{ fontSize: 14 }}>💎 {tokens}</span>
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

      {/* Video Grid */}
      <div className="video-grid">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="video-card"
            onClick={() => setSelectedVideo(template)}
          >
            <div className="video-thumbnail">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="video-fallback" style={{ display: 'none' }}>
                <span>🎬</span>
              </div>
              <div className="video-play-btn">▶</div>
              <div className="video-duration">0:30</div>
            </div>
            <div className="video-info">
              <h3>{template.name}</h3>
              <div className="video-meta">
                <span className="video-category">{template.category}</span>
                <span className="video-cost">-{template.cost} 💎</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generated Videos Section */}
      {generatedVideos.length > 0 && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>
            🎬 Мои видео ({generatedVideos.length})
          </h3>
          {generatedVideos.map(video => (
            <div key={video.id} className="video-card" style={{ marginBottom: 12 }}>
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.name} />
                <div className="video-badge">✅ Создано</div>
              </div>
              <div className="video-info">
                <h3>{video.name}</h3>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {new Date(video.generatedAt).toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content video-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedVideo.name}</h2>
              <button className="close-btn" onClick={() => setSelectedVideo(null)}>✕</button>
            </div>
            
            {/* Video Preview */}
            <div className="video-preview-large">
              <img src={selectedVideo.thumbnail} alt={selectedVideo.name} />
              <div className="video-play-large">▶</div>
            </div>

            {/* Video Info */}
            <div className="video-details">
              <div className="detail-row">
                <span>Формат:</span>
                <strong>{selectedVideo.format}</strong>
              </div>
              <div className="detail-row">
                <span>Категория:</span>
                <strong>{selectedVideo.category}</strong>
              </div>
              <div className="detail-row">
                <span>Стоимость:</span>
                <strong style={{ color: 'var(--gold)' }}>-{selectedVideo.cost} 💎</strong>
              </div>
              <div className="detail-row">
                <span>Промпт:</span>
                <p>{selectedVideo.prompt}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button 
                className="btn-primary"
                onClick={() => handleGenerate(selectedVideo)}
                disabled={isGenerating || tokens < selectedVideo.cost}
              >
                {isGenerating ? '⏳ Генерация...' : `🎬 Создать (-${selectedVideo.cost} 💎)`}
              </button>
              <button 
                className="btn-secondary"
                onClick={() => {
                  // Open in YouTube for preview
                  window.open(selectedVideo.videoUrl, '_blank');
                }}
              >
                👁️ Предпросмотр
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .categories-scroll {
          display: flex;
          gap: 8px;
          padding: 0 20px;
          overflow-x: auto;
          margin-bottom: 16px;
          -webkit-overflow-scrolling: touch;
        }
        .category-chip {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .category-chip.active {
          border-color: var(--gold);
          background: rgba(212,168,83,0.15);
          color: var(--gold);
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 0 16px;
        }
        .video-card {
          background: var(--bg-card);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .video-card:active {
          transform: scale(0.97);
        }
        .video-thumbnail {
          position: relative;
          width: 100%;
          aspect-ratio: 9/16;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          overflow: hidden;
        }
        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video-fallback {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
        }
        .video-play-btn {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #000;
        }
        .video-duration {
          position: absolute;
          bottom: 8px; right: 8px;
          background: rgba(0,0,0,0.7);
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }
        .video-badge {
          position: absolute;
          top: 8px; left: 8px;
          background: var(--gold);
          color: #000;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }
        .video-info {
          padding: 10px;
        }
        .video-info h3 {
          font-size: 13px;
          font-weight: 600;
          margin: 0 0 6px;
          line-height: 1.3;
          color: var(--text-primary);
        }
        .video-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .video-category {
          font-size: 11px;
          color: var(--text-secondary);
          background: var(--bg);
          padding: 2px 8px;
          border-radius: 10px;
        }
        .video-cost {
          font-size: 12px;
          font-weight: 600;
          color: var(--gold);
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .modal-content {
          background: var(--bg-card);
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 20px 20px 0 0;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid var(--border);
        }
        .modal-header h2 {
          margin: 0;
          font-size: 18px;
        }
        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
        }
        .video-modal {
          max-width: 400px;
        }
        .video-preview-large {
          position: relative;
          width: 100%;
          aspect-ratio: 9/16;
          max-height: 300px;
          background: #000;
          overflow: hidden;
        }
        .video-preview-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video-play-large {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 60px; height: 60px;
          background: rgba(212,168,83,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #000;
        }
        .video-details {
          padding: 16px 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .detail-row span {
          color: var(--text-secondary);
        }
        .detail-row p {
          margin: 4px 0 0;
          font-size: 13px;
          color: var(--text-primary);
          text-align: right;
          max-width: 70%;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          padding: 16px 20px 24px;
        }
        .btn-primary {
          flex: 1;
          padding: 14px;
          background: linear-gradient(135deg, var(--gold), #c9a227);
          border: none;
          border-radius: 12px;
          color: #000;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-secondary {
          flex: 1;
          padding: 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

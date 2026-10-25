import React, { useState } from 'react';

// Beautiful gradient templates with 20+ items
const TEMPLATES = [
  { id: 1, name: 'Топ знаки Зодиака', emoji: '🏆', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cost: 2, category: 'Популярное' },
  { id: 2, name: 'Гороскоп на сегодня', emoji: '📅', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', cost: 2, category: 'Тренды' },
  { id: 3, name: 'Дебаты знаков', emoji: '⚔️', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', cost: 2, category: 'Тренды' },
  { id: 4, name: 'Натальная карта', emoji: '🗺️', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', cost: 3, category: 'Популярное' },
  { id: 5, name: 'Совместимость пар', emoji: '💕', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', cost: 2, category: 'Популярное' },
  { id: 6, name: 'Меркурий ретроградный', emoji: '☿️', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', cost: 2, category: 'Тренды' },
  { id: 7, name: 'Лунные фазы', emoji: '🌙', gradient: 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)', cost: 2, category: 'Популярное' },
  { id: 8, name: '4 элемента', emoji: '🔥', gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', cost: 2, category: 'Стили' },
  { id: 9, name: 'Планеты-управители', emoji: '🪐', gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)', cost: 2, category: 'Стили' },
  { id: 10, name: 'Топ-10 совместимость', emoji: '💑', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', cost: 3, category: 'Праздники' },
  { id: 11, name: 'Кармическая астрология', emoji: '🔮', gradient: 'linear-gradient(135deg, #a044ff 0%, #6a3093 100%)', cost: 3, category: 'Стили' },
  { id: 12, name: 'Стихии зодиака', emoji: '🌊', gradient: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)', cost: 2, category: 'Стили' },
  { id: 13, name: 'Характер по знаку', emoji: '🎭', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', cost: 2, category: 'Популярное' },
  { id: 14, name: 'Ретроградные планеты', emoji: '🔄', gradient: 'linear-gradient(135deg, #3d3393 0%, #8e8cd8 100%)', cost: 2, category: 'Тренды' },
  { id: 15, name: 'Аспекты планет', emoji: '⭐', gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)', cost: 3, category: 'Стили' },
  { id: 16, name: 'Любовный прогноз', emoji: '💘', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', cost: 2, category: 'Тренды' },
  { id: 17, name: 'Финансовый гороскоп', emoji: '💰', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', cost: 2, category: 'Популярное' },
  { id: 18, name: 'Здоровье и знак', emoji: '🏥', gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)', cost: 2, category: 'Популярное' },
  { id: 19, name: 'Карьерный прогноз', emoji: '💼', gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', cost: 2, category: 'Тренды' },
  { id: 20, name: 'Детский гороскоп', emoji: '👶', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', cost: 2, category: 'Праздники' },
  { id: 21, name: 'Путешествия и знак', emoji: '✈️', gradient: 'linear-gradient(135deg, #0250c5 0%, #d43f8d 100%)', cost: 2, category: 'Тренды' },
  { id: 22, name: 'Талисманы знака', emoji: '🔮', gradient: 'linear-gradient(135deg, #c33764 0%, #1d2671 100%)', cost: 2, category: 'Стили' }
];

const CATEGORIES = ['Все', 'Популярное', 'Тренды', 'Стили', 'Праздники'];

export default function Presets({ onNavigate, tokens, setTokens, addToHistory }) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTemplates = activeCategory === 'Все' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === activeCategory);

  const handleGenerate = async (template) => {
    if (tokens < template.cost) {
      alert('❌ Недостаточно токенов!');
      return;
    }

    setIsGenerating(true);
    setTokens(prev => prev - template.cost);

    // Simulate generation
    await new Promise(r => setTimeout(r, 2000));

    addToHistory({
      type: 'video',
      title: template.name,
      template: template,
      status: 'done'
    });

    setIsGenerating(false);
    setSelectedTemplate(null);
    alert(`🎉 Видео "${template.name}" создано!`);
    onNavigate('history');
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Тренды</span>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
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

      {/* Templates Grid */}
      <div className="presets-grid" style={{ paddingTop: 8 }}>
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="video-card"
            onClick={() => setSelectedTemplate(template)}
          >
            <div 
              className="video-thumbnail"
              style={{ background: template.gradient }}
            >
              <span style={{ fontSize: 48 }}>{template.emoji}</span>
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
                  {template.category}
                </span>
              </div>
            </div>
            <div className="video-info">
              <h3>{template.name}</h3>
              <div className="video-meta">
                <span className="video-cost">-{template.cost} 💎</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="modal-overlay" onClick={() => setSelectedTemplate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTemplate.name}</h2>
              <button className="close-btn" onClick={() => setSelectedTemplate(null)}>✕</button>
            </div>
            
            {/* Template Preview */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              background: selectedTemplate.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 80
            }}>
              {selectedTemplate.emoji}
            </div>

            {/* Template Info */}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{
                  padding: '4px 12px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  fontSize: 13
                }}>
                  📁 {selectedTemplate.category}
                </span>
                <span style={{
                  padding: '4px 12px',
                  background: 'rgba(212,168,83,0.15)',
                  color: 'var(--gold)',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600
                }}>
                  💎 {selectedTemplate.cost} токенов
                </span>
              </div>
              
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: 14,
                lineHeight: 1.5,
                marginBottom: 16
              }}>
                Создайте уникальный контент на основе этого шаблона. 
                Результат будет готов через несколько секунд.
              </p>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button 
                className="btn-primary"
                onClick={() => handleGenerate(selectedTemplate)}
                disabled={isGenerating}
                style={{ margin: 0, width: 'auto' }}
              >
                {isGenerating 
                  ? '⏳ Генерация...' 
                  : `🎬 Создать (-${selectedTemplate.cost} 💎)`
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isGenerating && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎬</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Создаём видео...
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Это займёт около 30 секунд
          </div>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div style={{ height: 20 }} />
    </div>
  );
}

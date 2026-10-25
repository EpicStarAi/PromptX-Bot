import React, { useState } from 'react';

// Templates for "By Template" mode
const TEMPLATES = [
  { id: 1, name: 'Портрет', icon: '🖼️', price: 5 },
  { id: 2, name: 'Пейзаж', icon: '🏔️', price: 5 },
  { id: 3, name: 'Киберпанк', icon: '🌃', price: 8 },
  { id: 4, name: 'Фэнтези', icon: '🧙', price: 8 },
  { id: 5, name: 'Аниме', icon: '🎨', price: 6 },
  { id: 6, name: '3D рендер', icon: '🎲', price: 10 },
  { id: 7, name: 'Логотип', icon: '🏷️', price: 5 },
  { id: 8, name: 'Иконки', icon: '📱', price: 4 }
];

// Interests/Tags for "From Scratch" mode
const INTERESTS = [
  'Природа', 'Город', 'Космос', 'Животные', 'Еда',
  'Спорт', 'Музыка', 'Путешествия', 'Мода', 'Технологии',
  'Искусство', 'Архитектура', 'Фотография', 'Гейминг', 'Кино'
];

export default function Create({ onNavigate, tokens, setTokens, addToHistory }) {
  const [mode, setMode] = useState('template'); // 'template' or 'scratch'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    const cost = mode === 'template' 
      ? (selectedTemplate?.price || 5)
      : 10;

    if (tokens < cost) {
      alert('❌ Недостаточно токенов!');
      return;
    }

    if (mode === 'template' && !selectedTemplate) {
      alert('Выберите шаблон!');
      return;
    }

    if (mode === 'scratch' && (!prompt.trim() || selectedTags.length === 0)) {
      alert('Введите промпт и выберите теги!');
      return;
    }

    setIsGenerating(true);
    setTokens(prev => prev - cost);

    // Simulate generation
    await new Promise(r => setTimeout(r, 2000));

    addToHistory({
      type: 'image',
      title: mode === 'template' ? selectedTemplate.name : prompt.slice(0, 30),
      template: selectedTemplate,
      tags: selectedTags,
      status: 'done'
    });

    setIsGenerating(false);
    alert('🎉 Изображение успешно создано!');
    onNavigate('history');
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Создать</span>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="create-modes">
        <button 
          className={`create-mode-btn ${mode === 'template' ? 'active' : ''}`}
          onClick={() => setMode('template')}
        >
          <span className="create-mode-btn-icon">📋</span>
          По шаблону
        </button>
        <button 
          className={`create-mode-btn ${mode === 'scratch' ? 'active' : ''}`}
          onClick={() => setMode('scratch')}
        >
          <span className="create-mode-btn-icon">✨</span>
          С нуля
        </button>
      </div>

      {/* Template Mode */}
      {mode === 'template' && (
        <>
          <div className="section-title">Выберите шаблон</div>
          <div className="template-grid">
            {TEMPLATES.map(template => (
              <div 
                key={template.id}
                className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="template-icon">{template.icon}</div>
                <div className="template-name">{template.name}</div>
                <div className="template-price">-{template.price} 💎</div>
              </div>
            ))}
          </div>

          <div className="section-title">Загрузите фото</div>
          <div className="photo-upload">
            {photoPreview ? (
              <div className="photo-preview">
                <img src={photoPreview} alt="Preview" />
                <div className="photo-remove" onClick={() => {
                  setPhoto(null);
                  setPhotoPreview(null);
                }}>✕</div>
              </div>
            ) : (
              <label className="photo-upload-area">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <div className="photo-upload-icon">📷</div>
                <div className="photo-upload-text">Нажмите для загрузки</div>
                <div className="photo-upload-hint">JPG, PNG до 10MB</div>
              </label>
            )}
          </div>
        </>
      )}

      {/* Scratch Mode */}
      {mode === 'scratch' && (
        <>
          <div className="input-group">
            <label className="input-label">Ваш промпт</label>
            <textarea
              className="input-field"
              placeholder="Опишите изображение, которое хотите создать..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <div className="section-title">Выберите интересы</div>
          <div className="tags-container">
            <div className="tags-grid">
              {INTERESTS.map(tag => (
                <button
                  key={tag}
                  className={`tag-chip ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Generate Button */}
      <button 
        className="btn-primary"
        style={{ position: 'fixed', bottom: 90, left: 20, right: 20, width: 'auto', maxWidth: 440 }}
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating 
          ? '⏳ Генерация...' 
          : mode === 'template'
            ? `🎨 Создать${selectedTemplate ? ` (-${selectedTemplate.price} 💎)` : ''}`
            : `✨ Создать (-10 💎)`
        }
      </button>

      {/* Loading overlay */}
      {isGenerating && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎨</div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Создаём шедевр...</div>
          <div style={{ color: 'var(--text-secondary)' }}>Это займёт несколько секунд</div>
        </div>
      )}
    </div>
  );
}

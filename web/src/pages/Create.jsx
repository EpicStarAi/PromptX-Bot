import React, { useState, useEffect } from 'react';

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

const INTERESTS = [
  'Природа', 'Город', 'Космос', 'Животные', 'Еда',
  'Спорт', 'Музыка', 'Путешествия', 'Мода', 'Технологии',
  'Искусство', 'Архитектура', 'Фотография', 'Гейминг', 'Кино'
];

export default function Create({ onNavigate, tokens, setTokens, addToHistory, selectedPreset }) {
  const [mode, setMode] = useState(selectedPreset ? 'scratch' : 'template');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [prompt, setPrompt] = useState(selectedPreset?.prompt || '');
  const [selectedTags, setSelectedTags] = useState(selectedPreset?.tags || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  useEffect(() => {
    if (selectedPreset) {
      setMode('scratch');
      setPrompt(selectedPreset.prompt || '');
      setSelectedTags(selectedPreset.tags || []);
    }
  }, [selectedPreset]);

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
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    const cost = selectedPreset
      ? selectedPreset.cost
      : mode === 'template'
        ? (selectedTemplate?.price || 5)
        : 10;

    if (tokens < cost) {
      alert('❌ Недостаточно токенов!');
      return;
    }

    const finalPrompt = prompt.trim() || selectedPreset?.prompt || selectedTemplate?.name || '';
    if (!finalPrompt) {
      alert('Введите промпт');
      return;
    }

    setIsGenerating(true);
    setResultUrl(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt, size: '1024x1024' })
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Ошибка генерации');
      }

      setTokens(prev => prev - cost);
      setResultUrl(data.url);

      addToHistory({
        type: 'image',
        title: selectedPreset?.name || finalPrompt.slice(0, 40),
        prompt: finalPrompt,
        url: data.url,
        revisedPrompt: data.revisedPrompt,
        status: 'done'
      });

      alert('🎉 Готово!');
    } catch (err) {
      console.error(err);
      alert('❌ ' + (err.message || 'Не удалось сгенерировать'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">{selectedPreset ? selectedPreset.name : 'Создать'}</span>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
      </div>

      {selectedPreset && (
        <div style={{ margin: '12px 20px', padding: 12, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--gold-dark)' }}>
          <div style={{ fontSize: 13, color: 'var(--gold)', marginBottom: 4 }}>Пресет: {selectedPreset.emoji} {selectedPreset.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Стоимость: {selectedPreset.cost} 💎</div>
        </div>
      )}

      {!selectedPreset && (
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
      )}

      {mode === 'template' && !selectedPreset && (
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
                <div className="photo-remove" onClick={() => { setPhoto(null); setPhotoPreview(null); }}>✕</div>
              </div>
            ) : (
              <label className="photo-upload-area">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                <div className="photo-upload-icon">📷</div>
                <div className="photo-upload-text">Нажмите для загрузки</div>
                <div className="photo-upload-hint">JPG, PNG до 10MB</div>
              </label>
            )}
          </div>
        </>
      )}

      {(mode === 'scratch' || selectedPreset) && (
        <>
          <div className="input-group">
            <label className="input-label">Промпт</label>
            <textarea
              className="input-field"
              placeholder="Опишите, что хотите создать..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          {!selectedPreset && (
            <>
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
        </>
      )}

      {resultUrl && (
        <div style={{ margin: '16px 20px', borderRadius: 12, overflow: 'hidden' }}>
          <img src={resultUrl} alt="Generated" style={{ width: '100%', display: 'block' }} />
        </div>
      )}

      <button
        className="btn-primary"
        style={{ position: 'fixed', bottom: 90, left: 20, right: 20, width: 'auto', maxWidth: 440 }}
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating
          ? '⏳ Генерация...'
          : `🎨 Создать (-${selectedPreset?.cost || (mode === 'template' ? selectedTemplate?.price || 5 : 10)} 💎)`
        }
      </button>

      {isGenerating && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎨</div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Создаём...</div>
          <div style={{ color: 'var(--text-secondary)' }}>Это займёт несколько секунд</div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';

const TABS = [
  { id: 'generate', label: 'Генерация', icon: '🎨' },
  { id: 'prompt', label: 'Промпт', icon: '✏️' },
  { id: 'photo', label: 'По фото', icon: '📷' },
];

export default function NeuralNetworks({ onNavigate, tokens, setTokens }) {
  const [activeTab, setActiveTab] = useState('generate');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      // TODO: Call API
      await new Promise(r => setTimeout(r, 2000)); // Simulate
      setResult({
        image: null,
        prompt: prompt,
        message: 'Генерация готова! (демо-режим)'
      });
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Нейросети</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 12,
              border: activeTab === tab.id ? '1px solid var(--gold)' : '1px solid var(--border)',
              background: activeTab === tab.id ? 'rgba(212,168,83,0.15)' : 'var(--bg-card)',
              color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'generate' && (
        <>
          <div className="input-group">
            <label className="input-label">Опиши что хочешь создать</label>
            <textarea
              className="input-field"
              placeholder="Кот в космосе, стиль киберпанк..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
          >
            {loading ? '⏳ Генерируем...' : `✨ Создать (-2 💎)`}
          </button>
        </>
      )}

      {activeTab === 'prompt' && (
        <>
          <div className="input-group">
            <label className="input-label">Введи свой промпт</label>
            <textarea
              className="input-field"
              placeholder="Detailed prompt for AI generation..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
          >
            {loading ? '⏳ Генерируем...' : '🚀 Сгенерировать'}
          </button>
        </>
      )}

      {activeTab === 'photo' && (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Загрузи фото и получи промпт или анализ
          </p>
          <button className="btn-primary" disabled>
            📤 Выбрать фото (-3 💎)
          </button>
        </div>
      )}

      {/* Result */}
      {result && !result.error && (
        <div className="result-card fade-in">
          {result.image && (
            <img src={result.image} alt="Generated" className="result-image" />
          )}
          <div className="result-content">
            <div className="result-prompt">{result.prompt}</div>
            <p>{result.message}</p>
          </div>
        </div>
      )}
      
      {result?.error && (
        <div style={{ padding: 20, textAlign: 'center', color: 'var(--danger)' }}>
          ⚠️ {result.error}
        </div>
      )}
    </div>
  );
}

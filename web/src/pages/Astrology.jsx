import React, { useState } from 'react';

const SIGNS = [
  { name: 'Овен', symbol: '♈' }, { name: 'Телец', symbol: '♉' },
  { name: 'Близнецы', symbol: '♊' }, { name: 'Рак', symbol: '♋' },
  { name: 'Лев', symbol: '♌' }, { name: 'Дева', symbol: '♍' },
  { name: 'Весы', symbol: '♎' }, { name: 'Скорпион', symbol: '♏' },
  { name: 'Стрелец', symbol: '♐' }, { name: 'Козерог', symbol: '♑' },
  { name: 'Водолей', symbol: '♒' }, { name: 'Рыбы', symbol: '♓' }
];

export default function Astrology({ onNavigate, tokens, setTokens }) {
  const [activeTab, setActiveTab] = useState('natal');
  const [selectedSign, setSelectedSign] = useState(null);
  const [birthData, setBirthData] = useState({
    day: '', month: '', year: '', hour: '12', minute: '00'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNatalChart = async () => {
    if (!birthData.day || !birthData.month || !birthData.year) return;
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    
    setResult({
      type: 'natal',
      sign: SIGNS[(parseInt(birthData.month) - 1 + 11) % 12],
      message: `Натальная карта для ${birthData.day}.${birthData.month}.${birthData.year} готова! (демо)`
    });
    setLoading(false);
  };

  const handleHoroscope = async (signIndex) => {
    setSelectedSign(signIndex);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    setResult({
      type: 'horoscope',
      sign: SIGNS[signIndex],
      love: 'Сегодня благоприятный день для романтики ❤️',
      work: 'Хороший день для новых проектов 💼',
      finance: 'Финансы стабильны 💰',
      advice: 'Доверься интуиции ✨',
      luckyNumber: Math.floor(Math.random() * 49) + 1,
      mood: 'энергичное'
    });
    setLoading(false);
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Астрология</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 20 }}>
        {[
          { id: 'natal', label: '🔮 Карта', cost: 120 },
          { id: 'compatibility', label: '💕 Пара', cost: 100 },
          { id: 'horoscope', label: '📅 Гороскоп', cost: 0 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 12,
              border: activeTab === tab.id ? '1px solid var(--gold)' : '1px solid var(--border)',
              background: activeTab === tab.id ? 'rgba(212,168,83,0.15)' : 'var(--bg-card)',
              color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            {tab.label}
            {tab.cost > 0 && (
              <div style={{ fontSize: 11, marginTop: 2, opacity: 0.7 }}>
                -{tab.cost} 💎
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Natal Chart Tab */}
      {activeTab === 'natal' && (
        <>
          <div className="section-title">Дата рождения</div>
          
          <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 16 }}>
            <input
              type="number"
              className="input-field"
              placeholder="ДД"
              value={birthData.day}
              onChange={(e) => setBirthData({...birthData, day: e.target.value})}
              min="1" max="31"
            />
            <input
              type="number"
              className="input-field"
              placeholder="ММ"
              value={birthData.month}
              onChange={(e) => setBirthData({...birthData, month: e.target.value})}
              min="1" max="12"
            />
            <input
              type="number"
              className="input-field"
              placeholder="ГГГГ"
              value={birthData.year}
              onChange={(e) => setBirthData({...birthData, year: e.target.value})}
              min="1900" max="2026"
            />
          </div>

          <div className="section-title">Время рождения (опционально)</div>
          <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 24 }}>
            <input
              type="number"
              className="input-field"
              placeholder="Час"
              value={birthData.hour}
              onChange={(e) => setBirthData({...birthData, hour: e.target.value})}
              min="0" max="23"
            />
            <input
              type="number"
              className="input-field"
              placeholder="Мин"
              value={birthData.minute}
              onChange={(e) => setBirthData({...birthData, minute: e.target.value})}
              min="0" max="59"
            />
          </div>

          <button 
            className="btn-primary" 
            onClick={handleNatalChart}
            disabled={loading || !birthData.day || !birthData.month || !birthData.year}
          >
            {loading ? '⏳ Рассчитываем...' : '🔮 Построить карту (-120 💎)'}
          </button>
        </>
      )}

      {/* Compatibility Tab */}
      {activeTab === 'compatibility' && (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💕</div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Введите данные двух людей для расчёта совместимости
          </p>
          <button className="btn-primary">
            💫 Совместимость (-100 💎)
          </button>
        </div>
      )}

      {/* Horoscope Tab */}
      {activeTab === 'horoscope' && (
        <>
          <div className="section-title">Выбери знак зодиака</div>
          <div className="horoscope-grid">
            {SIGNS.map((sign, i) => (
              <button
                key={sign.name}
                className={`sign-btn ${selectedSign === i ? 'selected' : ''}`}
                onClick={() => handleHoroscope(i)}
                style={{
                  borderColor: selectedSign === i ? 'var(--gold)' : undefined,
                  color: selectedSign === i ? 'var(--gold)' : undefined
                }}
              >
                <span className="sign-symbol">{sign.symbol}</span>
                {sign.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Result */}
      {result && result.type === 'natal' && (
        <div className="result-card fade-in" style={{ margin: 20 }}>
          <div className="result-content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🌟</div>
            <h3 style={{ color: 'var(--gold)', marginBottom: 8 }}>
              {result.sign.symbol} {result.sign.name}
            </h3>
            <p>{result.message}</p>
          </div>
        </div>
      )}

      {result && result.type === 'horoscope' && (
        <div className="result-card fade-in" style={{ margin: 20 }}>
          <div className="result-content">
            <h3 style={{ color: 'var(--gold)', marginBottom: 16, textAlign: 'center' }}>
              {result.sign?.symbol} {result.sign?.name} — Сегодня
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--bg-secondary)', padding: 14, borderRadius: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>💕 Любовь</div>
                <div>{result.love}</div>
              </div>
              
              <div style={{ background: 'var(--bg-secondary)', padding: 14, borderRadius: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>💼 Работа</div>
                <div>{result.work}</div>
              </div>
              
              <div style={{ background: 'var(--bg-secondary)', padding: 14, borderRadius: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>💰 Финансы</div>
                <div>{result.finance}</div>
              </div>
              
              <div style={{ background: 'var(--bg-secondary)', padding: 14, borderRadius: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>✨ Совет дня</div>
                <div>{result.advice}</div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Счастливое число</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>{result.luckyNumber}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Настроение</div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{result.mood}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, animation: 'pulse 1s infinite' }}>⏳</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>Загружаем...</p>
        </div>
      )}
    </div>
  );
}

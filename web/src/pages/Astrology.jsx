import React, { useState, useEffect } from 'react';

const SIGNS = [
  { name: 'Овен', symbol: '♈' }, { name: 'Телец', symbol: '♉' },
  { name: 'Близнецы', symbol: '♊' }, { name: 'Рак', symbol: '♋' },
  { name: 'Лев', symbol: '♌' }, { name: 'Дева', symbol: '♍' },
  { name: 'Весы', symbol: '♎' }, { name: 'Скорпион', symbol: '♏' },
  { name: 'Стрелец', symbol: '♐' }, { name: 'Козерог', symbol: '♑' },
  { name: 'Водолей', symbol: '♒' }, { name: 'Рыбы', symbol: '♓' }
];

// Generate stars for background
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      id: i,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() > 0.9 ? 'large' : 'small',
      delay: Math.random() * 3 + 's'
    });
  }
  return stars;
};

export default function Astrology({ onNavigate, tokens, setTokens, user, addToHistory }) {
  const [activeTab, setActiveTab] = useState('natal');
  const [selectedSign, setSelectedSign] = useState(null);
  const [birthData, setBirthData] = useState(() => {
    const saved = localStorage.getItem('promptx_astro_birth');
    return saved ? JSON.parse(saved) : { day: '', month: '', year: '', hour: '12', minute: '00' };
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stars] = useState(generateStars);

  // Save birth data to localStorage
  useEffect(() => {
    localStorage.setItem('promptx_astro_birth', JSON.stringify(birthData));
  }, [birthData]);

  // Save user astro data
  useEffect(() => {
    if (user) {
      const savedUserAstro = localStorage.getItem('promptx_user_astro');
      if (!savedUserAstro) {
        localStorage.setItem('promptx_user_astro', JSON.stringify({
          userId: user.id,
          sign: null,
          birthData: null
        }));
      }
    }
  }, [user]);

  const handleNatalChart = async () => {
    if (!birthData.day || !birthData.month || !birthData.year) return;
    if (tokens < 120) {
      alert('❌ Недостаточно токенов! Нужно 120 💎');
      return;
    }
    
    setLoading(true);
    setTokens(prev => prev - 120);
    await new Promise(r => setTimeout(r, 2000));
    
    const monthIndex = parseInt(birthData.month) - 1;
    const sign = SIGNS[monthIndex % 12];
    
    setResult({
      type: 'natal',
      sign: sign,
      message: `Натальная карта для ${birthData.day}.${birthData.month}.${birthData.year}`,
      description: 'Ваша натальная карта рассчитана! Знак зодиака: ' + sign.name
    });

    // Save to user astro data
    localStorage.setItem('promptx_user_astro', JSON.stringify({
      userId: user?.id,
      sign: sign,
      birthData: birthData
    }));

    addToHistory({
      type: 'astrology',
      title: `Натальная карта: ${sign.name}`,
      status: 'done'
    });

    setLoading(false);
  };

  const handleHoroscope = async (signIndex) => {
    setSelectedSign(signIndex);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const sign = SIGNS[signIndex];
    const moods = ['энергичное', 'спокойное', 'творческое', 'романтичное', 'продуктивное'];
    const luckyNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 49) + 1);
    
    setResult({
      type: 'horoscope',
      sign: sign,
      love: ['Звёзды благосклонны к любви сегодня! 💕', 'Отличный день для новых знакомств! 🌟', 'Гармония в отношениях принесёт радость ❤️'][Math.floor(Math.random() * 3)],
      work: ['Проекты идут как по маслу! 💼', 'Новые возможности на работе! 🚀', 'Коллеги оценят вашу помощь 🤝'][Math.floor(Math.random() * 3)],
      finance: ['Финансовый рост возможен! 💰', 'Будьте осторожны с тратами 📊', 'Неожиданный доход возможен! ✨'][Math.floor(Math.random() * 3)],
      advice: ['Доверьтесь интуиции ✨', 'Больше отдыхайте сегодня 🌙', 'Прислушайтесь к близким 💭'][Math.floor(Math.random() * 3)],
      luckyNumbers: luckyNumbers,
      mood: moods[Math.floor(Math.random() * moods.length)]
    });

    addToHistory({
      type: 'astrology',
      title: `Гороскоп: ${sign.name}`,
      status: 'done'
    });

    setLoading(false);
  };

  return (
    <div className="page zodiac-sign-display fade-in" style={{ position: 'relative' }}>
      {/* Stars Background */}
      <div className="stars-bg">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.size}`}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="page-header" style={{ position: 'relative', zIndex: 1 }}>
        <button className="back-btn" onClick={() => onNavigate('main')}>←</button>
        <span className="page-title">Астрология</span>
        <div className="header-tokens">
          <span className="coin"></span>
          {tokens}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 20, position: 'relative', zIndex: 1 }}>
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
          <div className="section-title" style={{ position: 'relative', zIndex: 1 }}>Дата рождения</div>
          
          <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 16, position: 'relative', zIndex: 1 }}>
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

          <div className="section-title" style={{ position: 'relative', zIndex: 1 }}>Время рождения (опционально)</div>
          <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 24, position: 'relative', zIndex: 1 }}>
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
            style={{ position: 'relative', zIndex: 1 }}
            onClick={handleNatalChart}
            disabled={loading || !birthData.day || !birthData.month || !birthData.year}
          >
            {loading ? '⏳ Рассчитываем...' : '🔮 Построить карту (-120 💎)'}
          </button>
        </>
      )}

      {/* Compatibility Tab */}
      {activeTab === 'compatibility' && (
        <div style={{ padding: 40, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💕</div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Введите данные двух людей для расчёта совместимости
          </p>
          <button 
            className="btn-primary"
            onClick={() => {
              if (tokens < 100) {
                alert('❌ Недостаточно токенов!');
                return;
              }
              setTokens(prev => prev - 100);
              alert('🎉 Совместимость рассчитана! (демо)');
              addToHistory({
                type: 'astrology',
                title: 'Совместимость пары',
                status: 'done'
              });
            }}
          >
            💫 Совместимость (-100 💎)
          </button>
        </div>
      )}

      {/* Horoscope Tab */}
      {activeTab === 'horoscope' && (
        <>
          <div className="section-title" style={{ position: 'relative', zIndex: 1 }}>Выбери знак зодиака</div>
          <div className="horoscope-grid" style={{ position: 'relative', zIndex: 1 }}>
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

      {/* Result - Natal Chart */}
      {result && result.type === 'natal' && (
        <div className="result-card fade-in" style={{ margin: 20, position: 'relative', zIndex: 1 }}>
          <div className="result-content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 80, marginBottom: 16 }}>{result.sign.symbol}</div>
            <h3 style={{ color: 'var(--gold)', fontSize: 28, marginBottom: 8 }}>
              {result.sign.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>{result.message}</p>
            <p>{result.description}</p>
          </div>
        </div>
      )}

      {/* Result - Horoscope */}
      {result && result.type === 'horoscope' && (
        <div className="result-card fade-in" style={{ margin: 20, position: 'relative', zIndex: 1 }}>
          <div className="result-content">
            <h3 style={{ color: 'var(--gold)', marginBottom: 16, textAlign: 'center' }}>
              {result.sign?.symbol} {result.sign?.name} — Сегодня
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(255,100,130,0.1)', padding: 14, borderRadius: 12, border: '1px solid rgba(255,100,130,0.2)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>💕 Любовь</div>
                <div>{result.love}</div>
              </div>
              
              <div style={{ background: 'rgba(100,150,255,0.1)', padding: 14, borderRadius: 12, border: '1px solid rgba(100,150,255,0.2)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>💼 Работа</div>
                <div>{result.work}</div>
              </div>
              
              <div style={{ background: 'rgba(212,168,83,0.1)', padding: 14, borderRadius: 12, border: '1px solid rgba(212,168,83,0.2)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>💰 Финансы</div>
                <div>{result.finance}</div>
              </div>
              
              <div style={{ background: 'rgba(139,92,246,0.1)', padding: 14, borderRadius: 12, border: '1px solid rgba(139,92,246,0.2)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>✨ Совет дня</div>
                <div>{result.advice}</div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Счастливые числа</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>
                    {result.luckyNumbers?.join(' • ')}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Настроение</div>
                <div style={{ fontSize: 16, fontWeight: 600, textTransform: 'capitalize' }}>{result.mood}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ padding: 40, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 48, animation: 'pulse 1s infinite' }}>⏳</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>Загружаем...</p>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div style={{ height: 20, position: 'relative', zIndex: 1 }} />
    </div>
  );
}

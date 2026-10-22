/**
 * Astrology Module
 * Calculates natal charts, compatibility, and horoscopes
 */

// Zodiac signs data
const ZODIAC_SIGNS = [
  { name: 'Овен', symbol: '♈', dates: '21.03 - 19.04', element: 'Огонь' },
  { name: 'Телец', symbol: '♉', dates: '20.04 - 20.05', element: 'Земля' },
  { name: 'Близнецы', symbol: '♊', dates: '21.05 - 21.06', element: 'Воздух' },
  { name: 'Рак', symbol: '♋', dates: '22.06 - 22.07', element: 'Вода' },
  { name: 'Лев', symbol: '♌', dates: '23.07 - 22.08', element: 'Огонь' },
  { name: 'Дева', symbol: '♍', dates: '23.08 - 22.09', element: 'Земля' },
  { name: 'Весы', symbol: '♎', dates: '23.09 - 23.10', element: 'Воздух' },
  { name: 'Скорпион', symbol: '♏', dates: '24.10 - 22.11', element: 'Вода' },
  { name: 'Стрелец', symbol: '♐', dates: '23.11 - 21.12', element: 'Огонь' },
  { name: 'Козерог', symbol: '♑', dates: '22.12 - 19.01', element: 'Земля' },
  { name: 'Водолей', symbol: '♒', dates: '20.01 - 18.02', element: 'Воздух' },
  { name: 'Рыбы', symbol: '♓', dates: '19.02 - 20.03', element: 'Вода' }
];

// Planets
const PLANETS = [
  'Солнце 🌞', 'Луна 🌙', 'Меркурий ☿️', 'Венера ♀️',
  'Марс ♂️', 'Юпитер ♃', 'Сатурн ♄', 'Уран ⛅',
  'Нептун ♆', 'Плутон ⯓'
];

// Houses
const HOUSES = [
  'Я (личность, внешность)',
  'Деньги, ценности',
  'Коммуникация, обучение',
  'Дом, семья, корни',
  'Творчество, любовь, дети',
  'Работа, здоровье, рутина',
  'Партнёрство, брак',
  'Интимность, трансформация',
  'Философия, путешествия',
  'Карьера, репутация',
  'Друзья, надежды',
  'Тайны, духовность'
];

/**
 * Get zodiac sign from date
 */
export function getZodiacSign(month, day) {
  const signDates = [
    [3, 21], [4, 20], [5, 21], [6, 21],
    [7, 23], [8, 23], [9, 23], [10, 23],
    [11, 22], [12, 22], [1, 20], [2, 19]
  ];
  
  for (let i = 0; i < signDates.length; i++) {
    const [m, d] = signDates[i];
    if ((month === m && day >= d) || 
        (i === 11 && month === 1 && day <= d) ||
        (i < 11 && month === signDates[i + 1]?.[0] && day <= signDates[i + 1]?.[1])) {
      return ZODIAC_SIGNS[i];
    }
  }
  return ZODIAC_SIGNS[0];
}

/**
 * Calculate natal chart
 */
export function calculateNatalChart(birthData) {
  const { year, month, day, hour = 12, minute = 0, city } = birthData;
  
  // Simplified calculation (real implementation uses swiss-ephemeris)
  const sunSign = getZodiacSign(month, day);
  
  // Generate random but consistent planet positions for demo
  const planets = PLANETS.map((planet, i) => ({
    name: planet,
    sign: ZODIAC_SIGNS[(month + i * 3) % 12],
    degree: Math.floor(Math.random() * 30) + 1,
    house: Math.floor(Math.random() * 12) + 1,
    retrograde: Math.random() > 0.8
  }));
  
  return {
    sunSign,
    ascendant: ZODIAC_SIGN[(month + 1) % 12],
    moonSign: ZODIAC_SIGNS[(month + 5) % 12],
    planets,
    houses: HOUSES,
    elements: getElementBalance(planets),
    chartData: generateChartData(year, month, day, hour, minute),
    interpretation: generateNatalInterpretation(sunSign, planets)
  };
}

/**
 * Calculate compatibility between two people
 */
export function calculateCompatibility(person1, person2) {
  const sign1 = getZodiacSign(person1.month, person1.day);
  const sign2 = getZodiacSign(person2.month, person2.day);
  
  // Element compatibility
  const elementCompatibility = {
    'Огонь': { 'Огонь': 80, 'Воздух': 90, 'Земля': 40, 'Вода': 50 },
    'Земля': { 'Огонь': 40, 'Воздух': 50, 'Земля': 85, 'Вода': 75 },
    'Воздух': { 'Огонь': 90, 'Воздух': 70, 'Земля': 50, 'Вода': 60 },
    'Вода': { 'Огонь': 50, 'Воздух': 60, 'Земля': 75, 'Вода': 80 }
  };
  
  const score = elementCompatibility[sign1.element][sign2.element] || 50;
  
  return {
    person1: { ...person1, sign: sign1 },
    person2: { ...person2, sign: sign2 },
    overallScore: score,
    love: Math.min(100, score + Math.floor(Math.random() * 20)),
    friendship: Math.min(100, score + Math.floor(Math.random() * 15)),
    communication: Math.min(100, score + Math.floor(Math.random() * 25)),
    trust: Math.min(100, score + Math.floor(Math.random() * 30)),
    aspects: generateAspects(sign1, sign2),
    advice: generateCompatibilityAdvice(score, sign1, sign2)
  };
}

/**
 * Get daily horoscope
 */
export function getDailyHoroscope(signIndex) {
  const sign = ZODIAC_SIGNS[signIndex];
  
  const themes = [
    ['💕 Любовь', '💼 Работа', '💰 Финансы', '🎯 Цели'],
    ['❤️ Отношения', '🏥 Здоровье', '👨‍👩‍👧 Семья', '✨ Энергия']
  ];
  
  const predictions = {
    love: getRandomPrediction('love'),
    work: getRandomPrediction('work'),
    finance: getRandomPrediction('finance'),
    advice: getRandomPrediction('advice'),
    luckyNumber: Math.floor(Math.random() * 49) + 1,
    luckyColor: ['красный', 'синий', 'зелёный', 'жёлтый', 'фиолетовый', 'оранжевый'][Math.floor(Math.random() * 7)],
    mood: ['отличное', 'хорошее', 'спокойное', 'энергичное', 'мечтательное'][Math.floor(Math.random() * 5)],
    rating: Math.floor(Math.random() * 5) + 1
  };
  
  return { sign, ...predictions };
}

// Helper functions

function getElementBalance(planets) {
  const counts = { Огонь: 0, Земля: 0, Воздух: 0, Вода: 0 };
  planets.forEach(p => counts[p.sign.element]++);
  return counts;
}

function generateNatalInterpretation(sunSign, planets) {
  return `Ты — ${sunSign.name} ${sunSign.symbol}. ` +
    `Твоя личность определяется положением Солнца в ${sunSign.name}. ` +
    `Луна в ${planets[1].sign.name} показывает твои эмоции, ` +
    `а восходящий знак формирует твое первое впечатление.`;
}

function generateAspects(sign1, sign2) {
  const distance = Math.abs(ZODIAC_SIGNS.indexOf(sign1) - ZODIAC_SIGNS.indexOf(sign2));
  if (distance === 0 || distance === 12) return [{ type: 'Соединение', strength: 'strong' }];
  if (distance === 4 || distance === 8) return [{ type: 'Трин', strength: 'harmonious' }];
  if (distance === 3 || distance === 9) return [{ type: 'Квадрат', strength: 'tense' }];
  if (distance === 6) return [{ type: 'Оппозиция', strength: 'challenging' }];
  return [{ type: 'Секстиль', strength: 'positive' }];
}

function generateCompatibilityAdvice(score, sign1, sign2) {
  if (score >= 80) return `Отличная совместимость! ${sign1.name} и ${sign2.name} — прекрасная пара.`;
  if (score >= 60) return `Хорошая совместимость с потенциалом для роста.`;
  if (score >= 40) return `Средняя совместимость. Требуется работа над отношениями.`;
  return `Сложная комбинация, но любовь покоряет любые преграды!`;
}

function getRandomPrediction(category) {
  const predictions = {
    love: ['Сегодня благоприятный день для романтики', 'Возможна неожиданная встреча', 'Время для откровенного разговора', 'Звёзды favour отношениям'],
    work: ['Хороший день для новых проектов', 'Возможно повышение или премия', 'Фокус на деталях принесёт успех', 'Коллеги оценят твои идеи'],
    finance: ['Финансовое положение стабилизируется', 'Возможен неожиданный доход', 'Не стоит рисковать сегодня', 'Хорошее время для инвестиций'],
    advice: ['Будь открыт к новым возможностям', 'Послушай свою интуицию', 'Сегодня хороший день для размышлений', 'Действуй решительно']
  };
  const list = predictions[category] || predictions.advice;
  return list[Math.floor(Math.random() * list.length)];
}

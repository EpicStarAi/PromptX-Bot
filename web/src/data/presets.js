/**
 * Presets System — PromptX
 * Categories: image, video, astrology
 */

export const PRESETS = [
  // Image presets
  {
    id: 'img-portrait',
    name: 'Портрет',
    type: 'image',
    category: 'Изображения',
    emoji: '🖼️',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cost: 5,
    prompt: 'professional portrait photo, studio lighting, high detail, 8k',
    tags: ['портрет', 'студия']
  },
  {
    id: 'img-cyberpunk',
    name: 'Киберпанк',
    type: 'image',
    category: 'Изображения',
    emoji: '🌃',
    gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
    cost: 8,
    prompt: 'cyberpunk cityscape, neon lights, rain, futuristic, cinematic, ultra detailed',
    tags: ['киберпанк', 'неон']
  },
  {
    id: 'img-anime',
    name: 'Аниме',
    type: 'image',
    category: 'Изображения',
    emoji: '🎨',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cost: 6,
    prompt: 'anime style character, vibrant colors, detailed eyes, studio ghibli inspired',
    tags: ['аниме']
  },
  {
    id: 'img-fantasy',
    name: 'Фэнтези',
    type: 'image',
    category: 'Изображения',
    emoji: '🧙',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    cost: 8,
    prompt: 'epic fantasy landscape, dragons, castles, magical atmosphere, highly detailed',
    tags: ['фэнтези']
  },
  {
    id: 'img-logo',
    name: 'Логотип',
    type: 'image',
    category: 'Изображения',
    emoji: '🏷️',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cost: 5,
    prompt: 'minimalist logo design, clean vector style, modern, white background',
    tags: ['логотип', 'бренд']
  },

  // Video presets
  {
    id: 'vid-tierlist',
    name: 'Тир-лист',
    type: 'video',
    category: 'Видео',
    emoji: '🏆',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cost: 15,
    prompt: 'tier list ranking of zodiac signs for relationships, dynamic transitions, text overlays',
    tags: ['тирлист', 'астрология']
  },
  {
    id: 'vid-debate',
    name: 'Дебаты',
    type: 'video',
    category: 'Видео',
    emoji: '⚔️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    cost: 15,
    prompt: 'two characters debating AI vs human artists, split screen, animated expressions',
    tags: ['дебаты']
  },
  {
    id: 'vid-neon',
    name: 'Неоновый город',
    type: 'video',
    category: 'Видео',
    emoji: '🌇',
    gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    cost: 12,
    prompt: 'neon city night drive, cyberpunk aesthetic, rain reflections, cinematic camera',
    tags: ['неон', 'город']
  },
  {
    id: 'vid-space',
    name: 'Космическое путешествие',
    type: 'video',
    category: 'Видео',
    emoji: '🚀',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
    cost: 12,
    prompt: 'space travel through galaxy, stars, planets, cinematic wide shots',
    tags: ['космос']
  },

  // Astrology presets
  {
    id: 'astro-horoscope',
    name: 'Гороскоп на сегодня',
    type: 'astrology',
    category: 'Астрология',
    emoji: '📅',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cost: 2,
    prompt: 'daily horoscope for all zodiac signs, short and engaging',
    tags: ['гороскоп']
  },
  {
    id: 'astro-compatibility',
    name: 'Совместимость пар',
    type: 'astrology',
    category: 'Астрология',
    emoji: '💕',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cost: 3,
    prompt: 'zodiac compatibility analysis for two signs',
    tags: ['совместимость']
  },
  {
    id: 'astro-natal',
    name: 'Натальная карта',
    type: 'astrology',
    category: 'Астрология',
    emoji: '🗺️',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    cost: 5,
    prompt: 'natal chart interpretation based on birth data',
    tags: ['натальная']
  }
];

export const CATEGORIES = ['Все', 'Изображения', 'Видео', 'Астрология'];

export function getPresetsByCategory(category) {
  if (category === 'Все') return PRESETS;
  return PRESETS.filter(p => p.category === category);
}

export function getPresetById(id) {
  return PRESETS.find(p => p.id === id) || null;
}

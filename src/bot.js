import { Bot, InlineKeyboard } from 'grammy';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { VIDEO_PRESETS, createVideoFromPrompt, createVideoVariants } from './api/hypit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Config
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const WEBAPP_URL = process.env.WEBAPP_URL || `http://localhost:${PORT}/web`;

// Create bot
const bot = new Bot(BOT_TOKEN);

// Create Express app for Mini App
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, '../web/dist')));

// ==================== COMMANDS ====================

bot.command('start', (ctx) => {
  const webAppUrl = `${WEBAPP_URL}?tgWebAppData=${encodeURIComponent(JSON.stringify({
    user: ctx.from,
    start_param: ctx.match
  }))}`;
  
  const keyboard = new InlineKeyboard()
    .webApp('🚀 Открыть приложение', webAppUrl);
  
  ctx.reply(
    `👋 Привет, ${ctx.from.first_name || 'друг'}!\n\n` +
    `🤖 *PromptX Bot* — Нейросети и Астрология\n\n` +
    `▪️ Генерация по шаблонам\n` +
    `▪️ Собственные промпты\n` +
    `▪️ Натальная карта\n` +
    `▪️ Совместимость пар\n` +
    `▪️ Гороскоп на каждый день\n\n` +
    `Нажми кнопку ниже 👇`,
    { parse_mode: 'Markdown', reply_markup: keyboard }
  );
});

// ==================== BUTTONS ====================

bot.command('profile', async (ctx) => {
  const user = ctx.from;
  ctx.reply(
    `👤 *Твой профиль*\n\n` +
    `🆔 ID: \`${user.id}\`\n` +
    `👤 Имя: ${user.first_name} ${user.last_name || ''}\n` +
    `🔗 Username: @${user.username || 'нет'}\n\n` +
    `💎 Токены: *загрузка...*`,
    { parse_mode: 'Markdown' }
  );
});

// Video generation command
bot.command('video', async (ctx) => {
  const args = ctx.match;
  
  if (!args) {
    // Show video presets
    const presetsList = Object.entries(VIDEO_PRESETS)
      .map(([key, preset]) => `• *${preset.name}* — ${preset.description}`)
      .join('\n');
    
    await ctx.reply(
      `🎬 *Генерация видео*\n\n` +
      `Выбери формат и опиши что хочешь:\n\n` +
      presetsList + `\n\n` +
      `📝 *Пример:*\n` +
      `/video tierlist Лучшие знаки зодиака для отношений`,
      { parse_mode: 'Markdown' }
    );
    return;
  }
  
  // Parse command
  const parts = args.split(' ');
  const preset = parts[0];
  const prompt = parts.slice(1).join(' ');
  
  if (!prompt) {
    ctx.reply('❌ Укажи описание видео после формата. Пример: /video tierlist Лучшие знаки зодиака');
    return;
  }
  
  await ctx.reply('🎬 Генерирую видео... (это может занять 1-2 минуты)');
  
  try {
    const result = await createVideoFromPrompt(prompt, preset, ctx.from.id);
    
    if (result.success) {
      await ctx.reply(
        `✅ *Видео готово!*

` +
        `${result.variants?.length > 0 ? `📁 Файл: ${result.variants[0]}` : ''}
` +
        `${result.cost ? `💰 Примерная стоимость: $${result.cost}` : ''}`,
        { parse_mode: 'Markdown' }
      );
    } else {
      await ctx.reply(`❌ Ошибка: ${result.error || 'Не удалось сгенерировать видео'}`);
    }
  } catch (error) {
    await ctx.reply(`❌ Ошибка: ${error.message}`);
  }
});

// Quick video presets
bot.command('tierlist', async (ctx) => {
  const prompt = ctx.match || 'Интересные факты о знаках зодиака';
  await ctx.reply(`🎬 Создаю тир-лист: "${prompt}" (может занять 1-2 минуты)`);
  
  try {
    const result = await createVideoFromPrompt(prompt, 'tierList', ctx.from.id);
    if (result.success) {
      await ctx.reply(`✅ *Тир-лист готов!*\n${result.cost ? `💰 ~$${result.cost}` : ''}`);
    } else {
      await ctx.reply(`❌ Ошибка: ${result.error}`);
    }
  } catch (error) {
    await ctx.reply(`❌ Ошибка: ${error.message}`);
  }
});

bot.command('debate', async (ctx) => {
  const prompt = ctx.match || 'AI vs，人类艺术家';
  await ctx.reply(`🎬 Создаю дебаты: "${prompt}" (может занять 1-2 минуты)`);
  
  try {
    const result = await createVideoFromPrompt(prompt, 'debate', ctx.from.id);
    if (result.success) {
      await ctx.reply(`✅ *Дебаты готовы!*\n${result.cost ? `💰 ~$${result.cost}` : ''}`);
    } else {
      await ctx.reply(`❌ Ошибка: ${result.error}`);
    }
  } catch (error) {
    await ctx.reply(`❌ Ошибка: ${error.message}`);
  }
});

bot.command('podcast', async (ctx) => {
  const prompt = ctx.match || 'Влияние планет на судьбу';
  await ctx.reply(`🎬 Создаю подкаст: "${prompt}" (может занять 1-2 минуты)`);
  
  try {
    const result = await createVideoFromPrompt(prompt, 'podcast', ctx.from.id);
    if (result.success) {
      await ctx.reply(`✅ *Подкаст готов!*\n${result.cost ? `💰 ~$${result.cost}` : ''}`);
    } else {
      await ctx.reply(`❌ Ошибка: ${result.error}`);
    }
  } catch (error) {
    await ctx.reply(`❌ Ошибка: ${error.message}`);
  }
});

// Help update with video commands
bot.command('help', (ctx) => {
  ctx.reply(
    `📖 *Справка*\n\n` +
    `/start — Запустить бота\n` +
    `/profile — Мой профиль\n` +
    `/tokens — Баланс токенов\n` +
    `/video [формат] [тема] — Создать видео\n` +
    `/tierlist [тема] — Топ-лист\n` +
    `/debate [тема] — Дебаты\n` +
    `/podcast [тема] — Подкаст\n` +
    `/help — Эта справка\n\n` +
    `💡 *Как пользоваться?*\n` +
    `Нажми "Открыть приложение" в /start`,
    { parse_mode: 'Markdown' }
  );
});

// ==================== API ROUTES (Express) ====================

// User data endpoint
app.get('/api/user/:id', (req, res) => {
  res.json({
    id: req.params.id,
    tokens: 10,
    language: 'ru',
    birthData: null,
    historyCount: 0
  });
});

// AI generation endpoint
app.post('/api/ai/generate', async (req, res) => {
  // TODO: OpenAI integration
  res.json({ success: false, error: 'Not implemented yet' });
});

// Astrology endpoints
app.post('/api/astrology/natal', (req, res) => {
  // TODO: Natal chart calculation
  res.json({ success: false, error: 'Not implemented yet' });
});

app.post('/api/astrology/compatibility', (req, res) => {
  // TODO: Compatibility calculation
  res.json({ success: false, error: 'Not implemented yet' });
});

app.get('/api/astrology/horoscope', (req, res) => {
  // TODO: Daily horoscope
  res.json({ success: false, error: 'Not implemented yet' });
});

// Token operations
app.get('/api/tokens/balance/:userId', (req, res) => {
  res.json({ userId: req.params.userId, balance: 10 });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== START SERVERS ====================

// Start Express
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
  console.log(`📱 WebApp URL: ${WEBAPP_URL}`);
});

// Start Telegram Bot (polling)
bot.start({
  onStart: (info) => {
    console.log(`🤖 Bot started: @${info.username}`);
  }
});

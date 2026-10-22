import { verifyTelegramInitData } from './telegram-auth.js';
import { Bot, InlineKeyboard } from 'grammy';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
  const webAppUrl = WEBAPP_URL;
  
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

bot.command('help', (ctx) => {
  ctx.reply(
    `📖 *Справка*\n\n` +
    `/start — Запустить бота\n` +
    `/profile — Мой профиль\n` +
    `/tokens — Баланс токенов\n` +
    `/help — Эта справка\n\n` +
    `💡 *Как пользоваться?*\n` +
    `Нажми "Открыть приложение" в /start`,
    { parse_mode: 'Markdown' }
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

// ==================== API ROUTES (Express) ====================

// Validate signed Telegram Mini App launch data on the server.
app.post('/api/auth/telegram', (req, res) => {
  const user = verifyTelegramInitData(req.body?.initData, BOT_TOKEN);
  if (!user) return res.status(401).json({ error: 'Invalid or expired Telegram authentication' });
  return res.json({ user });
});

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

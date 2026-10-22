# PromptX Bot - AI + Astrology Telegram Mini App

## 🎯 Проект
Клон популярного бота @promptx_aibot с 555K+ пользователями.

## 📁 Структура
```
PromptX-Bot/
├── src/
│   ├── bot.js          # Telegram Bot (grammy)
│   ├── api/             # Express API сервер
│   │   ├── index.js
│   │   ├── ai.js        # OpenAI интеграция
│   │   ├── astrology.js # Астрология модуль
│   │   └── tokens.js    # Токен система + платежи
│   └── middleware/      # Auth, валидация
├── web/                 # React Mini App (frontend)
│   ├── src/
│   │   ├── pages/       # Главная, Нейросети, Астрология, Профиль
│   │   ├── components/  # UI компоненты
│   │   └── App.jsx
│   └── package.json
├── .env                 # Переменные окружения
└── package.json
```

## 🔧 Технологии
- **Backend:** Node.js + Express + Grammy (Telegram Bot)
- **Frontend:** React (Vite) — Telegram Mini App
- **AI:** OpenAI API (GPT-4o + DALL-E 3)
- **Astrology:** Swiss Ephemeris / astrology-api
- **DB:** SQLite (просто) → PostgreSQL (прод)
- **Payments:** CryptoBot / ЮKassa

## 💰 Монетизация
- Токен-система (10 бесплатных)
- Натальная карта = 120 токенов
- Совместимость = 100 токенов
- Гороскоп = бесплатно

## 🚀 Запуск
```bash
npm install
npm run dev
```

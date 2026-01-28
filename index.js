 require('dotenv').config(); // .env faylini o'qish uchun
const TelegramBot = require('node-telegram-bot-api');
const { evaluate } = require('mathjs');

// Tokenni muhit o'zgaruvchilaridan olamiz
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("XATO: .env faylida TELEGRAM_BOT_TOKEN topilmadi!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Salom! Men xavfsiz matematik botman. \nMisol yuboring:");
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith('/')) return;

  try {
    const result = evaluate(text);
    bot.sendMessage(chatId, `Natija: ${result}`);
  } catch (error) {
    bot.sendMessage(chatId, "Misolda xatolik bor. Iltimos, qaytadan tekshiring.");
  }
});

console.log("Bot .env orqali xavfsiz ishga tushirildi...");
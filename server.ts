import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

async function startServer() {
  const app = express();
  const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // до 10MB на файл

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ==========================================
  // НАЛАШТУВАННЯ TELEGRAM BOT API:
  // 1. Створіть бота через @BotFather у Telegram та отримайте TOKEN.
  // 2. Дізнайтеся ваш Chat ID (наприклад, через бота @userinfobot або @getmyid_bot).
  // 3. Замініть рядки нижче або встановіть змінні середовища TELEGRAM_BOT_TOKEN та TELEGRAM_CHAT_ID у файлі .env
  // ==========================================
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8936221350:AAE4Njxrlvz_t9IlA9bboQyhVAhf-EJ5t9c";
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "942331631";
  const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "3ad26c57-3f7e-4a80-8bc1-106100c64533";

  app.post('/api/telegram-order', upload.array('photos', 5), async (req: any, res: any) => {
    try {
      const { name, phone, city, service, date, address, summary } = req.body;
      const files = req.files as Express.Multer.File[] || [];

      // Форматування тексту заявки
      let message = `🔔 *НОВЕ ЗАМОВЛЕННЯ CLEAN UA* 🔔\n\n`;
      message += `👤 *Ім'я:* ${name || 'Не вказано'}\n`;
      message += `📞 *Телефон:* ${phone || 'Не вказано'}\n`;
      message += `📍 *Регіон:* ${city || 'Не вказано'}\n`;
      message += `🧹 *Послуга:* ${service || 'Не вказано'}\n`;
      if (date) message += `📅 *Бажана дата:* ${date}\n`;
      if (address) message += `🏠 *Адреса:* ${address}\n`;

      if (summary) {
        try {
          const parsedSummary = JSON.parse(summary);
          if (parsedSummary.total) {
            message += `💰 *Розрахунок:* ${parsedSummary.total.toLocaleString()} грн\n`;
          }
          if (parsedSummary.summary && Array.isArray(parsedSummary.summary)) {
            message += `📋 *Деталі розрахунку:*\n`;
            parsedSummary.summary.forEach((item: string) => {
              message += `  • ${item}\n`;
            });
          }
        } catch (e) {
          message += `📋 *Деталі:* ${summary}\n`;
        }
      }

      // Перевірка чи налаштований дійсний токен
      if (TELEGRAM_BOT_TOKEN.includes("EXAMPLE_TOKEN") || !TELEGRAM_BOT_TOKEN) {
        console.warn("⚠️ TELEGRAM_BOT_TOKEN не налаштовано. Замовлення імітовано успішно:", { name, phone, filesCount: files.length });
        return res.json({ 
          success: true, 
          message: "Замовлення успішно прийнято! (Демо-режим: вкажіть реальний TELEGRAM_BOT_TOKEN у server.ts або .env для надсилання в реальний чат)." 
        });
      }

      // 1. Надсилання текстового повідомлення
      const textResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const textResult = await textResponse.json();
      if (!textResult.ok) {
        console.error("Telegram text send error:", textResult);
        return res.status(500).json({ success: false, error: textResult.description || 'Помилка надсилання повідомлення в Telegram' });
      }

      // 2. Надсилання фотографій (якщо вони є)
      if (files.length > 0) {
        if (files.length === 1) {
          const file = files[0];
          const formDataObj = new FormData();
          formDataObj.append('chat_id', TELEGRAM_CHAT_ID);
          formDataObj.append('photo', new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }), file.originalname);
          formDataObj.append('caption', `Фото від клієнта: ${name} (${phone})`);

          await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formDataObj
          });
        } else {
          const mediaArray = files.map((file, idx) => ({
            type: 'photo',
            media: `attach://photo${idx}`,
            caption: idx === 0 ? `Фото від клієнта: ${name} (${phone})` : undefined
          }));

          const formDataObj = new FormData();
          formDataObj.append('chat_id', TELEGRAM_CHAT_ID);
          formDataObj.append('media', JSON.stringify(mediaArray));

          files.forEach((file, idx) => {
            formDataObj.append(`photo${idx}`, new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }), file.originalname);
          });

          await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`, {
            method: 'POST',
            body: formDataObj
          });
        }
      }

      return res.json({ success: true, message: "Замовлення та фото успішно надіслано в Telegram!" });
    } catch (err: any) {
      console.error("Telegram order submission error:", err);
      return res.status(500).json({ success: false, error: err.message || 'Внутрішня помилка сервера' });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();

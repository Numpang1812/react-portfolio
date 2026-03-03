import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const { message } = req.body ?? {};

  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Message is required' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({
      ok: false,
      error: 'Server is missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID',
    });
  }

  try {
    const text = `Portfolio contact form:\n\n${message}`;

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    const telegramJson = await telegramRes.json().catch(() => null);

    if (!telegramRes.ok || !telegramJson?.ok) {
      return res.status(502).json({
        ok: false,
        error: 'Failed to send message to Telegram',
        details: telegramJson,
      });
    }

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

const port = Number(process.env.PORT ?? 5174);
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

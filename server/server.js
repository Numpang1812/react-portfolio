import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { rateLimit } from 'express-rate-limit';
import xss from 'xss';

// Help Node find the .env file in the root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// More secure CORS: Only allow your own frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Set strict 18kb limit on payloads to prevent memory abuse
app.use(express.json({ limit: '18kb' }));

// Set up rate limiter: max 5 requests per day per IP
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  limit: 5, // Limit each IP to 5 requests per `window`
  message: { ok: false, error: 'Too many messages sent from this IP, please try again after 24 hours' },
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  console.log('Received message request:', req.body);
  const { name, contact, message, website_confirm } = req.body ?? {};

  // Honeypot check: If a bot filled out the hidden field, we ignore the request silently
  if (website_confirm) {
    console.warn('Bot detected by honeypot! Ignoring...');
    return res.json({ ok: true }); // We pretend it succeeded so the bot doesn't try again
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Name is required' });
  }

  if (typeof contact !== 'string' || contact.trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Contact information is required' });
  }

  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ ok: false, error: 'Message is required' });
  }

  // Clean all inputs: strip all potential scripts and HTML tags
  const cleanName = xss(name.trim());
  const cleanContact = xss(contact.trim());
  const cleanMessage = xss(message.trim());

  if (cleanName.length === 0 || cleanContact.length === 0 || cleanMessage.length === 0) {
    return res.status(400).json({ ok: false, error: 'Contains dangerous code (XSS detected)' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Missing config:', { token: !!token, chatId: !!chatId });
    return res.status(500).json({
      ok: false,
      error: 'Server is missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID',
    });
  }

  try {
    const text = `New Message from *${cleanName}* :\n\n*${cleanMessage}*\n\nContact: *${cleanContact}*`;

    console.log('Sending to Telegram...');
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });

    const telegramJson = await telegramRes.json().catch(() => null);

    if (!telegramRes.ok || !telegramJson?.ok) {
      console.error('Telegram API Error:', telegramJson);
      return res.status(502).json({
        ok: false,
        error: telegramJson?.description || 'Failed to send message to Telegram',
        details: telegramJson,
      });
    }

    console.log('Message sent successfully!');
    return res.json({ ok: true });
  } catch (err) {
    console.error('Server catch error:', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

const port = Number(process.env.PORT ?? 5174);
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

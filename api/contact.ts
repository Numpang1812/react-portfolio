import type { IncomingMessage, ServerResponse } from 'node:http';
import xss from 'xss';

interface ContactRequestBody {
  name?: string;
  contact?: string;
  message?: string;
  website_confirm?: string;
}

interface VercelRequest extends IncomingMessage {
  body?: ContactRequestBody;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
  send: (data: unknown) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, contact, message, website_confirm } = req.body ?? {};

  // Honeypot check
  if (website_confirm) {
    return res.status(200).json({ ok: true });
  }

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ ok: false, error: 'Name is required' });
  }

  if (!contact || typeof contact !== 'string' || !contact.trim()) {
    return res.status(400).json({ ok: false, error: 'Contact information is required' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ ok: false, error: 'Message is required' });
  }

  const cleanName = xss(name.trim());
  const cleanContact = xss(contact.trim());
  const cleanMessage = xss(message.trim());

  if (cleanName.length === 0 || cleanContact.length === 0 || cleanMessage.length === 0) {
    return res.status(400).json({ ok: false, error: 'Contains invalid content' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Vercel environment variables missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return res.status(500).json({
      ok: false,
      error: 'Server is missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in Vercel settings.',
    });
  }

  try {
    const text = `New Message from *${cleanName}* :\n\n*${cleanMessage}*\n\nContact: *${cleanContact}*`;

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

    const telegramJson = (await telegramRes.json().catch(() => null)) as { ok?: boolean; description?: string } | null;

    if (!telegramRes.ok || !telegramJson?.ok) {
      console.error('Telegram error:', telegramJson);
      return res.status(502).json({
        ok: false,
        error: telegramJson?.description || 'Failed to send message to Telegram',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Vercel function error:', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}

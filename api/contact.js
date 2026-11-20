// ==============================================================================
// Vercel Serverless Function: /api/contact
// Handles contact inquiries with input validation, honeypot spam protection,
// rate limiting, and automated email dispatch via Resend API.
// ==============================================================================

// Simple in-memory rate limiting map for serverless instances
// Key: IP, Value: Array of timestamp numbers
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 4;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  // Periodically clean up map
  if (rateLimitMap.size > 500) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (v.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(k);
      }
    }
  }

  return false;
}

function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST.'
    });
  }

  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown-ip';

    // 1. Rate Limiting Check
    if (isRateLimited(ip)) {
      return res.status(429).json({
        success: false,
        error: 'Too many contact requests from your IP. Please try again after a few minutes or email directly.'
      });
    }

    // Parse body (in Vercel Node runtime req.body is auto-parsed JSON or string)
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, message, website } = body;

    // 2. Honeypot check: If the hidden 'website' field was filled, silently discard bot spam
    if (website && website.trim().length > 0) {
      console.log(`[Contact API] Bot honeypot triggered from IP: ${ip}`);
      return res.status(200).json({
        success: true,
        message: 'Your message has been received.'
      });
    }

    // 3. Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid name (at least 2 characters).'
      });
    }
    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name is too long (maximum 100 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }
    if (email.trim().length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Email address is too long.'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message of at least 10 characters.'
      });
    }
    if (message.trim().length > 3000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (maximum 3000 characters).'
      });
    }

    const cleanName = sanitizeText(name);
    const cleanEmail = sanitizeText(email);
    const cleanMessage = sanitizeText(message);
    const formattedDate = new Date().toUTCString();

    // 4. Email Dispatching via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'sumitrathor142272@gmail.com';
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || 'onboarding@resend.dev';

    // If Resend API key is not configured, inform the client transparently
    if (!resendApiKey) {
      return res.status(200).json({
        success: false,
        configured: false,
        error: 'RESEND_API_KEY environment variable is not configured on this deployment. Please reach out directly at ' + recipientEmail + '.'
      });
    }

    // Call Resend API using standard Node.js fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `Sumit Portfolio <${senderEmail}>`,
        to: [recipientEmail],
        reply_to: cleanEmail,
        subject: `New Portfolio Inquiry from ${cleanName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #38bdf8; padding-bottom: 10px;">
              New Message from Portfolio
            </h2>
            <p><strong>From:</strong> ${cleanName} &lt;<a href="mailto:${cleanEmail}">${cleanEmail}</a>&gt;</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>IP:</strong> ${ip}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-left: 4px solid #38bdf8; border-radius: 4px;">
              <h4 style="margin-top: 0; color: #334155;">Message Content:</h4>
              <p style="white-space: pre-wrap; color: #1e293b; line-height: 1.6;">${cleanMessage}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 30px; text-align: center;">
              Sent securely via Sumit Rathor's Portfolio Contact Gateway
            </p>
          </div>
        `,
        text: `New Portfolio Inquiry from ${cleanName} (${cleanEmail})\nDate: ${formattedDate}\n\nMessage:\n${cleanMessage}`
      })
    });

    const resendData = await response.json();

    if (!response.ok) {
      console.error('[Resend Error]', resendData);
      return res.status(502).json({
        success: false,
        error: resendData.message || 'Failed to dispatch email through provider. Please try emailing directly.'
      });
    }

    return res.status(200).json({
      success: true,
      configured: true,
      message: 'Your message has been delivered directly to Sumit\'s inbox. Thank you for reaching out!'
    });

  } catch (err) {
    console.error('[Contact Handler Error]', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal error occurred. Please reach out via email or LinkedIn.'
    });
  }
}

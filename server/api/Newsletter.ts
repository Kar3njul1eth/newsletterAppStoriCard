import { Router } from 'express';
import { readData } from '../jsonHandler';
import { Resend } from 'resend';

const router = Router();

// Configurar globalThis.fetch y globalThis.Headers para node-fetch
(globalThis as any).fetch = fetch;
(globalThis as any).Headers = Headers;

const resend = new Resend(process.env.RESEND_API_KEY);

const isValidPayload = (payload: any) => {
  return payload.subject && payload.content && payload.callToActionLabel && payload.callToActionLink;
};

router.post('/send', async (req, res) => {
  const data = readData();
  const payload = req.body;

  if (!isValidPayload(payload)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const users = data.users.filter(user => user.newsletterStatus === 'Subscribed');

  const emailsToSend = users.map(user =>
    resend.emails.send({
      from: process.env.SMTP_EMAIL || 'Acme <newslettertecnology@gmail.com>',
      to: [user.email],
      subject: payload.subject,
      html: `
        <div>
          <h1>${payload.subject}</h1>
          <p>${payload.content}</p>
          <a href="${payload.callToActionLink}">${payload.callToActionLabel}</a>
          <p><a href="${process.env.BASE_URL}/api/users/unsubscribe?email=${user.email}">Unsubscribe</a></p>
        </div>
      `
    })
  );

  try {
    const emailsResponse = await Promise.all(emailsToSend);
    res.json(emailsResponse);
  } catch (error) {
    res.status(500).json({ message: "Error sending emails", error });
  }
});

export default router;

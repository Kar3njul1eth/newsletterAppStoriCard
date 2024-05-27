import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { readData } from '../jsonHandler';
import { Resend } from 'resend';
import fetch, { Headers } from 'node-fetch';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

(globalThis as any).fetch = fetch;
(globalThis as any).Headers = Headers;

const resend = new Resend(process.env.RESEND_API_KEY);

interface Newsletter {
  subject: string;
  content: string;
  callToActionLabel: string;
  callToActionLink: string;
}

interface User {
  id: number;
  email: string;
  subscribed: boolean;
}

const isValidPayload = (payload: any) => {
  return payload.subject && payload.content && payload.callToActionLabel && payload.callToActionLink;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getTemplate = (newsletter: Newsletter, user: User): string => {
  const templatePath = path.resolve(__dirname, './template.html');
  let template = fs.readFileSync(templatePath, 'utf8');
  template = template.replace('{{subject}}', newsletter.subject)
                     .replace('{{content}}', newsletter.content)
                     .replace('{{callToActionLabel}}', newsletter.callToActionLabel)
                     .replace('{{callToActionLink}}', newsletter.callToActionLink)
                     .replace('{{unsubscribeLink}}', `${process.env.BASE_URL}/api/users/unsubscribe?email=${user.email}`)
  return template;
};


router.post('/send', upload.single('attachment'), async (req, res) => {
  const data = readData();
  const payload = req.body;

  if (!isValidPayload(payload)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const users = data.users.filter(user => user.newsletterStatus === 'Subscribed');

  const emailsToSend = users.map((user) => ({
    email: user.email,
    send: () => {
      if (!isValidEmail(user.email)) {
        throw new Error(`Invalid email format: ${user.email}`);
      }
      return resend.emails.send({
        from: process.env.SMTP_EMAIL || '<newslettertecnology@gmail.com>',
        to: user.email,
        subject: payload.subject,
        html: getTemplate(payload, user),
        attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer }] : [],
      });
    }
  }));

  try {
    const emailsResponse = [];
    for (let i = 0; i < emailsToSend.length; i++) {
      if (i > 0 && i % 2 === 0) {
        await delay(1000);
      }
      const response = await emailsToSend[i].send();
      emailsResponse.push(response);
    }
    res.json({ success: true, emailsResponse });
  } catch (error) {
    res.status(500).json({ message: "Error sending emails", error: error });
  }
});

export default router;

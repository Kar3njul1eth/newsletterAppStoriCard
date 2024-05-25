import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Newsletter } from '../models/Newsletter';
import { User } from '../models/User';
import nodemailer from 'nodemailer';
import { getTemplate } from './template';

const router = Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const isValidPayload = (payload: Newsletter) => {
  return payload.subject && payload.content && payload.callToActionLabel && payload.callToActionLink;
};

router.post('/send', async (req, res) => {
  const formData = req.body;
  const payload = formData as Newsletter;
  const file = req.files?.file;

  if (!isValidPayload(payload)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!file || Array.isArray(file)) {
    return res.status(400).json({ message: "Invalid file upload" });
  }

  const users = await AppDataSource.getRepository(User).find({
    where: { subscribed: true },
  });

  const emailFrom = process.env.SMTP_EMAIL || "";
  const nameFrom = emailFrom.split("@")[0];
  const attachments: { filename: string, content: Buffer }[] = [];

  if (file) {
    const buffer = Buffer.from(file.data);
    attachments.push({ filename: file.name, content: buffer });
  }

  const emailsToSend = users.map(user =>
    transporter.sendMail({
      attachments,
      from: `"${nameFrom}" <${emailFrom}>`,
      to: user.email,
      subject: payload.subject,
      html: getTemplate(payload, user),
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

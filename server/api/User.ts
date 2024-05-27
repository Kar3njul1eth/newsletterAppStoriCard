import { Router } from 'express';
import { readData, writeData } from '../jsonHandler';

const router = Router();

router.get('/unsubscribe', (req, res) => {
  const data = readData();
  const email = req.query.email as string;

  const user = data.users.find(u => u.email === email);
  if (user) {
    user.newsletterStatus = 'Unsubscribed';
    writeData(data);
    res.send('You have successfully unsubscribed.');
  } else {
    res.status(404).send('User not found.');
  }
});

router.get('/', (req, res) => {
  const data = readData();
  res.json(data.users);
});

router.post('/', (req, res) => {
  const data = readData();
  const newUser = req.body;
  newUser.id = data.users.length + 1;
  newUser.newsletterStatus = 'Subscribed';
  data.users.push(newUser);
  writeData(data);
  res.json(newUser);
});

export default router;

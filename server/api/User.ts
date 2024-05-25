import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { User } from '../models/User';

const router = Router();

router.get('/test-db', async (req, res) => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connection failed', error });
  }
});

router.get('/', async (req, res) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User();
  user.email = req.body.email;
  await AppDataSource.getRepository(User).save(user);
  res.json(user);
});

router.post('/unsubscribe', async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ email: req.body.email });
  if (user) {
    user.subscribed = false;
    await AppDataSource.getRepository(User).save(user);
    res.json({ message: 'Unsubscribed successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;

import express from 'express';
import fileUpload from 'express-fileupload';
import { AppDataSource } from '../ormconfig';
import userRoutes from './api/User';
import newsletterRoutes from './api/Newsletter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((err) => {
  console.error('Error during Data Source initialization:', err);
});

app.use('/api/users', userRoutes);
app.use('/api/newsletters', newsletterRoutes);

export default app;

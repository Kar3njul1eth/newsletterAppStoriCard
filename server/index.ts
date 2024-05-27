import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './api/User';
import newsletterRoutes from './api/Newsletter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/newsletters', newsletterRoutes);


export default app;

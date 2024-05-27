import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './api/User';
import newsletterRoutes from './api/Newsletter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/api/newsletters', newsletterRoutes);

export default app;

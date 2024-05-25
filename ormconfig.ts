import { DataSource } from 'typeorm';
import { User } from './server/models/User';
import { Newsletter } from './server/models/Newsletter';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  entities: [User, Newsletter],
  synchronize: true,
});

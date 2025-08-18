import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/db.js';
import './models/Book.js';
import './models/User.js';
import './models/UserBook.js';
import './models/associations.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { seedDatabase } from './seed/seedData.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Database connected and synced');

  // Run seeder
  await seedDatabase();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});

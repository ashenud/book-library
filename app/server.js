import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/db.js';
import Book from './models/Book.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Database connected and synced');

  await Book.bulkCreate([
    {
      title: 'Book A',
      author: 'Author 1',
      year: 2021,
      library_name: 'City Library',
      latitude: 53.333,
      longitude: -6.266,
    },
    {
      title: 'Book B',
      author: 'Author 2',
      year: 2020,
      library_name: 'Town Library',
      latitude: 53.35,
      longitude: -6.28,
    },
  ]);

  app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
});

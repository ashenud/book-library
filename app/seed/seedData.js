import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Book from '../models/Book.js';

export const seedDatabase = async () => {
  // Clean tables
  await User.destroy({ where: {} });
  await Book.destroy({ where: {} });

  // Seed Users
  const passwordHash = await bcrypt.hash('password123', 10);

  await User.bulkCreate([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'admin',
    },
    {
      name: 'User One',
      email: 'user1@example.com',
      password: passwordHash,
      role: 'user',
    },
    {
      name: 'User Two',
      email: 'user2@example.com',
      password: passwordHash,
      role: 'user',
    },
    {
      name: 'User Three',
      email: 'user3@example.com',
      password: passwordHash,
      role: 'user',
    },
    {
      name: 'User Four',
      email: 'user4@example.com',
      password: passwordHash,
      role: 'user',
    },
    {
      name: 'User Five',
      email: 'user5@example.com',
      password: passwordHash,
      role: 'user',
    },
  ]);

  // Seed Books
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

  console.log('✅ Sample data inserted successfully');
};

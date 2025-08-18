import bcrypt from 'bcryptjs';
import Book from '../models/Book.js';
import User from '../models/User.js';
import { seedBooks } from './seedBooks.js';

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
      phone: '+353 87 123 4567',
      address: 'Dublin, Ireland',
    },
    {
      name: 'User One',
      email: 'user1@example.com',
      password: passwordHash,
      role: 'user',
      phone: '+353 86 234 5678',
      address: 'Cork, Ireland',
    },
    {
      name: 'User Two',
      email: 'user2@example.com',
      password: passwordHash,
      role: 'user',
      phone: '+353 85 345 6789',
      address: 'Galway, Ireland',
    },
    {
      name: 'User Three',
      email: 'user3@example.com',
      password: passwordHash,
      role: 'user',
      phone: '+353 83 456 7890',
      address: 'Limerick, Ireland',
    },
    {
      name: 'User Four',
      email: 'user4@example.com',
      password: passwordHash,
      role: 'user',
      phone: '+353 82 567 8901',
      address: 'Waterford, Ireland',
    },
    {
      name: 'User Five',
      email: 'user5@example.com',
      password: passwordHash,
      role: 'user',
      phone: '+353 81 678 9012',
      address: 'Kilkenny, Ireland',
    },
  ]);

  // Seed Books
  await seedBooks(100);

  console.log('✅ Sample data inserted successfully');
};

import bcrypt from 'bcryptjs';
import Book from '../models/Book.js';
import User from '../models/User.js';

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
  await Book.bulkCreate([
    {
      title: 'Book 1',
      author: 'Author A',
      year: 2021,
      library_name: 'City Library',
      latitude: 6.886,
      longitude: 79.9545,
    },
    {
      title: 'Book 2',
      author: 'Author B',
      year: 2020,
      library_name: 'Central Library',
      latitude: 6.8845,
      longitude: 79.953,
    },
    {
      title: 'Book 3',
      author: 'Author C',
      year: 2019,
      library_name: 'Town Library',
      latitude: 6.975,
      longitude: 80.05,
    },
    {
      title: 'Book 4',
      author: 'Author D',
      year: 2018,
      library_name: 'District Library',
      latitude: 6.97,
      longitude: 80.06,
    },
    {
      title: 'Book 5',
      author: 'Author E',
      year: 2022,
      library_name: 'Village Library',
      latitude: 7.08,
      longitude: 80.12,
    },
    {
      title: 'Book 6',
      author: 'Author F',
      year: 2021,
      library_name: 'Remote Library',
      latitude: 7.09,
      longitude: 80.11,
    },
    {
      title: 'Book 7',
      author: 'Author G',
      year: 2020,
      library_name: 'Local Library',
      latitude: 6.887,
      longitude: 79.955,
    },
    {
      title: 'Book 8',
      author: 'Author H',
      year: 2019,
      library_name: 'Neighborhood Library',
      latitude: 6.8835,
      longitude: 79.9525,
    },
    {
      title: 'Book 9',
      author: 'Author I',
      year: 2018,
      library_name: 'Far Town Library',
      latitude: 6.97,
      longitude: 80.055,
    },
    {
      title: 'Book 10',
      author: 'Author J',
      year: 2017,
      library_name: 'Far Village Library',
      latitude: 7.075,
      longitude: 80.125,
    },
  ]);

  console.log('✅ Sample data inserted successfully');
};

import { faker } from '@faker-js/faker';
import Book from '../models/Book.js';

const authors = [
  'J.K. Rowling',
  'George R.R. Martin',
  'Stephen King',
  'Agatha Christie',
  'Dan Brown',
  'Suzanne Collins',
  'Ernest Hemingway',
  'Jane Austen',
  'Mark Twain',
  'Leo Tolstoy',
];

// Define each library with fixed coordinates
const libraries = [
  // Within 1 km
  { name: 'City Library', lat: 6.8865, lng: 79.9545 },
  { name: 'Neighborhood Library', lat: 6.8845, lng: 79.953 },

  // Within 1–10 km
  { name: 'Town Library', lat: 6.935, lng: 79.99 },
  { name: 'Village Library', lat: 6.945, lng: 80.01 },

  // Within 10–20 km
  { name: 'Central Library', lat: 7.02, lng: 80.06 },
  { name: 'District Library', lat: 7.05, lng: 80.08 },

  // Within 20–50 km
  { name: 'Local Library', lat: 6.8, lng: 80.2 },
  { name: 'Remote Library', lat: 6.75, lng: 80.15 },
  { name: 'Far Town Library', lat: 6.7, lng: 80.25 },
  { name: 'Far Village Library', lat: 6.65, lng: 80.3 },
];

export const seedBooks = async (count = 1000) => {
  const books = [];

  for (let i = 0; i < count; i++) {
    const library = libraries[Math.floor(Math.random() * libraries.length)];

    const rawTitle = faker.lorem.words(Math.floor(Math.random() * 3) + 1);
    const title = rawTitle
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    books.push({
      title: title,
      author: authors[Math.floor(Math.random() * authors.length)],
      year: Math.floor(Math.random() * 22) + 2000,
      library_name: library.name,
      latitude: library.lat,
      longitude: library.lng,
    });
  }

  await Book.bulkCreate(books);
  console.log(`✅ ${count} random books inserted successfully`);
};

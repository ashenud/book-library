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
  { name: 'City Library', lat: 6.886, lng: 79.9545 },
  { name: 'Central Library', lat: 6.8845, lng: 79.953 },
  { name: 'Town Library', lat: 6.975, lng: 80.05 },
  { name: 'District Library', lat: 6.97, lng: 80.06 },
  { name: 'Village Library', lat: 7.08, lng: 80.12 },
  { name: 'Remote Library', lat: 7.09, lng: 80.11 },
  { name: 'Local Library', lat: 6.887, lng: 79.955 },
  { name: 'Neighborhood Library', lat: 6.8835, lng: 79.9525 },
  { name: 'Far Town Library', lat: 6.97, lng: 80.055 },
  { name: 'Far Village Library', lat: 7.075, lng: 80.125 },
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

import { faker } from '@faker-js/faker';
import Book from '../models/Book.js';
import Library from '../models/Library.js';

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

export const seedBooks = async (count = 1000) => {
  // Fetch all libraries once
  const libraries = await Library.findAll();

  if (libraries.length === 0) {
    console.log('No libraries found. Please seed libraries first.');
    return;
  }

  const books = [];

  for (let i = 0; i < count; i++) {
    // Pick a random library
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
      library_id: library.id,
    });
  }

  await Book.bulkCreate(books);
  console.log(`${count} random books inserted successfully`);
};

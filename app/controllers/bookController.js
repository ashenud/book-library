import { Op } from 'sequelize';
import Book from '../models/Book.js';

export const getBooks = async (request, response) => {
  try {
    const { title, author, year } = request.query;

    let where = {};

    if (title) where.title = { [Op.like]: `%${title}%` };

    if (author) where.author = { [Op.like]: `%${author}%` };

    if (year) where.year = year;

    const books = await Book.findAll({ where });

    response.json(books);
  } catch (err) {
    response.status(500).json({ error: 'Failed to fetch books' });
  }
};

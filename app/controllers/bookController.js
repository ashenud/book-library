import axios from 'axios';
import { Op } from 'sequelize';
import Book from '../models/Book.js';
import UserBook from '../models/UserBook.js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getBooks = async (request, response) => {
  try {
    const { title, author, year, userLat, userLng, maxDistance } = request.query;

    let where = {};

    if (title) where.title = { [Op.like]: `%${title}%` };
    if (author) where.author = { [Op.like]: `%${author}%` };
    if (year) where.year = year;

    // Step 1: Get books matching title/author/year

    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];
    const decoded = token && jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.id || null;

    const books = await Book.findAll({
      where,
      include: [
        {
          model: UserBook,
          as: 'user_books',
          where: userId ? { userId } : undefined,
          required: false,
          attributes: ['status'],
        },
      ],
    });

    // Step 2: If user location provided, calculate distance
    if (userLat && userLng && Number(maxDistance) > 0) {
      const booksWithDistance = [];

      for (let book of books) {
        if (!book.latitude || !book.longitude) continue;

        const responseMatrix = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
          params: {
            origins: `${userLat},${userLng}`,
            destinations: `${book.latitude},${book.longitude}`,
            key: GOOGLE_MAPS_API_KEY,
            units: 'metric',
          },
        });

        const distanceData = responseMatrix.data.rows[0].elements[0];
        const distanceInKm = (distanceData.distance?.value || 0) / 1000;

        if (distanceInKm <= Number(maxDistance)) {
          booksWithDistance.push({ ...book.toJSON(), distance: distanceInKm });
        }
      }

      return response.json(booksWithDistance);
    }

    // Step 3: Return without distance filter
    response.json(books);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Add book to "My Books"
export const addUserBook = async (request, response) => {
  try {
    const { bookId, status } = request.body;
    const userId = request.user.id; // from auth middleware

    const validStatuses = ['read', 'reviewed', 'wishlist', 'purchased'];

    if (!validStatuses.includes(status)) {
      return response.status(400).json({ message: 'Invalid status' });
    }

    // check if already exists
    const userBook = await UserBook.findOne({
      where: { user_id: userId, book_id: bookId },
    });

    if (userBook) {
      // update status
      userBook.status = status;
      await userBook.save();
    } else {
      // create new record
      await UserBook.create({
        user_id: userId,
        book_id: bookId,
        status: status,
      });
    }

    response.json({ message: 'Book added/updated successfully', userBook });
  } catch (err) {
    response.status(500).json({ message: err.message || 'Error adding book' });
  }
};

// Get logged-in user's books
export const getUserBooks = async (request, response) => {
  try {
    const userId = request.user.id;

    const userBooks = await UserBook.findAll({
      where: { user_id: userId },
      include: [{ model: Book, as: 'books', attributes: ['id', 'title', 'author', 'year', 'library_name'] }],
    });

    response.json(userBooks);
  } catch (err) {
    response.status(500).json({ error: err.message || 'Failed to fetch user books' });
  }
};

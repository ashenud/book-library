import axios from 'axios';
import { Op } from 'sequelize';
import Book from '../models/Book.js';
import Library from '../models/Library.js';
import UserBook from '../models/UserBook.js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getBooks = async (request, response) => {
  try {
    const { title, author, year, userLat, userLng, maxDistance } = request.query;

    const where = {};

    // Step 1: Filters for title, author, year
    if (title) where.title = { [Op.like]: `%${title}%` };
    if (author) where.author = { [Op.like]: `%${author}%` };
    if (year) where.year = year;

    // Step 2: Identify logged-in user
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];
    const decoded = token ? jwt.verify(token, process.env.JWT_SECRET) : null;
    const userId = decoded?.id || null;

    // Step 3: Filter libraries by distance if location is provided
    let librariesWithinDistance = [];

    if (userLat && userLng && Number(maxDistance) > 0) {
      const libraries = await Library.findAll();

      const distanceRequests = libraries.map((library) => {
        if (!library.latitude || !library.longitude) return null;

        return axios
          .get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
              origins: `${userLat},${userLng}`,
              destinations: `${library.latitude},${library.longitude}`,
              key: GOOGLE_MAPS_API_KEY,
              units: 'metric',
            },
          })
          .then((response) => {
            const distanceData = response.data.rows[0].elements[0];
            const distanceInKm = (distanceData.distance?.value || 0) / 1000;

            if (distanceInKm <= Number(maxDistance)) {
              return { id: library.id, distance: distanceInKm };
            }

            return null;
          });
      });

      librariesWithinDistance = (await Promise.all(distanceRequests)).filter(Boolean);

      if (librariesWithinDistance.length > 0) {
        where.library_id = {
          [Op.in]: librariesWithinDistance.map((library) => library.id),
        };
      }
    }

    // Step 4: Fetch books with user status and library info
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
        {
          model: Library,
          as: 'library',
          required: true,
          attributes: ['name'],
        },
      ],
    });

    // Step 5: Attach distance to each book if applicable
    const booksWithDistance = books.map((book) => {
      const formattedBook = book.toJSON();

      if (librariesWithinDistance.length > 0) {
        const libraries = librariesWithinDistance.find((library) => library.id === book.library_id);

        if (libraries) {
          formattedBook.library.distance = libraries.distance;
        }
      }

      return formattedBook;
    });

    response.json(booksWithDistance);
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
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['id', 'title', 'author', 'year'],
          include: [
            {
              model: Library,
              as: 'library',
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    response.json(userBooks);
  } catch (err) {
    response.status(500).json({ error: err.message || 'Failed to fetch user books' });
  }
};

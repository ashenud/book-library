import axios from 'axios';
import { Op } from 'sequelize';
import Book from '../models/Book.js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getBooks = async (request, response) => {
  try {
    const { title, author, year, userLat, userLng, maxDistance } = request.query;

    let where = {};
    if (title) where.title = { [Op.like]: `%${title}%` };
    if (author) where.author = { [Op.like]: `%${author}%` };
    if (year) where.year = year;

    // Step 1: Get books matching title/author/year
    const books = await Book.findAll({ where });

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
        const distanceInMeters = distanceData.distance?.value || 0;
        const distanceInKm = distanceInMeters / 1000;

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

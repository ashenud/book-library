import express from 'express';
import { addUserBook, getBooks, getUserBooks } from '../controllers/bookController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getBooks);
router.post('/user-books', authenticate, addUserBook);
router.get('/user-books', authenticate, getUserBooks);

export default router;

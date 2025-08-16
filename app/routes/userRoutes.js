// routes/userRoutes.js
import express from 'express';
import { deleteUser, getUser, getUserProfile, getUsers, updateUser } from '../controllers/userController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, isAdmin, getUsers); // admin only
router.get('/', authenticate, isAdmin, getUser); // admin only
router.get('/me', authenticate, getUserProfile); // current user profile
router.put('/:id', authenticate, updateUser); // self or admin
router.delete('/:id', authenticate, isAdmin, deleteUser); // admin only

export default router;

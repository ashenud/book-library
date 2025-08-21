import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) return response.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) return response.status(401).json({ error: 'Invalid token user' });

    request.user = user; // attach logged-in user

    next();
  } catch (error) {
    response.status(401).json({ error: 'Unauthorized', details: error.message });
  }
};

export const isAdmin = (request, response, next) => {
  if (request.user.role !== 'admin') {
    return response.status(403).json({ error: 'Forbidden: Admins only' });
  }

  next();
};

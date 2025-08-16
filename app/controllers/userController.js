import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Get user profile by ID
export const getUser = async (request, response) => {
  try {
    const user = await User.findByPk(request.user.id, { attributes: { exclude: ['password'] } });
    if (!user) return response.status(404).json({ error: 'User not found' });
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
};

// Update logged-in user's profile
export const getUserProfile = async (request, response) => {
  try {
    response.json(request.user); // from auth middleware
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Update logged-in user's profile
export const updateProfile = async (request, response) => {
  try {
    const { name, email, phone, address, password } = request.body;
    const user = await User.findByPk(request.user.id);

    if (!user) return response.status(404).json({ error: 'User not found' });

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    response.json({ message: 'Profile updated successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};

// Admin: Get all users
export const getUsers = async (request, response) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};

// Admin: Update user by ID
export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, phone, address, role } = request.body;
    const user = await User.findByPk(id);

    if (!user) return response.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (role) user.role = role;

    await user.save();
    response.json({ message: 'User updated successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

// Admin: Delete user
export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findByPk(id);

    if (!user) return response.status(404).json({ error: 'User not found' });

    await user.destroy();
    response.json({ message: 'User deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};

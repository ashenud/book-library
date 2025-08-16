import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (request, response) => {
  try {
    const { name, email, password, phone, address, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: role || 'user',
    });

    response.json({ message: 'User registered successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return response.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return response.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5m' });

    response.json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    response.status(500).json({ error: 'Login failed', details: error.message });
  }
};

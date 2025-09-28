// In /server/controllers/auth.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Secret Admin Registration ---
const registerAdmin = async (req, res) => {
  const { email, password, name, secretKey } = req.body;
  if (secretKey !== process.env.ADMIN_CREATION_SECRET_KEY) {
    return res.status(403).json({ message: 'Invalid secret key.' });
  }
  const existingAdmin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (existingAdmin) {
    return res.status(409).json({ message: 'An admin user already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'admin' },
    });
    res.status(201).json({ message: 'Admin user created successfully.', userId: user.id });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    res.status(500).json({ message: 'Error creating admin user.' });
  }
};

// --- Login ---
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Create JWT
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token expires in 1 day
  );

  // Send token in a secure, httpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/',
  });

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

// --- Logout ---
const logout = (req, res) => {
  // Clear the cookie
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  res.status(200).json({ message: 'Logged out successfully.' });
};

// --- Get Current User ("Me") ---
const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { registerAdmin, login, logout, getMe };
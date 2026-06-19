const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb } = require('../db');
const { authenticateToken, generateToken } = require('../middleware/auth');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function userResponse(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.display_name,
    about: user.about,
  };
}

// POST /api/auth/register — Create new account
router.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required' });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  if (username.length < 3 || username.length > 30) {
    return res.status(400).json({ message: 'Username must be 3–30 characters' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  const db = getDb();

  const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existingEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already taken' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const result = db.prepare(
    'INSERT INTO users (email, username, password_hash, display_name) VALUES (?, ?, ?, ?)'
  ).run(email, username, passwordHash, username);

  const user = { id: result.lastInsertRowid, email, username };
  const token = generateToken(user);

  res.status(201).json({
    token,
    user: { id: user.id, email, username, displayName: username, about: '' },
  });
});

// POST /api/auth/login — Authenticate by email OR username
router.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Username/email and password are required' });
  }

  const db = getDb();
  const user = db.prepare(
    'SELECT * FROM users WHERE username = ? OR email = ?'
  ).get(login, login);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);

  res.json({ token, user: userResponse(user) });
});

// GET /api/auth/me — Get current user
router.get('/me', authenticateToken, (req, res) => {
  const db = getDb();
  const user = db.prepare(
    'SELECT id, email, username, display_name, about FROM users WHERE id = ?'
  ).get(req.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(userResponse(user));
});

// PUT /api/auth/profile — Update profile
router.put('/profile', authenticateToken, (req, res) => {
  const { displayName, about } = req.body;

  const db = getDb();
  const updates = [];
  const params = [];

  if (displayName !== undefined) {
    updates.push('display_name = ?');
    params.push(displayName);
  }
  if (about !== undefined) {
    updates.push('about = ?');
    params.push(about);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  updates.push("updated_at = datetime('now')");
  params.push(req.userId);

  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  const user = db.prepare(
    'SELECT id, email, username, display_name, about FROM users WHERE id = ?'
  ).get(req.userId);

  res.json(userResponse(user));
});

module.exports = router;

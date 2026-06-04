const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validate');

// In-memory data store
let users = [];
let nextId = 1;

// GET all users
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

// POST create new user
router.post('/', validateUser, (req, res) => {
  const { name, email, age } = req.body;

  // Duplicate email check
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const newUser = { id: nextId++, name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', validateUser, (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email, age } = req.body;

  // Duplicate email check (exclude current user)
  const exists = users.find(u => u.email === email && u.id !== parseInt(req.params.id));
  if (exists) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  users[index] = { id: parseInt(req.params.id), name, email, age };
  res.status(200).json(users[index]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
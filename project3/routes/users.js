const express = require('express');
const router = express.Router();
const { getDb, saveDb } = require('../database/db');
const validateUser = require('../middleware/validate');

// GET all users
router.get('/', async (req, res) => {
  const db = await getDb();
  const result = db.exec('SELECT * FROM users');
  const users = result[0]
    ? result[0].values.map(row => ({
        id: row[0], name: row[1], email: row[2], age: row[3]
      }))
    : [];
  res.status(200).json(users);
});

// GET user by ID
router.get('/:id', async (req, res) => {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM users WHERE id = ${req.params.id}`);
  if (!result[0]) return res.status(404).json({ error: 'User not found' });
  const row = result[0].values[0];
  res.status(200).json({ id: row[0], name: row[1], email: row[2], age: row[3] });
});

// POST create new user
router.post('/', validateUser, async (req, res) => {
  const { name, email, age } = req.body;
  const db = await getDb();

  const existing = db.exec(`SELECT * FROM users WHERE email = '${email}'`);
  if (existing[0]) return res.status(409).json({ error: 'Email already exists' });

  db.run(`INSERT INTO users (name, email, age) VALUES (?, ?, ?)`, [name, email, age]);
  saveDb();

  const newUser = db.exec(`SELECT * FROM users WHERE email = '${email}'`);
  const row = newUser[0].values[0];
  res.status(201).json({ id: row[0], name: row[1], email: row[2], age: row[3] });
});

// PUT update user
router.put('/:id', validateUser, async (req, res) => {
  const { name, email, age } = req.body;
  const id = req.params.id;
  const db = await getDb();

  const user = db.exec(`SELECT * FROM users WHERE id = ${id}`);
  if (!user[0]) return res.status(404).json({ error: 'User not found' });

  const duplicate = db.exec(`SELECT * FROM users WHERE email = '${email}' AND id != ${id}`);
  if (duplicate[0]) return res.status(409).json({ error: 'Email already exists' });

  db.run(`UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`, [name, email, age, id]);
  saveDb();

  const updated = db.exec(`SELECT * FROM users WHERE id = ${id}`);
  const row = updated[0].values[0];
  res.status(200).json({ id: row[0], name: row[1], email: row[2], age: row[3] });
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const db = await getDb();
  const user = db.exec(`SELECT * FROM users WHERE id = ${req.params.id}`);
  if (!user[0]) return res.status(404).json({ error: 'User not found' });

  db.run(`DELETE FROM users WHERE id = ${req.params.id}`);
  saveDb();
  res.status(204).send();
});

module.exports = router;
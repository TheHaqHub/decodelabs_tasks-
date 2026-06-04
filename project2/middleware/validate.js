function validateUser(req, res, next) {
  const { name, email, age } = req.body;

  // Layer 1 — Syntactic Validation (fields exist and are correct type)
  if (!name || !email || age === undefined) {
    return res.status(400).json({ error: 'Name, email, and age are required' });
  }

  if (typeof name !== 'string' || typeof email !== 'string') {
    return res.status(400).json({ error: 'Name and email must be strings' });
  }

  if (typeof age !== 'number') {
    return res.status(400).json({ error: 'Age must be a number' });
  }

  // Layer 2 — Semantic Validation (values make logical sense)
  if (name.trim().length === 0) {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (age < 0 || age > 120) {
    return res.status(400).json({ error: 'Age must be between 0 and 120' });
  }

  next();
}

module.exports = validateUser;
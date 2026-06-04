const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 500 Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
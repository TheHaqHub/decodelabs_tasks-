const express = require('express');
const cors = require('cors');
const app = express();
const { getDb } = require('./database/db');
const usersRouter = require('./routes/users');

app.use(cors({
  origin: ['https://decodelabs-tasks-six.vercel.app', 'http://localhost:3000']
}));
app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'User Management API with SQLite is running!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = 3000;
getDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
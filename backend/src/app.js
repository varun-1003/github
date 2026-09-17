require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const issueRoutes = require('./routes/issueRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Issue Tracker API');
});

app.use('/api/issues', issueRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB');
    process.exit(1);
  }
}

startServer();
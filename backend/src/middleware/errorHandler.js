function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Invalid issue data' });
  }

  if (error.code === 11000) {
    return res.status(400).json({ message: 'Issue ID already exists' });
  }

  res.status(500).json({ message: 'Something went wrong' });
}

module.exports = errorHandler;
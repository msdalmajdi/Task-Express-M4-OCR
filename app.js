const express = require('express');
const path = require('path');
const app = express();
const ocrRoutes = require('./api/ocr/ocr.routes');

app.use(express.json());
app.use('/ocr', ocrRoutes);
app.use('/media', express.static(path.join(__dirname, 'media')));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(8000, () => {
  console.log('The application is running on localhost:8000');
});

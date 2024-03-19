
const express = require('express');
const fs = require('fs').promises; // Using fs promises API for simplicity
const path = require('path');

// Initialize the express application
const app = express();

// Define the /_health endpoint
app.get('/_health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});
app.get('/', async (req, res) => {
  try {
    const filePath = '/var/run/cycle/metadata/environment.json';
    const data = await fs.readFile(filePath, 'utf8');
    res.type('json').send(data); // Set Content-Type as JSON and send data
  } catch (error) {
    console.error('Error reading the file:', error);
    res.status(500).send('An error occurred while reading the file.');
  }
});

// Start the server on port 3000
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Gracefully stop the server on SIGINT
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down server...');
  server.close(() => {
    console.log('Server has been shut down.');
    process.exit(0);
  });
});

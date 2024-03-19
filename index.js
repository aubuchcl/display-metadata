// Import the express library
const express = require('express');

// Initialize the express application
const app = express();

// Define the /_health endpoint
app.get('/_health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});
app.get('/', (req, res) => {
  res.send('Hello World');
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

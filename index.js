const express = require('express');
const fs = require('fs').promises;

const app = express();

app.get('/_health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/', async (req, res) => {
  try {
    const filePath = '/var/run/cycle/metadata/environment.json';
    const data = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    const deploymentsData = parsedData.deployments;
    const prettyDeploymentsData = JSON.stringify(deploymentsData, null, 2); //

    // Create an HTML content with styling
    const htmlContent = `
      <html>
      <head>
        <title>JSON Data</title>
        <style>
          body {
            background-color: #333; /* Dark grey background */
            color: white; /* White text */
            height: 100vh; /* Full height */
            margin: 0;
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
            font-family: Arial, sans-serif;
          }
          pre {
            width: 90%; /* Set a max-width for the pre tag */
            overflow: auto; /* Enables scrolling if content is too wide */
          }
        </style>
      </head>
      <body>
        <pre>${prettyDeploymentsData}</pre>
      </body>
      </html>
    `;

    res.send(htmlContent); // Send the HTML with the JSON data embedded

  } catch (error) {
    console.error('Error reading the file:', error);
    res.status(500).send('An error occurred while reading the file.');
  }
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down server...');
  server.close(() => {
    console.log('Server has been shut down.');
    process.exit(0);
  });
});

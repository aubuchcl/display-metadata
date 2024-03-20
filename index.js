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
    // const deploymentsData = parsedData.deployments;
    // const prettyDeploymentsData = JSON.stringify(deploymentsData, null, 2); //
    const demoValue = parsedData.deployments && parsedData.deployments.tags && parsedData.deployments.tags.demo
    ? parsedData.deployments.tags.demo
    : 'Demo value not found';

    // Create an HTML content with styling
    const htmlContent = `
      <html>
      <head>
        <title>Deployments Data</title>
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
            font-size: 32px;
            line-height: 1.5;
            overflow: auto; /* Enables scrolling if content is too wide */
          }
          header {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }
          img{
            height: 40vmin;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <header >
          <img src="https://static.cycle.io/icons/logo/logo-white.svg" className="App-logo" alt="logo"  width="400px" height="100px" />
          <h1>Deployment Version:</h1>
          <pre>${demoValue}</pre>
        </header>
        
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

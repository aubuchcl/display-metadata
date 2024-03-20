const express = require('express');


const app = express();

app.get('/_health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/', async (req, res) => {
  try {
    const deploymentVersion = process.env.CONTAINER_DEPLOYMENT_VERSION

    // Create an HTML content with styling
    const htmlContent = `
      <html>
      <head>
        <title>Deployments Data</title>
        <style>
          body {
            background-color: #282c34;
            color: white; /* White text */
            height: 100vh; /* Full height */
            margin: 0;
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
            font-family: Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }
          pre {
            font-size: 32px;
            line-height: 1.5;
            overflow: auto; /* Enables scrolling if content is too wide */
          }
          img{
            height: 40vmin;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        
          <img src="https://static.cycle.io/icons/logo/logo-white.svg" className="App-logo" alt="logo"  width="400px" height="100px" />
          <h1>Deployment Version:</h1>
          <pre>${deploymentVersion}</pre>
        
        
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

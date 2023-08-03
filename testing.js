const express = require('express');
const needle = require('needle');
require('dotenv').config()

const {HIK_HOST, HIK_USERNAME, HIK_PASSWORD} = process.env
const app = express();
const HIKVISION_ENDPOINT = HIK_HOST

// Function to continuously listen for events
async function listenForEvents() {
  try {
    const options = {
        auth: "digest",
        username: HIK_USERNAME,
        password: HIK_PASSWORD
      }
      
    const response = await needle('get', HIK_HOST,options);

    // Assuming the response contains the data you need to log
    console.log('Event data:', response.body);

    // Continue listening for events recursively
    listenForEvents();
  } catch (error) {
    console.error('Error fetching event stream:', error.message);

    // Retry listening after a short delay (e.g., 5 seconds)
    setTimeout(listenForEvents, 5000);
  }
}

// Start listening for events when the server starts
listenForEvents();

// Start the server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

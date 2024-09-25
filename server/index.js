require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// CORS configuration to allow cross-origin requests
app.use(cors({
  origin: '*', // Allow requests from all origins (use with caution in production)
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

/**
 * Helper function for making API requests.
 * @param {string} url - The URL to request.
 * @param {object} headers - Optional headers for the request.
 * @returns {object} - Response object containing status, success, message, and data/error.
 */
async function makeApiRequest(url, headers) {
  try {
    const response = await axios.get(url, { headers });
    return {
      status: 200,
      success: true,
      message: "Successfully fetched the data",
      data: response.data,
    };
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.response ? error.response.data : error.message,
    };
  }
}

// Route to get all news based on query parameters
app.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10; // Number of articles per page (default is 10)
  let page = parseInt(req.query.page) || 1; // Page number (default is 1)
  let q = req.query.q || 'world'; // Search query (default is 'world')

  // Construct URL for GNews API with query parameters
  let url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&page=${page}&max=${pageSize}&token=${process.env.GNEWS_API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

// Route to get top headlines
app.get("/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10; // Number of articles per page (default is 10)
  let page = parseInt(req.query.page) || 1; // Page number (default is 1)

  // Print API key for debugging (remove in production)
  console.log(process.env.GNEWS_API_KEY);

  // Construct URL for GNews API to get top headlines
  let url = `https://gnews.io/api/v4/top-headlines?page=${page}&max=${pageSize}&token=${process.env.GNEWS_API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

// Route to get news by country code
app.get("/country/:iso", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10; // Number of articles per page (default is 10)
  let page = parseInt(req.query.page) || 1; // Page number (default is 1)
  const country = req.params.iso.toUpperCase(); // Country code from route parameters

  // Construct URL for GNews API to get country-specific top headlines
  let url = `https://gnews.io/api/v4/top-headlines?country=${country}&page=${page}&max=${pageSize}&token=${process.env.GNEWS_API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});

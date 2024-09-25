require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const GNEWS_API_KEY = process.env.GNEWS_API_KEY; // Store API key from environment variables

/**
 * Fetch news from the given URL and send the response to the client.
 * @param {string} url - The URL to request.
 * @param {object} res - The response object to send the result.
 */
function fetchNews(url, res) {
    console.log('Request URL:', url); // Log the URL being requested
    axios.get(url)
      .then(response => {
        console.log('API Response:', response.data); // Log the full response
        const { articles, totalResults } = response.data;
        res.json({
          status: 200,
          success: true,
          message: articles.length > 0 ? "Successfully fetched the data" : "No more results to show",
          data: {
            articles: articles || [], // Ensure articles is an array
            totalResults: totalResults || 0 // Ensure totalResults is a number
          }
        });
      })
      .catch(error => {
        console.error('API Error:', error.message); // Log any API error
        res.json({
          status: 500,
          success: false,
          message: "Failed to fetch data from the API",
          error: error.message
        });
      });
}

// Route to get all news based on query parameters
app.get("/all-news", (req, res) => {
    const pageSize = Math.min(parseInt(req.query.pageSize) || 10, 10); // Limit to 10 articles per page
    const page = parseInt(req.query.page) || 1; // Page number (default is 1)
    const query = req.query.q || ""; // Search query (default is an empty string)
    const url = `https://gnews.io/api/v4/top-headlines?q=${query}&page=${page}&max=${pageSize}&apikey=${GNEWS_API_KEY}`;
    fetchNews(url, res);
});

// Route to get top headlines
app.get("/top-headlines", (req, res) => {
  const pageSize = Math.min(parseInt(req.query.pageSize) || 10, 10); // Limit to 10 articles per page
  const page = parseInt(req.query.page) || 1; // Page number (default is 1)
  const topic = req.query.category || "general"; // Topic or category (default is "general")
  const url = `https://gnews.io/api/v4/top-headlines?topic=${topic}&page=${page}&max=${pageSize}&apikey=${GNEWS_API_KEY}`;
  fetchNews(url, res);
});

// Route to get news by country code
app.get("/country/:iso", (req, res) => {
  const pageSize = Math.min(parseInt(req.query.pageSize) || 10, 10); // Limit to 10 articles per page
  const page = parseInt(req.query.page) || 1; // Page number (default is 1)
  const country = req.params.iso.toUpperCase(); // Country code from route parameters
  const url = `https://gnews.io/api/v4/top-headlines?country=${country}&page=${page}&max=${pageSize}&apikey=${GNEWS_API_KEY}`;
  fetchNews(url, res);
});

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});

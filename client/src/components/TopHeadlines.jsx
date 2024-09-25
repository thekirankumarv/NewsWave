import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard'; // Component for displaying each news card
import Loader from "./Loader"; // Loader component for showing loading state

function TopHeadlines() {
  const params = useParams(); // Get URL parameters
  const [data, setData] = useState([]); // State to store news articles
  const [page, setPage] = useState(1); // State to manage current page
  const [totalResults, setTotalResults] = useState(0); // State for total number of results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [query, setQuery] = useState(''); // State for search query

  // Handlers for pagination
  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

  const pageSize = 6; // Number of articles per page

  // Search form handler
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm); // Update the query with the search term
    setPage(1); // Reset to the first page when searching
  };

  useEffect(() => {
    setIsLoading(true); // Set loading state to true
    setError(null); // Reset error state
    
    // Constructing API URL with parameters
    const categoryParam = params.category ? `&q=${params.category}` : "";
    const queryParam = query ? `&q=${query}` : "";
    const url = `https://gnews.io/api/v4/search?${queryParam}${categoryParam}&page=${page}&pageSize=${pageSize}&apikey=your_api_key_here`;
  
    // Fetch news articles from the API
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.articles && json.totalArticles !== undefined) {
          setTotalResults(json.totalArticles); // Update total results
          setData(json.articles); // Update data state with fetched articles
        } else {
          setError('No articles found or invalid response format.'); // Error handling
        }
      })
      .catch(() => setError('Failed to fetch news. Please try again later.')) // Error handling
      .finally(() => setIsLoading(false)); // Reset loading state
  }, [page, params.category, query]); // Dependencies for the useEffect

  return (
    <>
      {/* Search Bar */}
      <div className="mt-10 mb-10 flex justify-center">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-96 focus:outline-none focus:border-blue-400 shadow-lg text-lg"
            placeholder="Search headlines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-lg flex items-center justify-center"
          >
            <i className="fas fa-search"></i> {/* Search icon */}
          </button>
        </form>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

      {/* News Articles Grid */}
      <div className='my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.image}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p>No articles found for this category or criteria.</p> // No articles found
          )
        ) : (
          <Loader /> // Show loader when fetching data
        )}
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn text-center"
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            Page {page} of {Math.ceil(totalResults / pageSize)} {/* Display current page and total pages */}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;

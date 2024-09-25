import React, { useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

/**
 * AllNews Component
 * Displays a paginated list of news articles with search functionality.
 * 
 * @returns {JSX.Element} - The rendered AllNews component
 */
function AllNews() {
  // State variables
  const [data, setData] = useState([]); // Store news articles
  const [page, setPage] = useState(1); // Current page number
  const [totalResults, setTotalResults] = useState(0); // Total number of results
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [query, setQuery] = useState(''); // Query for API request

  const pageSize = 6; // Number of articles per page

  // Function to handle previous page button click
  const handlePrev = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  // Function to handle next page button click
  const handleNext = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm); // Update query for search
    setPage(1); // Reset to the first page when searching
  };

  // Effect to fetch news articles whenever page or query changes
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Construct API URL based on query
    const fetchUrl = query
      ? `https://gnews.io/api/v4/search?q=${query}&apikey=your_api_key_here`
      : `https://gnews.io/api/v4/search?q=india&apikey=your_api_key_here`;

    // Fetch news articles from API
    fetch(fetchUrl)
      .then(response => response.json())
      .then(myJson => {
        if (myJson.articles) {
          const articles = myJson.articles || [];
          setTotalResults(myJson.totalArticles || 0); // Set total results
          setData(articles); // Set news articles data
        } else {
          setError(myJson.message || 'An error occurred'); // Handle errors
        }
      })
      .catch(error => {
        setError('Failed to fetch news. Please try again later.'); // Handle fetch errors
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }, [page, query]);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <>
      {/* Search Bar */}
      <div className="mt-10 mb-10 flex justify-center">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-96 focus:outline-none focus:border-blue-400 shadow-lg text-lg"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '8px' }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-lg flex items-center justify-center"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* News Articles Grid */}
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {!isLoading ? (
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
          <Loader /> // Loader component while fetching
        )}
      </div>

      {/* Pagination Controls */}
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
            Page {page} of {totalPages}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= totalPages}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;

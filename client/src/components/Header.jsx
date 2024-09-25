import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { countries } from './CountryNews'; // Import countries from CountryNews.jsx

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light-theme");

  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      setError(null);
      axios.get(`https://gnews.io/api/v4/top-headlines?country=${selectedCountry}&category=entertainment&apikey=your_api_key_here`)
        .then(response => {
          if (response.data) {
            setNews(response.data.articles);
          }
        })
        .catch(() => {
          setError("Failed to fetch news.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedCountry]);

  function handleAllNewsClick() {
    setActive(false);
    window.location.reload();
  }

  function handleCategoryClick(category) {
    setShowCategoryDropdown(false);
    setActive(false);
    window.location.reload();
  }

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "light-theme" ? "dark-theme" : "light-theme");
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">NewsWave</h3>

        <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li><Link className="no-underline font-semibold" to="/" onClick={handleAllNewsClick}>All News</Link></li>
          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false); }}>
              Top Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={() => handleCategoryClick(element)}>
                  <Link to={`/top-headlines/${element}`} className="flex gap-3 capitalize">
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="dropdown-li">
            <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false); }}>
              Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} />
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => { setSelectedCountry(element.iso_2_alpha); setShowCountryDropdown(false); setActive(false); }}>
                  <Link to="#" className="flex items-center gap-3">
                    <img src={element.png} alt={element.countryName} className="w-6 h-4" />
                    <span>{element.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>
        </ul>
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active); }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>

      {selectedCountry && (
        <div className="news-section mt-20 px-4 py-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Top Headlines for {selectedCountry}</h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.map((element, index) => (
                <div key={index} className="news-card bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img src={element.image} alt={element.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{element.title}</h3>
                    <p className="text-gray-700 mb-4">{element.description}</p>
                    <a href={element.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
                  </div>
                </div>
              ))
            ) : !loading ? (
              <p className="text-gray-500">No articles available.</p>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
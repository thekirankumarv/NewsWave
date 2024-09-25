import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

// Hardcoded countries data
export const countries = [
  { iso_2_alpha: 'in', png: 'https://flagcdn.com/24x18/in.png', countryName: 'India' },
  { iso_2_alpha: 'ae', png: 'https://flagcdn.com/24x18/ae.png', countryName: 'United Arab Emirates' },
  { iso_2_alpha: 'ar', png: 'https://flagcdn.com/24x18/ar.png', countryName: 'Argentina' },
  { iso_2_alpha: 'at', png: 'https://flagcdn.com/24x18/at.png', countryName: 'Austria' },
  { iso_2_alpha: 'au', png: 'https://flagcdn.com/24x18/au.png', countryName: 'Australia' },
  { iso_2_alpha: 'be', png: 'https://flagcdn.com/24x18/be.png', countryName: 'Belgium' },
  { iso_2_alpha: 'bg', png: 'https://flagcdn.com/24x18/bg.png', countryName: 'Bulgaria' },
  { iso_2_alpha: 'br', png: 'https://flagcdn.com/24x18/br.png', countryName: 'Brazil' },
  { iso_2_alpha: 'ca', png: 'https://flagcdn.com/24x18/ca.png', countryName: 'Canada' },
  { iso_2_alpha: 'ch', png: 'https://flagcdn.com/24x18/ch.png', countryName: 'Switzerland' },
  { iso_2_alpha: 'cn', png: 'https://flagcdn.com/24x18/cn.png', countryName: 'China' },
  { iso_2_alpha: 'co', png: 'https://flagcdn.com/24x18/co.png', countryName: 'Colombia' },
  { iso_2_alpha: 'cu', png: 'https://flagcdn.com/24x18/cu.png', countryName: 'Cuba' },
  { iso_2_alpha: 'cz', png: 'https://flagcdn.com/24x18/cz.png', countryName: 'Czech Republic' },
  { iso_2_alpha: 'de', png: 'https://flagcdn.com/24x18/de.png', countryName: 'Germany' },
  { iso_2_alpha: 'eg', png: 'https://flagcdn.com/24x18/eg.png', countryName: 'Egypt' },
  { iso_2_alpha: 'fr', png: 'https://flagcdn.com/24x18/fr.png', countryName: 'France' },
  { iso_2_alpha: 'gb', png: 'https://flagcdn.com/24x18/gb.png', countryName: 'United Kingdom' },
  { iso_2_alpha: 'gr', png: 'https://flagcdn.com/24x18/gr.png', countryName: 'Greece' },
  { iso_2_alpha: 'hk', png: 'https://flagcdn.com/24x18/hk.png', countryName: 'Hong Kong' },
  { iso_2_alpha: 'hu', png: 'https://flagcdn.com/24x18/hu.png', countryName: 'Hungary' },
  { iso_2_alpha: 'id', png: 'https://flagcdn.com/24x18/id.png', countryName: 'Indonesia' },
  { iso_2_alpha: 'ie', png: 'https://flagcdn.com/24x18/ie.png', countryName: 'Ireland' },
  { iso_2_alpha: 'il', png: 'https://flagcdn.com/24x18/il.png', countryName: 'Israel' },
  { iso_2_alpha: 'it', png: 'https://flagcdn.com/24x18/it.png', countryName: 'Italy' },
  { iso_2_alpha: 'jp', png: 'https://flagcdn.com/24x18/jp.png', countryName: 'Japan' },
  { iso_2_alpha: 'kr', png: 'https://flagcdn.com/24x18/kr.png', countryName: 'South Korea' },
  { iso_2_alpha: 'lt', png: 'https://flagcdn.com/24x18/lt.png', countryName: 'Lithuania' },
  { iso_2_alpha: 'lv', png: 'https://flagcdn.com/24x18/lv.png', countryName: 'Latvia' },
  { iso_2_alpha: 'ma', png: 'https://flagcdn.com/24x18/ma.png', countryName: 'Morocco' },
  { iso_2_alpha: 'mx', png: 'https://flagcdn.com/24x18/mx.png', countryName: 'Mexico' },
  { iso_2_alpha: 'my', png: 'https://flagcdn.com/24x18/my.png', countryName: 'Malaysia' },
  { iso_2_alpha: 'ng', png: 'https://flagcdn.com/24x18/ng.png', countryName: 'Nigeria' },
  { iso_2_alpha: 'nl', png: 'https://flagcdn.com/24x18/nl.png', countryName: 'Netherlands' },
  { iso_2_alpha: 'no', png: 'https://flagcdn.com/24x18/no.png', countryName: 'Norway' },
  { iso_2_alpha: 'nz', png: 'https://flagcdn.com/24x18/nz.png', countryName: 'New Zealand' },
  { iso_2_alpha: 'ph', png: 'https://flagcdn.com/24x18/ph.png', countryName: 'Philippines' },
  { iso_2_alpha: 'pl', png: 'https://flagcdn.com/24x18/pl.png', countryName: 'Poland' },
  { iso_2_alpha: 'pt', png: 'https://flagcdn.com/24x18/pt.png', countryName: 'Portugal' },
  { iso_2_alpha: 'ro', png: 'https://flagcdn.com/24x18/ro.png', countryName: 'Romania' },
  { iso_2_alpha: 'rs', png: 'https://flagcdn.com/24x18/rs.png', countryName: 'Serbia' },
  { iso_2_alpha: 'ru', png: 'https://flagcdn.com/24x18/ru.png', countryName: 'Russia' },
  { iso_2_alpha: 'sa', png: 'https://flagcdn.com/24x18/sa.png', countryName: 'Saudi Arabia' },
  { iso_2_alpha: 'se', png: 'https://flagcdn.com/24x18/se.png', countryName: 'Sweden' },
  { iso_2_alpha: 'sg', png: 'https://flagcdn.com/24x18/sg.png', countryName: 'Singapore' },
  { iso_2_alpha: 'si', png: 'https://flagcdn.com/24x18/si.png', countryName: 'Slovenia' },
  { iso_2_alpha: 'sk', png: 'https://flagcdn.com/24x18/sk.png', countryName: 'Slovakia' },
  { iso_2_alpha: 'th', png: 'https://flagcdn.com/24x18/th.png', countryName: 'Thailand' },
  { iso_2_alpha: 'tr', png: 'https://flagcdn.com/24x18/tr.png', countryName: 'Turkey' },
  { iso_2_alpha: 'tw', png: 'https://flagcdn.com/24x18/tw.png', countryName: 'Taiwan' },
  { iso_2_alpha: 'ua', png: 'https://flagcdn.com/24x18/ua.png', countryName: 'Ukraine' },
  { iso_2_alpha: 'us', png: 'https://flagcdn.com/24x18/us.png', countryName: 'United States' },
  { iso_2_alpha: 've', png: 'https://flagcdn.com/24x18/ve.png', countryName: 'Venezuela' },
  { iso_2_alpha: 'za', png: 'https://flagcdn.com/24x18/za.png', countryName: 'South Africa' }
];

function CountryNews() {
  const params = useParams();
  
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const pageSize = 10;
  const apiKey = process.env.GNEWS_API_KEY;

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const url = `https://gnews.io/api/v4/top-headlines?country=${params.iso}&page=${page}&apikey=${apiKey}`;

    fetch(url)
      .then((response) => {
        console.log('Response Status:', response.status);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((myJson) => {
        console.log('API Response:', myJson);

        if (myJson.success) {
          if (myJson.data.totalResults === 0) {
            setModalIsOpen(true);
          }
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'No news articles found for this criteria.');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.iso, apiKey]);

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
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
            <p>No articles found.</p>
          )
        ) : (
          <Loader />
        )}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="No Articles Found"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>No Articles Found</h2>
        <p>Sorry, there are no articles available for this country at the moment.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

export default CountryNews;
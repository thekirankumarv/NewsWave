import React from "react";

/**
 * Card Component
 * Displays a card with news/article information, including title, image, description, and other details.
 * 
 * @param {Object} props - The properties passed to this component
 * @param {string} props.title - The title of the card
 * @param {string} props.imgUrl - The URL for the main image of the card
 * @param {string} props.description - The description of the card content
 * @param {string} props.url - The URL for the source of the article
 * @param {string} props.source - The name of the source of the article
 * @param {string} props.author - The author of the article
 * @param {string} props.publishedAt - The published date of the article
 * @param {string} props.imageUrlLeft - The URL for the background image on the left
 * @param {string} props.imageLeftTitle - The title for the background image on the left
 * @param {string} props.memberIcon - The SVG icon for the member section
 * @param {string} props.memberText - The text associated with the member icon
 * @param {string} props.cardTitle - The title for the new card section
 * @param {string} props.cardDescription - The description for the new card section
 * @param {string} props.authorImage - The URL for the author’s image
 * @param {string} props.authorName - The name of the author
 * @param {string} props.publishedDate - The published date for the new card section
 * 
 * @returns {JSX.Element} - The rendered Card component
 */
function Card(props) {
  return (
    <div className="everything-card mt-10">
      {/* Main card container with wrapping for styling */}
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        {/* Title of the card */}
        <b className="title">{props.title}</b>
        
        {/* Main image section */}
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={props.imgUrl} alt="img" />
        </div>
        
        {/* Description section */}
        <div className="description">
          <p className="description-text leading-7">
            {/* Truncate the description to 200 characters */}
            {props.description?.substring(0, 200)}
          </p>
        </div>
        
        {/* Additional information */}
        <div className="info">
          {/* Source information */}
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              className="link underline break-words"
            >
              {/* Truncate source name to 70 characters */}
              {props.source.substring(0, 70)}
            </a>
          </div>
          
          {/* Origin details */}
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>
              ({props.publishedAt})
            </p>
          </div>
        </div>
      </div>

      {/* New card content with additional styling */}
      <div className="flex lg:flex-row">
        {/* Left image section */}
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${props.imageUrlLeft})` }}
          title={props.imageLeftTitle}
        ></div>
        
        {/* Right card content */}
        <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            {/* Member icon and text */}
            <p className="text-sm text-gray-600 flex items-center">
              {props.memberIcon && (
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  {/* Render member icon */}
                  {props.memberIcon}
                </svg>
              )}
              {props.memberText}
            </p>
            
            {/* Card title and description */}
            <div className="text-gray-900 font-bold text-xl mb-2">
              {props.cardTitle}
            </div>
            <p className="text-gray-700 text-base">{props.cardDescription}</p>
          </div>
          
          {/* Author information */}
          <div className="flex items-center">
            {props.authorImage && (
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={props.authorImage}
                alt="Avatar"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{props.authorName}</p>
              <p className="text-gray-600">{props.publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

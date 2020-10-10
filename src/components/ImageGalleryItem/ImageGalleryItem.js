import React from 'react';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({ dataImages }) {
  return (
    <>
      {dataImages.map(image => (
        <li key={image.id} className="ImageGalleryItem">
          <img
            src={image.webformatURL}
            alt={image.category}
            data-large={image.largeImageURL}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  dataImages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

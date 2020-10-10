import React from 'react';
import PropTypes from 'prop-types';

export default function ImageGallery({ children, setLargeImageUrl }) {
  return (
    <ul
      className="ImageGallery"
      onClick={e => {
        if (e.target.nodeName !== 'IMG') {
          return;
        }
        setLargeImageUrl(e.target.dataset);
      }}
    >
      {children}
    </ul>
  );
}
ImageGallery.propTypes = {
  children: PropTypes.node,
  setLargeImageUrl: PropTypes.func,
};

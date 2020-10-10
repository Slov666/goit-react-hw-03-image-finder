import React from 'react';
import PropTypes from 'prop-types';
export default function Button({ onClick }) {
  return (
    <div className="box-Button">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
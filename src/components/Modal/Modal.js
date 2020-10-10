import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  largeImageUrl: PropTypes.string,
};

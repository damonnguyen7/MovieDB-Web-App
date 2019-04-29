import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HomeButton extends Component {

  static propTypes = {
    currentPath: PropTypes.string.isRequired,
    goHome: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }

  render() {
    const { 
      currentPath,
      goHome,
      goBack
    } = this.props;

    return (
      <div className="md-back-btn-icon-container">
        {
          (() => {
            if (currentPath.slice(0, 7) === '/movie/') {
              return <i className="material-icons md-back-btn-icon" onClick={goBack}>keyboard_backspace</i>
            } else if (currentPath === '/' || currentPath.slice(0, 7) === '/movies') {
              return <i className="material-icons md-home-btn-icon" onClick={goHome}>home</i>
            }
          })()
        }
      </div>
    );
  }
};

export default HomeButton;
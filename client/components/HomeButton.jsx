import React, { Component } from 'react';

class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(cb) {
    cb();
  }

  render() {
    return (
      <div className="md-back-btn-icon-container">
        { this.props.currentPath.slice(0,7) === '/movie/' ? <i className="material-icons md-back-btn-icon" onClick={() => this.handleClick(this.props.goBack)}>keyboard_backspace</i> : null }
        { this.props.currentPath === '/' || this.props.currentPath.slice(0, 7) === '/movies' ? <i className="material-icons md-home-btn-icon" onClick={() => this.handleClick(this.props.goHome)}>home</i> : null }
      </div>
    );
  }
};

export default HomeButton;
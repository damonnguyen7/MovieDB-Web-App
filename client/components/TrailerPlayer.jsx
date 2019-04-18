import React, { Component } from 'react';

class TrailerPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrailerKey: undefined
    };
    this.renderTrailerPagination = this.renderTrailerPagination.bind(this);
    this.changeTrailer = this.changeTrailer.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.trailers && props.trailers.length > 0 && state.selectedTrailerKey === undefined) {
      return {
        selectedTrailerKey: props.trailers[0].key
      };
    }
    return null;
  }

  renderTrailerPagination() {
    const { trailers } = this.props;
    let selectedClassess = "material-icons trailer-toggle-btn ttbtn-selected";
    let unSelectedClasses = "material-icons trailer-toggle-btn";
    if (trailers.length === 1) return [];
    return trailers.slice(0,6).map((trailer) => {
      return (
        <div key={trailer.id}>
          <i onClick={() => this.changeTrailer(trailer.key)} className={unSelectedClasses}> brightness_1 </i>
        </div>
      );
    });
  }

  changeTrailer(selectedTrailerKey) {
    this.setState({
      selectedTrailerKey
    });
  }

  render() {
    const { trailers } = this.props;
    let hasTrailers = trailers && trailers.length > 0;
    return (
      <div id="movie-trailer">
        {
          hasTrailers ? 
          <div>
            <iframe 
              className="youtube-iframe"
              width="560" 
              height="315" 
              src={`https://www.youtube.com/embed/${this.state.selectedTrailerKey}`}
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
            ></iframe>
            <ul className="trailer-pagination">{this.renderTrailerPagination()}</ul>
          </div> : null
        }
      </div>
    );
  }
};

export default TrailerPlayer;
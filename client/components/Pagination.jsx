import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {

  static propType = {
    currentPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired
  }

  render() {
    const { currentPage, totalPages, handlePageChange } = this.props;

    const forwardIcon = <i className="material-icons" style={{fontSize: 16}}>arrow_forward_ios</i>;
    const backwardIcon = <i className="material-icons" style={{fontSize: 16}}>arrow_back_ios</i>;

    return (
      <ReactPaginate
        previousLabel={currentPage !== 1 ? backwardIcon : null}
        nextLabel={forwardIcon}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={null}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        forcePage={currentPage - 1}
      />
    );
  }
};

export default Pagination;
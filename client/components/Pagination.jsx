import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

/**
 * @constructs Pagination
 * @props - currentPage {Number}, totalPages {Number}, handlePageChange{Function}
 */

class Pagination extends Component {

  static propType = {
    currentPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  }

  handlePageChange = (data) => {
    this.props.handlePageChange(data);
  }

  render() {
    const { currentPage, totalPages } = this.props;

    const forwardIcon = <i className="material-icons" style={{fontSize: 16}}>arrow_forward_ios</i>;
    const backwardIcon = <i className="material-icons" style={{fontSize: 16}}>arrow_back_ios</i>;

    return (
      <ReactPaginate
        previousLabel={this.props.currentPage !== 1 ? backwardIcon : null}
        nextLabel={forwardIcon}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={this.props.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        forcePage={this.props.currentPage - 1}
      />
    );
  }
};

export default Pagination;
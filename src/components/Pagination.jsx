import React, { Component } from 'react';

import './Pagination.css';

class Pagination extends Component {
  onClickPrev() {
    this.move(this.props.prevPageToken);
  }

  onClickNext() {
    this.move(this.props.nextPageToken);
  }

  move(token) {
    this.props.move(token);
  }

  render() {
    return (
      <div className="Pagination">
        <i className="fa fa-angle-double-left fa-2x" onClick={this.onClickPrev.bind(this)}/>
        <i className="fa fa-angle-double-right fa-2x" onClick={this.onClickNext.bind(this)}/>
      </div>
    );
  }
}

export default Pagination;

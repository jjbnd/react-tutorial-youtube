import React, { Component } from 'react';
import EventBinder from '../lib/EventBinder';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handlers = EventBinder.getEventHandler(props);
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="InputGroup">
          <input ref={(input) => this.input = input} value={this.props.value} {...this.handlers}/>
          <i className="fa fa-search" onClick={this.props.onClick}></i>
        </div>
      </div>
    );
  }
}

export default SearchBar;

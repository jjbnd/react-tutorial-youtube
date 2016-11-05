import React, { Component } from 'react';

import EventBinder from '../lib/EventBinder';

import './Thumbnail.css';

class Thumbnail extends Component {
  constructor(props) {
    super(props);

    this.handlers = EventBinder.getEventHandler(props);
  }

  render() {
    let className = "Thumbnail";
    if (this.props.isPlaying) {
      className += ' nowplaying';
    }

    let thumbnail = (
      <div className={className}>
        <img src={this.props.src} alt='nothing' {...this.handlers}/>
        <div>{this.props.title}</div>
      </div>
    );

    return thumbnail;
  }
}

export default Thumbnail;

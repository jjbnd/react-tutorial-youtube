import React, { Component } from 'react';

import './Container.css';

import YoutubeSearch from '../lib/YoutubeSearch';

import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Thumbnail from './Thumbnail';

import Youtube from 'react-youtube';

class Container extends Component {
  constructor() {
    super();
    let youtubeApiKey = '';

    this.state = {
      search: '',
      pageInfo: null,
      maxResults: 0,
      items: null,
      prevPageToken: null,
      nextPageToken: null,
      currentVideoId: null,
      highlight: false,
    }

    if (!youtubeApiKey) {
      alert("You must input your youtube api key.");
      return;
    }

    this.youtubeSearch = new YoutubeSearch(youtubeApiKey);
    this.youtubePlayerOpts = {
      width: '800',
      height: '500',
      playerVars: {
        autoplay: 1,
      }
    }
  }

  onChangeHandler(e) {
    this.setState({
      search: e.target.value,
    });
  }

  onKeyUpHandler(e) {
    if (e.keyCode === 13) {
      var q = e.target.value;
      this.updateThubnails(q);
    }
  }

  onClickSearchIconHandler(e) {
    if (e.target.tagName.toLowerCase() === 'i') {
      this.updateThubnails(this.state.search);
    }
  }

  onClickThumbnailHandler(videoId, e) {
    e.target.closest('.Thumbnail').className += ' nowplaying';

    this.setState({
      currentVideoId: videoId
    });
  }

  onPlayEnd(e) {

  }

  move(token) {
    if (token) {
      this.updateThubnails(this.state.search, {
        pageToken: token
      });
    }
  }

  isPlaying(videoId) {
    return this.state.currentVideoId === videoId;
  }

  updateThubnails(q, query) {
    this.search(q, query).then((res) => {
      let items = res.data.items;
      this.setState({
        items: items,
      });
    });
  }

  search(q, query) {
    return this.youtubeSearch.search(q, query).then((res) => {
      this.setState({
        pageInfo: res.data.pageInfo,
        prevPageToken: res.data.prevPageToken,
        nextPageToken: res.data.nextPageToken,
      });
      return res;
    });
  }

  render() {
    let thumbnails = (this.state.items || []).map((item) => {
      const snippet = item.snippet;
      const url = snippet.thumbnails.high.url;
      return (
        <Thumbnail
          key={url}
          src={url}
          isPlaying={this.state.currentVideoId === item.id.videoId}
          title={snippet.title}
          onClick={this.onClickThumbnailHandler.bind(this, item.id.videoId)}
          />
      );
    });

    return (
      <div className="Container">
        <div className="ContainerHeader">
          <SearchBar
            value={this.state.search}
            onChange={this.onChangeHandler.bind(this)}
            onKeyUp={this.onKeyUpHandler.bind(this)}
            onClick={this.onClickSearchIconHandler.bind(this)}
            />
        </div>
        <div className="ContainerBody">
          <div className="PlayerArea">
            <Youtube
              videoId={this.state.currentVideoId}
              className="Youtube"
              opts={this.youtubePlayerOpts}
              onEnd={this.onPlayEnd.bind(this)}
              />
          </div>
          <div className="SideVideoList">
            {thumbnails}
          </div>
        </div>
        <Pagination
          pageInfo={this.state.pageInfo}
          maxResults={this.state.maxResults}
          prevPageToken={this.state.prevPageToken}
          nextPageToken={this.state.nextPageToken}
          move={this.move.bind(this)}
          />
      </div>
    );
  }
}

export default Container;

import axios from 'axios';

class YoutubeSearch {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  search(q, query) {
    let api = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&regionCode=kr&part=snippet&q=${encodeURIComponent(q)}`;
    Object.keys(query || {}).forEach((k) => {
      api += `&${k}=${query[k]}`;
    });
    return axios.get(api);
  }
}

export default YoutubeSearch;

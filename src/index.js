const snekfetch = require("snekfetch");
const { parse, format } = require("url");

module.exports = new class IHeartRadio {
  constructor() {
    this.APIList = {
      "search": "api.iheart.com/api/v3/search/all",
      "streamInfo": "api.iheart.com/api/v2/content/liveStations",
      "albumInfo": "api.iheart.com/api/v3/catalog/album"
    };
  }
  
  // Main Functions
  async search(search, options = {}) {
    if (!search) throw new Error("No Search Query");
    let url = this.setupURL(options, this.APIList.search);
    url.query.keywords = search;
    url = this.addQueryOptions(url, options, ["secure"]);
    url = format(url);
    const res = await this.fetch(url);
    return res.results || res;
  }
  async getStreamInfo(streamId, options = {}) {
    if (!streamId) throw new Error("No Stream ID");
    let url = this.setupURL(options, this.APIList.streamInfo + `/${streamId}`);
    url = this.addQueryOptions(url, options, ["secure"]);
    url = format(url);
    const res = await this.fetch(url);
    return (res.hits ? res.hits[0] : res);
  }
  async getAlbumInfo(albumId, options = {}) {
    if (!albumId) throw new Error("No Stream ID");
    let url = this.setupURL(options, this.APIList.albumInfo + `/${albumId}`);
    url = this.addQueryOptions(url, options, ["secure"]);
    url = format(url);
    return await this.fetch(url);
  }

  // Utilities
  setupURL(options, api) {
    return parse((options.secure ? "https://" : "http://") + (options.countryCode ? options.countryCode.toLowerCase() + "." : "") + api, true);
  }
  addQueryOptions(url, options, exemptList) {
    for (const key in options) {
      if (exemptList.includes(key)) continue;
      if (!Object.hasOwnProperty.call(url.query, key)) url.query[key] = options[key];
    }
    return url;
  }
  async fetch(url) {
    const res = await snekfetch.get(url);
    if (res.status != 200) throw new Error(res.statusText);
    return JSON.parse(res.text, null, 2);
  }
};
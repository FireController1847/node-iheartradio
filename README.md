# IHeartRadio API for Node.js
This is a FAN module of IHeartRadio's API. Parameters may change as more get discovered or found.

# Examples
### Searching
```js
const ihr = require("iheartradio");
ihr.search("My 99.5", {"maxRows": 3}).then(results => {
  console.log(results);
}).catch(console.error);
```

### Getting Stream Info
```js
const ihr = require("iheartradio");
ihr.getStreamInfo(2385).then(stream => {
  console.log(stream);
}).catch(console.error);
```

### Getting Album Info
```js
const ihr = require("iheartradio");
ihr.getStreamInfo(46356280).then(album => {
  console.log(album);
}).catch(console.error);
```

# Options
All options are included in one object found in the example at the bottom.
## URL Options
- `secure#boolean` - Changes from https to http.
## Query Options
### getAlbumInfo
- As of right now there are no known queries.
### getSteamInfo
- As of right now there are no known queries.
### search
- `maxRows#number` - Changes the amount of results you'll get.
- `bundle#boolean` - Change to false to allow individual output using the options below.
  - `station#boolean` - Allow stations in output.
  - `artist#boolean` - Allow artists in output.
  - `album#boolean` - Allow albums in output.
  - `track#boolean` - Allow tracks in output.
  - `playlist#boolean` - Allow playlists in output.
  - `podcast#boolean` - Allow podcasts in output.
- `countryCode#string` - The country in which to use the URL. If you used `US` for example, it'd use us.api.iheart.com and add &countryCode=US to the request URL.
- `startIndex#number` - Possibly used for pagination.
## Example
```js
const ihr = require("iheartradio");
ihr.search("99", {
  "secure": false,
  "maxRows": 25, 
  "bundle": false,
  "station": true,
  "artist": false,
  "album": false,
  "track": false,
  "playlist": false,
  "podcast": false
  }).then(results => {
  console.log(results); // An output only including 25 found stations.
}).catch(console.error);
```
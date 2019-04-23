const secret = require("../secretKey")();
const request = require("request");

const URI = {};

const geocode = (address, callback) => {
  URI.mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${secret.mapbox}&limit=1`;

  request({ url: URI.mapbox, json: true }, (err, res) => {
    const { features } = res.body;
    if (err) callback("Unable to connect to location services!", undefined);
    else if (!features || features.length === 0)
      callback("Unable to find location. Try another search", undefined);
    else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        place_name: features[0].place_name
      });
    }
  });
};

module.exports = geocode;

const secret = require("../secretKey")();
const request = require("request");

const URI = {};

const forecast = (latitude, longitude, callback) => {
  URI.darksky = `https://api.darksky.net/forecast/${
    secret.darksky
  }/${latitude}, ${longitude}?units=si`;

  request({ url: URI.darksky, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (res.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { currently, daily } = res.body;
      callback(
        undefined,
        `${daily.data[0].summary} Currently is ${
          currently.temperature
        } degrees out.\nThe high today is ${
          daily.data[0].temperatureHigh
        }, the low is ${daily.data[0].temperatureLow}.\nThere is a ${
          currently.precipProbability
        }% chance of rain`
      );
    }
  });
};

module.exports = forecast;

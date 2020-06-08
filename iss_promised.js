const request = require('request-promise-native');

const nextISSTimesForMyLocation = function() {
  return fetchMyIP().then((ipAddress) => {
    return fetchCoordsByIP(ipAddress);
  })
    .then((coordinates) => {
      return fetchISSFlyOverTimes(coordinates);
    })
    .then((flyTimes) => {
      return flyTimes;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 * Returns (via Promise):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json").then((p1) => {
    const ipObj = JSON.parse(p1);
    return ipObj.ip;
  });
};

//Make an api request to ipvigilante to get the coordinates of an ip address
const fetchCoordsByIP = function(ip) {
  return request("https://ipvigilante.com/json/" + ip).then((body) => {
    const locObj = JSON.parse(body);
    const locationData = {latitude: locObj.data.latitude, longitude: locObj.data.longitude};
    return locationData;
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 * Returns (via Promise):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords) {
  // ...
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`).then((passData) => {
    const passTimes = JSON.parse(passData);
    let soln = [];
    for (const item of passTimes.response) {
      soln.push(item);
    }
    return soln;
  });
};


module.exports = { nextISSTimesForMyLocation};
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const handleReqResponse = function(error, response, body, callback) {
  if (error) {
    callback(error, null);
    return null;
  }
  //if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return null;
  }
  return body;
};
const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json",  (error, response, body) => {
    body = handleReqResponse(error, response, body, callback);
    //case no error
    if (body) {
      const ipObj = JSON.parse(body);
      callback(null, ipObj.ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request("https://ipvigilante.com/json/" + ip, (error, response, body) => {
    body = handleReqResponse(error, response, body, callback);
    //caes no error
    if (body) {
      const locObj = JSON.parse(body);
      const locationData = {latitude: locObj.data.latitude, longitude: locObj.data.longitude};
      callback(null, locationData);
    }

  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,  (error, response, body) => {
    body = handleReqResponse(error, response, body, callback);
    //case no error
    if (body) {
      // console.log(body);
      const passTimes = JSON.parse(body);

      let soln = [];
      for (const item of passTimes.response) {
        soln.push(item);
      }

      callback(null, soln);
    }
  });

};

module.exports = { fetchMyIP, fetchCoordsByIP , fetchISSFlyOverTimes};
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

const printSoln = function(data) {
  for (const item of data) {
    const date = new Date(0);
    date.setUTCSeconds(item.risetime);
    console.log(`Next pass at ${date} for ${item.duration} seconds`);
  }
};

const main = function() {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    // console.log("it worked! Returned IP:", ip);
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      // console.log(`${JSON.stringify(data)}`);
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        //case successful
        printSoln(data);

      });
  
    });
  });
};
main();
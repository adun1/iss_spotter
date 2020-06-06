const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

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
        console.log(data);

      });
  
    });
  });
  
  
 
  
  
  


};
main();
const {nextISSTimesForMyLocation} = require('./iss_promised');

const printSoln = function(data) {
  for (const item of data) {
    const date = new Date(0);
    date.setUTCSeconds(item.risetime);
    console.log(`Next pass at ${date} for ${item.duration} seconds`);
  }
};

const main = function() {
  nextISSTimesForMyLocation()
    .then((passTimes) => {
      printSoln(passTimes);
    });
};
main();
const startGamesArchive = require("./gamesArchive");

const startCronJobs = () => {
  startGamesArchive();
}

module.exports = startCronJobs;
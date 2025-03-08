const cron = require('node-cron');
const { cronConfig } = require('../config/cronJobs');
const logger = require('../services/logger');
const gameService = require('../services/game');

const startGamesArchive = () => {
  cron.schedule(cronConfig.gamesArchive, async () => {
    try {
        logger.info(logger.logTypes.CRONJOB,{message:`Games archive cron job started at ${new Date().toLocaleString()}`});
        await gameService.archiveGames();
        logger.info(logger.logTypes.CRONJOB,{message:`Games archive cron job completed at ${new Date().toLocaleString()}`});
    } catch (error) {
        logger.error(logger.logTypes.CRONJOB,{message:`Games archive cron job failed at ${new Date().toLocaleString()}`,error});
    }
  });
}

module.exports = startGamesArchive;
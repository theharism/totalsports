const moment = require("moment");
const Game = require('../../models/game.model');
const logger = require("../logger");

module.exports = {
  archiveGames: async () => {
    try {
      const now = moment();

      const gamesToUpdate = await Game.find({
        status: { $ne: "Finished" },
        ending_date: { $lte: now.format("YYYY-MM-DD") },
        ending_time: { $lte: now.format("HH:mm") },
      });

      if (gamesToUpdate.length === 0) {
        return;
      }

      await Game.updateMany(
        { _id: { $in: gamesToUpdate.map((game) => game._id) } },
        { $set: { status: "Finished" } }
      );

      logger.info(logger.logTypes.CRONJOB,{message:`${gamesToUpdate.length} Games archived successfully at ${new Date().toLocaleString()}`});
    } catch (error) {
      throw new Error(error);
    }
  },
};

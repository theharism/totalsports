const Game = require('../models/game.model');
const logger = require('../services/logger'); // Assuming you have a logger service

// Get all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find().populate([
            { path: "team_one", select: "name" },
            { path: "team_two", select: "name" },
            { path: "category", select: "name" }
        ]).lean();                
        logger.info('Fetched all games successfully');
        res.status(200).json({ success: true, data: games });
    } catch (error) {
        logger.error('Error fetching games: ', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('team_one team_two category');
        if (!game) {
            logger.warn(`Game with ID ${req.params.id} not found`);
            return res.status(404).json({ success: false, message: 'Game not found' });
        }
        logger.info(`Fetched game with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: game });
    } catch (error) {
        logger.error(`Error fetching game with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new game
exports.createGame = async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        logger.info('Created new game successfully');
        res.status(201).json({ success: true, data: newGame });
    } catch (error) {
        logger.error('Error creating game: ', error);
        res.status(400).json({ success: false, message: 'Error creating game', error: error.message });
    }
};

// Update a game
exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGame) {
            logger.warn(`Game with ID ${req.params.id} not found for update`);
            return res.status(404).json({ success: false, message: 'Game not found' });
        }
        logger.info(`Updated game with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: updatedGame });
    } catch (error) {
        logger.error(`Error updating game with ID ${req.params.id}: `, error);
        res.status(400).json({ success: false, message: 'Error updating game', error: error.message });
    }
};

// Delete a game
exports.deleteGame = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            logger.warn(`Game with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ success: false, message: 'Game not found' });
        }
        logger.info(`Deleted game with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, message: 'Game deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting game with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
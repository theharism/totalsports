const Team = require('../models/team.model');
const logger = require('../services/logger');

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        logger.info('Fetched all teams successfully');
        res.status(200).json({ success: true, data: teams });
    } catch (error) {
        logger.error('Error fetching teams: ', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get team by ID
exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            logger.warn(`Team with ID ${req.params.id} not found`);
            return res.status(404).json({ success: false, message: 'Team not found' });
        }
        logger.info(`Fetched team with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        logger.error(`Error fetching team with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const newTeam = await Team.create({
            name,
            slug,
            logo: req.file ? req.file.destination + req.file.filename : null,
        });
        logger.info('Created new team successfully');
        res.status(201).json({ success: true, data: newTeam });
    } catch (error) {
        logger.error('Error creating team: ', error);
        res.status(400).json({ success: false, message: 'Error creating team', error: error.message });
    }
};

// Update a team
exports.updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTeam) {
            logger.warn(`Team with ID ${req.params.id} not found for update`);
            return res.status(404).json({ success: false, message: 'Team not found' });
        }
        logger.info(`Updated team with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: updatedTeam });
    } catch (error) {
        logger.error(`Error updating team with ID ${req.params.id}: `, error);
        res.status(400).json({ success: false, message: 'Error updating team', error: error.message });
    }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            logger.warn(`Team with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ success: false, message: 'Team not found' });
        }
        logger.info(`Deleted team with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, message: 'Team deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting team with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
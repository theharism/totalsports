const Stream = require('../models/stream.model');
const logger = require('../services/logger'); // Assuming you have a logger service

// Get all streams
exports.getAllStreams = async (req, res) => {
    try {
        const streams = await Stream.find();
        logger.info('Fetched all streams successfully');
        res.status(200).json({ success: true, data: streams });
    } catch (error) {
        logger.error('Error fetching streams: ', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get stream by ID
exports.getStreamById = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);
        if (!stream) {
            logger.warn(`Stream with ID ${req.params.id} not found`);
            return res.status(404).json({ success: false, message: 'Stream not found' });
        }
        logger.info(`Fetched stream with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: stream });
    } catch (error) {
        logger.error(`Error fetching stream with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new stream
exports.createStream = async (req, res) => {
    try {
        const newStream = await Stream.create(req.body);
        logger.info('Created new stream successfully');
        res.status(201).json({ success: true, data: newStream });
    } catch (error) {
        logger.error('Error creating stream: ', error);
        res.status(400).json({ success: false, message: 'Error creating stream', error: error.message });
    }
};

// Update a stream
exports.updateStream = async (req, res) => {
    try {
        const updatedStream = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedStream) {
            logger.warn(`Stream with ID ${req.params.id} not found for update`);
            return res.status(404).json({ success: false, message: 'Stream not found' });
        }
        logger.info(`Updated stream with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: updatedStream });
    } catch (error) {
        logger.error(`Error updating stream with ID ${req.params.id}: `, error);
        res.status(400).json({ success: false, message: 'Error updating stream', error: error.message });
    }
};

// Delete a stream
exports.deleteStream = async (req, res) => {
    try {
        const deletedStream = await Stream.findByIdAndDelete(req.params.id);
        if (!deletedStream) {
            logger.warn(`Stream with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ success: false, message: 'Stream not found' });
        }
        logger.info(`Deleted stream with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, message: 'Stream deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting stream with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
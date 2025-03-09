const express = require('express');
const router = express.Router();
const streamController = require('../controllers/stream.controller');

router.get('/', streamController.getAllStreams);
router.get('/:id', streamController.getStreamById);
router.get('/game/:gameId', streamController.getStreamsByGameId);
router.post('/', streamController.createStream);
router.put('/:id', streamController.updateStream);
router.delete('/:id', streamController.deleteStream);

module.exports = router;

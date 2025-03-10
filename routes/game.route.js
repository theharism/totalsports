const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');

router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.get('/category/:categoryId', gameController.getGamesByCategoryId);
router.get('/team/:teamId', gameController.getGamesByTeamId);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;

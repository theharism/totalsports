const express = require('express');
const router = express.Router();

router.use('/teams', require('./team.route'));
router.use('/games', require('./game.route'));
router.use('/streams', require('./stream.route'));
router.use('/categories', require('./category.route'));

module.exports = router;

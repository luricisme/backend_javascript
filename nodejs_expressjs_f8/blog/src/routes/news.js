var express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewsController');

router.use('/:slug', newController.show);
router.use('/', newController.index); // Phải nằm ở dưới cùng

module.exports = router;

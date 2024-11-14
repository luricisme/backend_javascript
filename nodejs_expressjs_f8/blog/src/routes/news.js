var express = require('express');
const router = express.Router();
const newController = require('../app/controllers/NewsController');

router.get('/:slug', newController.show);
router.get('/', newController.index); // Phải nằm ở dưới cùng

module.exports = router;

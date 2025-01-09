const express = require('express');
const siteController = require('../controller/site.controller');
const chatController = require('../controller/chat.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


router.get('/', authMiddleware.ensureAuthenticated, siteController.getHomePage);

router.get('/categories/view', authMiddleware.ensureAuthenticated, siteController.getFullProductPage);

router.get('/products/view', authMiddleware.ensureAuthenticated, siteController.getDetailProductPage);
router.get('/products/add', authMiddleware.ensureAuthenticated, siteController.getAddProductPage);
router.post('/products/add', siteController.handleAddProduct);
router.get('/products/edit', authMiddleware.ensureAuthenticated, siteController.getEditProductPage);
router.post('/products/edit', siteController.handleEditProduct);
router.delete('/products/delete', siteController.handleDeleteProduct);

router.get('/chat', chatController.getChatPage);

module.exports = router;
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/users.controller');

router.get('/get-user', verifyToken, userController.getUser);
router.get('/get-user-email/:email', userController.getUserEmail);
router.get('/get-user-id/:id', userController.getUserId);
router.get('/verifytoken', verifyToken, userController.verifyToken);
router.get('/refreshtoken', verifyToken, userController.refreshToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update-user', verifyToken, userController.updateUser);

module.exports = router;
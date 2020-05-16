
const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/users', userController.createUser);
router.get('/users', userController.listUsers);
router.get('/users/:id', userController.findUserById, userController.getUserById);
router.put('/users/:id', userController.findUserById, userController.updateUserbyId);
router.delete('/users/:id', userController.findUserById, userController.deleteUserbyId);

module.exports = router;
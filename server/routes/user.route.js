
const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');

router.post('/users', userValidator.validationBodyRules, userValidator.checkRules, userController.createUser);
router.get('/users', userController.listUsers);
router.get('/users/:id', userValidator.validationParamRules, userValidator.checkRules, userController.findUserById, userController.getUserById);
router.put('/users/:id', userValidator.validationParamRules, userValidator.validationPutRules, userValidator.checkRules, userController.findUserById, userController.updateUserbyId);
router.delete('/users/:id', userValidator.validationParamRules, userValidator.checkRules, userController.findUserById, userController.deleteUserbyId);

module.exports = router;
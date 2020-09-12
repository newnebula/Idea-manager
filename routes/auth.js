const path = require('path');
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();



router.get('/signInGet', authController.getSignInForm);
router.get('/LogInGet', authController.getLogInForm);

router.post('/sign-in', authController.signIn);
router.post('/log-in', authController.logIn);

router.post('/logOutPost', authController.logOut);





module.exports = router;

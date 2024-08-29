const express = require('express');
const {newUser,loginUser, mailVerification} = require('../controllers/authController')
const router = express.Router();

router.route('/register').post(newUser);
router.route('/login').post(loginUser);
router.route('/verify-email').get(mailVerification)

module.exports = router;
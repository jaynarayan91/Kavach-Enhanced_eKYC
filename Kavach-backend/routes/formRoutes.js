const express = require('express');
const userAuth = require('../Middleware/authMiddleware');
const {formFill,receiveAadhaar,receivePAN,AadhaarPANfill} = require('../controllers/formController');
const router = express.Router();

router.route('/kycform').post(userAuth,formFill);
router.route('/receiveAadhaar').post(userAuth,receiveAadhaar);
router.route('/receivePAN').post(userAuth,receivePAN);
router.route('/maker').post(AadhaarPANfill);

module.exports = router;
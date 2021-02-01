const express = require('express');
const { register, login, me,
    //  resetPassword,
      updateDetails, updatePassword, logout, forgotPassword } = require('../controller/auth.js');
const { authCheck  } = require( '../middleware/auth.js');

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.get('/me', authCheck, me);
router.get('/updateDetails', authCheck, updateDetails);
router.get('/updatePassword', authCheck, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;

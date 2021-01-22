const express = require('express');
const {  } = require('../controller/email');
const { authCheck  } = require( '../middleware/auth.js');

const router = express.Router();



router.post('/register', register);
router.post('/login', login);

module.exports = router;

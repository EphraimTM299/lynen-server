import express from 'express';
import { register, login, me,
    //  resetPassword,
      updateDetails, updatePassword, logout } from '../controller/auth.js';
import { authCheck  } from '../middleware/auth.js';

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', authCheck, me);
router.get('/updateDetails', authCheck, updateDetails);
router.get('/updatePassword', authCheck, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

export default router;

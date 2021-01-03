const express = require('express')
const {basket, createProfile, createOrder, me} = require('../controller/user.js')
const {authCheck, adminCheck} = require('../middleware/auth.js')


const router = express.Router()

router.use(authCheck)

router.post('/basket', basket)
router.post('/profile', createProfile)
router.post('/order', createOrder)
router.get('/me',me)
// router.get('/coupons', list)
// router.delete('/coupon/:couponId', remove)

// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


module.exports = router; 





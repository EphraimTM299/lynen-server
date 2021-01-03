const express = require('express')
const {create, remove, list} = require('../controllers/coupon.js')
// const {authCheck, adminCheck} = require( '../middleware/auth.js'


const router = express.Router()



router.post('/coupon', create)
router.get('/coupons', list)
router.delete('/coupon/:couponId', remove)

// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


module.exports = router; 





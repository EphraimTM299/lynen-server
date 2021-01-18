const express = require('express')
const {basket, createProfile, createOrder, me, getOrder, getCompleteOrders, getOrderHistory, addToCart, getUserCart, emptyCart, applyCouponToCart} = require('../controller/user.js')
const {authCheck, adminCheck} = require('../middleware/auth.js')


const router = express.Router()

router.use(authCheck)

router.post('/basket', basket)
router.post('/profile', createProfile)
router.route('/order')
    .post(createOrder)
    .get(getOrder)
router.route('/cart')
    .post(addToCart)
    .get(getUserCart)
    .put(emptyCart)
router.post('/cart/coupon', applyCouponToCart)
router.get('/orders/completed', getCompleteOrders)
router.get('/orders/history', getOrderHistory)
router.get('/me',me)
// router.get('/coupons', list)
// router.delete('/coupon/:couponId', remove)

// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


module.exports = router; 





const express = require('express')
const {orderStatus, listOrders, customerProfile, listFilteredOrders} = require('../../controller/manager/order')




const {authCheck, adminCheck} = require('../../middleware/auth.js')



const router = express.Router()

// Manager Order 
router.post('/orders', listOrders)
router.post('/orders/filtered', listFilteredOrders)
router.put('/order/status', orderStatus)
router.get('/order/:customerId', customerProfile)
    
   

module.exports = router; 


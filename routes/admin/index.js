const express = require('express')
const {create, read, update, remove, list, getUsersCount} = require('../../controller/admin/users.js')
const {createCategory, readCategory, updateCategory, removeCategory, listCategories, readProductCategory} = require('../../controller/admin/categories.js')
const {createProduct, readProduct, updateProduct, removeProduct, listProducts} = require('../../controller/admin/products.js')
const {createCoupon, readCoupon, updateCoupon, removeCoupon, listCoupons} = require('../../controller/admin/coupons.js')
const {getOrdersCount, getPendingOrdersCount, getUserCount, getTotalSalesAmount} = require('../../controller/admin/dashboard.js')
const {listOrders, customerProfile} = require('../../controller/admin/orders.js')


const {authCheck, adminCheck} = require('../../middleware/auth.js')

const router = express.Router()

// router.use(authCheck)
// router.use(adminCheck)


// Admin User CRUD  
router.get('/users/count', getUsersCount)
router.post('/user', create)
router.post('/users', list)
router.route('/user/:id')
    .post(read)
    .put(update)
    .delete(remove)

    // Admin DashBoard CRUD  
router.get('/userscount', getUserCount)
router.get('/orderscount', getOrdersCount)
router.get('/pendingorderscount', getPendingOrdersCount)
router.get('/totalsales', getTotalSalesAmount)

    
// Admin Catgeory CRUD  
router.post('/category',createCategory)
router.get('/categories', listCategories)
router.route('/category/:id')
    .get(readCategory)
    .put(updateCategory)
    .delete(removeCategory)
router.route('/category/product/:name')
    .get(readProductCategory)
   
    
// Admin Product CRUD  
router.post('/product',createProduct)
router.get('/products', listProducts)
router.route('/product/:id')
    .get(readProduct)
    .put(updateProduct)
    .delete(removeProduct)
    

        
// Admin Coupon CRUD  
router.post('/coupon',createCoupon)
router.get('/coupons', listCoupons)
router.route('/coupon/:id')
    .get(readCoupon)
    .put(updateCoupon)
    .delete(removeCoupon)
    
// Admin/Manager Order 
router.post('/orders', listOrders)
router.get('/order/:customerId', customerProfile)
    
   

   





module.exports = router; 


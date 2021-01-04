const express = require('express')
const {create, read, update, remove, list, getUsersCount} = require('../../controller/admin/users.js')
const {createCategory, readCategory, updateCategory, removeCategory, listCategories} = require('../../controller/admin/categories.js')
const {createProduct, readProduct, updateProduct, removeProduct, listProducts} = require('../../controller/admin/products.js')
const {listOrders} = require('../../controller/admin/orders.js')


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
    
// Admin Catgeory CRUD  
router.post('/category',createCategory)
router.get('/categories', listCategories)
router.route('/category/:slug')
    .get(readCategory)
    .put(updateCategory)
    .delete(removeCategory)
    
// Admin Product CRUD  
router.post('/product',createProduct)
router.get('/products', listProducts)
router.route('/product/:id')
    .get(readProduct)
    .put(updateProduct)
    .delete(removeProduct)
    
// Admin/Manager Order 
router.get('/orders', listOrders)
    
   

   





module.exports = router; 


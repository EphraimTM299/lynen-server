import express from 'express'
import {create, read, update, remove, list} from '../../controller/admin/users.js'
import {createCategory, readCategory, updateCategory, removeCategory, listCategories} from '../../controller/admin/categories.js'
import {createProduct, readProduct, updateProduct, removeProduct, listProducts} from '../../controller/admin/products.js'


import {authCheck, adminCheck} from '../../middleware/auth.js'


const router = express.Router()


// router.use(authCheck)
// router.use(adminCheck)


// Admin User CRUD  
router.post('/user', create)
router.get('/users', list)
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
    

    
   

   





export default router; 


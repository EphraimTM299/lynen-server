import express from 'express'
import {create, read, update, remove, list} from '../../controller/admin/products.js'


import {authCheck, adminCheck} from '../../middleware/auth.js'


const router = express.Router()


// router.use(authCheck)
// router.use(adminCheck)


// Admin Products CRUD  
router.post('/product', create)
router.get('/products', list)
router.route('/product/:id')
    .post(read)
    .put(update)
    .delete(remove)
    

    
   

   





export default router; 


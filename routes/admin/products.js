const express = require('express')
const {create, read, update, remove, list} = require('../../controller/admin/products.js')


const {authCheck, adminCheck} = require('../../middleware/auth.js')


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
    

    
   

   





module.exports = router; 


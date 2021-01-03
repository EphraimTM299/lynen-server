const express = require('express')
const {listCategories} = require( '../controller/admin/categories.js')
// const {authCheck, adminCheck} = require( '../middleware/auth.js'


const router = express.Router()



router.get('/', listCategories)


// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


module.exports = router; 

import express from 'express'
import {listCategories} from '../controller/admin/categories.js'
// import {authCheck, adminCheck} from '../middleware/auth.js'


const router = express.Router()



router.get('/', listCategories)


// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


export default router; 

import express from 'express'
import {basket} from '../controller/user.js'
import {authCheck, adminCheck} from '../middleware/auth.js'


const router = express.Router()



router.post('/basket', authCheck, basket)
// router.get('/coupons', list)
// router.delete('/coupon/:couponId', remove)

// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


export default router; 





import express from 'express'
import {create, remove, list} from '../controllers/coupon.js'
// import {authCheck, adminCheck} from '../middleware/auth.js'


const router = express.Router()



router.post('/coupon', create)
router.get('/coupons', list)
router.delete('/coupon/:couponId', remove)

// router.use(authCheck)
// router.use(adminCheck)

// router.route('/coupon')
//     .post(create)
//     .delete(remove)
    
   


export default router; 





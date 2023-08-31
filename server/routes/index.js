const Router = require('express')
const router = new Router()
const guitarRouter = require('./guitarRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/guitar', guitarRouter)

module.exports = router
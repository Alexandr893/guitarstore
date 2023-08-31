const Router = require('express')
const router = new Router()
const guitarController = require('../controllers/guitarController')

router.post('/', guitarController.create)
router.get('/', guitarController.getAll)
router.get('/:id', guitarController.getOne)

module.exports = router
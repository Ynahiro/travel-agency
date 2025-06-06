import express from 'express'
import * as passportController from '../controllers/passportController.js'

const router = express.Router()

router.get('/', passportController.selectALLPassport)
router.get('/:id', passportController.selectPassportById)
router.get('/:column', passportController.selectPassportByColumn)
router.post('/', passportController.insertPassport)
router.put('/:id', passportController.updatePassport)
router.delete('/:id', passportController.deletePassport)

export default router
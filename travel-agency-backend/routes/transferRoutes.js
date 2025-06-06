import express from 'express'
import * as transferController from '../controllers/transferController.js'

const router = express.Router()

router.get('/', transferController.selectALLTransfer)
router.get('/:id', transferController.selectTransferById)
router.get('/:column', transferController.selectTransferByColumn)
router.post('/', transferController.insertTransfer)
router.put('/:id', transferController.updateTransfer)
router.delete('/:id', transferController.deleteTransfer)

export default router
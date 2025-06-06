import express from 'express'
import * as durationController from '../controllers/durationController.js'

const router = express.Router()

router.get('/', durationController.selectALLDuration)
router.get('/:id', durationController.selectDurationById)
router.get('/:column', durationController.selectDurationByColumn)
router.post('/', durationController.insertDuration)
router.put('/:id', durationController.updateDuration)
router.delete('/:id', durationController.deleteDuration)

export default router
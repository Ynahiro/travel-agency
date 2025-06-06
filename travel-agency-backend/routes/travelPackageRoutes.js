import express from 'express'
import * as travelPackageController from '../controllers/travelPackageController.js'

const router = express.Router()

router.get('/', travelPackageController.selectALLTravelPackage)
router.get('/:id', travelPackageController.selectTravelPackageById)
router.get('/:column', travelPackageController.selectTravelPackageByColumn)
router.post('/', travelPackageController.insertTravelPackage)
router.put('/:id', travelPackageController.updateTravelPackage)
router.delete('/:id', travelPackageController.deleteTravelPackage)

export default router
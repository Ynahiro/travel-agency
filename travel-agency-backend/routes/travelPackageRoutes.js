import express from 'express'
import * as travelPackageController from '../controllers/travelPackageController.js'

const router = express.Router()

router.get('/', travelPackageController.selectALLTravelPackage)
router.get('/expensive', travelPackageController.selectMostExpensiveTravelPackage)
router.get('/top', travelPackageController.selectTheMostPopularTravelPackage)
router.get('/details', travelPackageController.selectDetailedTravelPackage)
router.post('/', travelPackageController.insertTravelPackage)
router.put('/:id', travelPackageController.updateTravelPackage)
router.delete('/:id', travelPackageController.deleteTravelPackage)

export default router
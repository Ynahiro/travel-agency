import express from 'express'
import * as countryController from '../controllers/countryController.js'

const router = express.Router()

router.get('/', countryController.selectALLCountry)
router.get('/:id', countryController.selectCountryById)
router.get('/:column', countryController.selectCountryByColumn)
router.post('/', countryController.insertCountry)
router.put('/:id', countryController.updateCountry)
router.delete('/:id', countryController.deleteCountry)

export default router
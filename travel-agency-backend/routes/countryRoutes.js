import express from 'express'
import * as countryController from '../controllers/countryController.js'

const router = express.Router()

router.get('/', countryController.selectALLCountry)
router.get('/:title', countryController.selectCountryById)
router.get('/:column', countryController.selectCountryByColumn)
router.post('/', countryController.insertCountry)
router.put('/:title', countryController.updateCountry)
router.delete('/:title', countryController.deleteCountry)

export default router
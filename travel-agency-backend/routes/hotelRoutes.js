import express from 'express'
import * as hotelController from '../controllers/hotelController.js'

const router = express.Router()

router.get('/', hotelController.selectALLHotel)
router.get('/:id', hotelController.selectHotelById)
router.get('/:column', hotelController.selectHotelByColumn)
router.post('/', hotelController.insertHotel)
router.put('/:id', hotelController.updateHotel)
router.delete('/:id', hotelController.deleteHotel)

export default router
import express from 'express'
import * as saleController from '../controllers/saleController.js'

const router = express.Router()

router.get('/', saleController.selectALLSale)
router.get('/:id', saleController.selectSaleById)
router.get('/:column', saleController.selectSaleByColumn)
router.post('/', saleController.insertSale)
router.put('/:id', saleController.updateSale)
router.delete('/:id', saleController.deleteSale)

export default router
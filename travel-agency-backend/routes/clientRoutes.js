import express from 'express'
import * as clientController from '../controllers/clientController.js'

const router = express.Router()

router.get('/', clientController.selectALLClients)
router.get('/:id', clientController.selectClientById)
router.get('/:column', clientController.selectClientByColumn)
router.post('/', clientController.insertClient)
router.put('/:id', clientController.updateClient)
router.delete('/:id', clientController.deleteClient)

export default router
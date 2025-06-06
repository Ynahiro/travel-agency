import express from 'express'
import * as employeeController from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', employeeController.selectALLEmployee)
router.get('/:id', employeeController.selectEmployeeById)
router.get('/:column', employeeController.selectEmployeeByColumn)
router.post('/', employeeController.insertEmployee)
router.put('/:id', employeeController.updateEmployee)
router.delete('/:id', employeeController.deleteEmployee)

export default router
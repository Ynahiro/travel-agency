import * as employeeModel from '../models/employeeModel.js'

export const selectALLEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.selectALLEmployee()
    res.json(employee)
  } catch (error) {
    console.error('Ошибка при получении сотрудника:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectEmployeeById = async (req, res) => {
  const id = req.params.id
  try {
    const employee = await employeeModel.selectEmployeeById(id)
    res.json(employee)
  } catch (error) {
    console.error('Ошибка при получении сотрудника:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectEmployeeByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const employee = await employeeModel.selectEmployeeByColumn(columnData)
    res.json(employee)
  } catch (error) {
    console.error('Ошибка при получении сотрудника:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertEmployee = async (req, res) => {
  const employeeData = req.body
  try {
    const employee = await employeeModel.insertEmployee(employeeData)
    res.json(employee)
  } catch (error) {
    console.error('Ошибка при добавлении сотрудника:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateEmployee = async (req, res) => {
  const employeeData = req.body
  try {
    const employee = await employeeModel.updateEmployee(employeeData)
    res.json(employee)
  } catch (error) {
    console.error('Ошибка при обновлении сотрудника:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteEmployee = async (req, res) => {
  const id = req.params.id
  try {
    const employee = await employeeModel.deleteEmployee(id)
    res.json(employee)
  } catch (error) {
    console.error('Ошибка при удалении сотрудника:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

import * as passportModel from '../models/passportModel.js'

export const selectALLPassport = async (req, res) => {
  try {
    const passport = await passportModel.selectALLPassport()
    res.json(passport)
  } catch (error) {
    console.error('Ошибка при получении паспорта:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectPassportById = async (req, res) => {
  const id = req.params.id
  try {
    const passport = await passportModel.selectPassportById(id)
    res.json(passport)
  } catch (error) {
    console.error('Ошибка при получении паспорта:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectPassportByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const passport = await passportModel.selectPassportByColumn(columnData)
    res.json(passport)
  } catch (error) {
    console.error('Ошибка при получении паспорта:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertPassport = async (req, res) => {
  const passportData = req.body
  try {
    const passport = await passportModel.insertPassport(passportData)
    res.json(passport)
  } catch (error) {
    console.error('Ошибка при добавлении паспорта:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updatePassport = async (req, res) => {
  const passportData = req.body
  try {
    const passport = await passportModel.updatePassport(passportData)
    res.json(passport)
  } catch (error) {
    console.error('Ошибка при обновлении паспорта:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deletePassport = async (req, res) => {
  const id = req.params.id
  try {
    const passport = await passportModel.deletePassport(id)
    res.json(passport)
  } catch (error) {
    console.error('Ошибка при удалении паспорта:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

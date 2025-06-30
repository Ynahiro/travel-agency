import * as durationModel from '../models/durationModel.js'

export const selectALLDuration = async (req, res) => {
  try {
    const duration = await durationModel.selectALLDuration()
    res.json(duration)
  } catch (error) {
    console.error('Ошибка при получении длительности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectDurationById = async (req, res) => {
  const id = req.params.id
  try {
    const duration = await durationModel.selectDurationById(id)
    res.json(duration)
  } catch (error) {
    console.error('Ошибка при получении длительности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectDurationByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const duration = await durationModel.selectDurationByColumn(columnData)
    res.json(duration)
  } catch (error) {
    console.error('Ошибка при получении длительности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertDuration = async (req, res) => {
  const durationData = req.body
  try {
    const duration = await durationModel.insertDuration(durationData)
    res.json(duration)
  } catch (error) {
    console.error('Ошибка при добавлении длительности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateDuration = async (req, res) => {
  const durationData = req.body
  try {
    const duration = await durationModel.updateDuration(durationData)
    res.json(duration)
  } catch (error) {
    console.error('Ошибка при обновлении длительности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteDuration = async (req, res) => {
  const id = req.params.id
  try {
    const duration = await durationModel.deleteDuration(id)
    res.json(duration)
  } catch (error) {
    console.error('Ошибка при удалении длительности:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

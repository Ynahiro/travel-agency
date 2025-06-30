import * as transferModel from '../models/transferModel.js'

export const selectALLTransfer = async (req, res) => {
  try {
    const transfer = await transferModel.selectALLTransfer()
    res.json(transfer)
  } catch (error) {
    console.error('Ошибка при получении трансфера:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectTransferById = async (req, res) => {
  const id = req.params.id
  try {
    const transfer = await transferModel.selectTransferById(id)
    res.json(transfer)
  } catch (error) {
    console.error('Ошибка при получении трансфера:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectTransferByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const transfer = await transferModel.selectTransferByColumn(columnData)
    res.json(transfer)
  } catch (error) {
    console.error('Ошибка при получении трансфера:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertTransfer = async (req, res) => {
  const transferData = req.body
  try {
    const transfer = await transferModel.insertTransfer(transferData)
    res.json(transfer)
  } catch (error) {
    console.error('Ошибка при добавлении трансфера:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateTransfer = async (req, res) => {
  const transferData = req.body
  try {
    const transfer = await transferModel.updateTransfer(transferData)
    res.json(transfer)
  } catch (error) {
    console.error('Ошибка при обновлении трансфера:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteTransfer = async (req, res) => {
  const id = req.params.id
  try {
    const transfer = await transferModel.deleteTransfer(id)
    res.json(transfer)
  } catch (error) {
    console.error('Ошибка при удалении трансфера:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

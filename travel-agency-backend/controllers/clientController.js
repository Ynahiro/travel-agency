import * as clientModel from '../models/clientModel.js'

export const selectALLClinets = async (req, res) => {
  try {
    const clients = await clientModel.selectALLClinets()
    res.json(clients)
  } catch (error) {
    console.error('Ошибка при получении клиентов:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectClientById = async (req, res) => {
  const id = req.params.id
  try {
    const clients = await clientModel.selectClientById(id)
    res.json(clients)
  } catch(error) {
    console.error('Ошибка при получении клиента:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectClientByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const clients = await clientModel.selectClientByColumn(columnData)
    res.json(clients)
  } catch(error) {
    console.error('Ошибка при получении клиента:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertClient = async (req, res) => {
  const clientData = req.body
  try {
    const clients = await clientModel.insertClient(clientData)
    res.json(clients)
  } catch(error) {
    console.error('Ошибка при добавлении клиента:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateClient = async (req, res) => {
  const id = req.params.id
  const clientData = req.body
  try {
    const clients = await clientModel.updateClient(id, clientData)
    res.json(clients)
  } catch(error) {
    console.error('Ошибка при обновлении клиента:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteClient = async (req, res) => {
  const id = req.params.id
  try {
    const clients = await clientModel.deleteClient(id)
    res.json(clients)
  } catch(error) {
    console.error('Ошибка при удалении клиента:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
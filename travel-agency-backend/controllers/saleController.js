import * as saleModel from '../models/saleModel.js'

export const selectALLSale = async (req, res) => {
  try {
    const sale = await saleModel.selectALLSale()
    res.json(sale)
  } catch (error) {
    console.error('Ошибка при получении скидки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectSaleById = async (req, res) => {
  const id = req.params.id
  try {
    const sale = await saleModel.selectSaleById(id)
    res.json(sale)
  } catch (error) {
    console.error('Ошибка при получении скидки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectSaleByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const sale = await saleModel.selectSaleByColumn(columnData)
    res.json(sale)
  } catch (error) {
    console.error('Ошибка при получении скидки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertSale = async (req, res) => {
  const saleData = req.body
  try {
    const sale = await saleModel.insertSale(saleData)
    res.json(sale)
  } catch (error) {
    console.error('Ошибка при добавлении скидки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateSale = async (req, res) => {
  const saleData = req.body
  try {
    const sale = await saleModel.updateSale(saleData)
    res.json(sale)
  } catch (error) {
    console.error('Ошибка при обновлении скидки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteSale = async (req, res) => {
  const id = req.params.id
  try {
    const sale = await saleModel.deleteSale(id)
    res.json(sale)
  } catch (error) {
    console.error('Ошибка при удалении скидки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

import * as travelPackageModel from '../models/travelPackageModel.js'

export const selectALLTravelPackage = async (req, res) => {
  try {
    const travelPackage = await travelPackageModel.selectALLTravelPackage()
    res.json(travelPackage)
  } catch (error) {
    console.error('Ошибка при получении путевки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectTravelPackageById = async (req, res) => {
  const id = req.params.id
  try {
    const travelPackage = await travelPackageModel.selectTravelPackageById(id)
    res.json(travelPackage)
  } catch (error) {
    console.error('Ошибка при получении путевки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectTravelPackageByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const travelPackage = await travelPackageModel.selectTravelPackageByColumn(columnData)
    res.json(travelPackage)
  } catch (error) {
    console.error('Ошибка при получении путевки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertTravelPackage = async (req, res) => {
  const travelPackageData = req.body
  try {
    const travelPackage = await travelPackageModel.insertTravelPackage(travelPackageData)
    res.json(travelPackage)
  } catch (error) {
    console.error('Ошибка при добавлении путевки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateTravelPackage = async (req, res) => {
  const travelPackageData = req.body
  try {
    const travelPackage = await travelPackageModel.updateTravelPackage(travelPackageData)
    res.json(travelPackage)
  } catch (error) {
    console.error('Ошибка при обновлении путевки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteTravelPackage = async (req, res) => {
  const id = req.params.id
  try {
    const travelPackage = await travelPackageModel.deleteTravelPackage(id)
    res.json(travelPackage)
  } catch (error) {
    console.error('Ошибка при удалении путевки:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectMostExpensiveTravelPackage = async (req, res) => {
  try {
    const travelPackage = await travelPackageModel.selectMostExpensiveTravelPackage()
    res.json(travelPackage)
  } catch (error) {
    console.log('Ошибка при поиске самой дорогой путевки', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectTheMostPopularTravelPackage = async (req, res) => {
  try {
    const travelPackage = await travelPackageModel.selectTheMostPopularTravelPackage()
    res.json(travelPackage)
  } catch (error) {
    console.log('Ошибка при получении топа путевок:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectDetailedTravelPackage = async (req, res) => {
  try {
    const travelPackage = await travelPackageModel.selectDetailedTravelPackage()
    res.json(travelPackage)
  } catch (error) {
    console.log('Ошибка при получении полных путевок:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
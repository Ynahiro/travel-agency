import * as countryModel from '../models/countryModel.js'

export const selectALLCountry = async (req, res) => {
  try {
    const country = await countryModel.selectALLCountry()
    res.json(country)
  } catch (error) {
    console.error('Ошибка при получении страны:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectCountryById = async (req, res) => {
  const id = req.params.id
  try {
    const country = await countryModel.selectCountryById(id)
    res.json(country)
  } catch (error) {
    console.error('Ошибка при получении страны:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectCountryByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const country = await countryModel.selectCountryByColumn(columnData)
    res.json(country)
  } catch (error) {
    console.error('Ошибка при получении страны:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertCountry = async (req, res) => {
  const countryData = req.body
  try {
    const country = await countryModel.insertCountry(countryData)
    res.json(country)
  } catch (error) {
    console.error('Ошибка при добавлении страны:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateCountry = async (req, res) => {
  const countryData = req.body
  try {
    const country = await countryModel.updateCountry(countryData)
    res.json(country)
  } catch (error) {
    console.error('Ошибка при обновлении страны:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteCountry = async (req, res) => {
  const id = req.params.id
  try {
    const country = await countryModel.deleteCountry(id)
    res.json(country)
  } catch (error) {
    console.error('Ошибка при удалении страны:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

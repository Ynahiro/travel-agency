import * as hotelModel from '../models/hotelModel.js'

export const selectALLHotel = async (req, res) => {
  try {
    const hotel = await hotelModel.selectALLHotel()
    res.json(hotel)
  } catch (error) {
    console.error('Ошибка при получении отеля:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectHotelById = async (req, res) => {
  const id = req.params.id
  try {
    const hotel = await hotelModel.selectHotelById(id)
    res.json(hotel)
  } catch (error) {
    console.error('Ошибка при получении отеля:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const selectHotelByColumn = async (req, res) => {
  const columnData = req.body
  try {
    const hotel = await hotelModel.selectHotelByColumn(columnData)
    res.json(hotel)
  } catch (error) {
    console.error('Ошибка при получении отеля:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const insertHotel = async (req, res) => {
  const hotelData = req.body
  try {
    const hotel = await hotelModel.insertHotel(hotelData)
    res.json(hotel)
  } catch (error) {
    console.error('Ошибка при добавлении отеля:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const updateHotel = async (req, res) => {
  const hotelData = req.body
  try {
    const hotel = await hotelModel.updateHotel(hotelData)
    res.json(hotel)
  } catch (error) {
    console.error('Ошибка при обновлении отеля:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const deleteHotel = async (req, res) => {
  const id = req.params.id
  try {
    const hotel = await hotelModel.deleteHotel(id)
    res.json(hotel)
  } catch (error) {
    console.error('Ошибка при удалении отеля:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

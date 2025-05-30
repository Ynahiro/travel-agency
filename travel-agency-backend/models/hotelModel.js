import { poolConnect, sql } from '../config/db.js'

export async function selectALLHotel() {
  const pool = await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Отель`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение отеля:', err)
  }
}

export async function selectHotelById(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Отель WHERE Id = ${id}`)
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении отеля:', err)
  }
}

export async function selectHotelByColumn(columnName, value) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Отель WHERE ${columnName} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении отеля:', err)
  }
}

export async function insertHotel(hotel) {
  const pool = await poolConnect()
  const { title, category, city } = hotel
  try {
    const result = await sql.query(`
            INSERT INTO Отель (Название, Категория, Город)
            VALUES (${title}, ${category}, ${city})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании отеля:', err)
  }
}

export async function updateHotel(id, hotel) {
  const pool = await poolConnect()
  const { title, category, city } = hotel
  try {
    const result = await sql.query(`
            UPDATE Отель
            SET Название = ${title},
                Категория = ${category},
                Город = ${city}                
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении отеля:', err)
  }
}

export async function deleteHotel(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Отель WHERE Id = ${id}`)
    return `Отель ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении отеля:', err)
  }
}

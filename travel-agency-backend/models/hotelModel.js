import { poolConnect, sql } from '../config/db.js'

export async function selectALLHotel() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Отель`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение отеля:', err)
  }
}

export async function selectHotelById(id) {
  await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Отель WHERE Id = ${id}`)
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении отеля:', err)
  }
}

export async function selectHotelByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Отель WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении отеля:', err)
  }
}

export async function insertHotel(hotel) {
  await poolConnect()
  const { title, category, city } = hotel
  try {
    const result = await sql.query(`
            INSERT INTO Отель (Название, Категория, Город)
            VALUES ('${title}', '${category}', '${city}')
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании отеля:', err)
  }
}

export async function updateHotel(hotel) {
  await poolConnect()
  const { id, title, category, city } = hotel
  try {
    await sql.query(`
      UPDATE Отель
      SET Название = '${title}',
          Категория = '${category}',
          Город = '${city}'
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении отеля:', err)
  }
}

export async function deleteHotel(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Отель WHERE Id = ${id}`)
    return `Отель ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении отеля:', err)
  }
}

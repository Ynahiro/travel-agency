import { poolConnect, sql } from '../config/db.js'

export async function selectALLDuration() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Длительность`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение длительности:', err)
  }
}

export async function selectDurationById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Длительность WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении длительности:', err)
  }
}

export async function selectDurationByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Длительность WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении длительности:', err)
  }
}

export async function insertDuration(duration) {
  await poolConnect()
  const { _duration, travelPackagePrice, hotelPrice } = duration
  try {
    const result = await sql.query(`
            INSERT INTO Длительность (Продолжительность, Стоимость_путевки, Стоимость_отеля)
            VALUES (${_duration}, ${travelPackagePrice}, ${hotelPrice})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании длительности:', err)
  }
}

export async function updateDuration(id, duration) {
  await poolConnect()
  const { _duration, travelPackagePrice, hotelPrice } = duration
  try {
    const result = await sql.query(`
            UPDATE Длительность
            SET Продолжительность = ${_duration},
                Стоимость_путевки = ${travelPackagePrice},
                Стоимость_отеля = ${hotelPrice}                
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении длительности:', err)
  }
}

export async function deleteDuration(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Длительность WHERE Id = ${id}`)
    return `Длительность ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении длительности:', err)
  }
}

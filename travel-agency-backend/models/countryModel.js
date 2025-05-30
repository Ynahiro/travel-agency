import { poolConnect, sql } from '../config/db.js'

export async function selectALLСountry() {
  const pool = await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Страна`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение страны:', err)
  }
}

export async function selectСountryById(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Страна WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении страны:', err)
  }
}

export async function selectСountryByColumn(columnName, value) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Страна WHERE ${columnName} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении страны:', err)
  }
}

export async function insertСountry(country) {
  const pool = await poolConnect()
  const { _country } = country
  try {
    const result = await sql.query(`
            INSERT INTO Страна (Название)
            VALUES (${_country})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании страны:', err)
  }
}

export async function updateСountry(id, country) {
  const pool = await poolConnect()
  const { _country } = country
  try {
    const result = await sql.query(`
            UPDATE Страна
            SET Название = ${_country}              
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении страны:', err)
  }
}

export async function deleteСountry(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Страна WHERE Id = ${id}`)
    return `Страна ${id} успешно удалена из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении страны:', err)
  }
}

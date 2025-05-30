import { poolConnect, sql } from '../config/db.js'

export async function selectALLCountry() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Страна`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение страны:', err)
  }
}

export async function selectCountryById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Страна WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении страны:', err)
  }
}

export async function selectCountryByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Страна WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении страны:', err)
  }
}

export async function insertCountry(country) {
  await poolConnect()
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

export async function updateCountry(id, country) {
  await poolConnect()
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

export async function deleteCountry(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Страна WHERE Id = ${id}`)
    return `Страна ${id} успешно удалена из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении страны:', err)
  }
}

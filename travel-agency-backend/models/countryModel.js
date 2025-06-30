import { poolConnect, sql } from '../config/db.js'

export async function selectALLCountry() {
  await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Страна`)
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectCountryById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Страна WHERE Id = '${id}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
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
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function insertCountry(country) {
  await poolConnect()
  const { _country } = country
  try {
    const result = await sql.query(`
            INSERT INTO Страна (Название)
            VALUES ('${_country}')
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updateCountry(country) {
  await poolConnect()
  const { id, _country } = country
  try {
    await sql.query(`
      UPDATE Страна
      SET Название = '${_country}'              
      WHERE Id = '${id}'
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function deleteCountry(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `DELETE FROM Страна WHERE Название = '${id}'`
    )
    return `Страна '${title}' успешно удалена из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

import { poolConnect, sql } from '../config/db.js'

export async function selectALLPassport() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Паспорт`)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectPassportById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Паспорт WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectPassportByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Паспорт WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function insertPassport(passport) {
  await poolConnect()
  const { seriesAndNumber, issuedBy, dateOfIssue } = passport
  try {
    const result = await sql.query(`
            INSERT INTO Паспорт (Серия_и_номер, Кем_выдан, Дата_выдачи)
            VALUES ('${seriesAndNumber}', '${issuedBy}', '${dateOfIssue}')
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updatePassport(passport) {
  await poolConnect()
  const { id, seriesAndNumber, issuedBy, dateOfIssue } = passport
  try {
    await sql.query(`
      UPDATE Паспорт
      SET Серия_и_номер = '${seriesAndNumber}',
          Кем_выдан = '${issuedBy}',
          Дата_выдачи = '${dateOfIssue}'
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function deletePassport(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Паспорт WHERE Id = ${id}`)
    return `Паспорт ${id} успешно удален из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

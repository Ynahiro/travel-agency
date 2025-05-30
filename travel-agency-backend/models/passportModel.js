import { poolConnect, sql } from '../config/db.js'

export async function selectALLPassport() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Паспорт`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение паспорта:', err)
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
    throw new Error('Ошибка при получении паспорта:', err)
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
    throw new Error('Ошибка при получении паспорта:', err)
  }
}

export async function insertPassport(passport) {
  await poolConnect()
  const { seriesAndNumber, issuedBy, dateOfIssue } = passport
  try {
    const result = await sql.query(`
            INSERT INTO Паспорт (Серия_и_номер, Кем_выдан, Дата_выдачи)
            VALUES (${seriesAndNumber}, ${issuedBy}, ${dateOfIssue})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании паспорта:', err)
  }
}

export async function updatePassport(id, passport) {
  await poolConnect()
  const { seriesAndNumber, issuedBy, dateOfIssue } = passport
  try {
    const result = await sql.query(`
            UPDATE Паспорт
            SET Серия_и_номер = ${seriesAndNumber},
                Кем_выдан = ${issuedBy},
                Дата_выдачи = ${dateOfIssue}                
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении паспорта:', err)
  }
}

export async function deletePassport(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Паспорт WHERE Id = ${id}`)
    return `Паспорт ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении паспорта:', err)
  }
}

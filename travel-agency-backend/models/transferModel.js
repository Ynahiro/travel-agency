import { poolConnect, sql } from '../config/db.js'

export async function selectALLTransfer() {
  const pool = await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Трансфер`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение трансфера:', err)
  }
}

export async function selectTransferById(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Трансфер WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении трансфера:', err)
  }
}

export async function selectTransferByColumn(columnName, value) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Трансфер WHERE ${columnName} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении трансфера:', err)
  }
}

export async function insertTransfer(transfer) {
  const pool = await poolConnect()
  const { city, typeOfTransfer } = transfer
  try {
    const result = await sql.query(`
            INSERT INTO Трансфер (Город, Тип_трансфера)
            VALUES (${city}, ${typeOfTransfer})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании трансфера:', err)
  }
}

export async function updateTransfer(id, transfer) {
  const pool = await poolConnect()
  const { city, typeOfTransfer } = transfer
  try {
    const result = await sql.query(`
            UPDATE Трансфер
            SET Город = ${city},
                Тип_трансфера = ${typeOfTransfer}              
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении трансфера:', err)
  }
}

export async function deleteTransfer(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Трансфер WHERE Id = ${id}`)
    return `Трансфер ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении трансфера:', err)
  }
}

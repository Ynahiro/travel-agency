import { poolConnect, sql } from '../config/db.js'

export async function selectALLTransfer() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Трансфер`)
    return resut.recordset
  }  catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectTransferById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Трансфер WHERE Id = ${id}`
    )
    return result.recordset
  }  catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectTransferByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Трансфер WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function insertTransfer(transfer) {
  await poolConnect()
  const { city, typeOfTransfer } = transfer
  try {
    const result = await sql.query(`
            INSERT INTO Трансфер (Город, Тип_трансфера)
            VALUES ('${city}', '${typeOfTransfer}')
            `)
    return 'Данные успешно добалены!'
  }  catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updateTransfer(transfer) {
  await poolConnect()
  const { id, city, typeOfTransfer } = transfer
  try {
    await sql.query(`
      UPDATE Трансфер
      SET Город = '${city}',
          Тип_трансфера = '${typeOfTransfer}'              
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  }  catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function deleteTransfer(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Трансфер WHERE Id = ${id}`)
    return `Трансфер ${id} успешно удален из таблицы!`
  }  catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

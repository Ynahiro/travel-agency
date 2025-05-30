import { poolConnect, sql } from '../config/db.js'

export async function selectALLTravelPackage() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Путевка`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение путевки:', err)
  }
}

export async function selectTravelPackageById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Путевка WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении путевки:', err)
  }
}

export async function selectTravelPackageByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Путевка WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении путевки:', err)
  }
}

export async function insertTravelPackage(travelPackage) {
  await poolConnect()
  const { title, durationId, transferId, hotelId, city } = travelPackage
  try {
    const result = await sql.query(`
            INSERT INTO Путевка (Название, Длительность_Id, Трансфер_Id, Отель_Id, Страна)
            VALUES (${title}, ${durationId}, ${transferId}, ${hotelId}, ${city})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании путевки:', err)
  }
}

export async function updateTravelPackage(id, travelPackage) {
  await poolConnect()
  const { title, durationId, transferId, hotelId } = travelPackage
  try {
    const result = await sql.query(`
            UPDATE Путевка
            SET Название = ${title},
                Длительность_Id = ${durationId},
                Трансфер_Id = ${transferId},
                Отель_Id = ${hotelId},
                Страна = ${city}             
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении путевки:', err)
  }
}

export async function deleteTravelPackage(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Путевка WHERE Id = ${id}`)
    return `Путевка ${id} успешно удалена из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении путевки:', err)
  }
}

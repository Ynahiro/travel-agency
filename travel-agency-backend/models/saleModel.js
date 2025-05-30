import { poolConnect, sql } from '../config/db.js'

export async function selectALLSale() {
  const pool = await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Продажа`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение продажи:', err)
  }
}

export async function selectSaleById(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Продажа WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении продажи:', err)
  }
}

export async function selectSaleByColumn(columnName, value) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Продажа WHERE ${columnName} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении продажи:', err)
  }
}

export async function insertSale(sale) {
  const pool = await poolConnect()
  const { dateOfSale, departureDate, discount, travelPackageId, clientId, employeeId } = sale
  try {
    const result = await sql.query(`
            INSERT INTO Продажа (Дата_продажи, Дата_отправления, Скидка, Путевка_Id, Клиент_Id, Сотрудник_Id)
            VALUES (${dateOfSale}, ${departureDate}, ${discount}, ${travelPackageId}, ${clientId}, ${employeeId})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании продажи:', err)
  }
}

export async function updateSale(id, sale) {
  const pool = await poolConnect()
  const { dateOfSale, departureDate, discount, travelPackageId, clientId, employeeId } = sale
  try {
    const result = await sql.query(`
            UPDATE Продажа
            SET Дата_продажи = ${dateOfSale},
                Дата_отправления = ${departureDate},
                Скидка = ${discount},
                Путевка_Id = ${travelPackageId},
                Клиент_Id = ${clientId},
                Сотрудник_Id = ${employeeId}                
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении продажи:', err)
  }
}

export async function deleteSale(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Продажа WHERE Id = ${id}`)
    return `Продажа ${id} успешно удалена из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении продажи:', err)
  }
}

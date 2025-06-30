import { poolConnect, sql } from '../config/db.js'

export async function selectALLSale() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Продажа`)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectSaleById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT
          s.Дата_продажи AS saleDate,
          s.Дата_отправления AS departureTime,
          DATEADD(DAY, d.Продолжительность, s.Дата_отправления) AS returnDate,          
          p.Название AS tourTitle,          
          CONCAT(клиент.Фамилия, ' ', клиент.Имя, ' ', клиент.Отчество) AS clientFullName,
          CONCAT(сотр.Фамилия, ' ', сотр.Имя, ' ', сотр.Отчество) AS sellerFullName,
          d.Стоимость_путевки AS totalCost,
          t.Тип_трансфера AS transferType
      FROM Продажа s
      JOIN Путевка p ON s.[Путевка_Id] = p.Id
      JOIN Длительность d ON p.[Длительность_Id] = d.Id
      JOIN Трансфер t ON p.[Трансфер_Id] = t.Id
      JOIN Клиент клиент ON s.[Клиент_Id] = клиент.Id
      JOIN Сотрудник сотр ON s.[Сотрудник_Id] = сотр.Id
      WHERE s.Id = ${id};`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении путевки: ${err.message}`)
  }
}

export async function selectSaleByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Продажа WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function insertSale(sale) {
  await poolConnect()
  const { dateOfSale, departureDate, discount, travelPackageId, clientId, employeeId } = sale
  try {
    const result = await sql.query(`
            INSERT INTO Продажа (Дата_продажи, Дата_отправления, Скидка, Путевка_Id, Клиент_Id, Сотрудник_Id)
            VALUES ('${dateOfSale}', '${departureDate}', ${discount}, ${travelPackageId}, ${clientId}, ${employeeId})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updateSale(sale) {
  await poolConnect()
  const { id, dateOfSale, departureDate, discount, travelPackageId, clientId, employeeId } = sale
  try {
    await sql.query(`
      UPDATE Продажа
      SET Дата_продажи = '${dateOfSale}',
          Дата_отправления = '${departureDate}',
          Скидка = '${discount}',
          Путевка_Id = ${travelPackageId},
          Клиент_Id = ${clientId},
          Сотрудник_Id = ${employeeId}                
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function deleteSale(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Продажа WHERE Id = ${id}`)
    return `Продажа ${id} успешно удалена из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

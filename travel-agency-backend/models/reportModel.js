import { poolConnect, sql } from '../config/db.js';

export async function salesPerMonth(month, year) {
  await poolConnect()
  try {
    const resut = await sql.query(`
      SELECT 
          COUNT(s.Id) AS TotalSold,
          SUM(d.Стоимость_путевки) AS TotalRevenue
      FROM Продажа s
      JOIN Путевка p ON s.[Путевка_Id] = p.Id
      JOIN Длительность d ON p.[Длительность_Id] = d.Id
      WHERE 
          MONTH(s.Дата_продажи) = ${month} AND
          YEAR(s.Дата_продажи) = ${year};
    `)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении продаж за месяц: ${err.message}`)
  }
}

export async function allSoldVouchers(month, year) {
  await poolConnect()
  try {
    const resut = await sql.query(`
      SELECT 
          s.Id,
          p.Название AS Title,
          s.Дата_продажи AS SaleDate,
          CONCAT(к.Фамилия, ' ', к.Имя, ' ', к.Отчество) AS ClientName,
          d.Стоимость_путевки AS Price
      FROM Продажа s
      JOIN Путевка p ON s.[Путевка_Id] = p.Id
      JOIN Длительность d ON p.[Длительность_Id] = d.Id
      JOIN Клиент к ON s.[Клиент_Id] = к.Id
      WHERE 
          MONTH(s.Дата_продажи) = ${month} AND
          YEAR(s.Дата_продажи) = ${year};
      ORDER BY s.Дата_продажи DESC;
    `)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении проданых путевок за месяц: ${err.message}`)
  }
}

export async function topMostPopularVauchers(month, year) {
  await poolConnect()
  try {
    const resut = await sql.query(`
      SELECT TOP 5
          p.Название AS Title,
          COUNT(s.Id) AS SoldCount,
          SUM(d.Стоимость_путевки) AS TotalRevenue
      FROM Продажа s
      JOIN Путевка p ON s.[Путевка_Id] = p.Id
      JOIN Длительность d ON p.[Длительность_Id] = d.Id
      WHERE 
          MONTH(s.Дата_продажи) = ${month} AND
          YEAR(s.Дата_продажи) = ${year};
      GROUP BY p.Название
      ORDER BY SoldCount DESC, TotalRevenue DESC;
    `)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении рейтинг путевок за месяц: ${err.message}`)
  }
}

export async function topMostUnpopularVauchers(month, year) {
  await poolConnect()
  try {
    const resut = await sql.query(`
      SELECT 
          p.Название AS Title,
          d.Стоимость_путевки AS Price,
          d.Продолжительность AS Days
      FROM Путевка p
      JOIN Длительность d ON p.[Длительность_Id] = d.Id
      WHERE p.Id NOT IN (
          SELECT DISTINCT [Путевка_Id] 
          FROM Продажа 
          WHERE 
              MONTH(s.Дата_продажи) = ${month} AND
              YEAR(s.Дата_продажи) = ${year};
      )
      ORDER BY d.Стоимость_путевки DESC;
    `)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении рейтинг путевок за месяц: ${err.message}`)
  }
}
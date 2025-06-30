import { poolConnect, sql } from '../config/db.js'

export async function selectALLTravelPackage() {
  await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Путевка`)
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении путевки: ${err.message}`)
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
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении путевки: ${err.message}`)
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
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении путевки: ${err.message}`)
  }
}

export async function insertTravelPackage(travelPackage) {
  await poolConnect()
  const { id, title, durationId, transferId, hotelId, countryId } = travelPackage
  console.log(travelPackage)
  try {
    const result = await sql.query(`
            INSERT INTO Путевка (Id, Название, Длительность_Id, Трансфер_Id, Отель_Id, СтранаId, CreatedByUser)
            VALUES (${id}, '${title}', ${durationId}, ${transferId}, ${hotelId}, ${countryId}, USER_NAME())
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updateTravelPackage(travelPackage) {
  await poolConnect()
  const { id, title, durationId, transferId, hotelId, countryId } = travelPackage
  try {
    await sql.query(`
      UPDATE Путевка
      SET Название = '${title}',
          Длительность_Id = ${durationId},
          Трансфер_Id = ${transferId},
          Отель_Id = ${hotelId},
          СтранаId = ${countryId}
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при обновлении путевки: ${err.message}`)
  }
}

export async function deleteTravelPackage(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Путевка WHERE Id = ${id}`)
    return `Путевка ${id} успешно удалена из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при удалении путевки: ${err.message}`)
  }
}

export async function selectMostExpensiveTravelPackage() {
  await poolConnect()
  try {
    const result = await sql.query(`
          SELECT TOP 1 
              Путевка.Id AS Id,
              Путевка.Название AS Название,
              Длительность.Продолжительность,
              Длительность.Стоимость_путевки,
              Отель.Название AS Отель,
              Отель.Категория AS Звезды
          FROM Путевка
          JOIN Длительность ON Путевка.[Длительность_Id] = Длительность.Id
          JOIN Отель ON Путевка.[Отель_Id] = Отель.Id
          ORDER BY Длительность.Стоимость_путевки DESC
        `)
    return result.recordset
  } catch (err) {
    console.log('Ошибка SQL:', err)

    throw new Error(`Ошибка при поиске самой дорогой путевки: ${err.message}`)
  }
}

export async function selectTheMostPopularTravelPackage() {
  await poolConnect()
  try {
    const result = await sql.query(`
            SELECT 
                COUNT(Продажа.Id) AS Количество_продаж,
                Путевка.Id AS Id,
                Путевка.Название AS Название,
                Длительность.Стоимость_путевки,
                Отель.Название AS Отель,
                Отель.Категория AS Звезды
            FROM Продажа
            JOIN Путевка ON Продажа.[Путевка_Id] = Путевка.Id
            JOIN Длительность ON Путевка.[Длительность_Id] = Длительность.Id
            JOIN Отель ON Путевка.[Отель_Id] = Отель.Id
            GROUP BY 
                Путевка.Id, 
                Путевка.Название, 
                Длительность.Стоимость_путевки,
                Отель.Название,
                Отель.Категория
            ORDER BY Количество_продаж DESC;
          `)
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении топа путевок: ${err.message}`)
  }
}

export async function selectDetailedTravelPackage() {
  await poolConnect()
  try {
    const result = await sql.query(`
        SELECT
            Путевка.Id                    AS Id,
            Путевка.Название              AS Название,
            Длительность.Продолжительность,
            Трансфер.Город               AS Город_трансфера,
            Трансфер.Тип_трансфера           AS Вид_трансфера,
            Отель.Название               AS Отель,
            Отель.Категория              AS Категория_отеля,
            Страна.Название              AS Страна,
            Длительность.Стоимость_отеля,
            Длительность.Стоимость_путевки
        FROM Путевка
        JOIN Длительность ON Путевка.[Длительность_Id] = Длительность.Id
        JOIN Трансфер     ON Путевка.[Трансфер_Id]   = Трансфер.Id
        JOIN Отель        ON Путевка.[Отель_Id]       = Отель.Id
        JOIN Страна       ON Путевка.[СтранаId]      = Страна.Id
        ORDER BY Путевка.Id;
      `)
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при получении топа путевок: ${err.message}`)    
  }
}
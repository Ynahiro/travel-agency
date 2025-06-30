import { poolConnect, sql } from '../config/db.js'

export async function selectALLClients() {
  await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Клиент`)
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании клиента: ${err.message}`)
  }
}

export async function selectClientById(id) {
  await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Клиент WHERE Id = ${id}`)
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании клиента: ${err.message}`)
  }
}

export async function selectClientByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Клиент WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании клиента: ${err.message}`)
  }
}

export async function insertClient(client) {
  await poolConnect()
  const { surname, name, patronymic, birthday, phoneNum, email, passportId } = client
  try {
    const result = await sql.query(`
            INSERT INTO Клиент (Фамилия, Имя, Отчество, Дата_рождения, Телефон, Email, Паспорт_Id)
            VALUES ('${surname}', '${name}', '${patronymic}', '${birthday}', '${phoneNum}', '${email}', ${passportId})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании клиента: ${err.message}`)
  }
}

export async function updateClient(client) {
  await poolConnect()
  const { id, surname, name, patronymic, birthday, phoneNum, email, passportId, } = client
  try {
    await sql.query(`
      UPDATE Клиент
      SET Фамилия = '${surname}',
          Имя = '${name}',
          Отчество = '${patronymic}',
          Дата_рождения = '${birthday}',
          Телефон = '${phoneNum}',
          Email = '${email}',
          Паспорт_Id = '${passportId}'
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании клиента: ${err.message}`)
  }
}

export async function deleteClient(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Клиент WHERE Id = ${id}`)
    return `Клиент ${id} успешно удален из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании клиента: ${err.message}`)
  }
}

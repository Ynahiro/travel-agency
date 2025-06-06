import { poolConnect, sql } from '../config/db.js'

export async function selectALLClients() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Клиент`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение клиентов:', err)
  }
}

export async function selectClientById(id) {
  await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Клиент WHERE Id = ${id}`)
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении клиента:', err)
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
    throw new Error('Ошибка при получении клиента:', err)
  }
}

export async function insertClient(client) {
  await poolConnect()
  const { surname, name, patronymic, birthdy, phoneNum, email, passportId } = client
  try {
    const result = await sql.query(`
            INSERT INTO Клиент (Фамилия, Имя, Отчество, День_рождения, Телефон, Email, Паспорт_Id)
            VALUES (${surname}, ${name}, ${patronymic}, ${birthdy}, ${phoneNum}, ${email}, ${passportId})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании клиента:', err)
  }
}

export async function updateClient(id, client) {
  await poolConnect()
  const { surname, name, patronymic, birthdy, phoneNum, email, passportId } = client
  try {
    const result = await sql.query(`
            UPDATE Клиент
            SET Фамилия = ${surname},
                Имя = ${name},
                Отчество = ${patronymic},
                День_рождения = ${birthdy},
                Телефон = ${phoneNum},
                Email = ${email},
                Паспорт_Id = ${passportId}
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении клиента:', err)
  }
}

export async function deleteClient(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Клиент WHERE Id = ${id}`)
    return `Клиент ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении клиента:', err)
  }
}

// await poolConnect()
//     try {
//         const result = await sql.query(``)
//         return result.recordset
//     } catch(err) {
//         throw new Error('Ошибка при получении клиента:', err)
//     }

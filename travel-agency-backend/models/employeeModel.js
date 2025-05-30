import { poolConnect, sql } from '../config/db.js'

export async function selectALLEmployee() {
  const pool = await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Сотрудник`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение сотрудника:', err)
  }
}

export async function selectEmployeeById(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Сотрудник WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении сотрудника:', err)
  }
}

export async function selectEmployeeByColumn(columnName, value) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Сотрудник WHERE ${columnName} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении сотрудника:', err)
  }
}

export async function insertEmployee(employee) {
  const pool = await poolConnect()
  const { surname, name, patronymic, phoneNum, age, post } = employee
  try {
    const result = await sql.query(`
            INSERT INTO Сотрудник (Фамилия, Имя, Отчество, Телефон, Возраста, Должность)
            VALUES (${surname}, ${name}, ${patronymic}, ${phoneNum}, ${age}, ${post})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании сотрудника:', err)
  }
}

export async function updateEmployee(id, employee) {
  const pool = await poolConnect()
  const { surname, name, patronymic, phoneNum, age, post } = employee
  try {
    const result = await sql.query(`
            UPDATE Сотрудник
            SET Фамилия = ${surname},
                Имя = ${name},
                Отчество = ${patronymic},
                Телефон = ${phoneNum},
                Возраста = ${age},
                Должность = ${post}               
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении сотрудника:', err)
  }
}

export async function deleteEmployee(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Сотрудник WHERE Id = ${id}`)
    return `Сотрудник ${id} успешно удален из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении сотрудника:', err)
  }
}

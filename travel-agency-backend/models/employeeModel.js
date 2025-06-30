import { poolConnect, sql } from '../config/db.js'

export async function selectALLEmployee() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Сотрудник`)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectEmployeeById(id) {
  await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Сотрудник WHERE Id = ${id}`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectEmployeeByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Сотрудник WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function insertEmployee(employee) {
  await poolConnect()
  const { surname, name, patronymic, phoneNum, age, post } = employee
  try {
    const result = await sql.query(`
            INSERT INTO Сотрудник (Фамилия, Имя, Отчество, Телефон, Возраст, Должность)
            VALUES ('${surname}', '${name}', '${patronymic}', '${phoneNum}', ${age}, '${post}')
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updateEmployee(employee) {
  await poolConnect()
  const { id, surname, name, patronymic, phoneNum, age, post } = employee
  try {
    await sql.query(`
      UPDATE Сотрудник
      SET Фамилия = '${surname}',
          Имя = '${name}',
          Отчество = '${patronymic}',
          Телефон = '${phoneNum}',
          Возраст = ${age},
          Должность = '${post}'
      WHERE Id = ${id}
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function deleteEmployee(id) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Сотрудник WHERE Id = ${id}`)
    return `Сотрудник ${id} успешно удален из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

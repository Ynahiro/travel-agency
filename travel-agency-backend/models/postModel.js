import { poolConnect, sql } from '../config/db.js'

export async function selectALLPost() {
  const pool = await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Должность`)
    return resut.recordset
  } catch (err) {
    throw new Error('Ошибка при пролучение должности:', err)
  }
}

export async function selectPostById(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`SELECT * FROM Должность WHERE Id = ${id}`)
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении должности:', err)
  }
}

export async function selectPostByColumn(columnName, value) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(
      `SELECT * FROM Должность WHERE ${columnName} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    throw new Error('Ошибка при получении должности:', err)
  }
}

export async function insertPost(post) {
  const pool = await poolConnect()
  const { title, salaty } = post
  try {
    const result = await sql.query(`
            INSERT INTO Должность (Название, Зарплата)
            VALUES (${title}, ${salaty})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    throw new Error('Ошибка при создании должности:', err)
  }
}

export async function updatePost(id, post) {
  const pool = await poolConnect()
  const { title, salaty } = post
  try {
    const result = await sql.query(`
            UPDATE Должность
            SET Название = ${title},
                Зарплата = ${salaty}              
            WHERE Id = ${id}
            `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    throw new Error('Ошибка при обновлении должности:', err)
  }
}

export async function deletePost(id) {
  const pool = await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Должность WHERE Id = ${id}`)
    return `Должность ${id} успешно удалена из таблицы!`
  } catch (err) {
    throw new Error('Ошибка при удалении должности:', err)
  }
}

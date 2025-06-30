import { poolConnect, sql } from '../config/db.js'

export async function selectALLPost() {
  await poolConnect()
  try {
    const resut = await sql.query(`SELECT * FROM Должность`)
    return resut.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function selectPostByColumn(column) {
  await poolConnect()
  const { columnTitle, value } = column
  try {
    const result = await sql.query(
      `SELECT * FROM Должность WHERE ${columnTitle} = '${value}'`
    )
    return result.recordset
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function insertPost(post) {
  await poolConnect()
  const { title, salary } = post
  console.log(post)
  try {
    const result = await sql.query(`
            INSERT INTO Должность (Название, Зарплата)
            VALUES ('${title}', ${salary})
            `)
    return 'Данные успешно добалены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function updatePost(post) {
  await poolConnect()
  const { title, salary } = post
  try {
    await sql.query(`
      UPDATE Должность
      SET Зарплата = ${salary}
      WHERE Название = '${title}'
      `)
    return 'Данные успешно обнавлены!'
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

export async function deletePost(title) {
  await poolConnect()
  try {
    const result = await sql.query(`DELETE FROM Должность WHERE Название = '${title}'`)
    return `Должность ${title} успешно удалена из таблицы!`
  } catch (err) {
    console.error('Ошибка SQL:', err)

    throw new Error(`Ошибка при создании путевки: ${err.message}`)
  }
}

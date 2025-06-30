import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sql from 'mssql'
import dotenv from 'dotenv'
import { poolConnect } from '../config/db.js'

dotenv.config()

export const login = async (req, res) => {
  await poolConnect()

  const { username, password } = req.body

  try {
    const result = await sql.query(`SELECT * FROM Пользователи_роли WHERE UserName = '${username}'`)
    const user = result.recordset[0]

    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден!' })
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash)

    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' })
    }

    const token = jwt.sign(
      { id: user.Id, username: user.UserName},
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    )

    res.json({ message: 'Вход выполнен', token, username})

  } catch (err) {
    console.log('Ошибка при входе:', err)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export function authnticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
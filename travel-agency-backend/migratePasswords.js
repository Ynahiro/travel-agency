import sql from 'mssql'
import bcrypt from 'bcrypt'

const config = {
  server: 'BETTERTHANMAC', // "BETTERTHANMAC" localhost,
  database: 'TravelAgency',
  user: 'admin_user',
  password: 'admin_user',
  options: {
    trustServerCertificate: true,
  },
}

async function migratePassword() {
  try {
    const pool = await sql.connect(config)

    const result = await pool.request().query(`
      SELECT 
        Id, 
        UserName,
        PasswordHash 
        FROM Пользователи_Роли
      `)
    
    const users = result.recordset

    for (const user of users) {
      const plainPassword = user.PasswordHash

      if (plainPassword.startsWith('$2')) {
        console.log(`Пользователь ${user.UserName} уже имеет захэшированный пароль.`)
        continue
      }

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)

      await pool.request()
        .input('Id', sql.Int, user.Id)
        .input('PasswordHash', sql.NVarChar, hashedPassword)
        .query('UPDATE Пользователи_роли SET PasswordHash = @PasswordHash WHERE Id = @Id')

      console.log(`Пароль пользователя ${user.UserName} успешно захэширован и обновлен.`)
    }

    console.log('Миграция успешна зверешена.')
    process.exit(0)
  } catch (err) {
    console.log('Ошибка миграции:', err)
    process.exit(1)
  }
}

migratePassword()
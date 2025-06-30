import sql from 'mssql'

const config = {
  server: 'BETTERTHANMAC', // "BETTERTHANMAC" localhost,
  database: 'TravelAgency',
  user: 'admin_user',
  password: 'admin_user',
  options: {
    trustServerCertificate: true,
  },
}


export async function poolConnect() {
  try {
    const pool = await sql.connect(config)
    return pool
  } catch (err) {
    console.error('Ошибка подключения к БД:', err)
    throw err
  }
}

export { sql }
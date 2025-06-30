import express from 'express'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import countryRoutes from './routes/countryRoutes.js'
import durationRoutes from './routes/durationRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'
import passportRoutes from './routes/passportRoutes.js'
import postRoutes from './routes/postRoutes.js'
import saleRoutes from './routes/saleRoutes.js'
import transferRoutes from './routes/transferRoutes.js'
import travelPackageRoutes from './routes/travelPackageRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/login', authRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/country', countryRoutes)
app.use('/api/duration', durationRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/hotel', hotelRoutes)
app.use('/api/passport', passportRoutes)
app.use('/api/post', postRoutes)
app.use('/api/sale', saleRoutes)
app.use('/api/transfer', transferRoutes)
app.use('/api/travel', travelPackageRoutes)
app.use('/api/reports/monthly', reportRoutes)

export default app

// const port = 3000;
// app.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));


// app.get('/clients', async (req, res) => {
//   try {
//     // const result = await pool.request()
//     // .query(new Querys(tableName).selectByColumn('Имя', 'Алексей'))
//     // .then((recordset) => console.log(recordset));

//     const pool = await poolConnect()

//     const result = pool
//       .request()
//       .query(new Querys('Клиент').selectByColumn('Имя', 'Алексей'))
    
//     res.json((await result).recordset)
//   } catch (err) {
//     if (err.name === 'RequestError') {
//       console.error('Ошибка запроса:', err)
//     } else {
//       console.error('Ошибка при получении клиентов:', err)
//     }

//     res.status(500).send('Ошибка сервера')
//   }
// })
// const express = require("express");
// const pool = require("./config/db");

import express from 'express'
// import { poolConnect } from './config/db.js'
// import Querys from './controllers/controllers.js'
import {selectALLClinets} from './controllers/clientController.js'

const app = express()

app.use(express.json())

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

app.get('/client', selectALLClinets)

export default app

// const port = 3000;
// app.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));

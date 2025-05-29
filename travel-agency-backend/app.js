const express = require("express");

import { pool } from "./config/db.js"
import Querys from './controllers/controllers.js';

const app = express();

app.use(json());

app.get("/clients", async (req, res) => {
  try {
    const result = await pool.request()
    .query(new Querys(tableName).selectByColumn('Имя', 'Алексей'))
    .then((recordset) => console.log(recordset));
    
    res.json(result);
  } catch (err) {
    if (err.name === 'RequestError') {
      console.error("Ошибка запроса:", err);
    } else {
      console.error("Ошибка при получении клиентов:", err);
    }
    
    res.status(500).send("Ошибка сервера");
  }
});

const port = 3000;
app.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));
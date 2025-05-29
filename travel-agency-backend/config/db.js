const sql = require("mssql");
require("dotenv").config();

const config = {
  server: "BETTERTHANMAC",
  database:  "TravelAgency",
  user: "admin_user",
  password: "admin_user",
  options: {
    trustServerCertificate: true,
  },
};

module.exports = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("Ошибка подключения к БД:", err);
    throw err;
  }
}

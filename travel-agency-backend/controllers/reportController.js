import { poolConnect, sql } from '../config/db.js';

export const getMonthlyReport = async (req, res) => {
  const { month, year } = req.query

  try {
    const pool = await poolConnect()
    const request = pool.request()
      .input('Month', sql.Int, month)
      .input('Year', sql.Int, year)
    
    const result = await request.execute('GetMonthlyTourReport')
    
    const reportData = {
      totalSold: result.recordsets[0][0].TotalSold,
      totalRevenue: result.recordsets[0][0].TotalRevenue,
      soldTours: result.recordsets[1],
      popularTours: result.recordsets[2],
      unsoldTours: result.recordsets[3]
    }
    
    res.json(reportData)
  } catch (err) {
    console.error(`Ошибка при формировании отчета: ${err.message}`);
    res.status(500).send('Ошибка сервера')
  }
}
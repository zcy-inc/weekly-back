const { createPool } = require('mysql');
const DB_CONFIG = require('../config/dbConfig');

const prdPool = createPool(DB_CONFIG.database[DB_CONFIG.env]);
const query = (sql, values) => new Promise((resolve, reject) => {
  prdPool.getConnection((err, connection) => {
    if (err) {
      reject(err);
    } else {
      connection.query(sql, values, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
        connection.release();
      });
    }
  });
});

module.exports = {
  query,
};

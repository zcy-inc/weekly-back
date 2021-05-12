const { query } = require('../utils/sql');

module.exports = {
  list: async () => {
    const sql = 'select * from users;';
    const data = await query(sql);

    return data;
  },
};

const { query } = require('../utils/sql');

module.exports = {
  /**
   *获取周刊列表
   *
   * @param {*} params
   * @returns
   */
  list: async (params) => {
    let sql = null;
    const { count } = params;
    if (count) {
      sql = `select * from weeks where count="${count}"`;
    } else {
      sql = 'select * from weeks';
    }
    const data = await query(sql);
    return data;
  },
};

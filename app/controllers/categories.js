const { query } = require('../utils/sql');

module.exports = {
  list: async () => {
    const sql = 'select children from categories;';
    const data = await query(sql);
    return Array.prototype.concat
      .apply(
        [],
        data.map((ele) => JSON.parse(ele.children)),
      )
      .map((ele) => ({ name: ele }));
  },
  orderedList: async () => {
    const sql = 'select * from categories;';
    const data = await query(sql);
    return data.map((ele) => ({
      value: ele.value,
      children: JSON.parse(ele.children),
    }));
  },
};

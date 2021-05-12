const { query } = require('../utils/sql');

module.exports = {
  overview: async () => {
    /* 文章总数 */
    const totalSql = 'SELECT COUNT(*) AS count from articles';
    const categorySql = 'SELECT COUNT(*) AS count from categories';
    const categoryMapSql = 'SELECT category, COUNT(*) AS count from articles GROUP BY category order by count DESC ';
    const weekMapSql = 'SELECT week, COUNT(*) AS count from articles GROUP BY week';

    /* 月度数据 */
    const monthMapSql = 'SELECT COUNT(*) as count, MONTH(FROM_UNIXTIME(`timestamp`)) as month FROM articles GROUP BY MONTH(FROM_UNIXTIME(`timestamp`));';
    /* 发表量前三的数据 */
    const mostManSql = 'SELECT referrer, count( * ) AS count FROM articles GROUP BY referrer ORDER BY count DESC LIMIT 3;';
    const articleTotal = await query(totalSql);
    const categoryTotal = await query(categorySql);
    const categoryMap = await query(categoryMapSql);
    const weekMap = await query(weekMapSql);
    const monthMap = await query(monthMapSql);
    const mostMan = await query(mostManSql);
    return {
      articleTotal,
      categoryTotal,
      categoryMap,
      weekMap,
      monthMap,
      mostMan,
    };
  },
};

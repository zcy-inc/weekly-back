const moment = require('moment');
const { getCurWeek } = require('../common');
const { query } = require('../utils/sql');

module.exports = {
  post: async (params) => {
    const week = getCurWeek();
    const {
      title, desc, category, link, referrer,
    } = params;
    const sql = `
    INSERT INTO articles(title, description, link, category, timestamp, week, referrer) VALUES('${title}', '${desc}', '${link}', '${category}', unix_timestamp(Now()), ${week}, '${referrer}');
    `;
    await query(sql);
  },
  list: async (params) => {
    const { kw = '', week = 1 } = params;
    let sql = null;
    if (kw) {
      // search
      sql = `select * from articles where week=${week} and title like concat("%","${kw}","%") `;
    } else {
      sql = `select * from articles where week=${week}`;
    }
    const data = await query(sql);
    return data;
  },
  // based on categories
  categories: async (params) => {
    const { category } = params;
    const sql = `select * from articles where category='${category}' `;
    const data = await query(sql);
    return data;
  },
  // 展示本周的所有小报内容卡片
  listThisWeek: async () => {
    const week = getCurWeek();
    // 获取本周的数据
    const sql = `select * from articles where week= ${week} ORDER BY timestamp desc;`;
    const data = await query(sql);
    return data;
  },
  // 查询本周已经推送了几次小报
  queryTimes: async () => {
    const week = moment().week() + 1;
    // 查询本周已经推送了几次钉钉群
    const queryTimesSql = `select times from dingding where week = ${week}`;
    const data = await query(queryTimesSql);
    return data;
  },
  // 提供本周推送给钉钉的三篇文章
  listLastest: async () => {
    const week = moment().week() + 1;
    // 查询本周已经推送了几次钉钉群
    const queryTimesSql = `select times from dingding where week = ${week}`;
    let times = await query(queryTimesSql);
    times = JSON.parse(JSON.stringify(times));
    if (times && times.length > 0) {
      times = times[0].times;
    } else {
      times = 0;
    }
    const paperWeek = getCurWeek();
    // 获取本周最新的5条数据，推送给钉钉
    const pageNo = times * 3;
    const pageSize = 3;
    const sql = `select * from articles where week= ${paperWeek} limit ${pageNo},${pageSize}`;
    const data = await query(sql);
    return data;
  },
};

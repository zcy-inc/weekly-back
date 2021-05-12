const moment = require('moment');
const { query } = require('../utils/sql');
const { pushToRobot } = require('../utils/robot');
const { getCurWeek } = require('../common');

const post = async () => {
  const current = new Date().getTime();
  const count = getCurWeek();
  const title = `政采云前端小报第${count}期`;
  const week = moment().week() + 1;
  const datetime = moment(current).format('YYYY-MM-DD 00:00:00');
  // 落库逻辑添加
  // 增加推送钉钉的次数字段times
  const querySql = `select count(id) from dingding where week = ${week}`;
  const insertSql = `
    INSERT INTO dingding(title, week, count,times, datetime) VALUES('${title}', '${week}', '${count}','1', '${datetime}');
    `;
  const updateSql = `UPDATE dingding SET times=times+1 WHERE week=${week}`;
  let isExist = await query(querySql);
  isExist = JSON.parse(JSON.stringify(isExist));
  if (isExist && isExist.length > 0) {
    isExist = isExist[0]['count(id)'];
  }
  if (isExist === 0) {
    // 插入记录
    await query(insertSql);
  } else {
    // 更新次数,自增1
    await query(updateSql);
  }
};
const queryCountOfThisWeek = async () => {
  const week = getCurWeek();
  // 获取本周的数据
  const sql = `select count(*) from articles where week= ${week};`;
  const data = await query(sql);
  return data;
};
module.exports = {
  pushToRobot: async (params) => {
    let nums = await queryCountOfThisWeek();
    nums = JSON.parse(JSON.stringify(nums));
    if (nums && nums.length > 0) {
      nums = nums[0]['count(*)'];
    } else {
      nums = 0;
    }
    const res = await pushToRobot({ ...params, ...{ nums } });
    const { errcode } = res;
    if (errcode === 0) {
      // 插入/更新数据库
      await post();
    }
    return res;
  },
};

const fs = require('fs');
const path = require('path');
const { START_TIME } = require('../config/pushConfig');

/**
 * 获取当前是第几周
 */
const getCurWeek = () => {
  const base = new Date(START_TIME).getTime();
  const current = new Date().getTime();
  const time = (current - base) / (1000 * 60 * 60 * 24 * 7);
  const currentWeek = Math.ceil(time);
  return currentWeek;
};

// 写入log文件中
const writeLog = (text) => {
  const time = `${new Date().toLocaleString()} ${text} \n`;
  const log = fs.createWriteStream(
    path.resolve(__dirname, '../../logs/mineLogs.txt'),
    {
      flags: 'a',
      encoding: 'utf-8',
    },
  );
  log.end(time);
};

module.exports = { getCurWeek, writeLog };

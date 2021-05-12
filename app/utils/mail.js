const nodemailer = require('nodemailer');
const moment = require('moment');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const { query } = require('./sql');
const { getCurWeek, writeLog } = require('../common');
const {
  dingConfig: { pushDingNotion },
  mailConfig: { pushMailNotion, mailServerCfg, mailOptions },
} = require('../config/pushConfig');
const { domain } = require('../config/httpsConfig');
const articles = require('../controllers/articles');
const dingding = require('../controllers/dingding');

moment.locale('zh-cn');

const template = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, './template.ejs'), 'utf8'),
);

const filterData = (data) => data
  .filter((ele) => ele.title)
  .map((item) => {
    const { title, ...rest } = item;
    return {
      ...rest,
      title: item.title.replace('- 掘金', ''),
    };
  });

const loadData = async () => {
  const current = new Date().getTime();
  // 获取最近一周的20条数据
  const sql = 'select *, from_unixtime(timestamp) as datetime from articles having datetime between date_add(now(),interval -1 week) and now() order by timestamp desc limit 20;';
  // 落库逻辑添加
  const count = getCurWeek();
  const title = `政采云前端小报第${count}期`;
  const week = moment().week() + 1;
  const datetime = moment(current).format('YYYY-MM-DD 00:00:00');
  const insertSql = `
  INSERT INTO weeks(title, week, count, datetime) VALUES('${title}', '${week}', '${count}', '${datetime}');
  `;
  const res = await query(sql);
  await query(insertSql);

  const data = filterData(res);
  const paramData = {
    data,
    count,
    domain,
  };
  const content = template({ paramData });
  return content;
};

const sendMail = (content) => {
  const subject = `政采云前端小报 第${getCurWeek()}期(${moment(
    new Date().getTime(),
  ).format('YYYY.MM.DD')})`;
  const transporter = nodemailer.createTransport(mailServerCfg);
  const newMailOptions = {
    ...mailOptions,
    subject, // Subject line
    html: content, // html body
  };

  transporter.sendMail(newMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }
    writeLog(`Message send sucessful: ${info.messageId}'`);
  });
};

const pushDing = async () => {
  const data = await articles.listLastest({});
  if (data && data.length > 0) {
    await dingding.pushToRobot({
      data: JSON.parse(JSON.stringify(data)),
    });
    writeLog('push Ding sucessful');
  }
};

try {
  loadData().then((data) => {
    pushMailNotion && sendMail(data);
  });
  pushDingNotion && pushDing();
} catch (error) {
  console.log('error', error);
}

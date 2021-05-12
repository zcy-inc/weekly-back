const axios = require('axios');
const {
  dingConfig: { dingAccessToken },
} = require('../config/pushConfig');
const { getCurWeek } = require('../common');
const { domain } = require('../config/httpsConfig');

const paperWeek = getCurWeek();
// 获取一个1~52的随机数字
function randIcon() {
  const imgIcon = [];
  while (imgIcon.length < 3) {
    const r1 = Math.floor(Math.random() * (52 - 1) + 1);
    if (r1 !== paperWeek && !imgIcon.includes(r1)) {
      imgIcon.push(r1);
    }
  }
  return imgIcon;
}
const wrapperFeedcard = ({ data, nums }) => {
  const imgIcon = randIcon();
  const arr = [];
  const zooWeekly = {
    title: `政采云前端小报第${paperWeek}期(共${nums}篇)`,
    messageURL: `${domain}/detail/${paperWeek}`,
    picURL: `${domain}/static/images/${paperWeek}.png`,
  };
  arr.push(zooWeekly);
  data.forEach((article, index) => {
    const tmp = {};
    tmp.title = article.title;
    tmp.messageURL = article.link;
    tmp.picURL = `${domain}/static/images/${imgIcon[index]}.png`;
    arr.push(tmp);
  });
  return arr;
};
const pushToRobot = async ({ data, nums }) => {
  const links = wrapperFeedcard({ data, nums });
  return axios('https://oapi.dingtalk.com/robot/send?', {
    method: 'post',
    params: {
      access_token: dingAccessToken, // 钉钉群
    },
    data: {
      feedCard: {
        links,
      },
      msgtype: 'feedCard',
    },
  }).then((res) => {
    const { errmsg, errcode } = res.data;
    return {
      errcode,
      errmsg,
    };
  });
};

module.exports = {
  pushToRobot,
};

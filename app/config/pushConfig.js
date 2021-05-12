const pushMailNotion = false; // 是否开启邮箱推送
const pushDingNotion = false; // 是否开启钉钉推送
const dingAccessToken = ''; // 钉钉群的token
const START_TIME = '2018-10-22'; // 开始时间，用于记录当前是第几期小报
module.exports = {
  dingConfig: { pushDingNotion, dingAccessToken },
  mailConfig: {
    pushMailNotion,
    // 邮箱server配置。这边以阿里云邮箱为例
    mailServerCfg: {
      service: 'qiye.aliyun',
      port: 25, // SMTP 端口
      host: 'smtp.mxhichina.com',
      secureConnection: true, // 使用SSL
      auth: {
        user: 'A@cai-inc.com',
        pass: 'XXX',
      },
    },
    // 邮件发送、抄送对象
    mailOptions: {
      from: '"政采云前端小报" <A@cai-inc.com>', // 邮件发送者
      to: ['B@cai-inc.com'], // 发送对象
      cc: ['C@cai-inc.com'], // 抄送对象
    },
    // 定时发送邮件的时间
    mailTime: {
      dayOfWeek: 5, // 每周五
      hour: 17, // 17点
      minute: 0,
      second: 0,
    },
  },
  START_TIME,
};

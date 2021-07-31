module.exports = {
  enable: false, // 是否使用https
  // https证书配置
  httpsCert: {
    key: '',
    cert: '',
  },
  domain: `http://${process.env.SERVER_IP}`, // 配置域名或者是服务器ip
};

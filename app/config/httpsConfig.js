module.exports = {
  enable: false, // 是否使用https
  // https证书配置
  httpsCert: {
    // key: fs.readFileSync('key.pem'),
    // cert: fs.readFileSync('cert.pem'),
  },
  domain: 'http://weekly.zoo.team', // 配置域名或者是服务器ip
};

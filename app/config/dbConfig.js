module.exports = {
  env: process.env.NODE_ENV, // development or production
  database: {
    // 本地数据库地址
    development: {
      host: '10.201.78.8',
      user: 'root',
      password: '1234qwer',
      database: 'weekly',
    },
    // 线上数据库地址
    production: {},
  },
};

module.exports = {
  env: process.env.NODE_ENV, // development or production
  database: {
    // 本地数据库地址
    development: {
      host: 'mysql',
      user: 'root',
      password: '1234qwer',
      database: 'weekly',
    },
    // 线上数据库地址
    production: {
      host: 'mysql',
      user: 'root',
      password: '1234qwer',
      database: 'weekly',
    },
  },
};

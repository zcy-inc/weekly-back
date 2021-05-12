# 项目描述

政采云 ZooTeam 开发的前端小报后端系统，主要功能有：

- 提供投稿文章的保存、展示接口，供前端、插件调用

- 提供邮件定时发送、钉钉推送功能

# 启动

## 1.npm install

## 2.修改配置

- dbconfig.js 配置本地数据库和线上数据库
- httpsConfig.js 是否启用 https,以及 https 证书
- pushConfig.js 配置是否开启邮箱、钉钉推送，推送时间

## 3.启动服务

```javaScript
npm run dev // 开启后端服务，数据库使用development环境的
npm run pro // 开启后端服务，数据库使用production环境的
npm run mail:dev // 开启邮件服务，数据库使用development环境的
npm run mail:pro // 开启邮件服务，数据库使用production环境的
npm run reload // 重新加载服务。更新代码之后使用
```

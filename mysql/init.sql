-- use mysql;
-- update user set host = '%' where user = 'root';
-- FLUSH PRIVILEGES;

-- CREATE DATABASE weekly; 
-- flush privileges;
-- use weekly;

CREATE TABLE IF NOT EXISTS `users`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `value` VARCHAR(50) NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO users(value) VALUES
('张三'),
('李四'),
('王五');

CREATE TABLE IF NOT EXISTS `articles` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(240) NOT NULL,
  `description` varchar(250) NOT NULL,
  `link` varchar(240) NOT NULL,
  `category` varchar(120) NOT NULL,
  `timestamp` bigint(30) NOT NULL,
  `week` bigint(11) NOT NULL,
  `referrer` varchar(255) NOT NULL DEFAULT '' COMMENT '投稿人',
  PRIMARY KEY (`id`),
  UNIQUE KEY `insert` (`link`(100),`title`(100)),
  UNIQUE KEY `unique-title` (`title`(120)) USING BTREE,
  UNIQUE KEY `unique-link` (`link`(120)) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1792 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `categories`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `value` VARCHAR(50) NOT NULL,
   `children` JSON,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO categories(value, children) VALUES
('基础','["HTML","CSS","JavaScript","NodeJS"]'),
('语言','["WebAssembly","TypeScript"]'),
('架构','["GraphQL","Serverless","MVVM","微前端","BFF"]'),
('选型','["React","Vue","小程序","Electron","Flutter","ReactNative","Weex","DSL"]'),
('工具','["版本管理","包管理","调试工具","自动化测试"]'),
('语法增强','["PostCSS","Less","Sass"]'),
('能力周边','["AI","AST","IoT","SQL","HTTP","Nginx","Docker","Server"]'),
('RunTime','["V8","浏览器","WebView","Extensions"]'),
('总结',' ["总结","方案","技巧","性能","安全","设计模式"]'),
('他山之石','["职业感悟","产品理解","用户体验","美学思考","行业趋势","深度精选"]'),
('新闻','["业界新闻","技术会议","周期互撕"]');

CREATE TABLE IF NOT EXISTS `weeks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(240) NOT NULL,
  `week` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`(100))
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `dingding` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `week` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `times` int(11) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
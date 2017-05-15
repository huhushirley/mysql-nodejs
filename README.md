# Node Rest Api
后端脚手架

## 技术栈
- nodejs
- express
- mysql/sequeize
- mocha
- swagger-jsdoc

## 项目简介
- 使用ES6/ES7特性
- 使用ESlint进行语法检测，遵循[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- 使用swagger-doc管理文档. Visualize document using Swagger UI.

## 开发、测试、打包命令
``` bash
# config locate in: src/config/config.json
development: {
  host: '127.0.0.1',
  database: 'exam',
  user: 'root',
  password: ''
}

# 安装依赖
yarn

# 运行
npm run start

# 构建
npm run build

# 测试
npm run test


```
# 注意
sequelize.sync({force:false})会自动创建不存在的表结构，但无法检测到表结构的更改

# migration
数据库表进行修改后，在migration目录下新建一个文件，编写migration文件

npm run migrate // 进行数据库结构更新

## DOC
you can visualize the doc and test the api using Swagger Doc through web browser.

URL are as below

[http://swagger.daguchuangyi.com/?url=http://localhost:3010/swagger.json#!]
(http://swagger.daguchuangyi.com/?url=http://localhost:3010/swagger.json#!)

## 项目结构
```
/src              项目源码文件夹
  /models         使用mongoose定义的model的目录
  /routes         项目路由文件目录
  /utils          封装的工具函数目录
  config.js         配置文件
  log.js            export了一个log模块
  main.js           程序入口文件
package.json      
README.md
.babelrc
.eslintrc
```

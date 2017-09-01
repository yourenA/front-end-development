# koa2-generator

目录
----
```bash
.
├── bin # 启动项目
├── db  # 数据库相关 （无论koa 还是express 这个目录都适用）
│   ├── controller # 操作数据库
│   │       ├── users    # 某一个数据库操作
│   │       │      ├── index.js            # 导出某一个数据库操作，引入usersProvider.js
│   │       │      ├──usersProvider.js    # 进行条件判断，引入usersPersistence.js
│   │       │      └── usersPersistence.js # 进行数据库操作，返回最后结果
│   │       └── index.js # 导出所有数据库操作
│   ├── sequelize # 定义数据库
│   │       ├── migrations  # 定义 sequelize 数据迁移文件
│   │       ├── models      # 定义 sequelize models 和 sequelize 入口文件
│   │       ├── seeders     # 定义 sequelize 数据迁移文件
│   │       └── config.json # 配置 sequelize 相关属性
│   └── language # 定义操作返回的info
├── public # 静态文件目录
├── routes # 路由操作目录
│   ├── controller # 操作路由
│   │       └── usersCtrl  # 引入db.controller , 接收api.js的 ctx , 返回 ctx.body
│   ├── api.js     # '/api'路由
│   └── index.js   # '/'路由
├── util  # 存放公共方法
├── views # 视图模板
├── .gitignore   # 定义 git 忽略文件
├── .sequelizerc # 定义 sequelize 生成目录
└── app.js       # 项目主目录

```

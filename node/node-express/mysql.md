# mysql

## node mysql
>node 进行操作前要先确定已经连接mysql数据库和数据库中有相关表，可使用mysql可视化工具'Navicat for MySQL'

## 常用mysql语句
>安装mysql后使用'MySQL Command Line Client'可以进入mysql命令行;注意命令行后面要有';'

#### 查找
```
SELECT * FROM tb_name WHERE id=2
SELECT * FROM tb_name WHERE field1 REGEXP '^[A-D]'   //找出以A-D 为开头的name
SELECT * FROM tb_name order by field1 [desc] //根据name 排序
SELECT * from tb_name limit (start-1)*limit,limit; 其中start是页码，limit是每页显示的条数。SELECT * FROM table LIMIT [offset,] rows
SELECT * FROM tb_name WHERE name LIKE '%name%' 
SELECT count as totalcount from tb_name
SELECT max/min(field1) as maxvalue from tb_name  //求field1中的最大/最小值
SELECT sex,count(sex) from tb_name group by sex;
```

#### 插入
```
INSERT INTO tb_name(id,name,score) VALUES(NULL,'张三',140),(NULL,'张四',178),(NULL,'张五',134); //插入多条数据直接在后边加上逗号，直接写入插入的数据即可
```


#### 更新
```
UPDATE tb_name SET score=189 WHERE id=2;
UPDATE tablename SET columnName=NewValue [ WHERE condition ]
```

#### 删除
```
DELETE FROM tb_name WHERE id=3;
```

## 使用sequelize操作数据库
我们读写的都是JavaScript对象，Sequelize帮我们把对象变成数据库中的行。
```
用Sequelize查询pets表，代码像这样：
Pet.findAll()
   .then(function (pets) {
       for (let pet in pets) {
           console.log(`${pet.id}: ${pet.name}`);
       }
   }).catch(function (err) {
       // error
   });
```

### 安装sequelize
```
$ npm install --save sequelize
$ npm install --save mysql // 因为MySQL是驱动，所以也需要安装
```

### 建立连接
```
var Sequelize = require('sequelize');//注意mysql是驱动，我们不直接使用，但是sequelize会用。
var config = require('.././config/config');
//第一步，创建一个sequelize对象实例：
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.passwd,
    {
        'dialect': 'mysql', //因为MySQL是驱动，所以这里要使用'mysql'
        'host': config.db.host,
        'port': config.db.port,
        'pool': {
            max: 5, // 连接池中最大连接数量
            min: 0, // 连接池中最小连接数量
            idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        }
    }
);

module.exports=sequelize;
```

### 定义model

model定义格式为sequelize.define('name', {attributes}, {options})：
```
var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model 对应的表名将与model名相同
});

User.sync({force: true}).then(function () {
  // 已创建数据表
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
```

### 使用model操作数据库

>通过Sequelize获取的模型对象都是一个DAO（Data Access Object）对象，这些对象会拥有许多操作数据库表的实例对象方法（比如：save、update、destroy等），
>需要获取“干净”的JSON对象可以调用.get({'plain': true})。


#### find

* 按已知 id查找,findById
```
Project.findById(123).then(function(project) {
  // project 是一个 Project 实例，且包含存储在数据中的数据
  // 当不存在 id 为123的记录时 project 为 null
})
```

* 按属性查找,findOne
```
Project.findOne({ where: {title: 'aProject'} }).then(function(project) {
  // project 是匹配到的第一个 title 为 'aProject' 的 Projects 或 null
})
```

* findOrCreate可用于检测一个不确定是否存在的元素，如果存在则返回记录，不存在时会使用提供的默认值新建记录。
```
User
  .findOrCreate({where: {username: 'itbilu.com'}, defaults: {job: 'Technical Lead JavaScript'}})
  .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
    /*
      {
        username: 'itbilu.com',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
    */
  })
```

* findAndCountAll - 从数据库中查找多个元素，返回数据与记录总数
```
Project
  .findAndCountAll({
     where: {
        title: {
          $like: 'foo%'
        }
     },
     offset: 10,
     limit: 2
  })
  .then(function(result) {
    console.log(result.count);
    console.log(result.rows);
  });
```
* findAll - 从数据库中查找多个元素
- attributes查询返回的字段
    - include:包括
    - exclude:剔除
```
// 通过指定属性查找
Project.findAll({  attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']] }， exclude: ['baz'] , where: { name: 'A Project' } }).then(function(projects) {
// projects 是一个包含 Project 实例的数组
})

```
```
'attributes': [
        'emp_id', ['nick', 'user_nick'] //重命名SELECT `emp_id`, `nick` AS `user_nick` FROM `users`;
    ]
```

* count / max / min / sum 

#### 增加
 
* 非持久化 
```
var user = User.build({
    'emp_id': '1',
    'nick': '小红',
    'department': '技术部'
});
user.save().then(function(save_user){
   //save_user 已经保存后
});
```
* 持久化
```
    User.create({
        'emp_id': '1',
        'nick': '小红',
        'department': '技术部'
   }).then(function(user) {
        // user为创建的实例
   });
```

#### update

* 非持久化
```
task.title = 'foooo'
task.description = 'baaaaaar'
task.save({fields: ['title']}).then(function() {
 // 现在 title 是 'foooo' 但是 description 还是和以前一样
})
```

* 持久化
```
task.update({ title: 'foooo', description: 'baaaaaar'}, {fields: ['title']}).then(function() {
 // 现在 title 是 'foooo' 但是 description 还是和以前一样
})
```

#### destroy
```
Post.destroy({
  where: {
    status: 'inactive'
  }
});
// DELETE FROM post WHERE status = 'inactive';
```

### model之间的关联
```源模型.method(目标模型)```

* Model.belongsTo() － 属于
BelongsTo关联表示一对一关系的**外键存在于源模型**。
```
var Player = this.sequelize.define('player', {/* attributes */})
  , Team  = this.sequelize.define('team', {/* attributes */});

Player.belongsTo(Team); // 会为Player添加一个teamId 属性以保持与Team 主键的关系,teamId 源于define()的第一个字符串参数

User.belongsTo(Team, {as: 'role'}); // 会为 user添加 roleId 属性而不是 teamId

User.belongsTo(Team, {foreignKey: 'fk_company'}); // 为User 添加fk_company 外键

```

* Model.hasOne() － 拥有一个
HasOne关联表示一对一关系的**外键存在于目标模型**。
```
var User = sequelize.define('user', {/* ... */})
var Project = sequelize.define('project', {/* ... */})
 
// hasOne 关系
Project.hasOne(User)

/*
  在这个示例中，hasOne会添加一个projectId 属性到User模型中
  另外，Project.prototype 中会增加根据传入的第一个定义参数生成的访问器方法 getUser 和 setUser 置。
  如果启用了underscore 设置，添加的属性会是 project_id 而不是 projectId.
  外键会存在于users 表中
  */
```

* Model.hasMany() － 拥有多个
一个源模型连接多个目标模型
```
var User = sequelize.define('user', {/* ... */})
var Project = sequelize.define('project', {/* ... */})
 
// 定义 hasMany 关联
Project.hasMany(User, {as: 'Workers'})
```
会向 User 中添加一个projectId或project_id属性。Project 的实例中会有访问器getWorkers 和 setWorkers。

* Model.belongsToMany() － 多对多
一个源模型连接多个目标模型。而且，目标模型也可以有多个相关的源。
```
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
```
这会创建一个新模型UserProject其中会projectId和userId两个外键。是否使用驼峰命名取决与相关联的两个表。
定义through选项后，Sequelize会尝试自动生成名字。
在本例中，会为User添加方法 getUsers, setUsers, addUser,addUsers to Project, and getProjects, setProjects, addProject, and addProjects

## 使用 sequelize-cli 生成 sequelize

使用步骤
1. 安装 sequelize 、mysql2 、 sequlize-cli ,可以全局安装sequlize-cli
2. 配置 .sequelizerc ,指定 sequelize init 初始化的文件夹
```
const path = require('path')

module.exports = {
    'config': path.resolve('./app','config.json'),
    'migrations-path': path.resolve('./app','migrations'),
    'models-path': path.resolve('./app','models'),
    'seeders-path': path.resolve('./app','seeders'),
}
```

3. 执行 sequelize init 命令
```
$ node_modules/.bin/sequelize init 或 sequelize init 
```
上面的命令会在app目录自动生成migrations，models/index.js，seeders,config.json

4. 创建model (可以自己手动创建) 在models中创建表
```
sequelize model:create --name Todo --attributes 'text:string,complete:boolean,UserId:integer'
```
上面的命令会在migrations和models下面生成相关的js文件

将 models/index.js 中的associate改为下面的形式
```
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db);
  }
});
```
5. 将migrations中的文件转变思维数据库的表或者初始化数据数据，一般用于有外键约束的表初始化。在migrations中插入有外键表数据

有外键约束的表(在migrations的js文件中各表之间有id链接)，使用sequelize db:migrate一定要确保表是新表(保证外键id正确)
```
sequelize db:migrate
```
>sequelize db:migrate相同的文件只能运行一次。 在配置文件中添加 "migrationStorage": "json" 可改变sequelizeMetade 存储形式，可以在sequelize-meta.json查看到成功migrate的文件名。
>避免migrate出错。多次sequelize db:migrate会添加多次内容，可能导致出错

migrations文件中操作，需要自己去修改
- queryInterface.createTable() 创建表
- queryInterface.addColumn() 添加字段
- queryInterface.bulkInsert() 插入内容
- ...


6. 在model/index.js 中添加 ```sequelize.sync();```连接数据库(要确保数据库中有此数据库) 

7. 在seeders中文件内容转变为表中内容(不是初始化表内容)，第一次使用时可用于普通没有外键约束的表初始化 。在seeders中插入普通表数据
```
sequelize db:seed:all //执行多次就会添加多次内容
```
上面的命令会将seeders中的js文件转变为表中初始化数据
文件模板20161123070819-user-seed.js 需要自己去修改。相关文件不能使用es6语法，否则会报错
```
'use strict';
var password ='123456';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('user', [ //向指定的表插入内容
        {'name': "admin",'password':password,'permission':2 ,'created_at': new Date(), 'updated_at': new Date() } //每一行的内容
      ], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

```



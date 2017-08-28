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
```
// 通过指定属性查找
Project.findAll({ where: { name: 'A Project' } }).then(function(projects) {
// projects 是一个包含 Project 实例的数组
})

```

* count / max / min / sum 

#### create 
```
    User.create({
       mail: mail,
       name: name,
       passwd: passwd_code
   }).then(function(user) {
        // user为创建的实例
   });
```


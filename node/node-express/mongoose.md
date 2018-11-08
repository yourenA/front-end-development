# mongoose
>要先使用 ```$ mongod --dbpath /d/mongodb/data```链接到mongodb数据库(后面为储存数据路径)

## 名词解释

- Schema :一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
- Model  :由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
- Entity :由Model创建的实体，他的操作也会影响数据库 Entity=new Model()

Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
##  创建连接mongodb

db.js
```
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';

/**
 * 连接
 * mongoose.connect(uri(s), [options], [options.useMongoClient], [callback])
 */
mongoose.connect(DB_URL);

/**
  * mongoose.connection.on()监听了几个事件,
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

module.exports = mongoose;
```

##  Schema [ˈski:mə] 
schema是mongoose里会用到的一种数据模式，可以理解为**表结构**的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力

user.js
```
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
//每个Schema都会默认配置_id属性，除非自己定义，方可覆盖
var UserSchema = new Schema({          
   username : { type: String , index: true},       //用户账号index ：建索引
   userpwd: {type: String},                        //密码
   userage: {type: Number},                        //年龄
   logindate : { type: Date, default:Date.now}     //default：默认值
});

UserSchema.methods.speak = function(){
  console.log('我的名字叫'+this.username);//this表示当前scheme
}

```
Schema 每一个字段属性
- type : 类型
    - String
    - Number
    - Boolean | Bool
    - Array
    - Buffer
    - Date
    - ObjectId | Oid
    - Mixed
- index : 是否索引
- default : 初始值
- required : 是否必须

### 使用Schema的pre方法来保证保存以前可以调用执行一段特定的代码
```
// 保存之前执行的代码 Schema.pre('method',callback(next))
userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;//this表示当前scheme ，可以通过修改this.paramName=xxx 修改某个属性
    }
    next();
});
```

### Schema 实例方法 SchemaName.methods.methodName=callback(cb)
创造的Schema不仅要为后面的Model和Entity提供公共的属性，还要提供公共的方法。
```
PersonSchema.methods.findSimilarTypes = function(cb){
   return this.model('Person'①).find({type:this.type},cb);//从model寻找type.this为实例
}
使用
var PersonModel = mongoose.model('Person'①,PersonSchema);
var krouky = new PersonSchema({name:'krouky',type:'前端工程师'});//Schema 实例,
//实例krouky.methodName
krouky.findSimilarTypes(function(err,persons){
   //persons中就能查询到其他前端工程师
});
```
>注意！必须要在schema被mongoose.model()转换成model之前给它添加方法

## Model

定义好了Schema，接下就是生成Model。
```
//将Schema发布为Model
module.exports = mongoose.model('User',UserSchema);//UserSchema为schema名，User表名
```
对上面的定义的user的schema生成一个User的model并导出
model是由schema生成的模型，可以对数据库的操作

### Model 静态方法 SchemaName.statics.staticMethodName=callback('xxx',cb)
```
PersonSchema.statics.findByName = function(name,cb){
  this.find({name:new RegExp(name,'i'),cb});  //this 表示当前model
}
var PersonModel = mongoose.model('Person',PersonSchema);
//PersonModel.staticMethodName()
PersonModel.findByName('krouky',function(err,persons){
  //找到所有名字叫krouky的人
});
```

## 常用数据库操作
### 插入save([callback])
* callback参数为err和result

如果是Entity，使用save方法，如果是Model，使用create方法
```
  //使用Entity来增加一条数据
    var krouky = new PersonModel({name:'krouky'}); //new modelName({})创建一个实例
    krouky.save(callback);
    //使用Model来增加一条数据
    var MDragon = {name:'MDragon'};
    PersonModel.create(MDragon,callback);
```
>两种新增方法区别在于，如果使用Model新增时，传入的对象只能是纯净的JSON对象，不能是由Model创建的实体

### 更新Model.update(wherestr, updatestr, [options], [callback])//Model为引入的User
* wherestr:条件的字段{name:value}
* updatestr:更新的字段{name:value}
* callback:参数为err和result
```
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'zzzz'};
    
    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
```

可以使用$set属性来配置，这样也不用先查询，如果更新的数据比较少，可用性还是很好的
```
PersonModel.update({_id:_id},{$set:{name:'MDragon'}},function(err){});
```

### 更新Model.findByIdAndUpdate(id, [updatestr], [options], [callback])
* id:根据_id
* updatestr:更新的字段{name:value}
* callback:参数为err和result

```
    var id = '56f2558b2dd74855a345edb2';
    var updatestr = {'userpwd': 'abcd'};
    
    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
```
### 根据id寻找实例
```
PersonModel.findById(id,function(err,person){//第二参数person为实例
  person.name = 'MDragon'; //直接修改实例的属性
  person.save(function(err){});//修改后再保存
});
```


### 更新Model.findOneAndUpdate(wherestr, updatestr, [options], [callback])
* wherestr:条件的字段{name:value}
* updatestr:更新的字段{name:value}
* callback:参数为err和result

### 删除Model.remove(wherestr, [callback])
* wherestr条件的字段{name:value}
* callback参数为err和result
res中会返回是否成功以及影响的行数：{"ok":1,"n":1}

### 删除Model.findByIdAndRemove(id, [options], [callback])　　　　　　
* id根据_id
* callback参数为err和result

### 删除Model.findOneAndRemove(wherestr, [options], [callback])
* wherestr条件的字段{name:value}
* callback参数为err和result

## 查询
Model.find()---找到所有符合添加的文档并返回一个表单, Model.findOne()---返回首先找到的单个文档,Model.findById()---通过ID(唯一)来查找。
当查询比较复杂时，用 where：
```
Model
.where('age').gte(25)
```
### 条件查询Model.find(wherestr, [fields], [options], [callback])
* wherestr条件的字段{name:value}
* [fields]  var opt = {"username": 1 ,"_id": 0};输出只会有username字段，设置方法如上，1表示查询输出该字段，0表示不输出
```
var User = require("./user.js");
function getByConditions(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.find(wherestr,opt, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByConditions();

User.find({userage: {$gte: 21, $lte: 65}}, callback);    //这表示查询年龄大于等21而且小于等于65岁
```
### 模糊查询
```
  var whereStr = {'username':{$regex:/m/i}};//$regex 正则，用于模糊查询 //查询所有用户名中有'm'的名字，且不区分大小写
    
    User.find(whereStr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
```

### 数量查询Model.count(wherestr, [callback])

### 根据_id查询 Model.findById(id, [fields], [options], [callback])
```
  var id = '56f261fb448779caa359cb73';
    User.findById(id, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
```

## 分页查询

```
    var pageSize = 5;                   //一页多少条 limit
    var currentPage = 1;                //当前第几页
    var sort = {'logindate':-1};        //排序（按登录时间倒序） sort
    var condition = {};                 //条件 find 
    var skipnum = (currentPage - 1) * pageSize;   //跳过数 skip 
    
    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
```

## 使用,exec代替回调
```
var Person = mongoose.model('Person', yourSchema);

// find each person with a last name matching 'Ghost'
var query = Person.findOne({ 'name.last': 'Ghost' });//query为查询的结果

// selecting the `name` and `occupation` fields
query.select('name occupation');//select 选取返回结果的某些字段

// execute the query at a later time
query.exec(function (err, person) { //exec 执行操作
  if (err) return handleError(err);
  console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
})
```

```
Person //Modal，链式调用
.find({ occupation: /host/ })
.where('name.last').equals('Ghost') //where()参数为魔偶一个字段，后面为选择的条件， equals:相等
.where('age').gt(17).lt(66) //gt:大于 lt：小于，$lte：小于等于
.where('likes').in(['vaporizing', 'talking']) in: 在数组内
.limit(10) //输出条数限制
.sort('-occupation') // sort:排序 '-'为降序
.select('name occupation') //select 选取返回结果的某些字段
.exec(callback); // exec: 执行上面的操作
```

排序
```
// sort by "field" ascending and "test" descending
query.sort({ field: 'asc', test: -1 });
// equivalent
query.sort('field -test');
```

## 建立多个modal模型关联
```
//博客schema
var blogSchema = new mongoose.Schema({
    title: {type: String}, //博客题目
    abstract: {type: String}, //摘要
    content: {type: String}, //文章内容
    click: {type: Number},//点击量
    createtime: {type: String} //创建时间
})

//创建model,第三个参数是实际表名
var blogModel = db.model("blog", blogSchema, "blog");

//标签表
var labelSchema = new mongoose.Schema({
    blogid: {type: mongoose.Schema.Types.ObjectId, ref: 'blog'},
    //这里即为子表的外键，关联主表。ref后的blog代表的是主表blog的Model。
    //被关联的model的 type 必须是 ObjectId, Number, String, 和 Buffer 才有效)
    label: {type: String} //标签名
});

//创建model,第三个参数是实际表名
var labelModel = db.model("label", labelSchema, "label");

//1.主表插入数据
blogModel.create({...}, function (err, doc) {
   if(err) return xxx;
   //2.子表插入数据。 blogid为刚插入主表的主键doc._id
   labelModel.create({blogid: doc._id, label: label}, function (err, doc) {
       if (err) return xxx;
   })
})
```

## 嵌套的populate处理数据
假设有如下mongodb的schema定义：
```
drawApply = new Schema({
    salesId: { type: Schema.ObjectId, ref: 'sales' },//表drawApply的salesId属性指定表sales的_id
    money: Number,
    status: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now }
});

sales = new Schema({
    name: { type: String, required: true, unique: true },
    pwd: String,
    phone: String,
    merchant: { type: Schema.ObjectId, ref: 'merchant' },//表sales的属性merchant指定表merchant的_id
    status: { type: Number, default: 0 }
});

merchant = new Schema({
    name: String,
    sname: String,
    type: String
});
```
表drawApply的salesId属性指定表sales的_id，表sales的属性merchant指定表merchant的_id。这是一种嵌套级联的关系。
查找drawApply表的数据，并同时返回对应的sales表的数据，可以使用下面的方法：
```
//假设drawApply为modal
drawApply.find().populate('salesId', '_id name phone merchant').sort({createTime: -1}).exec(function(err, list) {
  // list of drawApplies with salesIds populated
});
```
返回的结果中除了drawApply表的数据外，还会包含salesId中_id，name，phone，merchant四个属性的值。但是merchant属性的值是以ObjectId的形式显示的，如果想知道对应的merchant其它属性的值，则需要使用到嵌套的populate。代码如下：
```
drawApply.find()
.populate({
    path: 'salesId',// 指定drawApply中要填充的关联字段
    select: '_id name phone merchant',//在sales需要返回的字段
    model: 'sales',//在什么modal中获取数据
    populate: {
        path: 'merchant',
        select: '_id sname',
        model: 'merchant'
    }).sort({createTime: -1}).exec(function(err, list) {
  // list of drawApplies with salesIds populated and merchant populated
});
```

## mongoose 有两种调用方式
1. callback
```
a.js
回调形式，外面
function getAll(cb){
    xxModel.find({},cb);
}
module.exports.getAll=getAll;

b.js
var a=require('a');
a.getAll(function(err,result){
    console.log(result);
})
```
2. promise
```
a.js
function getAll() {
  return Person.find({}).exec();
}

b.js
var a=requre('a');
a.getAll().then(fnction(rseult){
    console.log(result);
}).catch(function(err){
    console.log(err);
})
```




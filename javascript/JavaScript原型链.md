### 什么是原型
原型(prototype)其实就是一个特殊的对象，在声明函数的时候自动创建的。

而这个对象的用途就是包含可以由特定类型的所有实例共享的属性和方法。
```
//声明Person函数的时候会自动创建Person函数的原型对象(Person.prototype)
function Person () {} 
Person.prototype.name = "张三";//Person共享属性
Person.prototype.age = 20;//Person共享属性
```

原型对象中有一个属性constructor，这个属性指向的是这个构造函数
![image](https://img-blog.csdn.net/20181014202412732?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODY1NDMzNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### _ _proto_ _ 与 prototype
* **prototype 是函数中才有的属性**
* **_ _proto_ _ 是所有对象都有的属性**

函数中的 prototype 属性指向的是它的原型对象。使用new来创建对象的时候，对象中的 _ _proto_ _ 属性是指向它的构造函数的原型对象
```
function Person () {};
// 可以使用Person.prototype 直接访问到原型对象
Person.prototype.name = "张三";
Person.prototype.age = 20;

//Person函数也是一个对象
Person.__proto__===Function.prototype //true

//p1实例对象
var p1 = new Person();
p1.__proto__===Person.prototype //true
Person.prototype.constructor===Person //true
```

### 使用原型共享属性，节省内存空间
```
function Animal() {
    this.name = '动物'
    this.eat = function() {
        console.log('在吃···')
    }
}
var a1 = new Animal()
var a2 = new Animal()

console.log(a1.eat === a2.eat)  // false
```
 每个对象的 eat 方法不是同一个，但方法类容一样，浪费内存。使用原型解决：
 ```
 function Animal(name) {
     this.name = '动物'
 }
 Animal.prototype.eat = function() {
     console.log('吃')
 }
 
 var a1 = new Animal()
 var a2 = new Animal()
 
 console.log(a1.eat === a2.eat)  //true
 ```
 
### 原型继承
* 访问对象的属性会沿着对象的原型链找下去
* 原型可以共享属性和方法，是继承的基础
```
  <script type="text/javascript">
        function students () {        
        }
        // 可以使用students.prototype 直接访问到原型对象
        //给students函数的原型对象中添加一个属性 name并且值是 "张三"
        students.prototype.name = "张三";
        students.prototype.age = 20;
 
        var stu = new students();
        /*
            访问stu对象的属性name，虽然在stu对象中我们并没有明确的添加属性name，但是
            stu的__proto__属性指向的原型中有name属性，所以这个地方可以访问到属性name
            就值。
            注意：这个时候不能通过stu对象删除name属性，因为只能删除在stu中的对象。
        */
        alert(stu.name);  // 张三
 
        var stu1 = new students();
        alert(stu1.name);  // 张三  都是从原型中找到的，所以一样。
 
        alert(stu.name === stu1.name);  // true
 
        // 由于不能修改原型中的值，则这种方法就直接在stu中添加了一个新的属性name，然后在stu中无法再访问到原型中的属性。
        stu.name = "李四";
        alert(stu.name); //李四
        // 由于stu1中没有name属性，则对stu1来说仍然是访问的原型中的属性。    
        alert(stu1.name);  // 张三  
   </script>
```


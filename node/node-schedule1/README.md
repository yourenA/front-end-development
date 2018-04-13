# node-schedule

[https://github.com/node-schedule/node-schedule](https://github.com/node-schedule/node-schedule)

创建定时任务，安排任务（任意函数）在特定日期执行

## Cron风格定时器
```
* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ │
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
6个占位符从左到右分别代表：秒、分、时、日、月、周几

```'*'```表示通配符，匹配任意，当秒是'*'时，表示任意秒数都触发，其它类推

```
每分钟的第30秒触发： '30 * * * * *'

每小时的1分30秒触发：'30 1 * * * *'

每天的凌晨1点1分30秒触发：'30 1 1 * * *'

每月的1日1点1分30秒触发：'30 1 1 1 * *'

2018年的4月111日14点10分30秒触发：'30 10 14 11 4 * 2018'

每周1的1点1分30秒触发：'30 1 1 * * 1'

每小时的42分执行：'42 * * * *' 默认0秒

每五分钟触发一次：'*/5 * * * *'
```

## schedule.scheduleJob 定义任务
```
var schedule = require('node-schedule');

var j = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
```

## 通过 RecurrenceRule() 定义任务
```
var rule1     = new schedule.RecurrenceRule();  
var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule1.second  = times1;  
schedule.scheduleJob(rule1, function(){  
  //do something
});  
```

## 直接使用时间定义任务
```
var schedule = require('node-schedule');
var date = new Date(2012, 11, 21, 5, 30, 0);

var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});

```

## 取消任务
```
j.cancel();   
```




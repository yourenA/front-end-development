let Nightmare = require('nightmare')
let Screenshot = require('nightmare-screenshot');
let fs=require('fs');
let path=require('path')
let nightmare = new Nightmare({
    show: true,
    waitTimeout: 300000, // in ms
    executionTimeout:300000,//等待.evaluate()语句完成的最长时间。
    openDevTools: {
        mode: 'detach'
    },
})
// mocha -t 300000 getTuc.js (-t设置mocha超时时间)
nightmare
    .goto('https://tuchong.com/1608305/followers/')
    .viewport(1920, 900)
    .evaluate((selector, done) => { //evaluate在浏览器中处理，如果参数大于传进来的参数，最后一个参数为callback
        //针对浏览器前端，在网页调试工具中显示
        var resultArr=[]
        function handle() {
            document.body.scrollTop = document.body.scrollTop + window.innerHeight;//滚动页面
            var inspector = document.querySelector('.icon-end');
            if (window.getComputedStyle(inspector, null)['display'] === 'block') {//出现"没有跟多"图标
                var itemLen=document.querySelectorAll('.col-item').length;
                for(var i=0;i<itemLen;i++){
                    resultArr.push(document.querySelectorAll('.nick-name')[i].text)
                }
                done(null, JSON.stringify(resultArr))//done的第二个参数向then传递的参数

            } else {
                console.log('正在加载......')
                setTimeout(handle, 500);
            }
        }

        setTimeout(handle, 500);

    },null)//外面的参数要经过这里传进evaluate里面，不能在evaluate里面直接使用
    .then(result =>{
        //写入文件
        var file = path.join(__dirname, 'fensi.json');
        fs.writeFile(file, result, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('文件创建成功，地址：' + file);
        });
    } )
    .catch(err => console.error(err))
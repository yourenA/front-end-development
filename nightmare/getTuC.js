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

nightmare
    .goto('https://tuchong.com/1608305/following/')
    .viewport(1920, 900)
    .evaluate((selector, done) => {
        //针对浏览器前端，在网页调试工具中显示
        var resultArr=[]
        function handle() {
            document.body.scrollTop = document.body.scrollTop + window.innerHeight;
            var inspector = document.querySelector('.icon-end');
            if (window.getComputedStyle(inspector, null)['display'] === 'block') {
                console.log('加载完成')
                var itemLen=document.querySelectorAll('.col-item').length;
                for(var i=0;i<itemLen;i++){
                    resultArr.push(document.querySelectorAll('.nick-name')[i].text)
                }
                console.log('resultArr',JSON.stringify(resultArr))
                done(null, JSON.stringify(resultArr))

            } else {
                console.log('正在加载......')
                setTimeout(handle, 500);
            }


        }

        setTimeout(handle, 1000);

    },null)
    .then(result =>{
        console.log(result )
        //写入文件
        var file = path.join(__dirname, 'guanzhu.json');
        fs.writeFile(file, result, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('文件创建成功，地址：' + file);
        });
    } )
    .catch(err => console.error(err))
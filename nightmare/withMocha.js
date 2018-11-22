/**
 * Created by Administrator on 2018/11/9.
 */
let Nightmare = require('nightmare')
let expect = require('chai').expect;
let fs = require('fs');
let path = require('path')
// mocha -t 300000 withMocha.js (-t设置超时时间)
describe('获取图虫信息', function () {
    /*it('测试', function(done){
     let nightmare = new Nightmare({
     show: true,
     openDevTools: {
     mode: 'detach'
     },
     })

     nightmare
     .goto('https://www.baidu.com/')
     .viewport(1920, 900)
     .type('#kw', 'nightmare')
     .click('#su')
     // .type('body', '\u000d')
     .wait('#content_left')
     .evaluate(() =>
     document.title
     )
     .end()
     .then((link) => {
     expect(link).to.equal('nightmare_百度搜索');
     done();
     })
     });*/
    it('获取粉丝数', function (done) {
        let nightmare = new Nightmare({
            show: true,
            waitTimeout: 300000, // in ms
            executionTimeout: 300000,//等待.evaluate()语句完成的最长时间。
            openDevTools: {
                mode: 'detach'
            },
        })
        nightmare
            .goto('https://tuchong.com/1608305/followers/')
            .viewport(1920, 900)
            .evaluate((selector, done) => {
                //针对浏览器前端，在网页调试工具中显示
                var resultArr = []

                function handle() {
                    document.body.scrollTop = document.body.scrollTop + window.innerHeight;
                    var inspector = document.querySelector('.icon-end');
                    if (window.getComputedStyle(inspector, null)['display'] === 'block') {
                        console.log('加载完成')
                        var itemLen = document.querySelectorAll('.col-item').length;
                        for (var i = 0; i < itemLen; i++) {
                            resultArr.push(document.querySelectorAll('.nick-name')[i].text)
                        }
                        console.log('resultArr', resultArr.length)
                        done(null, JSON.stringify(resultArr))//这个done来自于evaluate的callback参数

                    } else {
                        console.log('正在加载......')
                        setTimeout(handle, 500);
                    }
                }

                setTimeout(handle, 1000);

            }, null)
            .then(result => {
                console.log('粉丝总数：', JSON.parse(result).length)
                //写入文件
                var pathname = path.join(__dirname, 'daijiaruFS.json');
                fs.writeFile(pathname, result, function (err) { //fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）
                    if (err) {
                        return console.log(err);
                    }
                    console.log('文件写入成功：' + pathname)
                    expect(result).to.exist
                    done(); //这个done来自于it的callback参数
                });
                //使用statSync，没有callback，返回的实例就是fs.Stats
                // fs.stat(pathname, (err, status) => {
                //     console.log('status', status)
                //     if (err) {
                //         console.log('err', err)
                //     }
                //     fs.writeFile(pathname, result, function (err) { //fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）
                //         if (err) {
                //             return console.log(err);
                //         }
                //         console.log('文件写入成功：' + pathname)
                //         expect(result).to.exist
                //         done();
                //     });
                //
                // });


            })
            .catch(err => console.error(err))
    })
    it('获取关注数', function (done) {
        let nightmare = new Nightmare({
            show: true,
            waitTimeout: 300000, // in ms
            executionTimeout: 300000,//等待.evaluate()语句完成的最长时间。
            openDevTools: {
                mode: 'detach'
            },
        })
        nightmare
            .goto('https://tuchong.com/1608305/following/')
            .viewport(1920, 900)
            .evaluate((selector, done) => {
                //针对浏览器前端，在网页调试工具中显示
                var resultArr = []

                function handle() {
                    document.body.scrollTop = document.body.scrollTop + window.innerHeight;
                    var inspector = document.querySelector('.icon-end');
                    if (window.getComputedStyle(inspector, null)['display'] === 'block') {
                        console.log('加载完成')
                        var itemLen = document.querySelectorAll('.col-item').length;
                        for (var i = 0; i < itemLen; i++) {
                            resultArr.push(document.querySelectorAll('.nick-name')[i].text)
                        }
                        console.log('resultArr', resultArr)
                        done(null, JSON.stringify(resultArr))

                    } else {
                        console.log('正在加载......')
                        setTimeout(handle, 500);
                    }
                }

                setTimeout(handle, 1000);

            }, null)
            .then(result => {
                console.log('关注总数：', JSON.parse(result).length)
                //写入文件
                var file = path.join(__dirname, 'daijiaruGZ.json');
                fs.writeFile(file, result, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log('关注文件创建成功，地址：' + file);
                });
                expect(result).to.exist
                done();
            })
            .catch(err => console.error(err))
    })
});
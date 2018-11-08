/**
 * Created by Administrator on 2018/11/8.
 */
let fensi=require('./fensi.json');
let guanzhu=require('./guanzhu.json')
let difference=require('lodash/difference')

let Nightmare = require('nightmare')
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
var differenceItems=difference(guanzhu,fensi)
console.log(differenceItems)
nightmare
    .goto('https://tuchong.com/community')
    .viewport(1920, 900)
    .click('.nav-login')
    .wait('.login-weixin')
    .click('.login-weixin')
    .wait('.supnav-list .nav-user')
    .wait(1000)
    .click('.user-info')
    .wait('.personal-banner-info')
    .click('.slash-list .slash-item:nth-of-type(2) a')
    .evaluate((differenceItems, done) => {
        //针对浏览器前端，在网页调试工具中显示
        console.log('ready')
        // function handle() {
        //     document.body.scrollTop = document.body.scrollTop + window.innerHeight;
        //     var inspector = document.querySelector('.icon-end');
        //     if (window.getComputedStyle(inspector, null)['display'] === 'block') {
        //         console.log('加载完成')
        //         var itemLen=document.querySelectorAll('.col-item').length;
        //         for(let i=0;i<itemLen;i++){
        //             let text=document.querySelectorAll('.nick-name')[i].text;
        //             if(differenceItems.indexOf(text)>=0){
        //                 console.log('index',i,' name:',text);
        //                 document.querySelectorAll('.card-body-top .btn')[i].click()
        //             }
        //         }
        //         done(null)
        //
        //     } else {
        //         console.log('正在加载......')
        //         setTimeout(handle, 500);
        //     }
        //
        //
        // }
        //
        // setTimeout(handle, 1000);

    },differenceItems)
    .evaluate(() => document.title)
    // .end() //因为要循环，所以这里不能用end
    // .then()在控制台显示
    .then(title => console.log(`${title} => 加载完成` ))
    .catch(err => console.error(err))
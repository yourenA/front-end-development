/**
 * Created by Administrator on 2018/11/21.
 */
var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: true,//显示electron窗口
    openDevTools: {
        mode: 'detach'
    },
});

nightmare
//加载页面
    .goto('http://roll.news.qq.com/')
    .wait(function () {
        return document.querySelectorAll("#artContainer li").length > 0;//通过新闻列表的长度，来判断页面是否加载完成
    })
    .inject('js', 'jquery.min.js')//插入jquery，Injects a local file onto the current page. The file type must be either js or css.
    .wait(function () {
        window.qqNews = [];
        page = $("#totalPage").val();
        return true;//返回true,wait后面的语句才会执行，否则会重复执行wait里面的语句
    })
    .wait(function () {
        console.log('window.qqNews', window.qqNews)
        if (page !== 1) {
            $('#artContainer li').each(function () {
                var title = $(this).find('a').text();
                qqNews.push(title);
            });
            $('#pageArea .f12:contains("下一页")').click();
            page -= 1;
            return false;
        }
        if (page === 1) {
            $('#artContainer li').each(function () {
                var title = $(this).find('a').text();
                qqNews.push(title);
            });
            return true;
        }
        return false;
    })
    .evaluate(function () {
        return qqNews;
    })
    .end()
    .then(function (res) {
        console.log(res, res.length);
    })
    .catch(function (error) {
        console.error('failed:', error);
    });
# nightmare

* **官网**:[http://www.nightmarejs.org/](http://www.nightmarejs.org/)
* **github**:[https://github.com/segmentio/nightmare](https://github.com/segmentio/nightmare)

## 与mocha配合测试脚本
```
import Nightmare from 'nightmare';
import {expect} from 'chai';

describe('test duckduckgo search results', () => {
  it('should find the nightmare github link first', (done) => {
    const nightmare = Nightmare()
    nightmare
      .goto('https://duckduckgo.com')
      .type('#search_form_input_homepage', 'github nightmare')
      .click('#search_button_homepage')
      .wait('#zero_click_wrapper .c-info__title a')
      .evaluate(() =>
        document.querySelector('#zero_click_wrapper .c-info__title a').href
      )
      .end()
      .then((link) => {
        expect(link).to.equal('https://github.com/segmentio/nightmare');
        done();
      })
  });
});
```

## 部分常用API

* Nightmare 实例化 new Nightmare(option)
```
let nightmare = new Nightmare({
    show: true,
    openDevTools: {
        mode: 'detach'
    },
})
```
* *  option.waitTimeout 设置等待超时时间
* *  option.gotoTimeout  设置连接超时时间
* *  option.loadTimeout  页面转换超时时间
* *  option.executionTimeout   执行方法超时时间
* *  option.openDevTools  是否开启控制台，开启需要将设置show: true
* *  option.typeInterval  键盘输入间隔
* *  option.pollInterval  检查wait()的间隔

* .goto(url[, headers])  打开某个页面
* .header(header, value)  设置请求头 
* .forward()  页面后退
* .refresh()  刷新当前页面
* .click(selector)  点击某个选择器
* .mousedown/mouseup/mouseover/mouseout(selector) 鼠标移动操作
* .type(selector[, text])  将文本输入到选择器元素中，也可以触发键盘事件 .type('body', '\u000d') body触发回车键
* .insert(selector[, text])  输入文本
* .check/uncheck(selector)  选择某一个多选框checkbox 
* .select(selector, option)  下拉选择(select选择器，option值)
* .scrollTo(top, left)  滚动条位置
* .viewport(width, height)  设置窗口大小
* .inject(type, file) 注入文件 type为js或css
* .evaluate(fn[, arg1, arg2,...])
* .wait(ms/selector/fn)  等待多少ms/等待直到元素出现/等待直到返回true
 
* .cookies.get(name/query)
* .cookies.set(name, value)
* .cookies.clear([name])
* .cookies.clearAll()

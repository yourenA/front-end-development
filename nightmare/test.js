let Nightmare = require('nightmare')
let Screenshot = require('nightmare-screenshot');
let nightmare = new Nightmare({
    show: true,
    openDevTools: {
        mode: 'detach'
    },
})
nightmare
    .goto('http://localhost:4001/')
    .viewport(1024, 768)
    .wait(1000)
    .type('#username', 'username')
    .screenshot('1.png')
    .type('#password', '123456')
    .screenshot('2.png')
    .check('input[value="男"]')
    .screenshot('3.png')
    .wait(1000)
    .uncheck('input[value="男"]')
    .screenshot('4.png')
    .wait(1000)
    .select('select[name="address"]',"湛江")
    .screenshot('5.png')
    .wait(1000)
    .click('#submit')
    .wait('.mainContent')
    .screenshot('./src/image/6.png',{x: 0, y: 0, width: 100, height: 100})
    .evaluate(() => {
        /* eslint-disable */
        function handle() {
            // 一个叫inspector的button
            var inspector = document.querySelector('#inspector');
            console.log(window.getComputedStyle(inspector, null)['display'])
            if (inspector && window.getComputedStyle(inspector, null)['display'] === 'block') {
                inspector.click();
            }
        }

        setInterval(handle, 1000);
        /* eslint-enable */
    })
    .evaluate(() => document.title)
    // .end() //因为要循环，所以这里不能用end
    .then(title => console.log(`${title} => 加载完成`))
    .catch(err => console.error(err))
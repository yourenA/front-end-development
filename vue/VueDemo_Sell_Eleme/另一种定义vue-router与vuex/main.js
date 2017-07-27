import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './router/routes'
import store from './store/'
import components from './components/' //加载公共组件
import './css/common.css'
import './less/common.less'

//Object.keys 传入对象，返回属性名数组
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    /**
     * Vue.component('my-component', {})
     * 全局注册组件，传入一个选项对象（自动调用 Vue.extend）
     * 如注册全局vHeader组件此时可以在template中使用v-header
     */

    Vue.component(`v${name}`, components[key])
})

//VueRouter用法类似与于express使用中间件
Vue.use(VueRouter)

//创建VueRouter实例
const router = new VueRouter({
    routes
})

//全局路由钩子，根据路由元信息判断是不是要登陆
router.beforeEach((to, from, next) => {
    //设置to.meta初始化为true
    var { auth = true } = to.meta //如果设置的auth，则使用设置的auth
    console.log("to.meta",to.meta)//此时的meta为routes修改过后的meta
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录
    console.log(store.state)
    if (auth && !isLogin && to.path !== '/login') {
        return next({ path: '/login' }) //next实现路由跳转
    }
    next()//确保要调用 next 方法，否则钩子就不会被 resolved。
})

new Vue({ store, router }).$mount('#app')

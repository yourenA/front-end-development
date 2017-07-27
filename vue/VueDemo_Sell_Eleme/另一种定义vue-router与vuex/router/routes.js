import App from '../app'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */

/**
 * require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
 * https://router.vuejs.org/zh-cn/advanced/lazy-loading.html
 * */
/**
 * meta为路由元信息
 * https://router.vuejs.org/zh-cn/advanced/meta.html
 * */
export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', //登录
                meta: { auth: false },
                component: r => require.ensure([], () => r(require('../pages/login/')), 'group-foo')/*异步加载组件的js*/
            },
            {
                path: '/signout', //退出
                component: resolve => require(['../pages/signout/'], resolve)
            },
            {
                path: '/home', //个人主页
                component: resolve => require(['../pages/home/'], resolve)
            },
            {
                path: '/', //首页
                meta: { auth: false },
                component: resolve => require(['../pages/index/'], resolve)
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/login'
            }
        ]
    }
]
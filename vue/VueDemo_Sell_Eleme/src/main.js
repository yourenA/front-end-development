import Vue from 'vue'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import vueTap from 'v-tap'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

/**
 * VueRouter vueTap Vuex 要在实例化之前使用use
 * */
Vue.use(vueTap)
Vue.use(VueRouter)
Vue.use(Vuex)

/**
 * 实例化Vuex
 * */
const store = new Vuex.Store({
  state: {
    count: 0 //count为加入购物车数量
  },
  // 添加的商品元素
  addCartEl: {},
  mutations: {
    /**
     * 参数为state和payload载荷
     * state指向Vuex.Store({state:{}})
     * */
    increment(state) {
      state.count++
    }
  }
})

/**
 * 实例化VueRouter
 * */
const router = new VueRouter({
  routes: [{
    path: '/goods',
    component: goods
  }, {
    path: '/ratings',
    component: ratings
  }, {
    path: '/seller',
    component: seller
  }],
  linkActiveClass: 'active'//重新定义当前路由a标签的 类名
})



/**
 * 实例化Vue
 * */
new Vue({
  router,
  store,
  template: '<App />',
  components: { //注册组件，然后才可以在template中使用
    App
  },
  /**
   * this.$root当前组件树的根 Vue 实例，直接获取data中定义的数据。如果当前实例没有父实例，此实例将会是其自已。
   * 在子组件this.$root.eventHub获取到这里定义的eventHub
   * 在showCart里面通过 this.$root.eventHub.$on('cart.add', this.drop)注册监听'cart.add'事件
   * 在foodDetail里面通过 this.$root.eventHub.$emit('cart.add', event.target)调用'cart.add'事件，第二个参数为$on中func的参数
   * */
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')

/**
 * router.push方法就是用来动态导航到不同的链接的。它会向history栈添加一个新的记录，点击<router-link to="...">等同于调用router.push(...)。
 * 在创建vue实例并挂载后调用
 * */
router.push('/goods')


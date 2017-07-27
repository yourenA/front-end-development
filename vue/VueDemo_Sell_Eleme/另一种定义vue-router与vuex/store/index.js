import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)
//只有一个store
//redux有configureStore
export default new Vuex.Store({
    //在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    //redux有combineReducers
    modules: {
        user
    }
})
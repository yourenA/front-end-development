<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/index'
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      a
        display:block
        font-size:14px
        color rgb(77,85,93)
        &.active
          color rgb(240,20,20)
</style>

<template>
<div>
  <!-- :seller === v-bind:seller 向v-header组件传递seller  seller为data中的对象-->
  <!-- vue指令可以直接引用javascript中的DataNmae或methods中方法名-->
  <v-header :seller="seller"></v-header>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
  <!--如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：-->
  <keep-alive>
    <!--放置子组件-->
    <!--向所有的子组件传递seller-->
    <router-view :seller="seller"></router-view>
  </keep-alive>
</div>

</template>

<script>
import header from 'components/header/header'
import axios from 'axios'

export default {
  /**
   * data()定义响应式数据
   * data为一个方法，return数据
   * */
  data() {
    return {
      seller: {}
    }
  },
  /**
   * created
   * 组件实例已经被创建完成，但DOM还未生成
   * 因为DOM还未生成，所以此时并不会向template传递seller
   * 在created获取数据，确保渲染template时template中有数据
   * 注意触发vue的created事件以后,this便指向vue实例,这点很重要
   * */
  created() {
    axios.get('static/data.json').then((res) => {
      /**
       * axios返回的数据储存在res.data里
       * 通过this.DataName直接获取或改变响应式数据的值
       * */
      console.log("res.data.seller",res.data.seller);
      this.seller = res.data.seller
    })
  },
  components: {
    'v-header': header
  }
}

</script>

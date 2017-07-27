<template lang="html">
  <!--@click.stop.prevent 阻止单击事件冒泡 组织阻止默认事件-->
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart()">
          <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: Object
  },
  methods: {
    addCart(event) {
      console.log(event.target);
      if (!event._constructed) {
        return
      }
      /**
       * 通过this.propsName获取props中的属性
       * this.propsName.name=XXX 可以直接改变父组件响应式数据的内容
       * */
      console.log("this.food",this.food)
      if (!this.food.count) {
        /**
         * Vue.set( object, key, value )
         * 设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。
         * */
        Vue.set(this.food, 'count', 0)//设置this.food中的count属性为0
      }//此时this.food。count已经设为0
      this.food.count++;//设置this.food中的count加1，
      /**
       * this.$root 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已。
       * */
      this.$root.eventHub.$emit('cart.add', event.target)
    },
    decreaseCart() {
      if (!event._constructed || !this.food.count) {
        return
      }
      this.food.count--;
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" >

.cartcontrol
  .cart-decrease
    display inline-block
    padding 6px
    transition: all .4s linear
    .inner
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
      transition all 0.4s linear
    &.fadeRotate-enter-active, &.fadeRotate-leave-active
      transform translate3d(0,0,0)
      .inner
        display inline-block
        transform rotate(0)
    &.fadeRotate-enter, &.fadeRotate-leave-active
      opacity: 0
      transform translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    text-align center
    padding 6px 0
  .cart-add
    display inline-block
    vertical-align top
    font-size 24px
    color rgb(0,160,220)
    line-height 24px
    padding 6px
</style>

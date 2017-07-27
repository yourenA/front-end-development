<template lang="html">
  <!--template表达式可以直接使用script中computed定义的key-->
  <div class="star" :class="starType">
    <!--html中可以直接使用 computed中的某一个返回值-->
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  /**
   * computed会return一个值
   * */
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;// floor(4.2*2)/2=4
      let hasDecimal = score % 1 !== 0; //是否为整数
      let integer = Math.floor(score);  //取整
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON); //整数部分CLS_ON
      }
      if (hasDecimal) {//如果不是整数，则取一半CLS_ON
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) { //如果result长度小于规定长度，则继续添加CLS_OFF
        result.push(CLS_OFF)
      }
      return result;

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 100% 100%
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 100% 100%
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 100% 100%
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')


</style>

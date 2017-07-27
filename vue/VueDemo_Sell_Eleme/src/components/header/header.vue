<template lang="html">
  <!--vue标签后面是表达式-->
  <!--如果标签内的属性是通过data动态生成，此时通过 :name="表达式" 可以动态获取数据 如:src :class -->
  <!--如果标签外的text是通过data动态生成，此时通过插值表达式 {{表达式}} 可以动态获取数据-->
  <!-- v-if="表达式" 会自动将表达式转为boolen值，当boolen为真时才显示标签-->
  <!-- v-for 对数组进行循环-->
  <!--
    @click === v-on:click
    template中的事件在script中的methods定义
  -->
  <!--transition name定义style中的类名-->
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <!--html中可以直接使用props定义的对象-->
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}
        </div>
        <div class="supports" v-if="seller.supports">
          <div class="supports_desc">
            <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <!--@click="showDetails()" 调用methods中的方法，有括号表示执行-->
      <div class="support-count" v-if="seller.supports" @click="showDetails()">
        <span class="count">{{seller.supports.length+'个'}}</span>
        <i   class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetails()">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--filter: blur(10px);滤镜-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-if="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <!--向star组件传递大小size和分数score-->
              <!--在components定义star,可以直接使用，不需要变成大写-->
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="iconClassMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail()"></i>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import star from 'components/star/star'

  export default {
    /**
     * props
     * 从父组件中获取的内容
     * */
    props: {
      seller: {//父组件传递过来的props要重新接收，不能像react那样直接可以使用this.props.seller获取
        type: Object
      }
    },
    created() {
      /**
       * 类似于react在constructs中定义的this.Name
       * 可以在html直接引用Name,不需要加this
       * */
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetails() {
        /**
         * 直接使用this.DataName="" 改变响应式数据，不需要像react那样使用setState
         * */
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'

  .header
    position relative
    background rgba(7, 17, 27, 0.5)
    color #fff
    blur: 10px
    overflow hidden
    .content-wrapper
      position relative
      display flex //使用flex就可以使子元素变成横向布局
      padding: 24px 12px 18px 24px
      font-size 12px
      .avatar
        img
          border-radius 2px
      .content
        margin-left 16px
        .title
          margin 2px 0 8px 0
          font-size 16px
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          font-size 12px
          margin-bottom 10px
        .supports
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background-color rgba(0, 0, 0, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px
          line-height 24px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 100% 100%
        background-repeat no-repeat
      .bulletin-text
        font-size 10px
        vertical-align middle
        margin 0 4px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 8px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      filter blur(10px)
      z-index -1
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      background rgba(7, 17, 27, 0.8)
      backdrop-filter blur(10px)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            font-size 16px
            font-weight 700
            width 100%
            color rgb(255, 255, 255)
            line-height 16px
            text-align center
          .star-wrapper
            margin 16px 11px 28px 0
            text-align center
          .title
            display flex
            width 80%
            margin 0 auto 24px auto;
            .line
              display inline-block
              flex 1
              height 1px
              background rgba(255, 255, 255, 0.2)
              margin auto
            .text
              padding 0 12px
              font-size 14px
              font-weight 700
          .supports
            padding 0 0 28px 36px
            .support-item
              color white
              padding 0 6px 12px 16px
              .text
                vertical-align middle
                font-size 12px
                font-weight 200
                color rgb(255, 255, 255)
                line-height 12px
              .icon
                display inline-block
                vertical-align top
                width 16px
                height 16px
                margin-right 6px
                background-size 100% 100%
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
          .bulletin
            padding 0 48px
            font-size 12px
            font-weight 200
            color rgb(255, 255, 255)
            line-height 24px

      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
        color rgba(255, 255, 255, 0.5)
      &.fade-enter-active, &.fade-leave-active {//显示
        transition: opacity .5s
      }
      &.fade-enter, &.fade-leave-active {//隐藏
        opacity: 0
      }
</style>

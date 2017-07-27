<style lang="less" rel="stylesheet/less" scoped>
  .login {
    padding: 50px;
    text-align: center;
    .line {
      padding: 5px;
      input {
        padding: 0 10px;
        line-height: 28px;
      }
    }
    button {
      padding: 0 20px;
      margin-top: 20px;
      line-height: 28px;
    }
  }
</style>
<template>
  <div>
    <!--components中的header可以被全局引用-->
    <v-header title="登录">
      <!-- slot="left" 将被插进header里name为left的slot-->
      <router-link slot="left" to="/">返回</router-link>
    </v-header>
    <!-- click.stop     阻止单击事件冒泡 -->
    <!-- submit.prevent 提交事件不再重载页面 -->
    <!-- v-xxx="string" string为script中定义的属性或方法（表达式）-->
    <form class="login" v-on:submit.prevent="submit">
      <div class="line">
        <div v-show="btn && !form.id">id不能为空</div>
        <input type="number" placeholder="输入你的id" v-model="form.id"><!--v-model与响应式数据data进行数据双向通行-->
      </div>
      <div class="line">
        <div v-show="btn && !form.name">用户名不能为空</div>
        <input type="text" placeholder="输入你的用户名" v-model="form.name">
      </div>
      <button>登录</button>
    </form>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import {USER_SIGNIN} from 'store/user'

  export default {
    data() {
      return {
        btn: false, //true 已经提交过， false没有提交过
        form: {
          id: '',
          name: ''
        }
      }
    },
    methods: {
      /**
       * 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
       * mapActions在methods中使用
       */
      ...mapActions([USER_SIGNIN]),//类似于mapDispatchToProps 映射 this.USER_SIGNIN() 为 this.$store.dispatch(USER_SIGNIN)
      submit() {
        this.btn = true
        if (!this.form.id || !this.form.name) return
        this.USER_SIGNIN(this.form)
        //this.$router返回 Router 实例
        this.$router.replace({path: '/home'})
      }
    }
  }
</script>

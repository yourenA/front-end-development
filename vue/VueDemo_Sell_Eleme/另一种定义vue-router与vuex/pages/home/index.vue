<style lang="less" rel="stylesheet/less" scoped>

</style>
<template>
	<div>
		<v-header title="首页">
			<router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" to="/signout">退出</router-link>
		</v-header>
		<div style="padding: 50px;">{{user.name}}欢迎回家</div>
	</div>
</template>
<script>
    import { mapState } from 'vuex'//类似于redux的mapStateToProps
    export default {
		/**
		 * computed返回数据可以在template里面直接使用
		 * computed计算属性是基于它的依赖缓存。计算属性只有在它的相关依赖发生改变时才会重新取值。
		 *
		 * 使用 mapState 辅助函数帮助我们生成计算属性
		 * mapState在computed中使用
		 * mapState 函数返回的是一个对象
		 * 与局部计算属性混合使用
		 * computed: {
		 *   localComputed () { },
		 *   ...mapState({
    	 *	   // ...
  		 * 	})
  		 * }
		 */
        computed: mapState({ user: state => state.user }),//将vuex中的state.user(在store/index中定义modules)变为vue中使用的user
    }
</script>

<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
			<!-- 自定义微信title -->
			<router-view v-wechat-title="$route.meta.title"></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    console.log(process.env);
    // 去浏览器看一下
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #f4f4f4;
  line-height: 1;
}
.vux-tab-ink-bar{
  transform: scaleX(0.5);
}
</style>

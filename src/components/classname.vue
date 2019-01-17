<template>
  <div class="nickname" :class="type"><i slot="icon" :class="iconname" class="iconfont"></i>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      level: {
        type: Number,
        default: 1
      },
      classname: {
        type: String,
        default: '黄金会员'
      },
    },
    computed: {
      iconname() {
        return 'icon-canpinhuihuiyuanv' + this.level
      },
      type() {
        return 'v' + this.level
      }
    },
  }
</script>

<style lang="scss" scoped>
.nickname {
  &.v1 {
    color: orange;;
  }
  &.v2 {
    color: #78CAF7;
  }
  &.v3 {
    color: #E51C23;
  }
}
</style>

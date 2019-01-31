<template>
  <div class="nickname" :class="type"><i slot="icon" :class="iconname" class="iconfont"></i>
    {{ classname}}
  <!-- {{ classname=='游客'?'': classname}} -->
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
        default: ''
      },
    },
    computed: {
      iconname() {
          if(this.level == 1) {
              return 'icon-huiyuanfuwu'
          }else if(this.level ==2) {
              return 'icon-zuanshi'
          }else if (this.level ==3) {
              return 'icon-huangguan'
          }
        // return 'icon-canpinhuihuiyuanv' + Number(this.level)
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
  .nick {
    font-size: 14px;
  }
  .level {
    font-size: 13px;
    margin-top: 5px;
    &.gold {
      color: orange;
    }
  }
</style>

<template>
  <div>
    <div class="box">
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  mounted() {
    this.$vux.alert.show({
      title: 'Vux is Cool',
      content: 'Do you agree?',
      onShow () {
        console.log('Plugin: I\'m showing')
      },
      onHide () {
        console.log('Plugin: I\'m hiding')
      }
    })
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
<style lang="scss" scoped>
.box {
  width: 375px;
  height: 375px;
  background: red;
}
</style>

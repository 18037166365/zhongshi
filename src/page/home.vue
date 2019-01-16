<template>
  <div>
    <component v-bind:is="currentTabComponent"></component>
    <tabbar @on-index-change="itemChange">
    <tabbar-item >
      <i slot="icon" class="iconfont icon-zhuye"></i>
      <span slot="label">年卡</span>
    </tabbar-item>
    <tabbar-item selected>
      <i slot="icon" class="iconfont icon-gerenzhongxin1"></i>
      <span slot="label">个人</span>
    </tabbar-item>
  </tabbar>
  </div>
</template>

<script>
import YearCard from '@/components/year-card'
import PersonCenter from '@/components/person-center'
import { Tabbar, TabbarItem } from 'vux'

  export default {
    components: {
      YearCard,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        currentTabComponent: YearCard
      }
    },
    methods: {
      itemChange(e) {
        console.log('e: ', e);
        if(e===0) {
          this.currentTabComponent = YearCard
        }else {
          this.currentTabComponent = PersonCenter
        }
      }
    },
  }
</script>

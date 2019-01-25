<template>
  <div class="app-wrapper">
    <component v-bind:is="currentTabComponent"></component>
    <tabbar @on-index-change="itemChange" class="p-fixed">
      <tabbar-item>
        <i slot="icon" class="iconfont icon-zhuye"></i>
        <span slot="label">年卡</span>
      </tabbar-item>
      <tabbar-item ref="acc">
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
import { login } from '../api/index.js'
import { getQuery,operateStorage } from '../config/util.js'


  export default {
    components: {
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
      },
      login() {
          console.log(getQuery('token'))
          console.log(operateStorage('token' =='25'))
          if(getQuery('token')) {
                login({
                    token: encodeURI( getQuery('token'))
                }).then(res => {
                    location.href = location.href.split('?token')[0]
                    console.log('res: ', res);
                })
          }
      }
    },
    mounted() {
        console.log('this.$route.query')
        console.log(this.$route.query)
        console.log(this.$route.query.aaa)
        if(this.$route.query.aaa==='my') {
            this.currentTabComponent = PersonCenter
            console.log( this.$refs['acc'])
            this.$refs['acc'].$attrs.set('checked', true)
            location.href = location.href.split('?aaa')[0]
        }
        console.log()
    console.log('env', process.env)
      console.log('mounted')
        this.login()
    }
  }
</script>
<style lang="scss" scoped>
.app-wrapper {
  padding-bottom: 52px;
  .p-fixed {
    position: fixed;
  }
}
</style>

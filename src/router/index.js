import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/page/Home'
import CardDetail from '@/page/card-detail'
import MyCard from '@/page/my-card'
import MyTeam from '@/page/my-team'
import CommissionLog from '@/page/Commission-log'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: '年卡',
      component: Home
    },
    {
      path: '/cardDetail',
      name: '旅游卡详情',
      component: CardDetail
    },
    {
      path: '/mycard',
      name: '我的年卡',
      component: MyCard
    },
    {
      path: '/myteam',
      name: '我的团队',
      component: MyTeam
    },
    {
      path: '/commissionLog',
      name: '我的团队',
      component: CommissionLog
    },


    // {
    //   path: '/',
    //   name: '我的年卡',
    //   component: MyCard
    // },
  ]
})

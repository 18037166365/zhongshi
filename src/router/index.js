import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import CardDetail from '@/page/card-detail'
import MyCard from '@/page/my-card'
import MyTeam from '@/page/my-team'
import CommissionLog from '@/page/Commission-log'
import Share from '@/components/share'
import withdraw from '@/page/withdraw'

Vue.use(Router)



 const router = new Router({
  routes: [
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
      name: 'commissionLog',
      component: CommissionLog
    },
    {
      path: '/Share',
      name: '分享',
      component: Share
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    }
  ]
})

export default router

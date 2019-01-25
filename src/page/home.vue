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
    import { getQuery, operateStorage } from '../config/util.js'
    let CURRENT_COMPONENT = YearCard;

    export default {
        components: {
            Tabbar,
            TabbarItem
        },
        beforeRouteEnter(to, from, next) {
            if (from.path === '/myteam' || from.path === '/mycard') {
                CURRENT_COMPONENT = PersonCenter;
            } else {
                CURRENT_COMPONENT = YearCard
            }
            next()
        },
        data() {
            return {
                currentTabComponent: CURRENT_COMPONENT
            }
        },
        methods: {
            itemChange(index) {
                this.currentTabComponent = index === 0 ? YearCard : PersonCenter
            },
            // login() {
            //     if (getQuery('token')) {
            //         login({
            //             token: encodeURI(getQuery('token'))
            //         }).then(res => {
            //             location.href = location.href.split('?token')[0]
            //         })
            //     }
            // }
        },
        mounted() {
            // this.login()
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
<template>
    <div class="app-wrapper">
        <component v-bind:is="currentTabComponent"></component>
        <tabbar @on-index-change="itemChange" class="p-fixed">
            <tabbar-item :selected="tabSelect===1">
                <i slot="icon" class="iconfont icon-zhuye"></i>
                <span slot="label">年卡</span>
            </tabbar-item>
            <tabbar-item ref="acc" :selected="tabSelect===2">
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
            if (from.path === '/myteam' || from.path === '/mycard' || from.path === '/commissionLog'|| from.path ==='/withdraw') {
                CURRENT_COMPONENT = PersonCenter;
                next(vm=>{
                    vm.tabSelect=2;
                })
            } else {
                CURRENT_COMPONENT = YearCard
                 next(vm=>{
                    vm.tabSelect=1;
                })
            }

        },
        data() {
            return {
                tabSelect: 1,
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
            // console.log('this.$route.params.a: ', this.$route.params.a)
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
<style lang="scss">
    @import '../style/iconfont.css';
</style>

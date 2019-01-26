<template>
    <div id="app">
        <transition name="router-fade" mode="out-in">
            <router-view v-wechat-title="$route.meta.title"></router-view>
        </transition>
    </div>
</template>

<script>
    import { getToken} from './util/token';
    export default {
        name: 'app',
        // beforeCreate() {
            created(){
            let TOKEN = getToken();
            console.log(TOKEN)
            if (!TOKEN.token) {
                console.log('login')
                console.log(process.env.REDIRECT_URL)
                location.replace(process.env.REDIRECT_URL)
            }
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    body {
        background-color: #f4f4f4;
        line-height: 1;
    }
    .vux-tab-ink-bar {
        transform: scaleX(0.5);
    }
</style>

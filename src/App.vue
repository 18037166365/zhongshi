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
        mounted(){
            let TOKEN = getToken();
            if (!TOKEN.token) {
                location.replace(process.env.REDIRECT_URL)
            }
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import './style/iconfont.css';

    body {
        background-color: #f4f4f4;
        line-height: 1;
    }
    .vux-tab-ink-bar {
        transform: scaleX(0.5);
    }
    .weui-cells {
        font-size: 14px;
    }
</style>

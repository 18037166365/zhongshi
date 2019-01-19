<template>
    <div class="main-wrap">
        <div class="header">
            <div>我的销售额 ¥ {{ salse }}</div>
            <div>我的佣金额 ¥ {{ rebate }}</div>
        </div>
        <div class="log-wrap" ref="list">
            <div class="log-item" v-for="item in logList" :key="item.id">
                <div class="top">
                    <div class="left">获得 {{ item.fromuser_classtext }}</div>
                    <div class="mid">
                        <img :src="item.fromuser_headimguri" alt="" class="head">
                        <div class="nick">{{ item.fromuser_name }}</div>
                    </div>
                    <div class="right">
                        <div class="money">
                            <div>的分佣</div>
                            <div class="detail"> ¥ {{ item.money }} </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    {{ item.ctime }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getRebateLog } from '../api/index.js'
    const PAGE_SIZE = 10;
    export default {
        data() {
            return {
                rebate: '',
                salse: '',
                logList: []
            }
        },
        created() {
            this.height = document.documentElement.clientHeight;
            this.page = 1;
            this._getList().then(respond => {
                if (!respond) return
                this.rebate = respond.rebate;
                this.salse = respond.salse;
                this.logList = respond.data
            })
        },
        mounted() {
            document.addEventListener('scroll', this._scrollFn)
        },
        methods: {
            _getList() {
                return getRebateLog({page: this.page}).then(res => {
                    if (res.code === 0) {
                        let result = res.data;
                        if (result.data.length) {
                            if (result.data.length >= PAGE_SIZE) {
                                this.canBePullDown = true
                            }
                        }
                        return res.data
                    }
                })
            },
           _scrollFn() {
                let orderDom = this.$refs.list;
                let boxHeight = orderDom.clientHeight;
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                let offset = boxHeight + orderDom.offsetTop - scrollTop - this.height;
                if (offset <= 0 && this.canBePullDown) {
                    this.canBePullDown = false;
                    this.page++;
                    this._getList().then(respond => {
                        if (!respond) return;
                        this.logList = [...this.logList, ...respond]
                    })
                }
            },
        },
        beforeRouteLeave(to, from, next) {
            document.removeEventListener('scroll', this._scrollFn);
            next()
        }
    }
</script>

<style lang="scss" scoped>
    .main-wrap {
        font-size: 14px;
        color: #101010;

        .header {
            position: fixed;
            left:0;
            top: 0;
            right: 0;
            padding: 14px 16px;
            display: flex;
            justify-content: space-between;
            background: #fff;
            z-index: 1;
            @include b1pxNoP();
        }

        .log-wrap {
            margin-top: 45px;
            background: #fff;

            .log-item {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 14px 16px;
                @include b1px;

                .bottom {
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                    height: 300px;
                }

                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;

                    .mid {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;

                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-right: 10px;
                        }
                    }

                    .right {
                        .money {
                            display: flex;
                            justify-content: space-around;

                            .detail {
                                padding-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
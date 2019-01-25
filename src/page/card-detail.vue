<template>
    <div class="main-wrap">
        <swiper :list="swiperList"></swiper>
        <div class="product-name">
            <b class="top">
                {{ goodsInfo.goods_name }}
            </b>
            <div class="bottom">
                <span class="price">¥ {{ goodsInfo.goods_price }}</span>
                <div class="detail">虚拟产品不能退换</div>
            </div>
        </div>
        <div class="product-detail">
            <div class="title">商品详情</div>
            <div v-html="goodsInfo.goods_content" class="desctibe"></div>
        </div>
        <div class="btnWrap">
            <x-button type="primary" @click.native="_buy">购买</x-button>
        </div>
    </div>
</template>

<script>
    import {
        Swiper,
        XButton
    } from 'vux'
    import {
        getGoodsInfo,
        createOrderAndPay
    } from '../api/index.js'
    import wx from 'weixin-js-sdk'

    export default {
        components: {
            Swiper,
            XButton
        },
        data() {
            return {
                goodsInfo: {},
                swiperList: [],
            }
        },
        created() {
            getGoodsInfo().then(res => {
                this.swiperList = res.data.goods_bannar.map((item) => {
                    return {
                        img: item
                    }
                })
                this.goodsInfo = res.data
            })
        },
        methods: {
            _buy() {
                createOrderAndPay().then(res => {
                    if (res.code === 0) {
                        return res.data.jsApiParameters;
                    }
                }).then(payData => {
                    if (!payData) return;
                    this.$loading.hide();
                    let onBridgeReady = () => {
                        WeixinJSBridge.invoke('getBrandWCPayRequest', payData, res => {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                this.$router.push('/mycard')
                            }
                        })
                    }
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    } else {
                        onBridgeReady();
                    }
                }).catch(_ => this.$loading.hide())
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-wrap {
        overflow: scroll;
    }

    .product-name {
        margin-top: 10px;
        background: #fff;

        .top {
            padding: 12px 27px;
            font-size: 16px;
            display: inline-block;
        }

        .bottom {
            display: flex;

            .price {
                margin-left: 30px;
                margin-right: 22px;
                color: #E51C23;
                font-size: 18px;
            }

            .detail {
                font-size: 13px;
                color: #101010;
            }
        }
    }

    .product-detail {
        @extend .product-name;

        .title {
            width: 100%;
            text-align: center;
            font-size: 14px;
            padding: 20px 0 14px;
            @include b1px;
        }

        .desctibe {
            height: auto;
            padding-bottom: 70px;
            font-size: 16px;
        }
    }

    .btnWrap {
        position: fixed;
        bottom: 0;
        left: 10px;
        right: 10px;
        padding-bottom: 10px;
    }
</style>
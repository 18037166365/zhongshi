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
import { Swiper, XButton } from 'vux'
import { getGoodsInfo, createOrderAndPay } from '../api/index.js'
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
    methods: {
        _getWxConfig() {
            this.$loading.show()
            return createOrderAndPay().then(res => {
                if (res.code === 0) {
                    let config = res.data.jsApiParameters;
                    config.debug = true;
                    config.jsApiList = ['chooseWXPay']
                    wx.config(config);
                    return res.data.editAddress

                }
            }).then(_ =>{
                this.$loading.hide();
                return _
            }
            ).catch(_ => this.$loading.hide())

        },
        _buy() {
            createOrderAndPay().then(res => {
                if (res.code === 0) {
                    return res.data.jsApiParameters;
             }
            }).then(_ =>{
                if (!_) return
                this.$loading.hide();
                WeixinJSBridge.invoke(

                    'getBrandWCPayRequest',
                    _
                    // {
                    //     "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
                    //     "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
                    //     "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
                    //     "package":"prepay_id=u802345jgfjsdfgsdg888",
                    //     "signType":"MD5",         //微信签名方式：
                    //     "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
                    // }
                    ,
                    function(res){
                        // alert(JSON.stringify(res))
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        // alert('SUC')
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                });

            }
            )
        },

        wxConfig() {
            // 不是你这样的吧
            /*


*/
        }
    },
    created() {
         if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
        }
    },
    mounted() {
      getGoodsInfo().then(res => {
        this.swiperList = res.data.goods_bannar.map((item) => {
            return {
              img: item
            }
          })
        this.goodsInfo = res.data
      })
    },
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

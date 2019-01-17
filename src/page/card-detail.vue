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
        <div v-html="goodsInfo.goods_content"></div>
      </div>
  </div>
</template>

<script>
import { Swiper } from 'vux'
import { getGoodsInfo } from '../api/index.js'

  export default {
    components: {
      Swiper
    },
    data() {
      return {
        goodsInfo: {},
        swiperList: [],
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
    }
  }
</script>

<style lang="scss" scoped>
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
}
</style>

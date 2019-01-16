<template>
  <div class="main-wrap">
     <swiper :list="swiperList" v-model="currentIndex"></swiper>
     <div class="product-name">
       <b class="top">
         商品名称
       </b>
       <div class="bottom">
         <span class="price">¥ 79</span>
         <div class="detail">虚拟产品不能退换</div>
       </div>

     </div>
     <div class="product-detail">
        <div class="title">商品详情</div>
      </div>
  </div>
</template>

<script>
import { Swiper } from 'vux'

  export default {
    components: {
      Swiper
    },
    data() {
      return {
        currentIndex: 0,
        id: '',
        swiperList: [{
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg', // 404
          title: '送你一次旅行',
          fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
        }],
      }
    },
    mounted() {
      console.log(this.$router)
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

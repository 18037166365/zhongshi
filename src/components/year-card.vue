<template>
  <div class="main-wrap">
    <header>
    </header>
      <swiper :list="swiperList" :auto="true" :loop="true"></swiper>

    <div class="travel-card">
      <div class="travel-card-title">
        |  中食全国旅游年卡
      </div>
      <div class="travel-card-content">
        <div class="travel-card-item" @click="goDetail()">
          <img class="cardimg" :src="goodsInfo.goods_img" alt="">
          <div class="card-detail">
            <div class="name">{{ goodsInfo.goods_name }}</div>
            <div class="money">¥{{ goodsInfo.goods_price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'vux'
import { getIndexBannar, getGoodsInfo } from '../api/index.js'

  export default {
    components: {
      Swiper
    },
    data() {
      return {
        swiperList: [],
        goodsInfo: {}
      }

    },
    methods: {
      goDetail() {
        this.$router.push({path: '/cardDetail', params: {id: 1}})
      },
      init() {
        getIndexBannar().then(res => {
          this.swiperList = res.data.map((item) => {
            return {
              img: item
            }
          })
        })
        getGoodsInfo().then(res => {
          this.goodsInfo = res.data
        })
        //  getGoodsInfo().then(res => {
        //     this.swiperList = res.data.goods_bannar.map((item) => {
        //         return {
        //             img: item
        //         }
        //     })
        //     this.goodsInfo = res.data
        // })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
.main-wrap {
  background-color: #fff;
  header {
    width: 100%;
    display: flex;
    img {
      width: 375px;
      height: 210px;
    }
  }
  .travel-card {
    .travel-card-title {
      margin: 14px 0 0 20px;
      font-size: 13px;
      vertical-align: middle;
    }
    .travel-card-content {
      margin-top: 30px;
      margin-left: 20px;
      padding-bottom: 10px;
      .travel-card-item {
        width: 234px;
        >img {
          width: 100%;
          height: 150px;
          border-radius: 10px;
        }
        .card-detail {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          .name {
            margin-left: 10px;
          }
          .money {
            color: red;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>

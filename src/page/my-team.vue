<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">直接推荐</tab-item>
      <tab-item @on-item-click="onItemClick">间接推荐</tab-item>
    </tab>
    <div class="card-wrap">
      <div class="card-item">
        <img src="../assets/head.png" alt="头像" class="head">
        <div class="mid">
          <div class="nick">Maker</div>
          <div class="level gold"><i slot="icon" class="iconfont icon-canpinhuihuiyuanv1"></i> 黄金会员</div>
        </div>
        <div class="jointime">
          2019-01-02 加入
        </div>
      </div>
      <div class="card-item">
        <img src="../assets/head.png" alt="头像" class="head">
        <div class="mid">
          <div class="nick">Maker</div>
          <div class="level gold"><i slot="icon" class="iconfont icon-canpinhuihuiyuanv1"></i> 黄金会员</div>
        </div>
        <div class="jointime">
          2019-01-02 加入
        </div>
      </div>
    </div>
    <!-- <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode> -->
  </div>
</template>

<script>
import { Qrcode, Tab, TabItem } from 'vux'

export default {
  components: {
    Qrcode,
    Tab,
    TabItem
  },
  methods: {
     onItemClick (index) {
      console.log('on item click:', index)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-wrap {
  .card-item {
    margin-top: 10px;
    padding: 12px 25px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head {
      width: 58px;
      height: 58px;
      border-radius: 50%;
    }
    .mid {
      .nick {
        font-size: 14px;
      }
      .level {
        font-size: 13px;
        margin-top: 5px;
        &.gold {
          color: orange;
        }
      }
    }
    .jointime {
      font-size: 13px;
      color: #101010;
    }
  }
}
</style>

<template>
  <div class="main-wrap">
    <div class="header">
      <div class="head-img">
        <img src="" alt="">
        <div class="nick">
          <div class="nickname"><i slot="icon" class="iconfont icon-canpinhuihuiyuanv2"></i> xxx</div>
          <!-- <div class="nickname"> 点击登录</div> -->
        </div>
      </div>
      <img src="../assets/img/erweima.png" alt="二维码" class="qrcode">
      <!-- <div class="qrcode">
        <i slot="icon" class="iconfont icon-iconfonterweima"></i>
      </div> -->
      <div class="commission">
        <div class="title">我的佣金: ¥0</div>
        <div class="button-wrap">
          <x-button mini type="primary">提现</x-button>
          <x-button class="note" mini>日志</x-button>
        </div>
      </div>
    </div>
    <div class="year-card">
      <div class="title">
        <b class="left">我的年卡</b>
        <div class="open-all">
          查看更多
          <i class="iconfont icon-you right"></i>
        </div>
      </div>
      <div class="choose">
        <div class="tosend">
          <i class="iconfont icon-daifahuo"></i>
          <div>待发货</div>
        </div>
        <div class="finished">
          <i class="iconfont icon-dingdanyiwancheng"></i>
          <div>已完成</div>
        </div>
      </div>
    </div>
    <div class="my-team">
      <div class="title">
        <b class="left">我的团队</b>
        <div class="open-all">
          查看更多
          <i class="iconfont icon-you right"></i>
        </div>
      </div>
    </div>
person-center
  </div>
</template>

<script>
import { XButton } from 'vux'
  export default {
    components: {
      XButton
    }
  }
</script>

<style scoped lang="scss">
.main-wrap {
  .header {
    height: 110px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background: #fff;
    .head-img {
      margin-left: 25px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      >img {
        width: 71px;
        height: 71px;
        border-radius: 50%;
        border: 1px solid #bbb;
      }
      .nick {
        text-align: center;
        margin-top: 8px;
      }
    }
    .qrcode {
      width: 35px;
      height: 35px;
      margin-top: 20px;
    }
    .commission {
      margin-top: 21px;
      margin-right: 19px;
      .title {
        text-align: center;
      }
      .button-wrap {
        .note {
          margin-left: 40px;
        }
      }
    }
  }
  .year-card, .my-team {
    margin-top: 10px;
    background: #fff;
    .title {
      color: #101010;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      padding: 20px 14px;
      border-bottom: 1px solid #C0BFC4;
      .open-all {
        color:#999;
        .right {
          font-size: 11px;
          position: relative;
          top: -1px;
          left: -3px;
        }
      }
    }
    .choose {
      display: flex;
      justify-content: space-around;
      font-size: 13px;
      > div {
        text-align: center;
        margin: 16px auto 10px;
        > div {
          margin-top: 9px;
        }
      }
      .iconfont {
        font-size: 32px;
      }
    }
  }
  .my-team {
    @extend .year-card;
    .title {
     border: none;
    }
  }
}

</style>

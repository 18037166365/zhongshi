<template>
  <div class="main-wrap">
    <div class="header">
      <div>我的销售额 ¥788</div>
      <div>我的佣金额 ¥1788</div>
    </div>
    <div class="log-wrap">
      <div class="log-item">
        <div class="top">
          <div class="left">获得黄金会员</div>
          <div class="mid">
            <img src="../assets/head.png" alt="" class="head">
            <div class="nick">Maker</div>
          </div>
          <div class="right">
            <div class="money">
              <div>的分佣</div>
              <div class="detail"> ¥ 99</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          2019-01-03 22:30
        </div>
      </div>
      <div class="log-item">
        <div class="top">
          <div class="left">获得黄金会员</div>
          <div class="mid">
            <img src="../assets/head.png" alt="" class="head">
            <div class="nick">Maker</div>
          </div>
          <div class="right">
            <div class="money">
              <div>的分佣</div>
              <div class="detail"> ¥ 99</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          2019-01-03 22:30
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.main-wrap {
  font-size: 14px;
  color: #101010;
  .header {
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    background: #fff;
  }
  .log-wrap {
    margin-top: 10px;
    background: #fff;
    .log-item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 14px 16px;
      @include  b1px;
      .bottom {
        display: flex;
        justify-content: flex-end;
        width: 100%;
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

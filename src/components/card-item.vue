<template>
 <div class="card-wrap">
      <div class="card-item">
        <div class="title">
          <div class="code">订单编号: 13131231</div>
          <div class="status">待发货</div>
        </div>
        <div class="item-content">
          <img class="goodsImg" src="../assets/logo.png" alt="">
          <div class="detail">
            <div class="top">
              <div class="name">商品名称</div>
              <div class="time">2019-01-02 09:00</div>
            </div>
            <div class="bottom">
              共1件商品, 合计: ¥ 19.90
            </div>
          </div>
        </div>
      </div>
      <div class="card-item">
        <div class="title">
          <div class="code">订单编号: 13131231</div>
          <div class="status">待发货</div>
        </div>
        <div class="item-content">
          <img class="goodsImg" src="../assets/logo.png" alt="">
          <div class="detail">
            <div class="top">
              <b class="name">商品名称</b>
              <div class="time">2019-01-02 09:00</div>
            </div>
            <div class="bottom">
              共1件商品, 合计: ¥ 19.90
            </div>
          </div>
        </div>
      </div>
      <div class="card-item">
        <div class="title">
          <div class="code">订单编号: 13131231</div>
          <div class="status">待发货</div>
        </div>
        <div class="item-content">
          <img class="goodsImg" src="../assets/logo.png" alt="">
          <div class="detail">
            <div class="top">
              <b class="name">商品名称</b>
              <div class="time">2019-01-02 09:00</div>
            </div>
            <div class="bottom">
              共1件商品, 合计: ¥ 19.90
            </div>
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
.card-wrap {
  .card-item {
    margin-top: 10px;
    background: #fff;
    .title {
      font-size: 13px;
      padding: 14px 19px;
      display: flex;
      justify-content: space-between;
      @include b1px;
      .code {
        color: #999;
      }
      .status {
        color: #E51C23;
      }
    }
    .item-content {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .goodsImg {
        width: 113px;
        height: 90px;
      }
      .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 13px;
        flex-grow: 3;
        .top {
          display: flex;
          justify-content: space-around;
        }
        .bottom {
          display: flex;
          justify-content: flex-end;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

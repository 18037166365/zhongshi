<template>
  <div class="main-wrap">
    <header>
      <img src="../assets/img/banner.png" alt="">
    </header>
    <div class="travel-card">
      <div class="travel-card-title">
        |  中食全国旅游年卡
      </div>
      <div class="travel-card-content">
        <div class="travel-card-item">
          <img class="cardimg" src="../assets/img/card.png" alt="旅游卡">
          <div class="card-detail">
            <div class="name">中食旅游卡</div>
            <div class="money">¥198</div>
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

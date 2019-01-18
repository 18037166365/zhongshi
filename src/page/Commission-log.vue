<template>
  <div class="main-wrap">
    <div class="header">
      <div>我的销售额 ¥ {{ salse }}</div>
      <div>我的佣金额 ¥ {{ rebate }}</div>
    </div>
    <div class="log-wrap">
      <div class="log-item" v-for="item in logList" :key="item.id">
        <div class="top">
          <div class="left">获得 {{ item.fromuser_classtext }}</div>
          <div class="mid">
            <img :src="item.fromuser_headimguri" alt="" class="head">
            <div class="nick">{{ item.fromuser_name }}</div>
          </div>
          <div class="right">
            <div class="money">
              <div>的分佣</div>
              <div class="detail"> ¥ {{ item.money }} </div>
            </div>
          </div>
        </div>
        <div class="bottom">
         {{ item.ctime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRebateLog } from '../api/index.js'

  export default {
    data() {
      return {
        rebate: '',
        salse: '',
        logList: []
      }
    },
    mounted() {
      getRebateLog().then(res => {
        this.rebate= res.data.rebate
        this.salse= res.data.salse
        this.logList= res.data.data
      })
    }
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

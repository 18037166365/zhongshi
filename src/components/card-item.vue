<template>
  <div>
    <div class="card-wrap">
      <div class="card-item" v-for="item in listFilter" :key="item.uid" >
        <div class="title">
          <div class="code">订单编号: {{ item.order_no }}</div>
          <div class="status">{{item.send_statu=='0'? '待发货': '已发货'}}</div>
        </div>
        <div class="item-content">
          <img class="goodsImg" :src="item.goods_img" alt="年卡">
          <div class="detail">
            <div class="top">
              <div class="name">{{ item.goods_name }}</div>
              <div class="time">{{ item.ctime }}</div>
            </div>
            <div class="mid">
              共 1 件商品, 合计: ¥ {{ item.goods_price }}
            </div>
            <div class="bottom" v-if="activeBtnVisible">
              <x-button mini @click.native="activatepen(item)">获取激活码</x-button>
            </div>
          </div>
        </div>
      </div>
    </div>

     <div v-transfer-dom>
      <x-dialog v-model="dialogVisible" class="dialog-demo">
        <div class="img-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
        </div>
        <div @click="dialogVisible=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { getOrders, cardActive } from '../api/index.js'
import { XDialog,  XButton} from 'vux'

  export default {
    components: {
      XDialog,
      XButton
    },
    props: {
      type: '',
    },
    data() {
      return {
        cardList: [],
        dialogVisible: false
      }
    },
    methods: {
      activatepen(item) {
        if(this.$route.path == '/mycard') {
          // this.dialogVisible= true;
          this.$vux.alert.show({
            content: `<p>您的卡号是: ${item.order_no}</p><p>您的激活码是: ${item.wx_order_no}</p>`,
            onShow () {
              cardActive({
                order_id: item.order_no
              }).then(res => {
                console.log('res: ', res);
              })
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
            }
          })
        }
        console.log()
      }
    },
    computed: {
      listFilter() {
        return this.cardList.filter(item => {
          if(this.type ==undefined) {
            return true
          }
          return item.send_statu == this.type
        })
      },
      activeBtnVisible() {
        return this.$route.path == '/mycard'
      }
    },
    mounted() {
      getOrders().then(res => {
        this.cardList = res.data
      })
    }
  }
</script>

<style lang="scss" scoped>
.card-wrap {
  .card-item {
    margin-top: 10px;
    background: #fff;
    @include bt1px;
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
        .mid {
          display: flex;
          justify-content: flex-end;
          margin-right: 20px;
        }
        .bottom {
          display: flex;
          justify-content: flex-end;
          .weui-btn {
            margin: 0 10px 0;
          }
        }
      }
    }
  }
}
</style>

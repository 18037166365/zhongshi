<template>
  <div class="main-wrap">
    <div class="header">
      <div class="head-img">
        <img :src="userInfo.headimguri" alt="">
        <div class="nick">
          <Classname v-if="userInfo.nickname" :level="userInfo.class">
            {{ userInfo.nickname }}
          </Classname>
          <div v-else class="nickname"> 点击登录</div>
        </div>
      </div>
      <!-- <img src="../assets/img/erweima.png" alt="二维码" class="qrcode" @click="openEwm"> -->
      <!-- <div class="qrcode">
        <i slot="icon" class="iconfont icon-iconfonterweima"></i>
      </div> -->
      <div class="commission">
        <div class="title">我的佣金: ¥{{ userInfo.money }}</div>
        <div class="button-wrap">
          <x-button mini type="primary">提现</x-button>
          <x-button class="note" mini @click.native="openLog">日志</x-button>
        </div>
      </div>
    </div>
     <div class="my-qrcode" >
      <div class="title">
        <b class="left">我的二维码</b>
        <div class="open-all" @click="openEwm">
          查看我的二维码
          <i class="iconfont icon-you right"></i>
        </div>
      </div>
    </div>
    <div class="year-card">
      <div class="title">
        <b class="left">我的年卡</b>
        <div class="open-all" @click="$router.push('/mycard')">
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
      <CardItem />
    </div>
    <div class="my-team" @click="$router.push('/myteam')">
      <div class="title">
        <b class="left">我的团队</b>
        <div class="open-all">
          查看更多
          <i class="iconfont icon-you right"></i>
        </div>
      </div>
    </div>
    <Ewm-dialog v-if="ewmVisible" :nickname="userInfo.nickname" :headimg="userInfo.headimguri" :value="ewmLink" @close="closeDialog"/>
  </div>
</template>

<script>
import { XButton } from 'vux'
import CardItem from '@/components/card-item';
import { getUserinfo } from '../api/index.js'
import Classname from './classname'
import EwmDialog from '../components/share'

  export default {
    data() {
      return {
        userInfo: {},
        id: '',
        ewmVisible: false,
      }
    },
    components: {
      XButton,
      CardItem,
      Classname,
      EwmDialog
    },
    methods: {
        openEwm() {
            this.ewmVisible = true
        },
        closeDialog() {
            // console.log('close')
            this.ewmVisible = false
        },
      openLog() {
        this.$router.push('/commissionLog')
      }
    },
    computed: {
        ewmLink() {
            // console.log('this.id: ',this.id);
            // console.log('this.userInfo: ',this.userInfo);
            return 'http://0010.94lang.com/client/login/index?recom_id=' + this.id
        }
    },
    watch: {
        id(a,b) {
            this.id=a
            // console.log(a,b)
        }
    },
    mounted() {
      getUserinfo().then(res => {
        // console.log('res: ', res);
        this.userInfo = res.data
        this.id= res.data.id
            // console.log('this.userInfo.id: ',this.id);

      })

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
  .year-card, .my-team ,.my-qrcode{
    margin-top: 10px;
    background: #fff;
    .title {
      color: #101010;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      padding: 20px 14px;
      @include b1px;
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

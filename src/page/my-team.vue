<template>
    <div>
        <div class="header">
            <tab class="tab">
                <tab-item selected @on-item-click="onItemClick">直接推荐</tab-item>
                <tab-item @on-item-click="onItemClick">间接推荐</tab-item>
            </tab>
            <group class="selector" label-width="8em">
                <popup-picker title="按等级筛选" :data="pickerList" v-model="pickerValue" @on-change="onChange" placeholder="请选择会员等级"></popup-picker>
            </group>
        </div>
        <div class="card-wrap">
            <div class="listWrap" ref="list">
                <div class="card-item" v-for="item in showList" :key="item.id">
                    <img :src="item.headimguri" alt="" class="head">
                    <div class="mid">
                        <div class="nick">{{ item.nickname }}</div>
                        <Classname class="level" :level="item.class" :classname="item.class_text">
                            <!-- {{ item.class_text }} -->
                        </Classname>
                    </div>
                    <div class="jointime">
                        {{ item.ctime || '未知'}}
                    </div>
                </div>
                <div class="empty" v-if="!teamList.length">暂无推荐结果</div>
            </div>

            <!-- <div class="card-item">
        <img src="../assets/head.png" alt="头像" class="head">
        <div class="mid">
          <div class="nick">Maker</div>
          <div class="level gold"><i slot="icon" class="iconfont icon-canpinhuihuiyuanv1"></i> 黄金会员</div>
        </div>
        <div class="jointime">
          2019-01-02 加入
        </div>
      </div> -->
        </div>
        <!-- <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode> -->
    </div>
</template>

<script>
    import {
        Qrcode,
        Tab,
        TabItem,
        PopupPicker,
        XInput,
        XButton,
        Group
    } from 'vux'
    import {
        getDirectlyRecommended,
        getIndirectRecommended
    } from '../api/index.js'
    import Classname from '../components/classname.vue'
    import { getIndex } from '../config/util.js'
import { setTimeout } from 'timers';
    const PAGE_SIZE = 10;
    export default {
        components: {
            Qrcode,
            Tab,
            TabItem,
            Classname,
            PopupPicker,
            Group
        },
        data() {
            return {
                pickerValue: ['全部'],
                pickerList: [['全部','游客', '黄金会员', '钻石会员', '至尊会员']],
                teamList: [],
                canBePullDown: true,
                page: 1,
                height: null
            }
        },
        methods: {
            onChange() {
                console.log('this.pickerValue: ', this.pickerValue[0]);
            },
            onItemClick(index) {
                this.type = index;
                this.teamList = [];
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                setTimeout(_ => {
                    this.page = 1;
                    this.getListSingle()
                })
            },
            _getMyitem() {
                let promise = this.type === 1 ? 
                    getIndirectRecommended({page: this.page}) : 
                    getDirectlyRecommended({page: this.page});
                this.$loading.show();
                return promise.then(res => {
                    if (res.data.list.length >= PAGE_SIZE) {
                        this.canBePullDown = true
                    }
                    return res.data.list
                }).then(_ => {
                    this.$loading.hide();
                    return _
                }).catch(_ => this.$loading.hide())
            },
             _scrollFn() {
                let orderDom = this.$refs.list;
                let boxHeight = orderDom.clientHeight;
                let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
                let offset = boxHeight + orderDom.offsetTop - scrollTop - this.height;
                if (offset == 0 && this.canBePullDown) {
                    console.log(offset)
                    this.canBePullDown = false;
                    this.page++;
                    this._getMyitem().then(respond => {
                        if (!respond) return;
                        this.teamList = [...this.teamList, ...respond]
                    })
                }
            },
            getListSingle() {
                this._getMyitem().then(respond => {
                    if (!respond) return
                    this.teamList = respond
                })
            }
        },
        computed: {
            showList() {
                return this.teamList.filter(item => {
                    // console.log(this.pickerValue[0])
                    if(this.pickerValue[0]=='全部') {
                        return item
                    }else {
                        // console.log('item.class_text: ', item.class_text);
                        return item.class_text==this.pickerValue[0]
                    }
                })
            }
        },
        mounted() {
            this.height = document.documentElement.clientHeight;
            this.page = 1;
            this.getListSingle()
            document.addEventListener('scroll', this._scrollFn)
        },
         beforeRouteLeave(to, from, next) {
            document.removeEventListener('scroll', this._scrollFn);
            next()
        }
    }
</script>

<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: #f4f4f4;
}
    .card-wrap {
        margin-top: 110px;
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
                flex-shrink: 0;
            }

            .mid {
                min-width: 100px;
                padding-left: 10px;
                padding-right: 10px;
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
                flex-shrink: 0;
                min-width: 140px;
                text-align: center;
            }
        }
        .empty {
            text-align: center;
            font-size: 14px;/*px*/
            color: #888;
            margin-top: 80px;
        }
    }
</style>

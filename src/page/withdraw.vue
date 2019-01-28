<template>
    <div class="withdraw">
         <x-input  v-model="value" placeholder="请输入提现金额" class="input"></x-input>
         <div class="btnWrap">
            <x-button type="primary" @click.native="_withdraw">点击提现</x-button>
        </div>
    </div>
</template>
<script>
import { XInput, XButton } from 'vux';
import { withdrawApi } from '../api/index'
export default {
    components: {
        XInput,
        XButton
    },
    data() {
        return {
            value: ''
        }
    },
    created() {
        let params = this.$route.params;
        if (!(params && typeof params.money === 'string')) return this.$router.push('/');
        this.money = +params.money;
    },
    methods: {
        _withdraw() {
            if (!/^\d+\.?\d{0,2}$/.test(this.value)) {
                return this.$vux.alert.show({
                    content: '请输入最多两位小数的金额'
                })
            }
            if (+this.value > this.money) {
                return this.$vux.alert.show({
                    content: '提现金额不能大于可用金额'
                })
            }
            withdrawApi({fee: this.value}).then(res => {
                if (res.code === 0) {
                    this.$vux.alert.show({
                        content: '提现成功'
                    })
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .withdraw {
        .input {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }
        .btnWrap {
            position: fixed;
            bottom: 0;
            left: 10px;
            right: 10px;
            padding-bottom: 10px;
        }
    }
</style>

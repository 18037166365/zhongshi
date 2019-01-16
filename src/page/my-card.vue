<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onItemClick">代发货</tab-item>
      <tab-item @on-item-click="onItemClick">已完成</tab-item>
    </tab>
    <CardItem />
    <!-- my-card
    <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode> -->
  </div>
</template>

<script>
import { Qrcode, Tab, TabItem } from 'vux'
import CardItem from '@/components/card-item';

export default {
  components: {
    Qrcode,
    Tab,
    TabItem,
    CardItem
  },
  methods: {
     onItemClick (index) {
      console.log('on item click:', index)
    },
  },
}
</script>

<template>
  <div class="list">
    <!-- 竞买状态 -->
    <item-title :item="itemLoc" :status="status" :isTimeout="isTimeout" :isPayed="isPayed"></item-title>
    <!-- 商品内容 -->
    <item-goods-info :item="itemLoc" :status="status" :isTimeout="isTimeout" :isPayed="isPayed"></item-goods-info>
    <!-- 操作区域 -->
    <item-operation :item="itemLoc" :status="status" :isTimeout="isTimeout" :isPayed="isPayed"></item-operation>
  </div>
</template>
<script>
import ItemTitle from './ItemTitle'
import ItemGoodsInfo from './ItemGoodsInfo'
import ItemOperation from './ItemOperation'
import { mapState } from 'vuex'
import { ENUM } from '../../../const/enum'
import { NAV } from '../static'

export default {
  data() {
    return {}
  },
  props: {
    item: Object
  },
  computed: {
    ...mapState({
      systemTime: state => state.myC2B.systemTime,
      navId: state => state.myC2B.navId
    }),
    isTimeout() {
      // 已中拍 超过失效时间 未支付
      return this.status == ENUM.C2B_STATUS.WINNING &&
        this.systemTime > this.itemLoc.canceled_at &&
        this.itemLoc.paipai_status != ENUM.PAIPAI_STATUS.ST_PAYED
        ? true
        : false
    },
    isPayed() {
      return this.status == ENUM.C2B_STATUS.WINNING && this.itemLoc.paipai_status == ENUM.PAIPAI_STATUS.ST_PAYED
        ? true
        : false
    },
    status() {
      /*
        HAS_ENROLL: 1, // 已报名 未出价
        COMPETING: 2, //  已出价 竞拍中
        MISSED: 3, //  未中拍
        WINNING: 4 //  已中拍
      */
      const nav = NAV.find(ele => ele.id == this.navId)
      let status = nav.status
      if (typeof nav.status === 'object') {
        // 区分 HAS_ENROLL（已报名未出价） or COMPETING（已出价）
        status = this.itemLoc.is_bid ? status[1] : status[0]
      }
      return status
    },
    itemLoc() {
      return {
        ...this.item,
        start_at: this.item.start_at * 1000,
        close_at: this.item.close_at * 1000,
        canceled_at: this.item.canceled_at * 1000
      }
    }
  },
  components: {
    ItemTitle,
    ItemGoodsInfo,
    ItemOperation
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin: 15px 15px 0;
  background: #fff;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.09);
  border-radius: 4px;
}
</style>

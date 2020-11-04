<template>
  <div class="info-container">
    <div class="flex-item">
      <div class="item">
        <span class="title">保证金</span>
        <span class="content">￥{{ auctionInfo.deposit | formatMoney }}</span>
      </div>
    </div>
    <div class="flex-item">
      <div class="item">
        <span class="title">起拍价</span>
        <span class="content"
          >￥{{ (auctionInfo.starting_price - auctionInfo.starting_huanbi) | formatMoney }}&nbsp;+&nbsp;权益{{
            auctionInfo.starting_huanbi | formatMoney
          }}</span
        >
      </div>
    </div>
    <div class="flex-item">
      <div class="item">
        <span class="title">加价幅度</span>
        <span class="content"
          >￥{{ auctionInfo.cash_range | formatMoney }}&nbsp;+&nbsp;权益{{
            auctionInfo.huanbi_range | formatMoney
          }}</span
        >
      </div>
    </div>
    <div class="flex-item">
      <div class="item">
        <span class="title">开拍时间</span>
        <span class="content">{{ utils.formatDate('MM月DD日 HH:mm', auctionInfo.start_at) }}</span>
      </div>
      <div class="item">
        <span class="title">结束时间</span>
        <span class="content">{{ utils.formatDate('MM月DD日 HH:mm', auctionInfo.close_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },

  computed: {
    ...mapState({
      auctionInfo: state => state.auction.auctionInfo
    })
  }
}
</script>

<style lang="scss" scoped>
.info-container {
  background-color: #ffffff;
  margin-bottom: 14px;
  padding: 16px 15px;
  .flex-item {
    display: flex;
    align-items: center;
    line-height: 1;
    & + .flex-item {
      margin-top: 15px;
    }
    .item {
      flex: 1;
      display: flex;
      line-height: 18px;
    }
    .title {
      font-size: 13px;
      color: #666666;
      width: 65px;
      text-align: left;
    }
    .content {
      flex: 1 0 0;
      font-size: 13px;
      color: #999999;
      margin-left: 8px;
    }
  }
}
</style>

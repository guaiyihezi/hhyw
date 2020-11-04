<template>
  <div class="time-contianer">
    <div class="flex-box not-start" v-if="auctionInfo.status == AUCTION_STATE.STATUS_NOTSTARTED">
      <img src="../../../assets/image/hh-icon/a0-auction/not-start.png" alt="" />
      <div class="count-down">
        <span>距离开始</span>
        <sec-countdown :end_at="auctionInfo.start_at * 1e3" :from_class="'auciton-count-down'"></sec-countdown>
      </div>
    </div>
    <div class="flex-box start" v-if="auctionInfo.status == AUCTION_STATE.STATUS_STARTED">
      <img src="../../../assets/image/hh-icon/a0-auction/start.png" alt="" />
      <div class="count-down">
        <span>距离结束</span>
        <sec-countdown :end_at="auctionInfo.close_at * 1e3" :from_class="'auciton-count-down'"></sec-countdown>
      </div>
    </div>
    <div class="flex-box close" v-if="auctionInfo.status == AUCTION_STATE.STATUS_CLOSED">
      <img src="../../../assets/image/hh-icon/a0-auction/close.png" alt="" />
    </div>
  </div>
</template>

<script>
import { AUCTION_STATE } from '../static'
import { mapState, mapMutations } from 'vuex'
import SecCountdown from '../../../components/common/SecCountdown'
export default {
  name: '',
  data() {
    return {
      AUCTION_STATE
    }
  },

  components: {
    SecCountdown
  },

  computed: {
    ...mapState({
      auctionInfo: state => state.auction.auctionInfo
    })
  },

  methods: {
    ...mapMutations({
      saveAuctionInfo: 'saveAuctionInfo'
    }),
    changeState() {
      let status = undefined
      if (this.auctionInfo.status == this.AUCTION_STATE.STATUS_NOTSTARTED) {
        status = this.AUCTION_STATE.STATUS_STARTED
      } else if (this.auctionInfo.status == this.AUCTION_STATE.STATUS_STARTED) {
        status = this.AUCTION_STATE.STATUS_CLOSED
      }

      if (!status) {
        return
      }

      this.saveAuctionInfo({
        ...this.auctionInfo,
        ...{ status }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.time-contianer {
  height: 42px;
  .flex-box {
    padding: 0 15px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.not-start {
      background: linear-gradient(270deg, rgba(3, 157, 88, 1) 0%, rgba(60, 204, 139, 1) 100%);
    }
    &.start {
      background: linear-gradient(270deg, rgba(235, 138, 111, 1) 0%, rgba(247, 183, 161, 1) 100%);
    }
    &.close {
      background-color: #c6c6c6;
    }
    img {
      height: 16px;
    }
    .count-down {
      display: flex;
      align-items: center;
    }
    span {
      font-size: 12px;
      color: #feffff;
      margin-right: 12px;
    }
  }
}
</style>

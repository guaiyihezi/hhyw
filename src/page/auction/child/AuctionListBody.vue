<template>
  <div class="auction-list-body" :class="{ 'normal-list': isProdList }" @click="clickItem">
    <div class="list-body-wrapper">
      <div class="image-wrapper">
        <img class="product-img" v-lazy="lazy" alt="商品图片" />
        <div class="item-count-down not-start" v-if="item.status == AUCTION_STATE.STATUS_NOTSTARTED && needTimer">
          <span>距开始:</span>
          <sec-countdown
            :key="item.id"
            :end_at="item.start_at * 1e3"
            :from_class="'auciton-list-count-down not-start'"
          ></sec-countdown>
        </div>
        <div class="item-count-down start" v-if="item.status == AUCTION_STATE.STATUS_STARTED && needTimer">
          <span>距结束:</span>
          <sec-countdown
            :key="item.id"
            :end_at="item.close_at * 1e3"
            :from_class="'auciton-list-count-down start'"
          ></sec-countdown>
        </div>
        <div class="item-count-down closed" v-if="item.status == AUCTION_STATE.STATUS_CLOSED && needTimer">
          <span>竞拍已结束</span>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="prod-name">
          {{ item.name }}
        </div>
        <div class="price-wrapper">
          <span class="label">{{ isNoBidders ? '起拍价' : '当前价' }}</span>
          <span class="unit">￥</span>
          <span class="num">{{ item.current_price | formatMoney }}</span>
          <span class="bid-count" v-if="needBidder">{{ item.bid_number }}人已出价</span>
        </div>
        <div class="price-wrapper qy-wp">
          <div class="cash-wp">
            <span class="unit-cash">￥</span>
            <span class="num-cash">{{ (item.current_price - item.money_line) | formatMoney }}</span>
          </div>
          <span class="unit-plus">+</span>
          <div class="qy-wp">
            <span class="unit-qy">权益</span>
            <span class="num-qy">{{ item.money_line | formatMoney }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AUCTION_STATE } from '../static'
import SecCountdown from '../../../components/common/SecCountdown'
export default {
  name: '',
  data() {
    return {
      AUCTION_STATE,
      lazy: {
        src: this.item.thumb,
        error: require('../../../assets/image/change-icon/default_image_02@2x.png'),
        loading: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-prod-thumb.png')
      }
    }
  },

  components: {
    SecCountdown
  },

  props: {
    item: null,
    index: null,
    needTimer: {
      default: true
    },
    needBidder: {
      default: true
    },
    isProdList: null
  },

  computed: {
    // 是否有竞拍者
    isNoBidders() {
      return (
        this.item.current_price <= this.item.starting_price || this.item.status == this.AUCTION_STATE.STATUS_NOTSTARTED
      )
    }
  },

  methods: {
    changeState() {
      this.$emit('countDownEnd', this.item, this.index)
    },

    clickItem() {
      if (this.$route.name == 'auctionOffer') {
        this.$_goBack()
      } else {
        this.$router.push({ name: 'auctionDetail', query: { id: this.item.id } })
      }
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.auction-list-body {
  padding: 0 15px;
  .list-body-wrapper {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include thin-border(rgba(85, 46, 32, 0.2), 0, auto, true);
  }
  .image-wrapper {
    flex-shrink: 0;
    width: 95px;
    height: 95px;
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    .product-img {
      width: 100%;
    }
    .item-count-down {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) scale(floor(10px / 0.12px) / 100);
      transform-origin: center bottom;
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 22px;
      line-height: 1;
      & > span {
        white-space: nowrap;
        margin-right: 3px;
        font-size: 12px;
      }
      &.not-start {
        background-color: rgba(160, 219, 192, 0.7);
        color: #007943;
      }
      &.start {
        background-color: rgba(203, 193, 174, 0.7);
        color: #5a3600;
      }
      &.closed {
        background-color: rgba(194, 194, 194, 0.7);
        color: #404040;
      }
    }
  }
  .info-wrapper {
    flex: 1;
    align-self: stretch;
    margin-left: 15px;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .prod-name {
      color: $baseColor;
      font-size: 14px;
      font-weight: normal;
      line-height: 16px;
      height: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      display: flex;
      -webkit-line-clamp: 2;
      box-orient: vertical;
      -webkit-box-orient: vertical;
    }
    .price-wrapper {
      display: flex;
      align-items: center;
      .label {
        color: $primaryColor;
        font-size: 12px;
        line-height: 1;
      }
      .unit {
        font-size: 16px;
        color: rgba(119, 37, 8, 1);
        line-height: 1;
        letter-spacing: -2px;
        margin-left: 2px;
        position: relative;
        top: 0;
      }
      .num {
        color: $primaryColor;
        font-size: 18px;
        flex: 1;
        line-height: 1;
        font-weight: bold;
        position: relative;
        top: -1px;
      }
      .bid-count {
        display: inline-block;
        @include sc(11px, #999999, right bottom);
      }
    }
    .qy-wp {
      font-size: 14px;
      font-weight: normal;
      color: rgba(64, 64, 64, 1);
      line-height: 16px;
      display: flex;
      align-items: center;

      .unit-plus {
        margin: 0 1px;
      }
      .unit-qy {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }

  // 普通商品列表页的秒杀样式
  &.normal-list {
    .list-body-wrapper:after {
      display: none;
    }
    .image-wrapper {
      width: 110px;
      height: 110px;
    }
    .info-wrapper {
      margin: 0 -15px -11px 15px;
      padding: 5px 15px 16px 0;
      @include thin-border(rgba(85, 46, 32, 0.2), 0, auto, true);
    }
  }
}
</style>

<template>
  <div class="auction-info-item" v-if="auctionInfo.id">
    <div class="price">
      <span class="name">{{ Txt }}</span>
      <span class="unit">￥</span>
      <span class="num">{{ prodPrice | formatMoney }}</span>
      <span class="rules-entrance">
        <router-link :to="{ name: 'auctionRules' }">
          <span>竞拍规则</span>
          <img src="../../../assets/image/hh-icon/a0-auction/icon-rules.png" alt="" />
        </router-link>
      </span>
    </div>
    <div class="qy-price">
      <div class="price-w">
        <span class="unit">￥</span>
        <span class="num">{{ (prodPrice - auctionInfo.money_line) | formatMoney }}</span>
      </div>
      <span class="unit-plus">+</span>
      <div class="qy-icon-wrapper">
        <span class="unit">权益</span>
        <span class="num">{{ auctionInfo.money_line | formatMoney }}</span>
      </div>
    </div>
    <div class="goods-name">{{ auctionInfo.goods.name }}</div>
    <div class="ex-info">
      <span>浏览 {{ auctionInfo.uv }}次</span>
      <span>报名 {{ auctionInfo.sing_number }}人</span>
      <span>出价 {{ auctionInfo.bid_number }}次</span>
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
    }),

    prodPrice() {
      return Math.max(this.auctionInfo.current_price, this.auctionInfo.starting_price)
    },

    Txt() {
      let str = '当前价'
      if (this.auctionInfo.current_price <= this.auctionInfo.starting_price) {
        str = '起拍价'
      }
      return str
    }
  },

  created() {}
}
</script>

<style lang="scss" scoped>
.auction-info-item {
  background-color: #ffffff;
  margin-bottom: 14px;
  padding: 2px 15px 15px;
}
.price {
  display: flex;
  align-items: baseline;
  color: $primaryColor;
  font-weight: bold;

  .name {
    color: $primaryColor;
    font-size: 16px;
  }
  .unit {
    font-size: 17px;
    letter-spacing: -2px;
    margin-left: 2px;
  }
  .num {
    font-size: 26px;
    line-height: 35px;
    transform: translateY(1px);
  }
  .rules-entrance {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      color: $primaryColor;
      font-weight: normal;
      font-size: 13px;
    }
    img {
      margin-left: 10px;
      width: 5px;
    }
  }
}
.qy-price {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-weight: bold;
  color: rgba(64, 64, 64, 1);
  line-height: 20px;

  .unit,
  .unit-plus {
    font-size: 14px;
  }
  .num {
    font-size: 16px;
    font-weight: normal;
  }
  .unit-plus {
    margin: 0 2px;
  }
  .unit {
    vertical-align: 1px;
  }
  .qy-icon-wrapper .unit {
    margin-right: 2px;
  }
}

.goods-name {
  font-size: 15px;
  font-weight: 500;
  color: rgba(64, 64, 64, 1);
  line-height: 21px;
  margin-top: 15px;
}
.ex-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
    font-weight: 300;
    color: rgba(128, 128, 128, 1);
    line-height: 17px;
    margin-top: 12px;
  }
}
</style>

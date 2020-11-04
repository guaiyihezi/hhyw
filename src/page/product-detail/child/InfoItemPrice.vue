<template>
  <div class="price-contianer">
    <div class="info-header ui-flex">
      <div class="price info-price">
        <PriceItem
          :cash="utils.formatFloat(detailInfo.MONEY_SHOW, true)"
          :surplus="utils.formatFloat(detailInfo.HB_SHOW, true)"
          classType="price-style-two"
          v-if="type === 'product'"
        />
        <PriceItem
          v-if="type === 'cuxiao'"
          :cash="utils.formatFloat(detailInfo.secbuy.cash_price, true)"
          :surplus="utils.formatFloat(detailInfo.secbuy.money_line, true)"
          classType="price-style-cuxiao"
          :cuxiaoDiscount="{
            bg: detailInfo.secbuy.discount_colour || '#E0360A',
            isShow: isShowDiscount,
            discount: discount
          }"
        />
      </div>
    </div>

    <!-- 权益抵扣部分 -->
    <!-- 后期可能会区分用户显示（爱投资/其他） -->
    <div class="hb-discount" v-if="detailInfo.id && detailInfo.HB_SHOW > 0" @click="showHBRules">
      <span class="hb-title">原价</span>
      <span class="unit">￥</span>
      <span class="hb-price">{{ utils.formatFloat(detailInfo.market_price || detailInfo.current_price) }}</span>
      <!-- <img src="../../../assets/image/change-icon/icon_more.png" /> -->
    </div>

    <div class="price-judge" v-if="isShowPriceJudge" @click="doJudge">
      <img src="../../../assets/image/hh-icon/icon-price-judge@3x.png" /><span>价格投诉</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { fetchProductJudgeStatus } from '../../../api/product'
import PriceItem from '../../../components/common/ListItemPrice'

export default {
  name: '',
  data() {
    return {
      judgeStatus: ''
    }
  },
  props: ['type'],
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      detailInfo: state => state.detail.detailInfo
    }),
    isShowMarketPrice() {
      let market_price = this.detailInfo.market_price * 1
      let current_price = this.detailInfo.current_price * 1
      let val = false
      if (market_price > current_price) {
        val = true
      }
      return val
    },
    isPromotion() {
      return this.$route.name === 'promotionDetail'
    },
    discount() {
      return this.detailInfo.secbuy.discount
    },
    isShowDiscount() {
      return (
        this.isPromotion &&
        this.discount > 0 &&
        this.discount < 10 &&
        this.detailInfo.secbuy.type == 2 &&
        this.detailInfo.secbuy.is_show_discount
      )
    },
    isShowPriceJudge() {
      return (
        this.$route.name != 'promotionDetail' &&
        this.$route.name != 'SeckillProduct' &&
        this.$route.name != 'auctionDetail'
      )
    }
  },

  methods: {
    ...mapMutations({
      saveHBRulesPopupState: 'saveHBRulesPopupState',
      savePriceJudgeProduct: 'savePriceJudgeProduct'
    }),
    // showHBRules: 显示权益说明
    showHBRules() {
      this.saveHBRulesPopupState(true)
    },
    // 价格投诉
    async doJudge() {
      if (!this.isOnline) {
        return this.$router.push({ name: 'login' })
      }

      this.$indicator.open()
      const res = await fetchProductJudgeStatus(this.detailInfo.id)
      // null 没投诉 0：已下架 1: 投诉待处理 2: 投诉成功后已上架   3：投诉失败
      this.judgeStatus = res.status
      this.$indicator.close()

      if (null === this.judgeStatus || 1 === this.judgeStatus || 2 === this.judgeStatus || 3 === this.judgeStatus) {
        // null or 1 or 2 or 3
        // 将商品信息保存起来 供下个 投诉页使用
        this.savePriceJudgeProduct(this.detailInfo)
        return this.$router.push({ name: 'goodspricecomplaint', query: { id: this.detailInfo.id } })
      } else {
        // 0
        return this.$messagebox({
          title: '',
          message:
            '感谢您对换换商城的商品进行价格监督。已有其他用户赶在您之前进行投诉啦。我们在确认该商品的问题后，将会对商品进行下架整改，再次感谢您的参与。',
          confirmButtonText: '好的'
        })
      }
    }
  },
  components: {
    PriceItem
  }
}
</script>

<style lang="scss" scoped="scoped">
.price-contianer {
  position: relative;
}
.ui-flex {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-basis: 100%;
  width: auto;
}
.info-header {
  padding: 0 15px;
  justify-content: flex-start;
  div {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .price {
    position: relative;
    font-weight: bold;
    font-size: 0;
    &.info-price {
      display: flex;
      align-items: baseline;
      span {
        font-weight: bolder;
      }
    }
    span {
      @include sc(24px, $priceColor);
    }
    .price-unit {
      @include sc(17px, $priceColor);
    }
  }
  .price {
    display: flex;
    span {
      display: block;
      font-weight: normal;
    }
    .old-price {
      font-size: 13px;
      font-weight: normal;
      line-height: 18px;
      color: #979797;
      line-height: 16px;
      text-decoration: line-through;
      margin-left: 5px;
      margin-bottom: -7px;
    }
    .hb-price {
      margin: 0 3px;
      padding: 0 8px;
      background-color: #ffdfae;
      border-radius: 10px 10px 10px 0px;
      &.discount {
        border-radius: 10px;
        label {
          color: #fff;
        }
      }
      label {
        display: inline-block;
        @include sc(11px, #533c16);
        line-height: 19px;
      }
    }
  }
}
.hb-discount {
  padding: 0 16px;
  display: flex;
  align-items: center;
  margin-top: 7px;
  font-size: 0;
  span {
    color: $normalPriceColor;
    text-decoration: line-through;
  }
  .hb-title {
    @include sc(10px, #999);
    line-height: 14px;
  }
  .unit {
    margin-left: -2px;
    font-size: 15px;
    line-height: 21px;
  }
  .hb-price {
    font-size: 15px;
    line-height: 21px;
  }
  img {
    width: 19px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.price-judge {
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
  right: 14px;
  font-size: 0;

  img {
    width: 18px;
  }
  span {
    display: block;
    margin-top: 3px;
    font-size: 10px;
    color: rgba(85, 46, 32, 1);
    line-height: 14px;
  }
}
</style>

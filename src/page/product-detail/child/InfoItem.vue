<!-- Detailinfo.vue -->
<template>
  <div class="ui-detail-info" v-if="detailInfo">
    <!-- 汽车类商品 分期展示效果 -->
    <template v-if="detailInfo.instalment && detailInfo.instalment.length > 0">
      <info-item-price-for-fq></info-item-price-for-fq>
    </template>
    <template v-else>
      <info-item-price :type="type?type:'product'"></info-item-price>
    </template>

    <!-- 优惠券 -->
    <info-item-coupon></info-item-coupon>

    <!-- 促销 -->
    <info-promotions></info-promotions>

    <!-- 商品名称 -->
    <div class="prod-name">{{ detailInfo.name }}</div>

    <div class="detailinfo-sub ui-flex">
      <template v-if="isPromotion">
        <span>销量{{ detailInfo.secbuy.secbuy_sale }}</span>
        <span
          >库存 {{ $accounting.formatNumber(detailInfo.secbuy.secbuy_quantity - detailInfo.secbuy.secbuy_sale) }}</span
        >
        <span>{{ limitTxt }}</span>
      </template>
      <template v-else>
        <span>{{ shipTxt }}</span>
        <span>销量 {{ $accounting.formatNumber(detailInfo.sales_count) }}</span>
        <span>库存 {{ $accounting.formatNumber(detailInfo.good_stock) }}</span>
      </template>
    </div>
    <!-- 商家 -->
    <info-suppliers></info-suppliers>

    <!-- 首单返现 -->
    <info-return-cash
      v-if="detailInfo.red_cash_back && (detailInfo.red_cash_back.name || detailInfo.red_cash_back.max_num > 0)"
      :returnCash="detailInfo.red_cash_back.max_num"
    ></info-return-cash>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import InfoPromotions from './InfoPromotions'
import InfoSuppliers from './InfoSuppliers'
import InfoReturnCash from './InfoReturnCash'
import InfoItemPriceForFq from './InfoItemPriceForFq'
import InfoItemPrice from './InfoItemPrice'
import InfoItemCoupon from './InfoItemCoupon'
import { ENUM } from '../../../const/enum'

export default {
  data() {
    return {}
  },

  components: {
    InfoSuppliers,
    InfoReturnCash,
    'info-item-price-for-fq': InfoItemPriceForFq,
    InfoItemPrice,
    InfoItemCoupon,
    InfoPromotions
  },
  props:['type'],
  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo
    }),
    shipping() {
      return this.detailInfo.format_shipping_price
    },
    shipTxt() {
      let txt
      if (this.shipping && this.shipping.head_fee) {
        switch (this.shipping.free_type) {
          case 1:
            txt = '满' + this.shipping.free_sum + '件包邮'
            break
          case 2:
            txt = '满' + this.utils.formatFloat(this.shipping.free_fee) + '元包邮'
            break
          case 3:
            txt = '满' + this.shipping.free_sum + '件或满' + this.utils.formatFloat(this.shipping.free_fee) + '元包邮'
            break
          default:
            txt = '运费￥' + this.utils.formatFloat(this.shipping.head_fee)
        }
      } else {
        txt = '包邮'
      }
      return txt
    },
    isPromotion() {
      return this.$route.name === 'promotionDetail'
    },
    limitTxt() {
      if (this.detailInfo.only_purchase) {
        return `每人限购${this.detailInfo.only_purchase}`
      } else {
        return '不限购'
      }
    }
  },

  created() {},

  methods: {
    ...mapMutations({
      saveCouponPopupState: 'saveCouponPopupState'
    }),

    /**
     * Opens a coupon popup. 打开优惠券蒙层
     */
    openCouponPopup() {
      this.saveCouponPopupState(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-detail-info {
  padding-top: 10px;
  background: #fff;
  // height: 120px;
  .money-coupon {
    padding: 0 15px;
    height: 50px;
    display: flex;
    align-items: center;
    @include thin-border(#dbdbdb, 15px, auto, true);
    .money-coupon-title {
      color: #999999;
      text-align: left;
      font-size: 14px;
    }
    .discount-coupon {
      flex: 1;
      margin-left: 10px;
      padding-right: 55px;
      height: 21px;
      font-size: 0;
      overflow: hidden;
      div {
        min-width: 50px;
        box-sizing: border-box;
        display: inline-block;
        height: 21px;
        line-height: 21px;
        padding: 1px 8px 0;
        background-color: #c9b594;
        position: relative;
        border-radius: 2px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        & + div {
          margin-left: 10px;
        }
        &:after,
        &:before {
          position: absolute;
          border-radius: 6px;
          display: block;
          content: '';
          width: 6px;
          height: 6px;
          background-color: #ffffff;
          top: 50%;
        }
        &:before {
          left: 0;
          transform: translate(-50%, -50%);
        }
        &:after {
          right: 0;
          transform: translate(50%, -50%);
        }
        .unit {
          letter-spacing: -1px;
          margin-left: -1px;
        }
      }
    }
    .money-coupon-rules {
      display: inline-block;
      @include sc(11px, #999999);
      line-height: 1;
      margin-right: 3px;
    }
    & > img {
      width: 19px;
    }
  }

  .prod-name {
    color: #707070;
    font-size: 14px;
    padding: 0 15px;
    margin-top: 13px;
    font-weight: 600;
    word-break: break-all;
    line-height: 1.5;
  }
  .detailinfo-sub {
    font-size: 12px;
    color: #808080;
    margin-top: 10px;
    padding: 0 15px;
    background: #fff;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info-sub {
    border-bottom: 0.5px solid #e8eaed;
    padding-bottom: 15px;
    p {
      padding: 0;
      margin: 0;
      color: $primaryColor;
      font-size: 12px;
      &.ui-clip {
        display: -webkit-box;
        overflow: hidden;
      }
    }
    img {
      width: 8px;
      height: 4px;
      margin-left: 11px;
    }
  }
  .info-promotions {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    padding: 15px;
    span {
      margin-left: 15px;
      font-size: 12px;
      font-family: 'PingFangSC-Regular';
      color: rgba(143, 142, 148, 1);
    }
    img {
      width: 38px;
    }
  }
}
</style>

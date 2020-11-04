<template>
  <div
    class="money-coupon"
    @click="openCouponPopup"
    v-if="detailInfo.id && detailInfo.id == couponInfo.id && couponInfo.list && couponInfo.list.length > 0"
  >
    <div class="money-coupon-title">优惠</div>
    <div class="discount-coupon">
      <div v-for="item in couponList" :key="item.coupon_id"><span class="unit">￥</span>{{ item.coupon_price }}</div>
    </div>
    <img src="../../../assets/image/change-icon/icon_more.png" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },

  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo,
      couponInfo: state => state.detail.couponInfo
    }),
    couponList() {
      let list = this.couponInfo.list
      if (list.length > 4) list = list.slice(0, 4)
      return list
    }
  },

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

<style lang="scss" scoped="scoped">
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
    line-height: 20px;
  }
  .discount-coupon {
    flex: 1;
    margin-left: 10px;
    padding-right: 55px;
    height: 35px;
    font-size: 0;
    overflow: hidden;

    display: flex;
    align-items: center;
    div {
      min-width: 50px;
      box-sizing: border-box;
      display: inline-block;
      height: 17px;
      line-height: 17px;
      background-color: #c9b594;
      position: relative;
      border-radius: 2px;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      padding-top: 1px;
      margin-top: -2px;
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
</style>

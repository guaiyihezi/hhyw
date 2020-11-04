<!-- Shopping.vue -->
<template>
  <mt-popup v-model="isShowCouponPopup" position="bottom" v-bind:close-on-click-modal="false" style="height: 77%;">
    <div class="favorable-container" v-if="isCorrentShow">
      <div class="favorable-header">
        <span class="title">领券</span>
        <img src="../../../assets/image/hh-icon/icon-关闭.png" @click="closeCouponPopup" />
      </div>
      <div class="favorable-wranning">
        <span>限时秒杀、找便宜、我的小店、分期租购暂不支持使用优惠券</span>
      </div>
      <div class="favorable-body" v-if="couponInfo.list.length > 0">
        <coupon-item
          v-for="(item, index) in couponInfo.list"
          :item="item"
          :key="index"
          @onclick="itemCilck(item, index)"
          :isDetail="true"
          :class="{ 'is-rec': item.is_rec == 2 }"
        ></coupon-item>
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Button } from 'mint-ui'
import CouponItem from './CouponItem'
import { getACoupon } from '../../../api/coupon'

export default {
  data() {
    return {}
  },

  props: {
    isShowCouponPopup: {
      type: Boolean,
      default: false
    }
  },

  components: {
    CouponItem
  },

  created() {},

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      detailInfo: state => state.detail.detailInfo,
      couponInfo: state => state.detail.couponInfo
    }),
    isCorrentShow() {
      if (this.$route.name === 'product') {
        return this.detailInfo.id && this.detailInfo.id == this.couponInfo.id && this.couponInfo.list.length > 0
          ? true
          : false
      } else {
        return this.couponInfo.list.length > 0 ? true : false
      }
    }
  },

  mounted() {},

  methods: {
    ...mapMutations({
      saveCouponPopupState: 'saveCouponPopupState',
      updateCouponInfo: 'updateCouponInfo'
    }),

    // 关闭优惠券浮层
    closeCouponPopup() {
      this.saveCouponPopupState(false)
    },

    itemCilck(item, index) {
      if (!this.isOnline) {
        this.$router.push({ name: 'login' })
        return
      }
      getACoupon(item.coupon_id)
        .then(res => {
          this.$toast({
            message: '领取成功',
            position: 'bottom',
            duration: 1500
          })
          this.updateCouponInfo(index)
        })
        .finally(() => {
          this.resetToastIndex()
        })
    },
    // webpack会把toast的z-index重置为2，在不修改webpack的配置前提下，手动添加toast容器的行内样式
    resetToastIndex() {
      let nod = document.getElementsByClassName('mint-toast')[0]
      nod.style.zIndex = 9999
    }
  }
}
</script>
<style lang="scss" scoped>
.favorable-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .favorable-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    padding: 0 15px;
    @include thin-border();
    .title {
      color: #404040;
      font-size: 14px;
      white-space: nowrap;
    }
    img {
      width: 12px;
    }
  }
  .favorable-wranning {
    padding: 15px 0 0 15px;
    font-size: 12px;
    font-weight: 300;
    color: #707070;
    line-height: 17px;
  }
  .favorable-body {
    flex: 1;
    overflow: auto;
    padding: 15px;
  }
}
</style>

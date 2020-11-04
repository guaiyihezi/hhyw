<!-- PromotionPopup.vue -->
<template>
  <mt-popup v-model="promoPopstatus" position="bottom" v-bind:close-on-click-modal="false" style="height: 72%;">
    <div class="detail-promotions">
      <div class="header">
        <h3>促销</h3>
        <img src="../../../assets/image/hh-icon/icon-关闭.png" v-on:click="close" />
      </div>
      <div class="promotions-body">
        <div class="promo">
          <div class="promo-title">
            <span :style="promoStyle(detailInfo.tags_info[0])">{{ detailInfo.tags_info[0].name }}</span>
          </div>
          <div class="promo-body">
            <p class="promo-desc">{{ detailInfo.tags_info[0].desc }}</p>
            <p class="tips">(只限优惠券用户使用 同笔订单中优惠券不可叠加使用)</p>
          </div>
          <!-- <img src="../../../assets/image/change-icon/c0_sale@2x.png" /> -->
        </div>
        <!-- <div class="promo" v-for="(item, index) in detailInfo.tags_info" :key="index">
          <div class="promo-title">
            <span :style="promoStyle(item)">{{ item.name }}</span>
          </div>
          <div class="promo-body">
            <p class="promo-desc">{{ item.desc }}</p>
            <p class="tips">(只限优惠券用户使用 同笔订单中优惠券不可叠加使用)</p>
          </div>
          <img src="../../../assets/image/change-icon/c0_sale@2x.png" />
        </div> -->
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },

  props: {
    promoPopstatus: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo
    })
  },

  methods: {
    ...mapMutations({
      savePromosPopupState: 'savePromosPopupState'
    }),

    close() {
      this.savePromosPopupState(false)
    },

    promoStyle(item) {
      const o = {}
      o.borderColor = item.color
      o.backgroundColor = item.color
      return o
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-promotions {
  display: flex;
  flex-direction: column;
  height: 100%;
  div.header {
    padding: 0 15px;
    position: relative;
    @include thin-border();
    h3 {
      font-size: 15px;
      color: rgba(78, 84, 93, 1);
      padding: 0;
      margin: 0;
      height: 50px;
      line-height: 50px;
      width: 100%;
    }
    img {
      position: absolute;
      top: 14px;
      right: 10px;
      width: 12px;
      height: 12px;
      opacity: 1;
    }
  }
  .promotions-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
    .promo {
      display: flex;
      padding: 15px 0 10px;
      @include thin-border(#e8eaed, 0, auto, true);
      .promo-title {
        font-size: 0;
        span {
          display: inline-block;
          white-space: nowrap;
          @include sc(11px, #ffffff, left center);
          margin-left: 0;
          padding: 0 8px;
          line-height: 18px;
          border-radius: 20px;
          border: 1px solid #f90069;
          background: #f90069;
          font-weight: 700;
        }
      }
      .promo-body {
        margin-left: 7px;
        flex: 1;
        .promo-desc {
          font-size: 13px;
          color: #666666;
        }
      }
      .tips {
        margin-top: 5px;
        display: inline-block;
        position: relative;
        width: 120%;
        @include sc(10px, #999999, left center);
      }
    }
  }
}
</style>

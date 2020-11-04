<template>
  <div :class="wrapperClass">
    <div class="order-image-item">
      <img :src="item.thumb" data-src="../../../assets/image/change-icon/default_image_02@2x.png" v-if="item.thumb" />
      <img src="../../../assets/image/change-icon/default_image_02@2x.png" v-else />
    </div>
    <div class="order-detail">
      <div class="order-title">{{ item.name }}</div>
      <div class="price-total">
        <label>{{ priceLable }}</label> <span class="price-unit">￥</span
        ><span class="value">{{ item.current_price | formatMoney }}</span>
      </div>
      <div class="price-discount">
        <span class="price-unit">￥</span
        ><span class="value">{{ (item.current_price - item.money_line) | formatMoney }} </span
        ><span class="unit-plus">+</span><span class="qy-unit">权益</span
        ><span class="value">{{ item.money_line | formatMoney }} </span>
      </div>
      <div class="money-bzj">
        <label>保证金</label> <span class="price-unit">￥</span><span>{{ item.deposit | formatMoney }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ENUM } from '../../../const/enum'

export default {
  data() {
    return {}
  },
  props: {
    item: Object,
    status: Number
  },
  computed: {
    priceLable() {
      return this.status == ENUM.C2B_STATUS.MISSED || this.status == ENUM.C2B_STATUS.WINNING ? '成交价' : '当前价'
    },
    goodsDisable() {
      return this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_CANCEL && Number(this.item.deposit) <= 0
    },
    wrapperClass() {
      return {
        'order-image': true,
        disable: this.goodsDisable
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.order-image {
  display: flex;
  justify-content: flex-start;
  padding: 12px 0;
  margin: 0 10px;

  &.disable * {
    color: rgba(51, 51, 51, 0.54) !important;
  }

  .order-image-item {
    flex-basis: 100px;
    width: 100px;
    height: 100px;
    background-color: rgba(249, 249, 249, 1);
    border-radius: 2px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .order-detail {
    flex: 1 0 0;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;

    .order-title {
      font-size: 13px;
      line-height: 16px;
      height: 32px;
      color: #404040;
      word-wrap: break-word;
      white-space: normal;
      word-break: break-all;

      overflow: hidden;
      text-overflow: ellipsis;
      @include limit-line(2);
    }
    .price-total {
      color: $primaryColor;
      margin-top: 2px;

      label {
        font-size: 12px;
        line-height: 16px;
        vertical-align: 1px;
        margin-right: 4px;
      }
      .price-unit {
        font-size: 16px;
        display: inline-block;
        line-height: 16px;
        letter-spacing: 1px;
      }
      .value {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        line-height: 16px;
      }
    }
    .price-discount {
      display: flex;
      color: #404040;
      font-size: 14px;
      font-weight: normal;
      color: rgba(64, 64, 64, 1);
      line-height: 16px;
      margin-bottom: 3px;

      .qy-unit {
        font-size: 11px;
        margin-right: 2px;
      }
      .unit-plus {
        margin-right: 1px;
      }
    }
    .money-bzj {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>

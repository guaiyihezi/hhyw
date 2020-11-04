<template>
  <div class="product-info" :class="`icon-${index}`" @click="productClick">
    <div class="product-food">
      <img class="product-icon" v-lazy="lazy" />
      <!-- <activity-icon-on-product
        v-if="item.act_616_type"
        :offset="true"
        :typeCode="item.act_616_type"
      ></activity-icon-on-product> -->
    </div>
    <div class="product-title">
      <span>{{ item.name }}</span>
    </div>
    <div class="product-bottom">
      <!-- <p class="product-price">
        <span class="orig-price">
          <span class="price-unit">￥</span>
          <label>{{ utils.formatFloat(item.MONEY_SHOW, true) }}</label>
          <div class="quanyi-price-icon"></div>
        </span>
      </p>
      <p class="product-price">
        <span class="hb-price" v-if="item.HB_SHOW > 0">
          <span class="price-unit">￥</span>
          <label>{{ utils.formatFloat(item.current_price, true) }}</label>
        </span>
      </p> -->
      <!-- :cash="utils.formatFloat(item.MONEY_SHOW, true)" :surplus="utils.formatFloat(item.current_price, true)" -->
      <!-- :cash="50000" :surplus="50000" -->
      <PriceItem :cash="utils.formatFloat(item.MONEY_SHOW, true)" :surplus="utils.formatFloat(item.HB_SHOW, true)" />
    </div>
  </div>
</template>

<script>
import { ENUM } from '../../../const/enum'
import PriceItem from "../../../components/common/ListItemPrice"
export default {
  name: 'HomeProductDayhotBody',
  data() {
    return {
      lazy: {
        src: this.item.thumb,
        error: require('../../../assets/image/change-icon/default_image_02@2x.png'),
        loading: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-prod-thumb.png')
      }
    }
  },
  props: ['item', 'index'],
  methods: {
    productClick: function() {
      this.$router.push({ name: 'product', query: { id: this.item.id } })
    }
  },
  components:{
    PriceItem
  }
}
</script>

<style lang="scss" scoped>
.product-info {
  padding-bottom: 11px;
  width: 104px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(249, 249, 249, 1) 0%, rgba(253, 251, 251, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 29px;
    height: 23px;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left top;
    z-index: 1;
  }
  &.icon-0:before {
    background-image: url('../../../assets/image/hh-icon/b0-home/tag-pop.png');
  }
  &.icon-1:before {
    background-image: url('../../../assets/image/hh-icon/b0-home/tag-hot.png');
  }
  &.icon-2:before {
    background-image: url('../../../assets/image/hh-icon/b0-home/tag-celebrity.png');
  }
  &.icon-3:before {
    background-image: url('../../../assets/image/hh-icon/b0-home/tag-reputably.png');
  }
  .product-food {
    margin: 12px 22px 0;
    position: relative;
    width: 60px;
    height: 60px;
    text-align: center;
    img {
      max-height: 100%;
    }
  }
  .product-title {
    color: $baseColor;
    font-size: 13px;
    width: 101.5px;
    line-height: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    margin: 5px 5px 0;
    overflow: hidden;
    span {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      flex-grow: 1;
      display: inline-block;
      @include sc(11px, #404040, center);
      text-align: left;
      word-break: break-all;
      overflow: hidden;
    }
  }
  .product-bottom {
    align-self: stretch;
    padding: 0 6px;
    margin-top:10px;
    .product-price {
      flex-grow: 1;
      font-size: 0;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 2px;
      & + .product-price {
        margin-top: 3px;
      }
      .orig-price {
        width: auto;
        margin-right: 1px;
        margin-left: -3px;
        label {
          display: inline-block;
          line-height: 1;
          @include sc(12px, $primaryColor, left bottom);
          font-weight: bold;
        }
        .price-unit {
          letter-spacing: 0;
          display: inline-block;
          @include sc(8px, $primaryColor, center 10px);
          font-weight: bold;
          margin-right: -2px;
          line-height: 1;
        }
        .quanyi-price-icon {
          display: inline-block;
          width: 26px;
          height: 8px;
          background: url($surplusIconPath) no-repeat;
          background-size: 26px 8px;
        }
      }
      .hb-price {
        width: auto;
        color: #404040;
        font-weight: 400;
        margin-left: -3px;
        font-family: PingFangSC-Medium;
        label {
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.2px;
          @include sc(11px, #404040, left bottom);
        }
        .price-unit {
          letter-spacing: 0;
          display: inline-block;
          @include sc(8px, #404040, center 9px);
          font-weight: 500;
          margin-right: -2px;
          line-height: 1;
        }
      }
    }
    .product-buy {
      color: #b5b6b6;
      margin-top: 5px;
      font-size: 10px;
      line-height: 18px;
      white-space: nowrap;
      margin-left: 5px;
      text-align: right;
    }
  }
}
</style>

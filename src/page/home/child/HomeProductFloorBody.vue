<template>
  <div class="floor-wrapper">
    <div class="floor-wrapper-inner" v-bind:class="{ border: showRightBorder }">
      <div class="product-info" @click="productClick">
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
              <label>{{ item.MONEY_SHOW === undefined ? '--' : utils.formatFloat(item.MONEY_SHOW, true) }}</label>
              <div class="quanyi-price-icon"></div>
            </span>
          </p>
          <p class="product-price">
            <span class="hb-price" v-if="item.HB_SHOW > 0">
              <span class="price-unit">￥</span>
              <label>{{ item.current_price === undefined ? '--' : utils.formatFloat(item.current_price, true) }}</label>
            </span>
          </p> -->
          <PriceItem :cash="utils.formatFloat(item.MONEY_SHOW, true)" :surplus="utils.formatFloat(item.HB_SHOW, true)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriceItem from "../../../components/common/ListItemPrice"
export default {
  name: 'HomeProductHotBody',
  data() {
    return {
      showRightBorder: this.index % 3 != 0,
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
      if (this.item.id) {
        this.$router.push({ name: 'product', query: { id: this.item.id } })
      }
    }
  },
  components:{
    PriceItem
  }
}
</script>

<style lang="scss" scoped>
.floor-wrapper {
  padding: 3px 0;
  max-width: 33.33%;
  flex-grow: 1;
  background-image: url('../../../assets/image/hh-icon/b0-home/line-horizontal.png');
  background-position: bottom left;
  background-repeat: no-repeat;
  background-size: auto 1px;
}
.floor-wrapper-inner {
  padding: 8px 3px 0 4px;
  display: flex;
  &.border {
    background-image: url('../../../assets/image/hh-icon/b0-home/line-vertical.png');
    background-position: left top;
    background-repeat: no-repeat;
    background-size: 1px 100%;
  }
}
.product-info {
  box-sizing: border-box;
  border-radius: 2px;
  width: 104px;
  padding-bottom: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  .product-food {
    position: relative;
    width: 80px;
    height: 80px;
    overflow: hidden;
  }
  .product-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .product-title {
    color: $baseColor;
    width: 114.5px;
    line-height: 18px;
    height: 36px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    span {
      flex-grow: 1;
      display: inline-block;
      @include sc(11px, #404040, bottom center);
      word-break: break-all;
      overflow: hidden;
    }
  }
  .product-bottom {
    align-self: stretch;
    padding: 0 3px;
    margin-top: 12px;
    .product-price {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      font-size: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 3px;
      .orig-price {
        margin-right: 1px;
        margin-left: -1px;
        label {
          display: inline-block;
          line-height: 1;
          font-weight: bold;
          font-size: 12px;
          color: $priceColor;
          letter-spacing: -0.5px;
        }
        .price-unit {
          letter-spacing: 0;
          display: inline-block;
          @include sc(8px, $priceColor, left 10px);
          font-weight: bold;
          margin-right: -4px;
          line-height: 1;
        }
        .quanyi-price-icon {
          margin-left: 3px;
          display: inline-block;
          width: 26px;
          height: 8px;
          background: url($surplusIconPath) no-repeat;
          background-size: 26px 8px;
        }
      }
      .hb-price {
        color: $normalPriceColor;
        font-weight: 400;
        margin-left: -1px;
        label {
          display: inline-block;
          line-height: 1;
          font-size: 13px;
          @include sc(11px, $normalPriceColor, left bottom);
          letter-spacing: -0.5px;
        }
        .price-unit {
          letter-spacing: 0;
          display: inline-block;
          @include sc(8px, $normalPriceColor, left bottom);
          margin-right: -4px;
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

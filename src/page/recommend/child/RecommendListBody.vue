<template>
  <div class="product-info" @click="productClick">
    <div class="product-good">
      <img class="product-icon" v-lazy="lazy" />
      <span class="icon-sellOut" v-if="item.good_stock == 0"></span>
    </div>
    <div class="product-msg">
      <div class="product-title" ref="text">{{ item.name }}</div>
      <div class="product-price-wrapper">
        <div class="price">
          <!-- <span class="orig-price"
            ><span class="price-unit">￥</span><label>{{ utils.formatFloat(item.current_price, true) }}</label></span
          >
          <span class="hb-price" v-if="item.HB_SHOW > 0"
            ><span class="price-unit">￥</span><label>{{ utils.formatFloat(item.MONEY_SHOW, true) }}</label
            ><img src="../../../assets/image/change-icon/hb-price-icon.png" alt=""
          /></span> -->
          <PriceItem :cash="utils.formatFloat(item.MONEY_SHOW, true)" :surplus="utils.formatFloat(item.HB_SHOW, true)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriceItem from "../../../components/common/ListItemPrice"
export default {
  name: 'RecommendListBody',
  data() {
    return {
      lazy: {
        src: this.item.thumb,
        error: require('../../../assets/image/change-icon/default_image_02@2x.png'),
        loading: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-prod-thumb.png')
      }
    }
  },
  props: ['item'],
  created() {},
  computed: {},
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
  box-sizing: border-box;
  // flex: 0 0 33%; /*这里百分25表示项目大小占1/4空间*/
  width: 165px;
  margin-bottom: 9px;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  padding-top: 24px;
  padding-bottom: 10px;
  border-radius: 6px;
  & + .product-info {
    margin-left: 9px;
  }
  .product-good {
    position: relative;
    width: 110px;
    height: 0;
    margin: 0 auto;
    padding-top: 110px;
    border-radius: 3px;
    overflow: hidden;
    .icon-sellOut {
      position: absolute;
      top: -1px;
      right: -1px;
      width: 38px;
      height: 38px;
      background: url('../../../assets/image/hh-icon/b0-home/sellout-icon.png') no-repeat;
      background-size: 100%;
    }
  }
  .product-msg {
    padding: 0 10px;
  }
  .product-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .product-title {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: $baseColor;
    font-size: 12px;
    line-height: 15px;
    margin-top: 20px;
    height: 29px;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .product-price-wrapper {
    margin-top: 8px;
    .price {
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0;
      display: flex;
      align-items: baseline;
      margin-top: 5px;
      .orig-price {
        width: auto;
        color: $primaryColor;
        font-weight: bold;
        margin-right: 2px;
        margin-left: -1px;
        img {
          width: 12px;
          height: 12px;
          margin-right: 1px;
          transform: translateY(0.5px);
        }
        label {
          font-size: 15px;
          letter-spacing: -0.5px;
        }
        .price-unit {
          letter-spacing: 0;
          display: inline-block;
          @include sc(10px, $primaryColor);
          margin-right: -1px;
          line-height: 1;
        }
        .product-money-icon {
          width: 10px;
          height: 10px;
          transform: translateY(0.5px);
          margin-right: 1px;
        }
      }
      .hb-price {
        width: auto;
        color: #404040;
        font-weight: 400;
        label {
          font-size: 14px;
          letter-spacing: -0.6px;
          font-weight: 600;
        }
        .price-unit {
          letter-spacing: 0;
          display: inline-block;
          @include sc(9px, #404040);
          margin-right: -2px;
          line-height: 1;
        }
        img {
          width: 27px;
        }
      }
    }
  }
  &.border {
    margin-left: 7px;
  }
}
</style>

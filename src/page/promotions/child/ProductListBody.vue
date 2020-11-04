<!-- ProductListBody.vue -->
<template>
  <div class="ui-product-body">
    <div class="list" v-on:click="goDetail">
      <div class="ui-image-wrapper">
        <img class="product-img" v-lazy="lazy" />
        <span class="saled" v-if="item.good_stock == 0"></span>
        <div class="left-top" v-if="isDiscount">
          <span>{{ discount }}折</span>
        </div>
      </div>

      <div class="flex-right">
        <div class="row1">
          <div class="product-header">
            <label class="title">
              <label class="tag" :style="{ backgroundColor: item.tags_colour || '#E0360A' }"
                ><span>{{ item.tags_name }}</span></label
              >{{ item.goods.name }}
            </label>
          </div>
          <div class="price">
            <span class="orig-price"
              ><span class="price-unit">￥</span><label>{{ utils.formatFloat(item.cash_price, true) }}</label></span
            >
            <span class="hb-price" v-if="item.money_line > 0"
              ><label>权益抵扣￥{{ utils.formatFloat(item.money_line, true) }}</label></span
            >
          </div>
        </div>
        <div class="sendway">
          <span class="self-support">剩余{{ stock }}件</span>
          <button :class="{ disable: seckillStatus == 2 || isSaledOut }">{{ buttonTxt }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PRODUCT_SHOW_SHOUQI } from '../../product-detail/static.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      lazy: {
        src: this.item.goods.thumb,
        error: require('../../../assets/image/change-icon/default_image_02@2x.png'),
        loading: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-prod-thumb.png')
      }
    }
  },
  props: ['item', 'productId'],

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      seckillStatus: state => state.seckillList.seckillStatus
    }),
    stock() {
      return this.item.secbuy_quantity - this.item.secbuy_sale || 0
    },
    discount() {
      return this.item.discount
    },
    isDiscount() {
      return this.item.type == 2 && this.discount > 0 && this.discount < 10 && this.item.is_show_discount
    },
    buttonTxt() {
      let txt = ''
      switch (this.seckillStatus) {
        case 0:
          txt = '去看看'
          break
        case 1:
          txt = '立即抢购'
          break
        case 2:
          txt = '已结束'
          break
        default:
          txt = '去看看'
      }
      if (this.isSaledOut) txt = '已售罄'
      return txt
    },
    isSaledOut() {
      return this.item.secbuy_quantity - this.item.secbuy_sale <= 0
    }
  },

  methods: {
    goDetail() {
      this.$router.push({ name: 'promotionDetail', query: { id: this.productId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-product-body {
  .list {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 0 15px;
    position: relative;
    div.ui-image-wrapper {
      width: 110px;
      height: 110px;
      position: relative;
      border-radius: 3px;
      overflow: hidden;
      margin-right: 20px;
      margin-bottom: 10px;

      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-basis: 110px;
      flex-shrink: 0;

      background-color: #f9f9f9;

      .product-img {
        width: 100%;
      }
      span {
        position: absolute;
        font-size: 0;
        &.saled {
          position: absolute;
          left: auto;
          top: -1px;
          right: -1px;
          width: 38px;
          height: 38px;
          background: url('../../../assets/image/hh-icon/b0-home/sellout-icon.png') no-repeat;
          background-size: 100%;
        }
      }
      .activity-icon {
        position: absolute;
        font-size: 0;
        left: auto;
        right: auto;
        top: auto;
        left: auto;
        width: 30px;
        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
        &.top {
          top: 0;
        }
        &.left {
          left: 0;
        }
      }

      .left-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 32px;
        background: url('../../../assets/image/hh-icon/promotion/bg-circular.png') no-repeat;
        background-size: 34px 32px;

        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 12px;
          font-weight: 400;
          color: #fff;
          line-height: 32px;
          white-space: nowrap;
        }
      }
    }
    .flex-right {
      flex: 1;
      padding-right: 15px;
      height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-x: hidden;

      @include thin-border(rgba(85, 46, 32, 0.2), 0, auto, true);

      .product-header {
        // display: flex;
        .title {
          color: $baseColor;
          font-size: 14px;
          font-weight: normal;
          line-height: 22px;

          max-height: 44px;
          overflow: hidden;
          text-overflow: ellipsis;

          display: -webkit-box;

          -webkit-line-clamp: 2;

          box-orient: vertical;
          -webkit-box-orient: vertical;
          .tag {
            border-radius: 9px;
            padding: 0 4px;
            margin-right: 7px;
            span {
              white-space: nowrap;
              display: inline-block;
              @include sc(10px, #fff, top center);
              line-height: 17px;
              letter-spacing: 2px;
            }
          }
        }
      }
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
            font-weight: bolder;
            font-size: 18px;
            letter-spacing: -0.5px;
          }
          .price-unit {
            letter-spacing: 0;
            display: inline-block;
            @include sc(10px, $priceColor);
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
          background-color: #ffdfae;
          padding: 0 9px 0 7px;
          border-radius: 8px 8px 8px 0px;
          label {
            display: inline-block;
            @include sc(10px, #552e20);
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
      .promotions {
        min-height: 22px;
        padding: 9px 0 9px;
        overflow: hidden;

        & > span,
        & > label {
          white-space: nowrap;
          padding: 0 5px;
          height: 16px;
          border: 1px solid $primaryColor;
          border-radius: 50px;
          font-size: 0;
          display: inline-block;
          & + span {
            margin-left: 7px;
          }
          span {
            display: inline-block;
            @include sc(10px, $primaryColor);
          }
        }
        label {
          display: none;
          background-color: transparent;
          border-color: $primaryColor;
          &:nth-of-type(1) {
            display: inline-block;
          }
          span {
            color: $primaryColor;
          }
        }
        .none {
          border-color: #f90069;
          background-color: #f90069;
          span {
            color: #ffffff;
            margin: 0 -0.833%;
          }
        }
      }
      .sendway {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        padding-bottom: 11px;

        .self-support {
          line-height: 16px;
          white-space: nowrap;
          margin-top: 6px;
          @include sc(10px, #999999, left center);
          max-width: 175px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 10px;

          &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 16px;
            background: url('../../../assets/image/hh-icon/supplier/icon-tip.png') no-repeat right center;
          }
          img {
            width: 5px;
            height: 8px;
            margin-left: 2px;
          }
        }
        button {
          width: 62px;
          height: 23px;
          background: $primaryColor;
          border-radius: 2px;

          font-size: 12px;
          color: #fff;
          &.disable {
            pointer-events: none;
            background-color: #c0c0c0;
          }
        }
      }
    }
  }
}
</style>

<!-- ProductListBody.vue -->
<template>
  <div class="ui-product-body">
    <div class="list" v-on:click="goDetail">
      <div class="ui-image-wrapper">
        <img class="product-img" v-lazy="lazy" />
        <span class="saled" v-if="item.good_stock == 0"></span>
        <span class="only-have" v-if="item.good_stock > 0 && item.good_stock <= 10">
          <span>仅剩{{ item.good_stock }}件</span>
        </span>
        <img
          v-if="item.tags_info && item.tags_info.length"
          class="activity-icon left top"
          :src="item.tags_info[0].plate_img"
        />
        <!-- <activity-icon-on-product
          v-if="item.act_616_type"
          :offset="true"
          :typeCode="item.act_616_type"
        ></activity-icon-on-product> -->
      </div>

      <div class="flex-right">
        <div class="row1">
          <div class="product-header">
            <div class="title clear-bottom">
              <label class="title-content">
                <template v-if="item.supplier">
                  <!-- 新接口将商家type移到商家对象中 -->
                  <label v-if="item.supplier.type == 1" class="title-header head1">
                    <span>&nbsp;专区商品&nbsp;</span>
                  </label>
                  <label v-if="item.supplier.type == 3" class="title-header head3">
                    <span>&nbsp;专区商品&nbsp;</span>
                  </label>
                  <label v-if="item.supplier.type == 5" class="title-header head5">
                    <span>&nbsp;个人商家&nbsp;</span>
                  </label>
                </template>
                {{ item.name }}
              </label>
            </div>
          </div>

          <!-- 汽车类商品 分期展示效果 -->
          <div class="hb-discount-title" v-if="item.instalment && item.instalment.length > 0">
            <span class="hb-price-desc">
              <!-- <template v-if="Number(instalment.surplus) > 0">
                <img src="../../../assets/image/hh-icon/b0-home/money-icon.png" class="sur-icon" />
                <span class="hb-amount">{{ utils.formatMoney(instalment.surplus) }}</span>
                <span class="hb-label">权益</span>
                <span class="lable-plus">+</span>
              </template> -->
              <!-- <span class="price-unit">￥</span>
              <span class="price-amount">{{ utils.formatMoney(instalment.cash) }}</span> -->
              <!-- <div class="hb-price-new1"> -->
                <PriceItem 
                  :cash="instalment.cash" 
                  :surplus="instalment.surplus" 
                  classType="price-style-car"
                />
              <!-- </div> -->
            </span>
            <span class="hb-discount-percent"
              >权益抵扣租金{{ Math.round((100 * this.item.money_line) / this.item.current_price) }}%</span
            >
          </div>
          <div class="price" v-else>
            <!-- <span class="orig-price"
              ><span class="price-unit">￥</span><label>{{ utils.formatFloat(cashPrice, true) }}</label></span
            >
            <span class="hb-price" v-if="item.HB_SHOW > 0"
              ><label>权益抵扣￥{{ utils.formatFloat(item.HB_SHOW, true) }}</label></span
            > -->
            <PriceItem 
              :cash="utils.formatFloat(item.MONEY_SHOW, true)" 
              :surplus="utils.formatFloat(item.HB_SHOW, true)" 
              classType="price-style-three"
            />
          </div>

          <div
            class="promotions"
            v-if="(item.promos && item.promos.length > 0) || (item.tags_info && item.tags_info.length > 0)"
          >
            <template v-for="(tag_info, index) in item.tags_info || []">
              <label class="none" :key="index" :style="tagStyle(tag_info)"
                ><span>{{ tag_info.name }}</span></label
              >
            </template>
            <template v-for="(promo, index) in item.promos || []">
              <span v-if="promo.status == 2 && promo.type == 1 && !promo.is_over" :key="index"
                ><span>满{{ promo.detail.limit }}减{{ promo.detail.reduce }}</span></span
              >
              <label class="none" v-if="promo.status == 2 && promo.type == 2 && !promo.is_over" :key="index"
                ><span>{{ utils.activityNameTmp }}</span></label
              >
              <label class="none" v-if="promo.status == 2 && promo.type == 3 && !promo.is_over" :key="index"
                ><span>{{ utils.activityNameTmp }}</span></label
              >
            </template>
          </div>
        </div>
        <div>
          <div class="coupon" v-if="item.goods_coupons">领券¥{{item.goods_coupons.coupon_price}}</div>
        </div>
        <div class="sendway" @click.stop="goSupplier(item.supplier.sn)">
          <span v-if="item.supplier" class="self-support">
            {{ item.supplier.shop_name }}
          </span>
          <span v-else class="self-support"></span>
          <span>销量{{ item.sales_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PRODUCT_SHOW_SHOUQI } from '../../product-detail/static.js'
import { mapState } from 'vuex'
import PriceItem from "../../../components/common/ListItemPrice"

export default {
  data() {
    return {
      lazy: {
        src: this.item.thumb,
        error: require('../../../assets/image/change-icon/default_image_02@2x.png'),
        loading: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-prod-thumb.png')
      }
    }
  },
  props: ['item', 'productId', 'requestparams'],

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline
    }),
    instalment() {
      return this.item.instalment[this.item.instalment.length - 1]
    },
    cashPrice() {
      return this.item.HB_SHOW > 0 ? this.item.MONEY_SHOW : this.item.current_price
    }
  },

  methods: {
    goDetail() {
      let data = Object.assign({}, { id: this.productId }, this.requestparams)
      this.$router.push({ name: 'product', query: { id: this.productId } })
    },
    goSupplier(id) {
      this.$router.push({ name: 'Supplier', query: { id: id } })
    },

    tagStyle(item) {
      const o = {}
      o.borderColor = item.color
      o.backgroundColor = item.color
      return o
    }
  },
  components:{
    PriceItem
  }
}
</script>

<style lang="scss" scoped>
.ui-product-body {
  .list {
    display: flex;
    align-items: center;
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
        &.only-have {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 20px;
          text-align: center;
          width: 100%;
          height: 13px;
          background: rgba(210, 185, 120, 0.3);
          border-radius: 0 0 4px 4px;
          bottom: 0;
          left: 0;
          span {
            position: relative;
            display: inline-block;
            @include sc(8px, #563f19);
          }
        }
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
    }

    span.promos {
      position: absolute;
      background: url('../../../assets/image/change-icon/label@2x.png') no-repeat;
      width: 36px;
      height: 19px;
      color: #fff;
      font-size: 10px;
      top: 0;
      left: 0;
      background-size: cover;
      font-weight: 100;
      line-height: 19px;
      text-align: left;
      padding-left: 5px;
    }
    .flex-right {
      flex: 1;
      padding: 0 15px 8px 0;
      min-height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-x: hidden;

      @include thin-border(rgba(85, 46, 32, 0.2), 0, auto, true);
      .title {
        color: $baseColor;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;

        max-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;

        display: -webkit-box;
        display: flex;

        -webkit-line-clamp: 2;

        box-orient: vertical;
        -webkit-box-orient: vertical;

        margin-bottom: 8px;

        .title-content {
          // display: inline-block;
          max-height: 44px;
        }
        &.clear-bottom {
          margin-bottom: 0;
        }
        .title-header {
          display: inline-block;
          height: 18px;
          border-radius: 10px;
          line-height: 18px;
          padding: 0 4px;
          margin-right: 3px;
          span {
            display: inline-block;
            @include sc(10px, #fff);
          }
        }
        .head1 {
          background-color: #d8aab7;
        }
        .head2 {
          background-color: #c2b5cf;
        }
        .head3 {
          background-color: #d8aab7;
        }
        .head5 {
          background-color: #b5c884;
        }
      }

      .product-header {
        display: flex;
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
            color: $priceColor;
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
      .coupon{
        display: inline-block;
        padding: 0 10px;
        font-size: 12px;
        color: #d35033;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        border: solid 1px #d35033;
      }
      .sendway {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 400;

        span {
          line-height: 16px;
          white-space: nowrap;
          @include sc(10px, #999999, right center);
          &.self-support {
            max-width: 175px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 10px;
            @include sc(10px, #999999, left center);

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
        }
        div {
          width: 22px;
          height: 20px;
          position: relative;
          img {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}

/* 汽车分期价格展示 */
.hb-discount-title {
  display: block;
  margin-top: 5px;

  .hb-price-desc {
    font-size: 0;
    display: block;
    width: 100%;
    line-height: normal;
    display:flex;
    // .hb-price-new1{
    //   width:120px;
    // }
    .sur-icon {
      width: 16px;
    }
    .hb-amount {
      font-size: 18px;
      font-weight: bold;
      color: rgba(119, 37, 8, 1);
      margin-left: 1px;
    }
    .hb-label {
      font-size: 12px;
      font-weight: 600;
      color: rgba(119, 37, 8, 1);
    }
    .lable-plus {
      font-size: 14px;
      font-weight: 600;
      color: rgba(119, 37, 8, 1);
      margin: 0 1px 0 3px;
    }

    .price-unit {
      font-size: 10px;
      font-weight: bold;
    }
    .price-amount {
      font-size: 18px;
      font-weight: bold;
      color: rgba(119, 37, 8, 1);
    }
    .fq-label {
      display: inline-block;
      background: #634903;
      font-size: 11px;
      color: #fff;
      border-radius: 7px;
      font-weight: 500;
      line-height: 14px;
      padding: 0 6px;
      margin-left: 5px;
      vertical-align: 2px;
    }
  }
  .hb-discount-percent {
    display: block;
    font-size: 11px;
    font-weight: 400;
    color: rgba(119, 37, 8, 1);
    line-height: 16px;
    margin-top: 5px;
  }
}
</style>

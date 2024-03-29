<template>
  <div class="card-v5b-container" @click="onClick">
    <div v-if="isTop" class="v5-content-wrapper">
      <div class="photo-wrapper" v-bind:style="getPhotoStyle" v-bind:class="{ 'top-margin': isTop }">
        <img class="photo" :onerror="defaultImage" v-bind:style="getPhotoStyle" v-lazy="getPhotoUrl" />
        <img
          v-if="isShowSellOutIcon"
          class="sell-out"
          v-bind:style="getSellOutStyle"
          src="../../../assets/image/change-icon/b0-out@2x.png"
        />
        <span v-if="isShowPromoIcon" class="promos">促销</span>
      </div>
      <div class="content-wrapper">
        <label class="title" style="-webkit-box-orient:vertical">{{ getTitle }}</label>
        <div class="bottom-wrapper">
          <div class="desc-wrapper">
            <label class="subtitle" style="-webkit-box-orient:vertical">{{ getSubtitle }}</label>
            <label class="desc" style="-webkit-box-orient:vertical">{{ getDesc }}</label>
          </div>
          <div class="icon-wrapper" v-if="isProductItem()" @click.stop="onClickCart">
            <img src="../../../assets/image/change-icon/cart@2x.png" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="v5-content-wrapper">
      <div class="content-wrapper">
        <label class="title" style="-webkit-box-orient:vertical">{{ getTitle }}</label>
        <div class="bottom-wrapper">
          <div class="desc-wrapper">
            <label class="subtitle" style="-webkit-box-orient:vertical">{{ getSubtitle }}</label>
            <label class="desc" style="-webkit-box-orient:vertical">{{ getDesc }}</label>
          </div>
          <div class="icon-wrapper" v-if="isProductItem()" @click.stop="onClickCart">
            <img src="../../../assets/image/change-icon/cart@2x.png" />
          </div>
        </div>
      </div>
      <div class="photo-wrapper" v-bind:style="getPhotoStyle" v-bind:class="{ 'bottom-margin': !isTop }">
        <img class="photo" :onerror="defaultImage" v-bind:style="getPhotoStyle" v-lazy="getPhotoUrl" />
        <img
          v-if="isShowSellOutIcon"
          class="sell-out"
          v-bind:style="getSellOutStyle"
          src="../../../assets/image/change-icon/b0-out@2x.png"
        />
        <span v-if="isShowPromoIcon" class="promos">促销</span>
      </div>
    </div>
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
import { cartAdd } from '../../../api/cart'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CardV5',
  mixins: [Common, PhotoV],
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline
    }),
    isTop() {
      return this.isCardStyle('B')
    },
    isShowSellOutIcon() {
      if (this.isProductItem()) {
        if (this.item.goods.good_stock && parseInt(this.item.goods.good_stock) > 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    isShowPromoIcon() {
      if (this.isProductItem()) {
        if (this.item.goods.activity && typeof this.item.goods.activity === 'object') {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getSubtitle: function() {
      let subtitle = ''
      if (this.isProductItem()) {
        let product = this.item.goods
        subtitle = product ? product.current_price : ''
        subtitle = '￥ ' + this.utils.formatFloat(subtitle)
      } else {
        subtitle = this.getItemByKey('label1')
      }
      return subtitle
    },
    getDesc: function() {
      let subtitle = ''
      if (this.isProductItem()) {
        let product = this.item.goods
        subtitle = product ? product.price : ''
        subtitle = '￥ ' + this.utils.formatFloat(subtitle)
      } else {
        subtitle = this.getItemByKey('label2')
      }
      return subtitle
    },
    getSellOutStyle: function() {
      let height = 70
      let top = (this.photoHeight - height) / 2.0
      return {
        width: height + 'px',
        height: height + 'px',
        top: top + 'px',
        left: top + 'px'
      }
    }
  },
  methods: {
    ...mapActions({
      fetchCartNumber: 'fetchCartNumber'
    }),
    isProductItem() {
      if (this.item && this.item.goods && this.item.goods.id) {
        return true
      }
      return false
    },
    isCardStyle(item) {
      let style = this.item ? this.item.style : null
      if (style && style.length && style.indexOf(item) >= 0) {
        return true
      }
      return false
    },
    onClickCart() {
      if (this.isOnline) {
        this.addToCart()
      } else {
        // 未登录时，判断是App内打开还是App外打开
        // if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
        //   wenchaoApp.doLogin()
        // } else {
        this.$router.push({ name: 'signin' })
        // }
      }
    },
    addToCart() {
      let product = this.item.goods
      let productId = product.id
      let property = ''
      let amount = '1'
      if (product.stock && product.stock.length) {
        for (const stock in product.stock) {
          if (stock.is_default) {
            if (stock.stock_number && parseInt(stock.stock_number) > 0) {
              property = stock.id
            } else {
              this.$toast('库存不足')
              return
            }
          }
        }
      } else {
        if (!(product.good_stock && parseInt(product.good_stock) > 0)) {
          this.$toast('库存不足')
          return
        }
      }
      this.$indicator.open()
      cartAdd(productId, JSON.parse(property), amount).then(
        response => {
          this.$indicator.close()
          // 添加购物车成功后，刷新购物车数量
          // if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
          //   wenchaoApp.addCartSucceed()
          // } else {
          this.fetchCartNumber()
          // }
        },
        error => {
          this.$indicator.close()
          this.$toast(error.errorMsg)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.card-v5b-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: $cardbgColor;
  .v5-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    .photo-wrapper {
      margin-left: 5px;
      margin-right: 5px;
      position: relative;
    }
    .top-margin {
      margin-top: 5px;
    }
    .bottom-margin {
      margin-bottom: 5px;
    }
    .photo {
      width: 100%;
      height: 100%;
    }
    .photo[lazy='loading'] {
      width: 30px;
      height: 30px;
    }
    .sell-out {
      position: absolute;
      width: 60px;
      height: 60px;
      padding: 0;
      top: 10px;
      left: 10px;
    }
    .promos {
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
    .content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      .title {
        font-size: $h5;
        color: $titleTextColor;
        margin-top: 4px;
        margin-left: 9px;
        margin-right: 9px;
        @include limit-line(1);
      }
      .bottom-wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
      }
      .desc-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: stretch;
        margin-bottom: 4px;
        .subtitle {
          font-size: $h4;
          color: $primaryColor;
          margin-left: 9px;
          margin-right: 0;
          text-align: left;
          @include limit-line(1);
        }
        .desc {
          font-size: $h6;
          color: $descTextColor;
          // margin-top: 2px;
          margin-left: 9px;
          margin-right: 0;
          text-align: left;
          @include limit-line(1);
          text-decoration: line-through;
        }
      }
      .icon-wrapper {
        width: 40px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>

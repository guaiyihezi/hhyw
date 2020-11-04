<!-- footer.vue -->
<template>
  <div
    class="ui-detail-footer"
    v-if="detailInfo"
    v-bind:class="{ 'hidden-cart-footer': ispromotion, 'show-cart-footer': !ispromotion }"
  >
    <!-- 爱心捐赠 提示横幅 -->
    <donate-love-notice></donate-love-notice>

    <div class="footer-flex">
      <!-- 联系方式 -->
      <div class="footer-item service" @click="showServicePopup" v-stat="{ id: 'infos_btn_customerService' }"></div>

      <!-- 收藏 -->
      <div class="footer-item" v-stat="{ id: 'infos_btn_shopsc' }">
        <img v-if="detailInfo.is_liked" src="../../assets/image/change-icon/collect_sel.png" @click="productUnlike" />
        <img v-else src="../../assets/image/change-icon/collect.png" @click="productLike" />
      </div>

      <!-- 购物车 -->
      <div class="footer-item cart" @click="goCart" v-stat="{ id: 'infos_btn_gotocart' }">
        <span class="icon" v-if="cartNumber > 0">{{ getCarCount }}</span>
      </div>

      <template v-if="isHasStock">
        <div
          class="footer-item buy-now"
          :class="{ 'pre-sale': isPreSale, 'disabled-buy': !canbuy }"
          @click="checkout(true, false)"
          v-stat="{ id: 'infos_btn_buynow' }"
        >
          {{ buyTxt }}
        </div>
      </template>
      <template v-else>
        <div class="footer-item disabled-buy">已售罄</div>
      </template>
    </div>

    <!-- 选择商品规格 暂未考虑积分的情况，如需要 再修改 -->
    <shopping v-if="isShowcartInfo" :isShowcartInfo="isShowcartInfo">
      <div class="footer-flex">
        <template v-if="isHasStock">
          <div
            class="footer-item buy-now"
            :class="{ 'pre-sale': isPreSale, 'disabled-buy': !canbuy }"
            @click="checkout(true, true)"
          >
            {{ buyTxt }}
          </div>
        </template>
        <template v-else>
          <div class="footer-item disabled-buy">已售罄</div>
        </template>
      </div>
    </shopping>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Button, Popup } from 'mint-ui'
import { productLike, productUnlike, trainBill } from '../../api/product'
import { cartAdd } from '../../api/cart'
import shopping from '../product-detail/child/Shopping'

import DonateLoveNotice from '../../components/common/DonateLoveNotice'

export default {
  data() {
    return {}
  },

  components: {
    shopping,
    DonateLoveNotice
  },

  computed: {
    ...mapState({
      isShowcartInfo: state => state.detail.isShowcartInfo, // 商品规格选择popup
      detailInfo: state => state.detail.detailInfo,
      isOnline: state => state.auth.isOnline,
      ispromotion: state => state.detail.ispromotion,
      cartNumber: state => state.tabBar.cartNumber,
      chooseinfo: state => state.detail.chooseinfo,
      number: state => state.detail.number,
      user: state => state.auth.user,
      isPreSale: state => state.detail.isPreSale,
      showFromAct: state => state.detail.showFromAct, // 商品规则选择 浮层的来源（1-点击【商品规则选择】，2-点击加入购物车，3-点击立即购买）
      instalmentWay: state => state.detail.instalmentWay,
      cartGoods: state => state.checkout.cartGoods,
      secbuy: state => state.detail.detailInfo.secbuy,
      seckillStatus: state => state.seckillList.seckillStatus
    }),
    ...mapGetters({
      hasSelectProperty: 'hasSelectProperty',
      hasEnoughStock: 'hasEnoughStock',
      shoppingPrice: 'getShoppingPrice',
      stockLimit: 'getStockLimit'
    }),
    getCarCount() {
      if (this.cartNumber < 100) {
        return this.cartNumber
      } else {
        return '99+'
      }
    },
    buyTxt() {
      let txt = '立即抢购'
      if (this.seckillStatus === 2) txt = '已结束'
      if (!this.detailInfo.secbuy.is_on_sale) txt = '已售罄'
      return txt
    },
    canbuy() {
      return this.seckillStatus === 1 || !this.detailInfo.secbuy.is_on_sale
    },
    isHasStock() {
      return this.secbuy.secbuy_quantity - this.secbuy.secbuy_sale > 0
    }
  },

  methods: {
    ...mapMutations({
      saveCartState: 'saveCartState',
      saveNumber: 'saveNumber',
      saveSelectedCartGoods: 'saveSelectedCartGoods',
      savePrice: 'savePrice',
      saveShowFromAct: 'saveShowFromAct',
      saveServicePopupState: 'saveServicePopupState',
      saveIsLike: 'saveIsLike',
      saveSeckillToken: 'saveSeckillToken'
    }),
    ...mapActions({
      fetchCartNumber: 'fetchCartNumber'
    }),

    /*
     * productLike： 收藏商品
     **/
    productLike() {
      if (this.user) {
        let id = this.detailInfo.id
        productLike(id).then(res => {
          this.saveIsLike(res)
          this.$toast('收藏成功')
        })
      } else {
        this.$router.push({ name: 'login' })
      }
    },

    /*
     * productUnlike： 取消收藏商品
     **/
    productUnlike() {
      if (this.user) {
        let id = this.detailInfo.id
        productUnlike(id).then(res => {
          this.saveIsLike(res)
          this.$toast('取消收藏')
        })
      } else {
        this.$router.push({ name: 'login' })
      }
    },

    // 选择规格，点击 确定 按钮
    checkoutYes() {
      3 == this.showFromAct ? this.checkout(true, true) : this.checkout(false, true)
    },

    /**
     * 加入购物车 或 立即购买
     *
     * @param      {boolean}  immediately     true-立即购买 | false-加入购物车
     * @param      {boolean}  isFromShopping  true-规格蒙层点击的 | false-详情页底部点击的
     * @return     {undefined}   无
     */
    checkout(immediately, isFromShopping) {
      // 预售商品不可购买
      if (immediately && this.isPreSale) {
        return
      }

      if (!this.isOnline) {
        this.$router.push({ name: 'login' })
        return
      }

      let flag = 0
      switch (this.detailInfo.secbuy.range) {
        case 1:
          if (!this.user.is_newbie) flag = 1
          break
        case 2:
          if (!this.user.hashid) flag = 2
          break
      }
      if (flag) {
        let txt = ['', '当前商品仅支持换换新用户购买', '当前商品仅支持爱投资用户购买']
        this.$toast(txt[flag])
        return
      }

      // 未在指定秒杀时间 不可购买
      if (this.seckillStatus != 1) return

      // 是否选择商品属性
      if (!this.hasSelectProperty) {
        this.$toast('请选择商品属性')

        // 判断 规则选择浮层 是否已经弹起
        if (this.isShowcartInfo) {
          return
        }
        // 记录 触发 商品规格选择浮层 动作来源
        this.saveShowFromAct(immediately ? 3 : 2)

        this.saveCartState(true)
        return
      }
      // 详情页的立即购买 或 加入购物车  都先弹出选择规格弹出
      if (
        (this.detailInfo.instalment && this.detailInfo.instalment.length > 0) ||
        (this.detailInfo.properties && this.detailInfo.properties.length > 0)
      ) {
        if (!isFromShopping) {
          // 记录 触发 商品规格选择浮层 动作来源
          this.saveShowFromAct(immediately ? 3 : 2)
          this.saveCartState(true)
          return
        }
        if (this.detailInfo.instalment && this.detailInfo.instalment.length > 0 && this.instalmentWay === undefined) {
          this.$toast('请选择分期方式')
          return
        }
      }

      // 是否限购 TODO 跟当前number比较
      if (this.detailInfo.only_purchase) {
        let can_buy_num = this.detailInfo.only_purchase - this.detailInfo.now_purchase
        if (can_buy_num < 1) {
          let toastConfig = '该商品每个用户每日限购' + this.detailInfo.only_purchase + '件哦'
          this.$toast(toastConfig)
          return
        }
      }

      // 库存是否足够
      if (!this.hasEnoughStock) {
        this.$toast('商品库存不足')
        return
      }
      let data = {}
      data['id'] = this.detailInfo.secbuy.id
      this.saveSeckillToken(data)

      this.checkoutGood(immediately)
    },

    checkoutGood(immediately) {
      let cartGood = {
        goods_id: this.detailInfo.secbuy.id,
        goods: this.detailInfo,
        property: '',
        attrs: JSON.stringify(this.chooseinfo.ids),
        attr_stock: this.detailInfo.secbuy.secbuy_quantity - this.detailInfo.secbuy.secbuy_sale,
        num: this.number ? this.number : 1,
        amount: this.number ? this.number : 1,
        chooseinfo: this.chooseinfo,
        price: Number(this.shoppingPrice.current_price) + Number(this.shoppingPrice.money_line),
        instalment_id: this.instalmentWay
        // test 竞拍
        // isC2B: true,
        // timeout_at: new Date().getTime() + 6 * 60 * 60 * 1000
      }

      if (this.chooseinfo.specification.length > 0) {
        const properties = this.detailInfo.properties
        properties.map((item, index) => {
          const id = this.chooseinfo.ids[index]
          item.attrs.map((attr, i) => {
            if (attr.id == id) {
              cartGood.property += `${item.name}:${attr.attr_name} \n`
            }
          })
        })
      }

      let cartGoods = [cartGood]

      this.saveSelectedCartGoods({ cartGoods: cartGoods })
      this.savePrice(cartGood.price)

      this.$router.push({ name: 'checkout' })
    },

    // 加入购物车
    addShopCart() {
      let good_number = this.number ? this.number : 1
      cartAdd(this.detailInfo.id, this.chooseinfo.ids, good_number).then(
        res => {
          this.saveNumber(good_number)
          this.fetchCartNumber()
          this.$toast('成功加入购物车')
          this.saveCartState(false)
        },
        error => {
          this.$toast(error.errorMsg)
        }
      )
    },

    // 查看 购物车
    goCart() {
      if (this.isOnline) {
        this.$router.push({ name: 'cart', params: { type: 0 } })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    getToArray: function(str) {
      if (!(str instanceof Array))
        try {
          str = [].concat(JSON.parse(str))
        } catch (e) {
          str = str ? str.split(',').map(Number) : []
        }
      return str
    },

    showServicePopup() {
      this.saveServicePopupState(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-detail-footer {
  position: fixed;
  background: rgba(255, 255, 255, 1);
  width: auto;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  &.hidden-cart-footer {
    display: none;
  }

  &.show-cart-footer {
    display: block;
  }

  .footer-flex {
    flex: 1;

    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    height: 50px;
    font-size: 16px;
    div.footer-item {
      height: 50px;
      width: 45px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #fafafa;
      line-height: 50px;
      & + div.footer-item {
        @include thin-left-border(#cccccc, 0, auto);
      }
      img {
        width: 23px;
        height: 23px;
        flex-shrink: 0;
      }
      span.icon {
        position: absolute;
        right: 2px;
        top: 8px;
        @include sc(10px, #fff);
        line-height: 14px;
        width: 18px;
        height: 14px;
        background: #ef3338;
        border-radius: 20px;
        text-align: center;
      }
      &.service {
        background-image: url('../../assets/image/change-icon/service@3x.png');
        background-repeat: no-repeat;
        background-size: 23px 23px;
        background-position: center;
        &:hover {
          background-image: url('../../assets/image/change-icon/service_hover@3x.png');
        }
      }
      &.cart {
        background-image: url('../../assets/image/change-icon/icon-cart.png');
        background-repeat: no-repeat;
        background-size: 23px 23px;
        background-position: center;
        &:hover {
          background-image: url('../../assets/image/change-icon/icon-cart_hover.png');
        }
      }
      &.add-cart {
        flex: 1;
        color: #552e20;
        &:hover {
          background-color: #f4f4f4;
        }
      }
      &.buy-now {
        background-color: $primaryColor;
        color: #ffffff;
        flex: 1;
        &:hover {
          background-color: #672108;
        }
      }
      &.disabled-buy {
        pointer-events: none;
        flex: 1;
        background-color: #c0c0c0;
        color: #fff;
      }
      &.pre-sale {
        background-color: #d0b482;
        color: #ffffff;
        flex: 1;
        &:hover {
          background-color: #d0b482;
        }
      }
      &.througn-train {
        flex: 1;
        background-color: #d0b482;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        span {
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          line-height: 22px;
        }
        label {
          margin-top: 2px;
          display: inline-block;
          @include sc(10px, rgba(255, 255, 255, 0.8)) font-weight: 400;
          line-height: 14px;
          white-space: nowrap;
        }
      }
    }
  }
  p.good-stock-none {
    width: 100%;
    height: 32px;
    background: #c3c3c3;
    opacity: 0.5;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    position: absolute;
    text-align: center;
    line-height: 32px;
    padding: 0;
    margin: 0;
    bottom: 50px;
  }
  div.right {
    flex: 1;
    height: 50px;
    display: flex;
    flex-direction: row;
    .button {
      flex: 1;
      @include button($margin: 0, $radius: 0);
      font-size: 15px;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>

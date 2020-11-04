<template>
  <div class="container1">
    <mt-header class="header" title="确认订单">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="leftClick"></header-item>
    </mt-header>
    <div class="body">
      <div class="body-container">
        <!-- 竞买商品 倒计时说明 -->
        <c2b-order-introduce v-if="isC2B" :goods="cartGoods[0].goods"></c2b-order-introduce>

        <checkout-address v-on:onclick="goAddress" v-bind:item="selectedAddress"> </checkout-address>

        <!-- 商品列表 -->
        <div class="shop-wrapper" v-for="(shopitem, index) in productsGroup" :key="index">
          <div class="shop-header">
            <img class="shop-icon" src="../../assets/image/change-icon/shop-icon@2x.png" alt="" />
            <span class="shop-name">{{ shopitem.shop_name }}</span>
          </div>
          <checkout-goods class="goods section-header" :items="shopitem.list" :isC2B="isC2B" @amount="amount">
          </checkout-goods>

          <checkout-instalment :items="cartGoods"></checkout-instalment>

          <!-- 运费 -->
          <shipping-item></shipping-item>

          <!-- 买家留言 -->
          <checkout-comment v-model="productsGroup[index]" class="comment section-header"> </checkout-comment>

          <!-- 权益 -->
          <token-item :price="shopitem"></token-item>

          <!-- 小计 -->
          <group-total :item="shopitem" v-if="groupLength"></group-total>
        </div>

        <!-- 权益 -->
        <token-total
          :currentAvailabel="currentAvailabel"
          :ifShowExchange="ifShowExchange"
          @goExchange="exchangeToken"
        ></token-total>

        <!-- 优惠券 -->
        <checkout-item
          v-if="!isMlmPay"
          title="优惠券"
          :subtitle="selectedCouponMsg"
          @click="showCouponPopup"
        ></checkout-item>

        <div class="price-wrapper">
          <price-item
            title="商品金额"
            :value="isInstalment ? instalment_order_price.total_price : getOrderProductPrice"
            :icon="true"
          ></price-item>
          <price-item title="优惠券" :value="getCouponPrice" :negative="true"></price-item>
          <price-item title="权益积分" :value="getNeedHuanBi" :negative="true" v-if="!isTrain"></price-item>
          <price-item title="浣豆" :value="getNeedHuanDou" :negative="true" v-if="!isTrain"></price-item>
          <price-item title="运费" :value="getShippingPrice"></price-item>
          <price-item
            title="共计"
            :value="isInstalment ? getInstalmentPay : getRealCashPay"
            :icon="true"
            isBold="bold"
            valueColor="$primaryColor"
          ></price-item>
        </div>

        <template v-if="order_price">
          <template v-for="(promo, index) in order_price.promos">
            <checkout-desc
              class="desc-item"
              :title="getPromoTitle(promo)"
              :subtitle="getOrderDiscountPrice(promo)"
              :key="index"
            ></checkout-desc>
          </template>
        </template>

        <!-- 购买须知 -->
        <template v-if="readBefore['should']">
          <div class="rules-wrapper">
            <dir class="rules">
              <input type="checkbox" id="rules" name="rules" v-model="checkedRead" />
              <label for="rules" class="input-icon"></label>
              <label for="rules" class="rules-msg">我已同意并阅读</label>
              <span @click.stop="showRules">《{{ readBefore['rule']['rulesTitle'] }}》</span>
            </dir>
          </div>
        </template>
      </div>
    </div>

    <!-- footer -->
    <div class="body-foot" v-if="red_cash_back && (red_cash_back.name || red_cash_back.max_num > 0)">
      <!-- 首单返现 -->
      <info-return-cash :returnCash="red_cash_back.max_num"></info-return-cash>
    </div>

    <div class="bottom-wrapper">
      <!-- 爱心捐赠 提示横幅 -->
      <donate-love-notice></donate-love-notice>

      <div class="operation" :class="{ 'has-instalment': instalment_order_price }">
        <div class="amount-wrapper-has-istlmt" v-if="instalment_order_price">
          <div class="amout">
            实际支付：<span class="unit">￥</span><span class="money">{{ getInstalmentPay }}</span>
          </div>
          <div class="total">分期总额：￥{{ instalment_order_price.total_amount }}</div>
        </div>
        <div class="amount-wrapper" v-else>
          <label class="amount">
            实际支付:
            <span
              ><span class="unit">￥</span><span class="price">{{ getRealCashPay }}</span></span
            >
          </label>
          <label class="discount" v-if="getNeedHuanBi > 0 || getNeedHuanDou > 0 || getCouponPrice > 0">
            <span>优惠:￥</span><span>{{ getAllDiscount }}</span>
          </label>
        </div>
        <gk-button
          :class="{ submit: true, disable: !checkedRead || isDisabled }"
          type="primary"
          @click="checkout"
          v-stat="{ id: 'shopcart_btn_commit' }"
          >提交订单</gk-button
        >
      </div>
    </div>

    <!-- 选择优惠券蒙层 -->
    <checkout-promos-popup
      :isShowSeckillPopup="isShowSeckillPopup"
      v-if="isShowSeckillPopup"
      @close="closeSeckillPopup"
    ></checkout-promos-popup>
    <!-- 选择优惠券蒙层 -->
    <checkout-coupon-popup
      :isShowCouponPop="isShowCouponPop"
      :selectedCoupon="selectedCoupon"
      :couponList="couponList"
      @confirm="confirmCoupon"
      @close="closeCouponPopup"
    ></checkout-coupon-popup>
  </div>
</template>

<script>
import { ENUM } from '../../const/enum'
import $cookie from 'js-cookie'
import { HeaderItem } from '../../components/common'
import CheckoutAddress from './child/CheckoutAddress'
import CheckoutGoods from './child/CheckoutGoods'
import CheckoutInstalment from './child/CheckoutInstalment'
import CheckoutItem from './child/CheckoutItem'
import CheckoutPromosPopup from './child/CheckoutPromosPopup'
import CheckoutCouponPopup from './child/CheckoutCouponPopup'
import CheckoutComment from './child/CheckoutComment'
import CheckoutDesc from './child/CheckoutDesc'
import ShippingItem from './child/ShippingItem'
import TokenItem from './child/TokenItem'
import TokenTotal from './child/TokenTotal'
import PriceItem from './child/PriceItem'
import GroupTotal from './child/GroupTotal'
import InfoReturnCash from '../product-detail/child/InfoReturnCash'
import C2BorderIntroduce from './child/C2BorderIntroduce'

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import * as consignee from '../../api/consignee'
import * as order from '../../api/order'
import * as cart from '../../api/cart'
import * as product from '../../api/product'
import { balanceGet } from '../../api/balance'
import { bondGet } from '../../api/bond'

import { Header } from 'mint-ui'
import Promos from './Promos'
import { isShouldRead } from '../product-detail/mustRead/main'

import { goExchange } from './util'

import DonateLoveNotice from '../../components/common/DonateLoveNotice'
import checkPaypwd from './checkPaypwd'

export default {
  name: 'checkout',
  components: {
    CheckoutAddress,
    CheckoutGoods,
    CheckoutInstalment,
    CheckoutItem,
    CheckoutPromosPopup,
    CheckoutCouponPopup,
    CheckoutComment,
    CheckoutDesc,
    ShippingItem,
    TokenItem,
    TokenTotal,
    PriceItem,
    InfoReturnCash,
    GroupTotal,
    'c2b-order-introduce': C2BorderIntroduce,
    DonateLoveNotice
  },
  mixins: [Promos],
  data() {
    return {
      ENUM: ENUM,
      order_price: {},
      red_cash_back: null, // 新人首单返现
      instalment_order_price: null,
      pass_auth: false,
      isShowSeckillPopup: false,
      isDisabled: false,

      // 标识当前组件销毁时 是否是由 【确认提交】触发的
      isCheckoutComplete: false,

      total_no_seckill_price: 0,
      is_first_get_price: true,

      checkedRead: true, // 大连天宝 购买须知
      checkedReadCar: true, // 汽车服务卡 购买须知
      checkedReadTclj: true, // 塔城老酒 购买须知

      huanTxt: '', //权益支付名称  权益积分or浣豆
      productsGroup: [], // 商品分组

      isShowCouponPop: false, // 选择优惠券蒙层
      selectedCoupon: {}, // 选中的优惠券
      couponList: {
        // 优惠券列表
        able_list: [],
        unable_list: []
      },
      // 权益支付密码校验通过凭证
      pay_cert: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    $cookie.set('checkFrom', from.name)
    next()
  },
  watch: {
    goodsNum: function(value) {
      this.$indicator.open()
      this.getGroupProducts().then(() => {
        this.$indicator.close()
      })
    },
    total_no_seckill_price: function(value) {
      this.savePrice(value)
      if (this.is_first_get_price) {
        this.saveSelectedItem(this.getUsableList[0])
        this.is_first_get_price = false
      }
    }
  },
  computed: {
    ...mapState({
      selectedAddress: state => state.address.selectedItem,
      addressItems: state => state.address.items,
      selectedDate: state => state.delivery.selectedDate,
      selectedTime: state => state.delivery.selectedTime,
      cartGoods: state => state.checkout.cartGoods,
      goodsNum: state => state.checkout.cartGoods[0].amount,
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user,
      selectedItem: state => state.seckill.selectedItem,
      seckillToken: state => state.auth.seckillToken,
      currentBalance: state => state.balance.currentBalance,
      currentBond: state => state.bond.currentBond,
      tmpOrder: state => state.checkout.tmpOrder // 临时订单信息
    }),
    ...mapGetters({
      getUsableList: 'getUsableList'
    }),
    isCart() {
      if (this.$route.params && this.$route.params.isCart) {
        return this.$route.params.isCart
      } else {
        return null
      }
    },
    isSecBuy() {
      // 是否为秒杀商品
      return !!this.cartGoods[0].goods.secbuy
    },
    groupLength() {
      return this.productsGroup.length
    },
    // 是否为竞拍
    isC2B() {
      return this.cartGoods[0].isC2B
    },
    // 直通车
    isTrain() {
      return this.cartGoods[0].train_sn
    },
    getOrderProducts() {
      let cartGoods = this.cartGoods
      let orderProducts = []
      for (let i = 0; i < cartGoods.length; i++) {
        const element = cartGoods[i]
        let goods = {}

        // 若是分销商品则 需要mlm_id  else  需要goods_id
        if (this.isMlmPay) {
          goods.mlm_id = element.mlmId
        } else {
          goods.goods_id = element.goods ? element.goods.id : ''
        }
        // 秒杀
        if (this.isSecBuy && this.seckillToken) goods.secbuy_id = this.seckillToken.id
        // 分期
        if (element.instalment_id) {
          goods.instalment_id = element.instalment_id
        }
        // 竞拍
        if (element.isC2B) {
          goods.paipai_id = element.goods.paipai_id
        }

        goods.buy_number = element.amount
        // element.attrs 有四种情况
        // 1. 空的: null
        // 2. Json数组: [123]、[123, 456]
        // 3. 无逗号字串: 123
        // 4. 有逗号字串: 123,456
        goods.property = this.getToArray(element.attrs)

        orderProducts.push(goods)
      }
      return orderProducts
    },
    getTmpOrderIds() {
      return (
        this.tmpOrder.order_id &&
        this.tmpOrder.order_id.map(id => {
          return { order_id: id }
        })
      )
    },
    // 获取购物车货品id数组
    getCartGoodsIds: function() {
      let cartGoods = this.cartGoods
      let goodsIds = []
      if (cartGoods && cartGoods.length) {
        goodsIds = cartGoods.map(function(cardGood) {
          return cardGood.id
        })
      }
      return goodsIds
    },
    getShippingPrice() {
      return this.getFormatPrice('shipping_price')
    },
    getNeedHuanBi() {
      if (this.order_price && this.order_price.surplus_discount > 0) {
        return this.order_price.surplus_discount
      } else {
        return 0
      }
    },
    // 获取优惠券金额
    getCouponPrice() {
      if (this.selectedCoupon.coupon_id) {
        return this.selectedCoupon.coupon_price
      } else {
        return 0
      }
    },
    getNeedHuanDou() {
      if (this.order_price && this.order_price.token_discount > 0) {
        return this.order_price.token_discount
      } else {
        return 0
      }
    },
    getOrderProductPrice() {
      if (this.instalment_order_price) {
        return this.instalment_order_price.total_price
      } else {
        return this.getFormatPrice('product_price')
      }
    },
    getOrderTotalPrice() {
      return this.getFormatPrice('total_price')
    },
    getRealCashPay() {
      let num =
        Number(this.getOrderTotalPrice) -
        Number(this.getNeedHuanBi) -
        Number(this.getNeedHuanDou) -
        Number(this.getCouponPrice)
      return this.utils.formatFloat(Math.max(num, 0))
    },
    getAllDiscount() {
      let num = Number(this.getNeedHuanBi) + Number(this.getNeedHuanDou) + Number(this.getCouponPrice)
      return this.utils.formatFloat(Math.min(num, this.getOrderProductPrice))
    },
    getInstalmentPay() {
      return this.utils.formatFloat(
        Number(this.instalment_order_price.total_price) -
          Number(this.getNeedHuanBi) -
          Number(this.getNeedHuanDou) -
          Number(this.getCouponPrice)
      )
    },
    selectedCouponMsg() {
      if (this.couponList.able_list.length == 0) {
        return '无可用优惠券'
      } else if (this.selectedCoupon.coupon_user_id) {
        return this.selectedCoupon.coupon_name
      } else {
        return `${this.couponList.able_list.length}张可用`
      }
    },
    isMlmPay() {
      return this.cartGoods[0].mlmId ? true : false
    },
    readBefore() {
      let ret = { should: false }
      const detailInfo = this.cartGoods[0].goods
      const res = isShouldRead(detailInfo)
      if (res['should']) {
        ret['should'] = true
        ret['rule'] = res['rule']
      }
      return ret
    },
    isInstalment() {
      return this.instalment_order_price ? 1 : 0
    },
    currentAvailabel() {
      // 当前条件下 可用的权益积分数
      return Number(this.order_price.surplus_discount ? this.order_price.surplus_discount : 0)
    },
    // 可兑换权益积分的数量
    surplusCanExchange() {
      // 此订单还可兑换权益积分的数量（已扣减账户余额）
      const surplus_limit = Number(this.order_price.surplus_accept ? this.order_price.surplus_accept : 0)
      if (surplus_limit <= 0 || this.currentBond <= 0) {
        return 0
      }

      return Math.min(surplus_limit, this.currentBond)
    },
    ifShowExchange() {
      // 是否展示兑换入口
      return this.surplusCanExchange > 0
    },
    consignee() {
      // 收货地址
      return this.selectedAddress ? this.selectedAddress.id : null
    },
    postDataForCartCheckout() {
      // 购物车结算 post数据整理
      // 收货地址
      const consignee = this.consignee

      // 通过后台返回key与cartGoods中内容确定商品id，即cart_id
      let products = []
      this.productsGroup.forEach(item => {
        item.list.forEach(itemlist => {
          products.push({ cart_id: this.cartGoods[itemlist.key].id, comment: item.comment })
        })
      })

      // 优惠券
      const coupon_id = this.selectedCoupon.coupon_user_id
      return {
        consignee,
        products,
        coupon_id,
        pay_cert: this.pay_cert
      }
    },
    postDataForNotCartCheckout() {
      // 非购物车结算 post数据
      const good = this.cartGoods[0]
      const comment = this.productsGroup[0].comment
      return {
        product: good.goods_id,
        mlm_id: good.mlmId,
        secbuy_id: this.isSecBuy && this.seckillToken ? this.seckillToken.id : '',
        paipai_id: good.isC2B ? good.goods.paipai_id : '',
        train_sn: good.train_sn ? good.train_sn : '',
        property: this.getToArray(good.attrs),
        amount: good.amount,
        consignee: this.consignee,
        comment: comment,
        coupon_id: this.selectedCoupon.coupon_user_id,
        instalment_id: this.instalment_order_price ? this.instalment_order_price.id : undefined,
        tiket: this.isSecBuy && this.seckillToken ? this.seckillToken.token : '',
        pay_cert: this.pay_cert
      }
    },
    getOrderToComment() {
      // key为this.tmpOrder中的order_id数组的key
      // bad things: 一个分组一个评论，但是一个商品一个temp_order_id；所以当前分组下的所有order_id共用一个comment
      const tmp = []
      this.productsGroup.forEach(e1 => {
        e1.list.forEach(e2 => {
          tmp[e2.key] = e1.comment
        })
      })
      return tmp
    },
    postDataForTmpOrderCheckout() {
      // 已生成临时订单，兑换 或 结算的post数据
      const temp_order = this.tmpOrder.order_id.map((ele, index) => {
        return {
          order_id: ele,
          comment: this.getOrderToComment[index]
        }
      })
      return {
        consignee: this.consignee,
        coupon_id: this.selectedCoupon.coupon_user_id,
        temp_order: temp_order,
        pay_cert: this.pay_cert
      }
    },
    checkoutApi() {
      // 临时订单 ? 使用临时订单结算接口 : (购物车结算和非购物车结算接口)
      return this.tmpOrder.order_id
        ? product.purchaseFromTmpOrder
        : this.isCart
        ? cart.cartCheckout
        : product.productPurchase
    },
    postData() {
      return this.tmpOrder.order_id
        ? this.postDataForTmpOrderCheckout
        : this.isCart
        ? this.postDataForCartCheckout
        : this.postDataForNotCartCheckout
    }
  },
  created: function() {
    this.init()

    // 债权数据
    bondGet().then(res => {
      this.saveCurrentBondState(res)
    })
    // 账户数据
    balanceGet().then(res => {
      this.saveCurrentBalanceState(res.surplus)
    })
  },

  methods: {
    ...mapMutations({
      saveAddressItems: 'saveAddressItems',
      selectAddressItem: 'selectAddressItem',
      unselectAddressItem: 'unselectAddressItem',
      unselectDelivery: 'unselectDelivery',
      clearCommentInfo: 'clearCommentInfo',
      clearSelectedCartGoods: 'clearSelectedCartGoods',
      clearBalanceInfo: 'clearBalanceInfo',
      unsaveSelectedItem: 'unsaveSelectedItem',
      unsaveSeckillItems: 'unsaveSeckillItems',
      savePrice: 'savePrice',
      saveSelectedItem: 'saveSelectedItem',
      removeSeckillItem: 'removeSeckillItem',
      clearSeckillToken: 'clearSeckillToken',
      saveCurrentBondState: 'saveCurrentBondState',
      saveCurrentBalanceState: 'saveCurrentBalanceState',
      clearTmpOrder: 'clearTmpOrder'
    }),
    ...mapActions({
      fetchCartNumber: 'fetchCartNumber',
      fetchRegions: 'fetchRegions'
    }),

    async init() {
      this.$indicator.open()
      try {
        // 处理地址
        await this.handleAddress()
        // 处理商品结算分组(需地址数据)
        await this.getGroupProducts()
      } catch (err) {
        console.log(err)
      } finally {
        this.$indicator.close()
      }
    },

    getGroupProducts() {
      // 收货地址
      const consignee = this.selectedAddress ? this.selectedAddress.id : null
      // 直通车代付单 SN码
      const train_sn = this.cartGoods[0].train_sn ? this.cartGoods[0].train_sn : ''

      return new Promise((resolve, reject) => {
        product
          .groupTotalPrice({ consignee, products: this.getOrderProducts, train_sn, temp_order: this.getTmpOrderIds })
          .then(
            res => {
              this.isDisabled = false
              this.productsGroup = res.list
              this.order_price = res.total
              this.red_cash_back = res.red_cash_back
              this.instalment_order_price = res.instalment || null
              this.initCoupon(res.coupon_list)
              resolve()
            },
            err => {
              if (err.data[0]) this.amount(err.data[0].only_purchase - err.data[0].now_purchase)
              this.isDisabled = true
              reject()
            }
          )
      })
    },

    // 收货地址列表
    handleAddress() {
      return new Promise((resolve, reject) => {
        const currentAddr = this.selectedAddress ? this.selectedAddress.id : null
        // 存在已选择的收货地址
        if (currentAddr) {
          resolve()
          return
        }
        // 没有的话
        consignee
          .consigneeList(1)
          .then(res => {
            // 设置默认地址为 当前收货地址
            this.selectAddressItem(res[0])
          })
          .finally(() => {
            resolve()
          })
      })
    },

    getPriceByKey(key) {
      let total = '0'
      let order_price = this.order_price
      if (order_price && order_price[key]) {
        total = order_price[key]
      }
      return this.utils.formatFloat(total)
    },

    getFormatPrice(key) {
      let price = this.getPriceByKey(key)
      let priceStr = price ? this.utils.formatFloat(price) : '0'
      return priceStr
    },

    clearSelectedInfo() {
      this.unselectAddressItem()
      // this.unselectCashgiftItem()
      // this.clearInvoiceInfo()
      this.unselectDelivery()
      this.clearCommentInfo()
      this.clearSelectedCartGoods()
      this.clearBalanceInfo()
      // this.clearScoreInfo()
      this.unsaveSelectedItem()
      this.unsaveSeckillItems()
      this.clearTmpOrder()
    },

    leftClick() {
      this.goBack()
    },
    amount(value) {
      this.cartGoods[0].amount = value
    },
    goAddress() {
      if (this.selectedAddress && this.selectedAddress.id) {
        this.$router.push({ name: 'addressList' })
      } else {
        this.$router.push({
          name: 'addressEdit',
          query: {
            mode: 'add',
            item: null,
            isFromCheckout: true,
            goBackLevel: -1
          }
        })
      }
    },

    goGoodsList() {
      this.$router.push({ name: 'goodsList' })
    },

    checkIfCanExchange() {
      return new Promise((resolve, reject) => {
        if (this.surplusCanExchange <= 0) {
          resolve()
          return
        }
        this.$messagebox({
          title: '',
          message: `<p>现金省着花！</p><p style='text-align: left;'>您还有债权可兑换成权益积分，再抵扣${this.utils.formatMoney(
            this.surplusCanExchange
          )}元，是否兑换？</p>`,
          showCancelButton: true,
          cancelButtonText: '立即兑换',
          confirmButtonText: '直接支付'
        }).then(action => {
          if (action === 'confirm') {
            resolve()
          } else {
            this.exchangeToken()
            reject()
          }
        })
      })
    },

    exchangeToken() {
      if (!this.consignee) {
        this.$toast('请填写收货地址')
        return
      }
      goExchange(this.surplusCanExchange, this.checkoutApi, this.postData)
    },

    async checkout() {
      // 暂停 2020-02-27
      return this.$toast('为响应政府监管部门要求，换换商城现暂停商城业务；请您耐心等待。')

      // 是否还可兑换更多权益积分，提醒用户
      let ifExchange = false
      try {
        await this.checkIfCanExchange()
      } catch (e) {
        ifExchange = true
      }
      if (ifExchange) return

      // 收货地址
      if (!this.consignee) {
        this.$toast('请填写收货地址')
        return
      }

      if (this.getNeedHuanBi > 0 || this.getNeedHuanDou > 0) {
        // 积分（或浣豆）须支付密码
        let ifPwdContinue = true
        try {
          this.pay_cert = await checkPaypwd(this.getNeedHuanBi + this.getNeedHuanDou)
        } catch (e) {
          ifPwdContinue = false
        }
        if (!ifPwdContinue) return
      }

      this.$indicator.open()
      this.checkoutApi(this.postData)
        .then(
          res => {
            this.isCheckoutComplete = true
            this.fetchCartNumber()
            if (res.total == 0 || this.getRealCashPay == 0) {
              this.goPaySucceed(res)
              return
            }

            const query = {
              order: JSON.stringify(res.order_id),
              total: this.isInstalment ? this.getInstalmentPay : res.need_money,
              isInstalment: this.isInstalment,
              canceled_at: res.canceled_at
            }
            if (!this.isCart) {
              query.order = this.isInstalment ? JSON.stringify([res.details[0].id]) : JSON.stringify(res.order_id)
              query.isC2B = this.isC2B ? true : false
            }

            this.$router.replace({
              name: 'payment',
              query: query
            })
          },
          error => {
            if (error.error_event_code == 201) {
              this.showSeckillError()
            } else {
              this.$messagebox({
                title: '',
                message: error.errorMsg,
                confirmButtonText: '确定'
              })
            }
          }
        )
        .finally(() => {
          this.$indicator.close()
        })
    },

    goPaySucceed(res) {
      this.$router.replace({ name: 'paySucceed', query: { is_donated: res.isDonate } })
    },

    getOrderDiscountPrice(item) {
      return '-￥ ' + (item.price ? item.price : 0)
    },

    showSeckillPopup() {
      if (this.getUsableList.length > 0) {
        this.toggle(true)
      }
    },
    closeSeckillPopup() {
      this.toggle(false)
      this.getGroupProducts()
    },
    toggle(value) {
      this.isShowSeckillPopup = value
    },

    // 选择优惠券相关
    showCouponPopup() {
      this.changeCouponPopupState(true)
    },
    closeCouponPopup() {
      this.changeCouponPopupState(false)
    },
    confirmCoupon(item) {
      this.selectedCoupon = item
    },
    changeCouponPopupState(value) {
      this.isShowCouponPop = value
    },

    showSeckillError() {
      this.$messagebox({
        title: '',
        message: `您选择的<br/>${this.selectedItem.desc}优惠券<br/>已被抢光`,
        showCancelButton: true,
        cancelButtonText: '返回确认订单',
        cancelButtonClass: 'cancel-button',
        confirmButtonClass: 'confirm-button-red',
        confirmButtonText: '继续购买'
      }).then(action => {
        this.removeSeckillItem(this.selectedItem)
        if (action === 'cancel') {
        } else if (action == 'confirm') {
          this.checkout()
        }
      })
    },

    getNoSeckillPrice(order_price) {
      let discount = 0
      order_price.promos.forEach((item, index) => {
        if (item.promo != 'moneyseckill') {
          discount += Number(item.price)
        }
      })
      return order_price.product_price - discount
    },

    showRules() {
      this.$router.push({
        name: 'shouldKnownBefore',
        query: { from: 'checkout', ruleId: this.readBefore['rule']['id'] }
      })
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

    /**
     * 重新计算价格后，重新渲染优惠券和选中优惠券
     *
     * @param      {Object}  coupon_list  接口返回可用优惠券，判断选中优惠券是否存在在可有优惠券列表内
     */
    initCoupon(coupon_list) {
      this.couponList.able_list = coupon_list ? coupon_list.able_list : []
      this.couponList.unable_list = coupon_list ? coupon_list.unable_list : []
      let isStillCoupon = false
      this.couponList.able_list.forEach(item => {
        if (item.coupon_id == this.selectedCoupon.coupon_id) {
          isStillCoupon = true
        }
      })
      if (!isStillCoupon) {
        this.selectedCoupon = {}
      }
    },
    async goBack() {
      let leave = false
      try {
        await this.showBackNoticeMsg()
      } catch (e) {
        leave = true
      }

      if (leave) this.$router.go(-1)
    },
    // 用户返回时提醒用户
    showBackNoticeMsg() {
      return new Promise((resolve, reject) => {
        this.$messagebox({
          title: '',
          message: '好货不等人</br>请三思而行',
          showCancelButton: true,
          closeOnClickModal: false,
          cancelButtonText: '去意已决',
          cancelButtonClass: 'cancel-button',
          confirmButtonClass: 'confirm-button-red',
          confirmButtonText: '再想想'
        }).then(action => {
          if (action === 'cancel') {
            reject()
          } else {
            resolve()
          }
        })
      })
    }
  },
  async beforeRouteLeave(to, from, next) {
    // 离开时清除 秒杀token
    const routename = ['addressList', 'SeckillProduct', 'goodsList', 'addressEdit', 'bondDebt']
    if (routename.indexOf(to.name) === -1 && this.seckillToken) this.clearSeckillToken()
    next()
  },
  destroyed() {
    // 清除 store中 已使用 而 失效的信息，因涉及到watchers computed的数据绑定，如果在其他阶段清除 可能会导致因数据变化而报错，在destroyed中这些绑定关系已失效
    if (this.isCheckoutComplete) {
      this.clearSelectedInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.container1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}
.header {
  @include header;
  position: relative !important;
}
.body {
  flex: 1 0 0;
  padding-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  .body-container {
    display: block;
    width: 100%;
    overflow-x: hidden;

    .shop-wrapper {
      background-color: #fff;
      margin-top: 10px;
      .shop-header {
        padding: 10px 0 0 15px;
        display: flex;
        align-items: center;
      }
      img.shop-icon {
        width: 14px;
      }
      span.shop-name {
        margin-left: 7px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(64, 64, 64, 1);
        line-height: 18px;
      }
    }
  }
}
.body-foot {
  padding-bottom: 5px;
}
.goods {
  // height: 90px;
}
.item {
  height: 50px;
}
.section-header {
  margin-top: 8px;
}
.section-footer {
  margin-bottom: 8px;
}
.desc {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding-top: 10px;
  padding-bottom: 10px;
}
.desc-item {
  height: 30px;
}

.bottom-wrapper {
  .operation {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    &.has-instalment {
      height: 55px;
      .amount-wrapper-has-istlmt {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 15px;
        background-color: #fff;
        .amout {
          color: #552e20;
          font-size: 12px;
          position: relative;
          &:before {
            content: '';
            display: block;
            width: 28px;
            height: 12px;
            position: absolute;
            right: -30px;
            top: 0;
            background-image: url('../../assets/image/hh-icon/c10-checkout/instalment-bg.png');
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
        .unit {
          color: $primaryColor;
          font-weight: 600;
        }
        .money {
          color: $primaryColor;
          font-size: 20px;
          font-weight: bold;
          position: relative;
          top: 1px;
        }
      }
      .total {
        display: inline-block;
        @include sc(11px, #999999, left center);
      }
    }
    .amount-wrapper {
      flex: 1 0 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding-left: 15px;
      background-color: #fff;
      .amount {
        font-size: 12px;
        color: #552e20;
        padding-right: 18px;
        span {
          color: $primaryColor;
          padding-left: 3px;
          span {
            &.unit {
              font-size: 12px;
              font-weight: 600;
              padding-left: 0;
            }
            &.price {
              font-weight: bold;
              font-size: 20px;
              padding-left: 0;
              position: relative;
              top: 1px;
            }
          }
        }
      }
    }
    .discount {
      font-size: 0;
      margin-left: -9px;
      margin-top: 7px;
      span {
        font-size: 12px;
        font-weight: 400;
        color: #999;
        line-height: 17px;
      }
    }
    .submit {
      width: 117px;
      font-size: 16px;
      border-radius: 0;
      background-color: $primaryColor;
      &:focus {
        background-color: $primaryColor;
      }
      &.disable {
        background-color: rgba(119, 37, 8, 0.3);
        pointer-events: none;
      }
    }
  }
}

.rules-wrapper {
  padding: 20px 0 25px 15px;
}
.rules {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;

  label.input-icon {
    display: inline-block;
    @include wh(14px, 14px);
    background-size: 100%;
    border: 1px solid #b89385;
    border-radius: 1px;
    background-color: #ffffff;
    margin-right: 10px;
  }
  input {
    display: none;
    &:checked + label.input-icon {
      background-color: $primaryColor;
      background-image: url('../../assets/image/hh-icon/icon-checkbox-active.png');
    }
    &:disabled + label.input-icon {
      visibility: hidden;
    }
  }
  .rules-msg {
    font-size: 12px;
    color: #666666;

    & + span {
      font-size: 12px;
      color: #552e20;
    }
  }
}
.price-wrapper {
  margin-top: 10px;
  background-color: #fff;
  padding-bottom: 18px;
}
</style>

<template>
  <div class="container">
    <mt-header class="header" title="确认付款">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="leftClick"></header-item>
    </mt-header>
    <div class="top-wrapper">订单提交成功</div>

    <!-- 支付信息 -->
    <div class="pay-msg-wrapper">
      <!-- 现金支付信息 -->
      <div class="pay-wrapper cash-container">
        <div class="pay-container pay-wrapper-title">
          <label class="pay-name">现金支付</label>
          <div class="wrapper-price">
            <span class="price-unit">￥</span>
            <span class="pay-price">
              {{ utils.formatMoney(payMoney) }}
            </span>
          </div>
        </div>
        <div class="item-wrapper" v-for="(item, index) in payList" :key="index">
          <label
            class="item-choose-wrapper"
            v-if="item.code == ENUM.CASH_PAY_TYPE.ALIPAY_H5 || item.code == ENUM.CASH_PAY_TYPE.ALIPAY_APP"
            for="alipayInput"
          >
            <label for="index" class="item-title item-left-wrapper">
              <img class="icon" src="../../assets/image/hh-icon/b10-pay/icon-alipay.png" />
              {{ item.name }}
            </label>
            <input
              :checked="item.code == code"
              type="radio"
              id="alipayInput"
              class="pay-inpput"
              @change="payType(item.code, index)"
              name="payType"
            />
            <label class="sel-radius" placeholder="v" for="alipayInput"></label>
          </label>
          <label
            class="item-choose-wrapper"
            v-if="
              item.code == ENUM.CASH_PAY_TYPE.WXPAY_H5 ||
                item.code == ENUM.CASH_PAY_TYPE.WXPAY_APP ||
                item.code == ENUM.CASH_PAY_TYPE.WXPAY_JS
            "
            for="wxpayInput"
          >
            <label for="index" class="item-title item-left-wrapper">
              <img class="icon" src="../../assets/image/hh-icon/b10-pay/icon-wxpay.png" />
              {{ item.name }}
            </label>
            <input
              :checked="item.code == code"
              type="radio"
              id="wxpayInput"
              class="pay-inpput"
              @change="payType(item.code, index)"
              name="payType"
            />
            <label class="sel-radius" placeholder="v" for="wxpayInput"></label>
          </label>
        </div>
      </div>

      <!-- 合计 -->
      <div class="pay-wrapper total-container">
        <div class="pay-container pay-wrapper-total">
          <div class="price-wrapper">
            <span class="price-w-title">实际支付：</span>
            <span>
              <span class="price-w-unit">￥</span><span class="price-w-amount">{{ utils.formatMoney(payMoney) }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="action-wrapper">
      <gk-button class="button" type="primary-secondary" v-on:click="pay">立即付款</gk-button>
    </div>

    <!-- 提交付款时展示遮罩popUp -->
    <message-popup
      cancelTxt="返回"
      @checkOrder="checkOrder"
      @payAgain="payAgain"
      v-if="isShowPayPop"
      :isNoSurplus="true"
    ></message-popup>
  </div>
</template>

<script>
import $cookie from 'js-cookie'
import { mapState, mapMutations } from 'vuex'

import { payBzj } from '../../api/auction'
import { paymentTypesList } from '../../api/payment'
import CountDownPopup from '../../components/common/CountDownPopup'
import MessagePopup from '../../components/common/MessagePopup'
import { ENUM } from '../../const/enum'
import { authWeb, getWxConfig } from '../../api/auth-web'
import wechat from '../../config/wechat'
import wx from 'weixin-js-sdk'

export default {
  name: '',
  data() {
    return {
      id: this.$route.query.id, // 订单id | array
      payMoney: Number(this.$route.query.total), // 订单需支付的现金
      isShowPayPop: false, // 提交付款时展示遮罩（用于返回时刷新页面）
      isPending: false, // 订单提交请求是否在提交中
      payList: [], // 支付方式List 支付宝、微信...
      code: '', // 当前使用的支付方式： this.payList 中的一种

      ENUM, // 常量

      redirectUrl: '' // App原生 三方支付后的回跳地址
    }
  },

  components: {
    MessagePopup
  },

  computed: {
    ...mapState({
      openId: state => state.auth.openId
    }),

    // 判断版本号是否大于0.2.0
    // 判断当前版本App是否支持三方支付
    versionHasAppPay() {
      return this.isHHApp && this.AppVersion >= 20
    },

    isH5Pay() {
      return ENUM.CASH_PAY_TYPE.ALIPAY_H5 == this.code || ENUM.CASH_PAY_TYPE.WXPAY_H5 == this.code
    },

    isAppPay() {
      return ENUM.CASH_PAY_TYPE.ALIPAY_APP == this.code || ENUM.CASH_PAY_TYPE.WXPAY_APP == this.code
    }
  },

  created() {
    this.checkOpenId()
    this.$indicator.open()
    // 获取支付方式List
    this.getPaymentTypesList().then(() => {
      this.$indicator.close()

      // 初始化支付方式
      this.code = this.payList[0].code
    })
  },

  mounted() {
    window.onPayResult = function(type, result) {
      if (
        // 微信支付
        (type == 1 && result.code != 0) ||
        // 支付宝
        (type == 2 && result.resultStatus != 9000)
      ) {
        // 用户取消或支付失败
        return
      }
      window.location.href = window.redirect_url
      window.redirect_url = ''
    }
  },

  methods: {
    ...mapMutations({
      saveOpenid: 'saveOpenid'
    }),
    leftClick() {
      this.$_goBack()
    },

    // 获取支付方式
    getPaymentTypesList() {
      // 判断支付环境 hhppp /wechat /h5 获取支付方式
      let payenv = 'wap'
      if (this.isHHApp && this.versionHasAppPay) {
        payenv = 'app'
      }
      if (this.wxApi.isweixin()) {
        payenv = 'wechat'
      }
      return new Promise((resolve, reject) => {
        paymentTypesList(payenv).then(
          res => {
            this.payList = [...res]
            resolve()
          },
          error => {
            this.$toast(error.errorMsg)
            reject()
          }
        )
      })
    },

    // 检查是否是微信并且有openid
    checkOpenId() {
      // 是否是微信
      if (!this.wxApi.isweixin()) {
        return
      }

      if (this.openId) {
        return
      }

      const code = $cookie.get('wx_code')
      if (code) {
        $cookie.remove('wx_code')
        this.getOpenid(code)
      } else {
        const appId = wechat.appId
        const redirect_uri = encodeURIComponent(location.href)
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      }
    },

    // 获取openid
    getOpenid(code) {
      authWeb(ENUM.AUTH_VENDOR.WEIXIN, 'snsapi_base', code).then(res => {
        this.saveOpenid(res.openid)
      })
    },

    payAgain(value) {
      this.isShowPayPop = value
    },

    /*
     *更换 支付方式
     */
    payType(code, index) {
      if (code) {
        this.code = code
      }
    },

    // 支付
    pay() {
      // 防重复提交
      if (this.isPending) {
        return
      }

      if (!this.code) {
        return this.$toast('请选择支付方式')
      }

      if (!this.id) {
        return this.$toast('无竞拍商品信息')
      }

      // 提交数据
      let data = {
        id: this.id,
        code: this.code
      }

      // 现金支付开始
      this.isPending = true
      if (ENUM.CASH_PAY_TYPE.WXPAY_JS == this.code) {
        // 微信内Webview 支付
        getWxConfig().then(res => {
          wx.config({
            debug: false, // 开启调试模式
            appId: res.app_id, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 调用微信的支付接口
          })

          wx.ready(() => {
            data['openid'] = this.openId
            payBzj(data).then(res => {
              this.wxPaymentPay(res)
              this.isPending = false
            })
          })
        })
        return
      }

      // H5支付 or App原生三方支付
      payBzj(data)
        .then(
          res => {
            this.isShowPayPop = true

            if (this.versionHasAppPay) {
              // App原生支付
              // app版本小于0.2.0则调用h5支付
              window.redirect_url = res.redirect_url
              this.payInApp(this.code, res.result)
            } else {
              window.location.href = res.result
            }
          },
          error => {
            this.$toast(error.errorMsg || '支付失败，请稍后重试')
          }
        )
        .finally(() => {
          this.isPending = false
          this.$indicator.close()
        })
    },

    payInApp(code, result) {
      // app内支付
      let type = '0'
      if (code == ENUM.CASH_PAY_TYPE.WXPAY_APP) {
        type = '1'
      } else if (code == ENUM.CASH_PAY_TYPE.ALIPAY_APP) {
        type = '2'
      }
      if (type) {
        if (type == '1') {
          // 转字符串后encode处理
          result = JSON.stringify(result)
        }
        result = encodeURIComponent(result)
        this.hhApp.openPay(type, result)
      }
    },

    // 微信Webview微信支付
    wxPaymentPay(response) {
      wx.chooseWXPay({
        timestamp: response.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: response.result.nonceStr, // 支付签名随机串，不长于 32 位
        package: response.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: response.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: response.result.paySign, // 支付签名
        success: res => {
          if (res.errMsg == 'chooseWXPay:ok') {
            this.goPayResult({ isOnline: 1, order: response.trade_no, id: this.id })
          } else {
            this.goPayResult({ isOnline: 1, order: response.trade_no, id: this.id })
          }

          // 支付成功后的回调函数
          return true
        },
        cancel: res => {
          this.$toast('支付已取消')
        },
        fail: res => {
          this.$toast((res && res.errMsg) || res || '支付失败，请稍后重试')
        }
      })
    },

    goPayResult(query = {}) {
      this.$router.replace({ name: 'payResult', query: query })
    },

    checkOrder(value) {
      this.isShowPayPop = value
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: $mainbgColor;
}
.header {
  @include header;
  border-bottom: 1px solid $lineColor;
}
.top-wrapper {
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  color: #552e20;
}
.pay-msg-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0 15px 120px;
  overflow: hidden;
}
.pay-wrapper {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 2px;
  overflow: hidden;
  &.surplus-container {
    margin-bottom: 25px;
    .is-friend-pay {
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        background: rgba(255, 255, 255, 0.8);
      }
    }
    .only-cash-pay-wrapper {
      color: #999999;
      font-size: 13px;
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      margin-top: -25px;
      position: relative;
      z-index: 2;
    }
  }
  .pay-container {
    padding: 0 15px;
    display: flex;
    background: #ffffff;
    justify-content: space-between;
    align-items: center;
    &:not(:last-child) {
      @include thin-border(#f4f4f4, 0, 0);
    }
    &.pay-wrapper-title {
      color: $baseColor;
      height: 50px;
      .pay-name {
        font-size: 16px;
        color: #404040;
        font-weight: 400;
      }
      .pay-price {
        font-size: 16px;
        font-weight: bold;
        color: #404040;
      }
      .wrapper-price {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }
      .surplus-paid {
        display: inline-block;
        color: #ff3950;
        font-size: 13px;
        line-height: 20px;
        padding: 0 6px;
      }
      .surplus-icon {
        width: 11px;
        height: 11px;
        margin-right: 2px;
      }
      .price-unit {
        line-height: 1;
        @include sc(10px, #404040, center bottom);
        font-weight: 600;
      }
    }
    &.pay-wrapper-exchange {
      height: 50px;
      font-size: 13px;
      font-weight: 300;
      @include thin-border(#f4f4f4, 0, 0);
      .can-use {
        color: #c6c6c6;
        flex: 1;
      }
      .go-exchange {
        color: #562f21;
        display: flex;
        align-items: center;
        img {
          width: 6px;
          margin-left: 3px;
        }
      }
    }
    &.pay-wrapper-rules {
      min-height: 50px;
      text-align: center;
      flex-direction: column;
      .rules-content {
        text-align: left;
        font-size: 14px;
        color: $baseColor;
      }
      .rules-title {
        color: #b5b6b6;
        line-height: 45px;
      }
      .show-rules {
        height: 50px;
        color: #552e20;
        line-height: 50px;
        font-size: 14px;
      }
      img {
        width: 13px;
        height: 13px;
        transform: rotate(90deg);
        &.is-show {
          transform: rotate(-90deg) translateX(-2px);
        }
      }
    }
    //
    .pay-check {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        margin-right: 20px;
        font-size: 13px;
        font-weight: 300;
        color: #c0c0c0;
        line-height: 18px;
      }
      .check-radio {
        display: flex;
        align-items: center;
        input {
          display: none;
        }
        label {
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url('../../assets/image/hh-icon/icon-checkbox.png') no-repeat;
          background-size: 22px 22px;
          &.active {
            background-image: url('../../assets/image/hh-icon/icon-checkbox-active.png');
          }
        }
      }
      .go-exchange {
        font-size: 13px;
        font-weight: 300;
        line-height: 18px;
        color: #562f21;
        margin-right: 20px;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          width: 6px;
          margin-left: 5px;
        }
      }
    }
  }
  .item-wrapper {
    .item-choose-wrapper {
      &:not(:last-child) {
        @include thin-border(#f4f4f4, 0, 0);
      }
      padding: 0 15px;
      height: 50px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }
    .sel-radius {
      @include wh(20px, 20px);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('../../assets/image/hh-icon/icon-checkbox.png');
    }
    .pay-inpput {
      display: none;
      &:checked + .sel-radius {
        background-image: url('../../assets/image/hh-icon/icon-checkbox-active.png');
      }
      &:disabled + .sel-radius {
        visibility: hidden;
      }
    }
    .item-left-wrapper {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    img {
      width: 24px;
      margin-right: 13px;
    }
  }
  .pay-wrapper-total {
    height: 50px;
    text-align: right;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
    .price-wrapper {
      color: $primaryColor;
      font-size: 20px;
      display: flex;
      align-items: baseline;
      font-weight: bold;
      .price-w-title {
        font-size: 12px;
        color: #404040;
        margin-right: 2px;
        font-weight: 400;
      }
      img {
        width: 11px;
      }
      .price-w-plus {
        font-size: 14px;
        margin: 0 2px;
      }
      .price-w-unit {
        font-size: 12px;
        font-weight: 600;
      }
      .price-w-amount {
        letter-spacing: 0px;
      }
    }
  }
  .share-pay-wrapper {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .share-pay-wrapper-title {
      font-size: 14px;
      color: #404040;
    }
  }
}
.action-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .button {
    @include button($margin: 20px 25px 60px, $radius: 2px);
    background-color: $primaryColor !important;
    font-size: 18px;
  }
}
</style>

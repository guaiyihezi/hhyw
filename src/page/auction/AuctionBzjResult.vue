<template>
  <div class="result-container">
    <mt-header class="header" title="支付结果">
      <header-item slot="left" v-bind:isBack="true" @click.native="goBack"></header-item>
    </mt-header>
    <div class="wrapper">
      <div class="content">
        <template v-if="isNeedCheck">
          <p class="wait-time">
            <span>{{ waitSecond }}</span> S
          </p>
          <label class="pay-result-title">请耐心等待支付结果......</label>
        </template>
        <template v-if="!isNeedCheck && status == pay_succeed">
          <img class="pay-result-icon" src="../../assets/image/hh-icon/b10-pay/pay-success@3x.png" />
          <label class="pay-result-title">保证金支付成功</label>
        </template>
        <template v-if="!isNeedCheck && status == pay_failed">
          <img class="pay-result-icon" src="../../assets/image/hh-icon/b10-pay/pay-fail@3x.png" />
          <label class="pay-result-title">支付失败或请求超时</label>
        </template>
      </div>
      <div v-if="!isNeedCheck && status == pay_succeed" class="tips">竞拍不成功，缴纳的保证金将原路退回。</div>
      <div class="btns">
        <template v-if="!isNeedCheck && status == pay_succeed">
          <gk-button class="button" type="primary-secondary" @click.native="goBid">去出价</gk-button>
          <gk-button class="button" type="primary-secondary-white" @click.native="goBidHistory">查看竞拍记录</gk-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuctionDetail } from '../../api/auction'
import { getPayResult } from '../../api/payment.js'
import { ENUM } from '../../const/enum'
import { AUCTION_STATE } from './static'
export default {
  name: 'auctionBzjResult',
  data() {
    return {
      AUCTION_STATE,
      status: ENUM.ORDER_PAY_STATUS.WAITTING,
      waitSecond: 0,
      countDownTimer: undefined,
      getResultTimer: undefined,
      isNeedCheck: this.$route.query.isOnline, // 是否需要通过查询Api获取订单支付结果
      id: undefined,
      orderId: this.$route.query.order || '',

      pay_succeed: ENUM.ORDER_PAY_STATUS.SUCCEED, // 支付成功
      pay_failed: ENUM.ORDER_PAY_STATUS.FAILED // 支付失败
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (from.name === to.name && from.query.repeat === 1) {
      // 点击 浏览器返回
      this.goBack()
    } else {
      next()
    }
  },

  created() {
    if (this.isNeedCheck) {
      this.countDownTimer = setInterval(() => {
        ++this.waitSecond
      }, 1000)
      this.getResult()
    }
  },

  mounted() {
    this.$router.push({
      name: this.$router.history.current.name,
      query: { ...this.$route.query, repeat: 1 }
    })
  },

  methods: {
    goBack() {
      if (this.id) {
        getAuctionDetail(this.id).then(res => {
          if (res.status == this.AUCTION_STATE.STATUS_STARTED) {
            this.$router.push({ name: 'auctionDetail', query: { id: this.id, toOffer: 1 } })
          } else {
            this.$router.push({ name: 'auctionDetail', query: { id: this.id } })
          }
        })
      } else {
        this.$router.push({ name: 'myc2b' })
      }
    },

    getResult() {
      getPayResult(this.orderId)
        .then(res => {
          this.id = res.paipai_id
          this.isNeedCheck = false
          this.resultInfo = res
          this.status = this.pay_succeed
          clearInterval(this.countDownTimer)
        })
        .catch(err => {
          this.getResultTimer = setTimeout(this.getResult, 3000)
        })
    },

    goBid() {
      this.goBack()
    },

    goBidHistory() {
      this.$router.push({ name: 'myc2b' })
    }
  }
}
</script>

<style lang="scss" scoped>
.result-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.header {
  @include header;
  @include thin-border($lineColor, 0);
}
.wait-time {
  font-size: 16px;
  span {
    font-size: 30px;
  }
}
.wrapper {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex-direction: column;
    text-align: justify;
    justify-content: center;
    align-items: center;
    padding: 60px 25px 0;
    .pay-result-icon {
      width: 62px;
      height: 62px;
    }
    .pay-result-title {
      color: #404040;
      font-size: 18px;
      margin-top: 20px;
      line-height: 1.5;
    }
  }
  .tips {
    font-size: 14px;
    color: #b5b6b6;
    margin-top: 14px;
    text-align: center;
  }
  .btns {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px;
    .button {
      width: 100%;
      font-size: 18px;
      @include button($margin: 0, $radius: 2px, $spacing: 2px);
      & + .button {
        margin-top: 20px;
      }
    }
  }
}
</style>

<!-- 纯积分支付结果页 -->
<template>
  <div class="container">
    <mt-header class="header" title="购买成功">
      <div class="complete-header-item" slot="right" @click="goBack">
        完成
      </div>
    </mt-header>
    <div class="wrapper">
      <div class="content">
        <img class="icon-success" src="../../assets/image/hh-icon/b10-pay/pay-success@3x.png" />
        <label class="title">购买成功</label>
      </div>
      <div class="btns">
        <gk-button
          v-if="donated"
          class="button btn-share-donate"
          type="primary-share-donate"
          v-stat="{ id: 'donate_share_paySuccess_pure' }"
          v-on:click="shareDonate"
          ><label class="btn-share-txt-wrapper"
            ><span class="txt-share">分享</span><br /><span class="txt-other">专递爱心 分享爱</span></label
          ></gk-button
        >
        <gk-button class="button" type="primary-secondary-white" v-on:click="goPaid">查看订单</gk-button>
      </div>
      <!-- 小额权益免密支付设置 提醒 -->
      <block-to-set-token-freepay></block-to-set-token-freepay>
    </div>
    <!--爱心捐赠 分享海报-->
    <popup-image-share v-model="showSharePop"></popup-image-share>
  </div>
</template>

<script>
import { HeaderItem, Button } from '../../components/common'

import { mapState, mapMutations, mapActions } from 'vuex'
import { Header } from 'mint-ui'
import { ENUM } from '../../const/enum'

// 分享爱心捐赠海报
import { PopupImageShare } from '../../components/common'
// 免密设置 提醒
import BlockToSetTokenFreepay from './child/BlockToSetTokenFreepay'

export default {
  data() {
    return {
      order_status_paid: ENUM.ORDER_STATUS.PAID,
      donated: this.$route.query.is_donated,
      showSharePop: false // 爱心捐赠分享海报
    }
  },
  methods: {
    ...mapMutations({
      changeStatus: 'changeStatus'
    }),
    goBack() {
      this.changeStatus(this.order_status_paid)
      this.$router.push({ name: 'order', params: { order: this.order_status_paid } })
    },
    goPaid() {
      this.changeStatus(this.order_status_paid)
      this.$router.push({ name: 'order', params: { order: this.order_status_paid } })
    },
    goShopping() {
      this.$router.push('/home')
    },
    shareDonate() {
      // 爱心捐赠分享
      this.showSharePop = true
    }
  },
  components: {
    PopupImageShare,
    BlockToSetTokenFreepay
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: #fff;
}
.header {
  @include header;
  border-bottom: 1px solid $lineColor;
  .complete-header-item {
    color: #552e20;
    font-size: 16px;
  }
}
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: justify;
  justify-content: center;
  align-items: center;
  padding: 60px 25px 0;
  .icon-success {
    width: 62px;
    height: 62px;
  }
  .title {
    color: #404040;
    font-size: 18px;
    margin-top: 20px;
    line-height: 1.5;
  }
  .donated-desc {
    font-size: 14px;
    color: rgba(249, 56, 47, 1);
    line-height: 20px;
    text-align: center;
    margin-top: 11px;
  }
}
.btns {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  .button {
    width: 100%;
    font-size: 18px;
    @include button($margin: 0, $radius: 2px, $spacing: 2px);
  }
  .btn-share-donate {
    margin-bottom: 25px;

    .btn-share-txt-wrapper {
      display: block;
      font-size: 0;
      .txt-share {
        font-size: 15px;
      }
      .txt-other {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 1px;
      }
    }
  }
}
</style>

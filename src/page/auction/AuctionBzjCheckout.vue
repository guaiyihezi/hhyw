<template>
  <div class="bzj-checkout-contianer">
    <mt-header class="header" title="报名交保证金">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="$_goBack"></header-item>
    </mt-header>
    <div class="bzj-body">
      <div class="bzj-info">
        <div class="title">
          <span class="left">保证金</span>
          <span class="num">￥{{ auctionInfo.deposit }}</span>
        </div>
        <div class="tips">竞拍不成功，缴纳的保证金将原路退回。</div>
      </div>

      <div class="rules">
        <input
          type="checkbox"
          id="checkbox"
          v-model="readCheckbox"
          class="rules-inpput"
          name="rules"
          :class="{ checked: readCheckbox }"
        />
        <label class="input-icon" for="checkbox"></label>
        <label class="rules-msg" for="checkbox"
          >参与竞拍需要同意换换商城<router-link tag="span" :to="{ name: 'auctionAgreement' }"
            >《竞拍技术服务协议》</router-link
          ></label
        >
      </div>
      <div class="btn-wrapper">
        <gk-button class="button" type="primary-secondary" @click.native="confirm">去报名</gk-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuctionDetail, payBzj } from '../../api/auction'
import { mapState, mapMutations } from 'vuex'
import { AUCTION_STATE } from './static'
export default {
  name: 'auctionBzjCheckout',
  data() {
    return {
      AUCTION_STATE,
      id: this.$route.query.id ? this.$route.query.id : '',
      readCheckbox: false
    }
  },

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      auctionInfo: state => state.auction.auctionInfo
    })
  },

  created() {
    if (!this.isOnline) {
      this.$_goBack()
    }
    if (!this.auctionInfo.id) {
      this.getDetail()
    }
    if (this.auctionInfo.is_sign_up) {
      this.$_goBack()
    }
  },

  methods: {
    ...mapMutations({
      saveAuctionInfo: 'saveAuctionInfo'
    }),

    getDetail() {
      getAuctionDetail(this.id).then(res => {
        this.saveAuctionInfo(res)
        if (this.auctionInfo.is_sign_up) {
          this.$_goBack()
        }
      })
    },

    confirm() {
      if (!this.readCheckbox) {
        this.$toast('请先阅读协议')
        return
      }

      if (this.auctionInfo.deposit > 0) {
        this.$router.push({
          name: 'auctionBzjPay',
          query: { id: this.auctionInfo.id, total: this.auctionInfo.deposit }
        })
      } else {
        payBzj({ id: this.auctionInfo.id }).then(res => {
          this.saveAuctionInfo({
            ...this.auctionInfo,
            ...{ is_sign_up: true }
          })
          this.$toast({
            message: '报名成功'
          })
          getAuctionDetail(this.id).then(res => {
            if (res.status == this.AUCTION_STATE.STATUS_STARTED) {
              this.$router.replace({ name: 'auctionOffer', query: { id: this.id } })
            } else {
              this.$_goBack()
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bzj-checkout-contianer {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header {
  @include thin-border(#f4f4f4, 0);
}
.bzj-body {
  padding: 25px;
  flex: 1;
  background-color: #ffffff;
  .bzj-info {
    width: 327px;
    height: 85px;
    box-sizing: border-box;
    background-image: url('../../assets/image/hh-icon/a0-auction/bzj-bg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    padding: 12px 15px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span.left {
      font-size: 19px;
      color: #854110;
    }
    span.num {
      font-size: 24px;
      color: #854110;
      font-weight: 600;
    }
  }
  .tips {
    font-size: 12px;
    color: #c4895d;
    margin-top: 11px;
  }
  .rules {
    display: flex;
    align-items: center;
    margin-top: 60px;
    padding: 0 10px;
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
      span {
        font-size: 12px;
        color: #552e20;
      }
    }
  }
  .btn-wrapper {
    margin: 20px 0;
    .button {
      display: block;
      width: 100%;
      @include button($margin: 0, $radius: 2px, $spacing: 1px);
    }
  }
}
</style>

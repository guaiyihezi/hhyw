<template>
  <div class="top-wrapper">
    <div class="nav-item">
      <img
        src="../../../assets/image/hh-icon/f0-profile/icon-setting.png"
        @click="goSetting"
        v-stat="{ id: 'profile_setting' }"
      />
      <div class="right-tool-wrapper">
        <div class="msg-wrapper" @click="goMessage" v-stat="{ id: 'profile_message' }">
          <div class="red" v-if="isOnline && isRead"></div>
          <img src="../../../assets/image/hh-icon/f0-profile/icon-message@2x.png" />
        </div>
        <img
          class="icon-share"
          src="../../../assets/image/hh-icon/f0-profile/icon-share@2x.png"
          @click="goShare"
          v-if="isHHApp"
          v-stat="{ id: 'profile_share' }"
        />
      </div>
    </div>
    <div class="top-info-wrapper">
      <div class="info-wrapper" @click="goProfileInfo">
        <div class="avatar-wrapper">
          <img class="avatar" v-if="isOnline && user && user.avatar" v-bind:src="user.avatar" />
          <img class="avatar" v-else src="../../../assets/image/hh-icon/f0-profile/icon-head.png" />
        </div>
        <label class="nickname">{{ nickname }}</label>
        <img
          class="icon-more"
          src="../../../assets/image/hh-icon/f0-profile/icon-more.png"
          alt=""
          v-if="isHHApp && AppVersion >= 31"
        />
      </div>
      <div class="count-wrapper" :class="{ 'only-two': !isHbUser }">
        <div class="count-wrapper-item" @click="goAccount" v-stat="{ id: 'profile_balance' }">
          <div class="count">{{ utils.formatFloat(userMoney) }}</div>
          <div class="title">账户余额</div>
        </div>
        <div class="count-wrapper-item" @click="goExchangeHD" v-stat="{ id: 'profile_tokenBalance' }">
          <div class="count">{{ utils.formatFloat(currentTokenHD) }}</div>
          <div class="title">浣豆</div>
        </div>
        <div class="count-wrapper-item" @click="goExchangeDebt" v-if="isHbUser" v-stat="{ id: 'profile_debtBalance' }">
          <div class="count">{{ currentBalance }}</div>
          <div class="title">权益积分</div>
        </div>
        <div class="count-wrapper-item" @click="goCoupon" v-stat="{ id: 'profile_coupon' }">
          <div class="count">{{ utils.formatFloat(coupon) }}</div>
          <div class="title">优惠券</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { balanceGet } from '../../../api/balance'
import { couponNumber } from '../../../api/coupon'
import { unReadMsg } from '../../../api/message'
import { ENUM } from '../../../const/enum'
export default {
  name: 'ProfileUserInfo',
  data() {
    return {
      coupon: 0
    }
  },

  created() {
    this.getBalance()
    this.getCouponNumber()
    if (this.isOnline) this.checkUnReadMsg()
  },

  props: ['userMoney'],

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user,
      currentBalance: state => state.balance.currentBalance,
      currentTokenHD: state => state.balance.currentTokenHD,
      isRead: state => state.auth.hasUnReadMsg
    }),
    ...mapGetters({
      isHbUser: 'isHbUser'
    }),
    AppVersion() {
      let appVersion = this.hhApp.getAppVersion()
      appVersion = parseInt(appVersion.replace(/\./g, ''))
      return appVersion
    },
    nickname() {
      let title = '登录/注册'
      if (this.isOnline) {
        if (this.user && typeof this.user != 'undefined' && JSON.stringify(this.user) != '{}') {
          title = this.user.nickname
          title = this.utils.formatPhone(title)
        }
      }
      return title
    }
  },

  methods: {
    ...mapMutations({
      saveCurrentBalanceState: 'saveCurrentBalanceState',
      saveCurrentTokenHDState: 'saveCurrentTokenHDState'
    }),
    ...mapActions({
      checkUnReadMsg: 'checkUnReadMsg'
    }),
    goSetting() {
      if (this.isOnline) {
        this.$router.push({ name: 'setting' })
      } else {
        this.showLogin()
      }
    },
    goMessage() {
      if (this.isOnline) {
        this.$router.push({ name: 'message' })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    goShare() {
      this.hhApp.share(
        '可以用权益抵现的购物商城，更多优选好货，超值特价活动，给你想不到的优惠！',
        this.utils.app_icon,
        'all',
        'hh-app-share',
        '换换商城-有权益 更便宜',
        encodeURIComponent(`${location.origin}${location.pathname}#/downloadapp`),
        '商城分享'
      )
    },

    goProfileInfo() {
      if (this.isOnline) {
        if (this.isHHApp && this.AppVersion >= 31) {
          this.hhApp.openAppPage('hhmall://userInfo')
        }
      } else {
        this.showLogin()
      }
    },

    goAccount() {
      this.$router.push({ name: 'HuankeAccount' })
    },

    goExchangeHD() {
      if (this.isOnline) {
        this.$router.push({ name: 'BondHD' })
      } else {
        this.showLogin()
      }
    },

    goExchangeDebt() {
      if (this.isOnline) {
        this.$router.push({ name: 'bond' })
      } else {
        this.showLogin()
      }
    },

    /**
     * 获取账户浣豆
     */
    getBalance() {
      balanceGet(this.isHbUser ? 'userCenter' : '').then(
        res => {
          this.saveCurrentBalanceState(res.surplus)
          this.saveCurrentTokenHDState(res.token_all)
        },
        error => {}
      )
    },
    // 获取优惠券数量
    getCouponNumber() {
      couponNumber().then(
        res => {
          this.coupon = res.number
        },
        error => {}
      )
    },
    goCoupon() {
      if (this.isOnline) {
        this.$router.push({ name: 'coupon' })
      } else {
        this.showLogin()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-wrapper {
  flex: none;
  height: 190px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  background: url($ProfileHeadPath) no-repeat #fff;
  background-size: 100% auto;
}
.nav-item {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 18px;
    height: 18px;
  }
  .right-tool-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    .msg-wrapper {
      position: relative;
      width: 18px;
      height: 18px;
      overflow: visible;
      .red {
        position: absolute;
        top: -1px;
        right: -1px;
        @include wh(7px, 7px);
        border-radius: 50%;
        background-color: #9b210b;
      }
    }
    .icon-share {
      margin-left: 24px;
    }
  }
}
.top-info-wrapper {
  height: 129px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 11px 0px rgba(198, 150, 94, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .info-wrapper {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
  }
  .avatar-wrapper {
    margin-left: 18px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .nickname {
    font-size: 20px;
    font-weight: bold;
    color: rgba(64, 64, 64, 1);
    line-height: 24px;
    margin-left: 10px;
  }
  .icon-more {
    width: 5px;
    height: 5px;
    margin-left: 8px;
  }
  .count-wrapper {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    &.only-two {
      padding: 0 15px;
    }
  }
  .count-wrapper-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & + .count-wrapper-item {
      @include thin-left-border(rgba(85, 46, 32, 0.2), 0, auto, true);
    }
    .count {
      font-size: 16px;
      font-weight: bold;
      color: rgba(64, 64, 64, 1);
      line-height: 19px;
    }
    .title {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-top: 2px;
    }
  }
}
</style>

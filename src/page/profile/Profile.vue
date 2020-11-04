<template>
  <div class="container scroll-container-keepAlive">
    <!-- 用户信息 -->
    <profile-user-info :userMoney="user_money" ref="userinfo"></profile-user-info>

    <!-- 常住公告（components/common/RollingLine） -->
    <festival-banner v-if="false"></festival-banner>

    <!-- 我的订单 -->
    <profile-order></profile-order>

    <!-- 广告位 -->
    <ad-banner
      :img="require('../../assets/image/hh-icon/b0-home/new-year-2020.png')"
      url="https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Flvxing_wap"
    ></ad-banner>

    <!-- 店主专区 -->
    <profile-shopkeeper
      :unpayCount="unpay_count"
      :rebateCount="rebate_count"
      :sharepayCount="sharepay_count"
    ></profile-shopkeeper>

    <profile-service></profile-service>

    <!-- 为你推荐 -->
    <recommend-list :params="recommendParams" :scrollDom="'container'"></recommend-list>
  </div>
</template>

<script>
import ProfileUserInfo from './child/ProfileUserInfo'
import ProfileOrder from './child/ProfileOrder'
import ProfileShopkeeper from './child/ProfileShopkeeper'
import ProfileService from './child/ProfileService'
import FestivalBanner from './child/FestivalBanner'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { balanceGet } from '../../api/balance'
import { huanAccount } from '../../api/huanhuanke'
import { bondGet } from '../../api/bond'
import { ENUM } from '../../const/enum'
import RecommendList from '../recommend/RecommendList'
import AdBanner from '../../components/common/AdBanner'

export default {
  name: 'profile',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isOnline) {
        vm.$router.replace({ name: 'login', params: {} })
      }
    })
  },
  data() {
    return {
      unpay_count: 0, //分销返佣未支付订单数
      rebate_count: 0, //已返佣订单数
      sharepay_count: 0, //代付笔数
      user_money: 0, //账户总额

      recommendParams: {}
    }
  },
  watch: {
    hasChange() {
      this.getUserProfile()
    },
    counterForTabRefresh(value) {
      // App Tabbar切换时 监听以更新数据
      this.appInit()
    }
  },
  components: {
    ProfileUserInfo,
    ProfileOrder,
    ProfileShopkeeper,
    ProfileService,
    RecommendList,
    AdBanner,
    FestivalBanner
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      hasChange: state => state.profile.hasChange,
      currentBalance: state => state.balance.currentBalance,
      counterForTabRefresh: state => state.app.counterForTabRefresh
    })
  },
  created: function() {
    if (this.isOnline) {
      this.appInit()
    }
  },
  methods: {
    ...mapMutations({
      saveCurrentBalanceState: 'saveCurrentBalanceState',
      saveInternal: 'saveInternal',
      saveCurrentBondState: 'saveCurrentBondState'
    }),
    ...mapActions({
      fetchOrderSubtotal: 'fetchOrderSubtotal',
      syncUserInfo: 'syncUserInfo'
    }),
    appInit() {
      this.getUserProfile()

      this.fetchOrderSubtotal()

      balanceGet().then(
        res => {
          this.saveCurrentBalanceState(res.surplus)
        },
        error => {}
      )

      // 换换客消息数量
      this.getHuanMessageCount()

      // itz剩余可兑换债权
      bondGet().then(res => {
        this.saveCurrentBondState(res)
      })

      if (this.$refs.userinfo) {
        this.$refs.userinfo.getCouponNumber()
      }
    },
    getUserProfile() {
      this.syncUserInfo()
    },
    // 换换客消息数量
    getHuanMessageCount() {
      huanAccount(ENUM.HUANKE_STATUS.ALL).then(
        res => {
          this.unpay_count = res.unpay_count
          this.rebate_count = res.rebate_count
          this.user_money = Number(res.user_money) + Number(res.frozen_money)
          this.sharepay_count = res.sharepay_count
          this.saveInternal(res.allow_rebate)
        },
        error => {
          console.log(error)
        }
      )
    },
    showLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: $mainbgColor;
  height: auto;
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<template>
  <div id="app">
    <div class="app">
      <div class="page-container" :class="containerClass">
        <keep-alive :include="keepAliveInclude" :max="10">
          <router-view :key="routeKey"></router-view>
        </keep-alive>
      </div>

      <v-auth-popup v-if="showAuthPopup" :isShowauth="showAuthPopup"></v-auth-popup>

      <template v-if="activityTabBarSwitch">
        <v-tab-bar-activity v-if="isShowTabBar" ref="bar"></v-tab-bar-activity>
      </template>
      <template v-else>
        <v-tab-bar v-if="isShowTabBar" ref="bar"></v-tab-bar>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import tabBar from './components/common/Tabbar'
import ItouziAuthPopup from './components/common/ItouziAuthPopup'

import { activity_tabar as config_activity } from './config/activity'
import tabbarActivity from './components/common/TabbarActivity'
import { sendBuryingPointInfo } from './api/buryingPoint'
import viewportUnits from './assets/js/vw.js'

// 自动更新客户端前端旧代码
import autoRefresh from './util/autoRefresh'

export default {
  name: 'app',
  components: {
    'v-tab-bar': tabBar,
    'v-tab-bar-activity': tabbarActivity,
    'v-auth-popup': ItouziAuthPopup
  },
  data() {
    return {
      activityTabBarSwitch: false,
      routeKey: this.$route.fullPath // 主要是相同路由间跳转时强制更新组件（完整地触发组件的生命周期钩子），参见：https://cn.vuejs.org/v2/api/#key
    }
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user,
      showAuthPopup: state => state.itouzi.showAuthPopup,
      isHHAppTop: state => state.app.isHHAppTop,
      keepAliveInclude: state => state.keepAlive.include,
      isHHAppBridgeReady: state => state.app.isHHAppBridgeReady,
      cartNumber: state => state.tabBar.cartNumber, // 购物车内商品总数
      counterForTabRefresh: state => state.app.counterForTabRefresh // App Tabbar切换时 通知到H5的计数器
    }),
    isShowTabBar() {
      let show = this.$route.meta.isshowtabbar

      // App原生 v0.4.0开始 底部tabBar有原生
      if (this.isHHAppBridgeReady && this.AppVersion >= 40) {
        show = false
      }
      return show
    },
    containerClass() {
      return {
        bottom: this.isShowTabBar
      }
    }
  },
  created: function() {
    this.saveAuthInfo()
    this.setCookieFromToken()
    let name = this.$route.name
    if (name) {
      this.changeTabBar(name)
    }

    this.updateActivityTabBarSwitch()

    // 初始化埋点
    sendBuryingPointInfo({
      click_position: 'app_restart'
    })

    if (this.isOnline) {
      this.fetchCartNumber()
      this.helperItzAuthCheck()
      // 检查是否有未读消息
      this.checkUnReadMsg()
    }
  },

  watch: {
    $route(to, from) {
      // 路由改变发起重置
      this.resetStates()
      this.changeTabBar(to.name)

      if (this.$matomo) {
        // matomo 用户行为推送
        this.$matomo.setCustomUrl(to.fullPath)
        this.$matomo.trackPageView(to.meta.title || to.meta.component_title)
      }

      this.routeKey = this.$route.fullPath
    },
    isHHAppTop(newv, oldv) {
      // 为避免频繁调用bridge.isTop方法，故在watch中处理
      this.isHHApp && this.hhApp.isTop(newv)
    },
    cartNumber(value) {
      // 购物车内商品总数发生变化时 通知 App
      if (this.isHHApp && this.AppVersion >= 40) {
        this.hhApp.cartChanged(value)
      }
    },
    counterForTabRefresh(value) {
      // ！！！App由其他Webview切回一级页面时 页面并不刷新，会出现localStorage数据与组件store数据不同步的情况，需要及时更新一些数据
      if (this.isOnline) {
        // 购物车数量
        this.fetchCartNumber()
        // 未读消息
        this.checkUnReadMsg()
      }
    }
  },
  mounted() {
    window.onload = () => {
      // vw兼容
      viewportUnits.viewportUnitsBuggyfill.init({
        hacks: viewportUnits.viewportUnitsBuggyfillHacks
      })
      this.utils.setReportUser(this.isOnline ? this.user.id : null)
    }
    // 自动更新旧的前端代码
    process.env.NODE_ENV === 'production' && autoRefresh()
  },
  methods: {
    ...mapMutations({
      saveToken: 'saveToken',
      clearToken: 'clearToken',
      changeTabBar: 'changeTabBar',
      setCookieFromToken: 'setCookieFromToken'
    }),
    ...mapActions({
      resetStates: 'resetStates',
      fetchCartNumber: 'fetchCartNumber',
      helperItzAuthCheck: 'helperItzAuthCheck',
      checkUnReadMsg: 'checkUnReadMsg'
    }),
    goBack() {
      this.$_goBack()
    },
    saveAuthInfo() {
      let location = window.location
      let references = this.utils.getUrlKey(location.href, 'u')
      if (references) {
        this.utils.setCookie('r', references)
      }
      let token = this.utils.getUrlKey(location.href, 'token')
      if (token) {
        this.utils.setCookie('t', token)
        this.saveToken(token)
      }
    },
    updateActivityTabBarSwitch() {
      const time = new Date().getTime()
      const startTime = config_activity.startTime
      const endTime = config_activity.endTime
      // 开始前剩余时间
      const preRestTime = startTime - time
      // 距离活动结束时间
      const beforeEndTime = endTime - time
      // 一个小时
      const oneHourMs = 3600000

      // 【活动开始前】1小时内进入App，‘倒计时’查看是否到了活动开始时间
      if (config_activity.switch && preRestTime > 0 && preRestTime <= oneHourMs) {
        this.utils.timeSync({
          beginTime: time,
          endTime: startTime,
          iterator: timeObj => {
            const rest = timeObj.timeEnd - timeObj.timeNow
            if (rest < 20000) {
              setTimeout(() => {
                this.activityTabBarSwitch = true
              }, rest)
            }
          }
        })
        return
      }
      // 【活动进行中】
      if (config_activity.switch && time >= startTime && time < endTime) {
        this.activityTabBarSwitch = true
        // 【活动开始后】距离结束1小时内进入App，‘倒计时’查看是否到了活动结束时间
        if (beforeEndTime <= oneHourMs) {
          this.utils.timeSync({
            beginTime: time,
            endTime: endTime,
            iterator: timeObj => {
              const rest = timeObj.timeEnd - timeObj.timeNow
              if (rest < 20000) {
                setTimeout(() => {
                  this.activityTabBarSwitch = false
                }, rest)
              }
            }
          })
        }
        return
      }
      // 【活动已结束】
      if (config_activity.switch && beforeEndTime <= 0) {
        this.activityTabBarSwitch = false
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
  height: 100%;
  overflow-x: hidden;

  .page-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;

    &.bottom {
      bottom: 48px;
    }
  }
}
</style>

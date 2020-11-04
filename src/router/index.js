import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import routes from './router'
import utils from '../util/util'

import { tabBarRouteName, getQuery, getTabSchema } from './util'

import { sendBuryingPointInfo } from '../api/buryingPoint'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
  // 百度统计 - 路由PV推送
  if (to.path) {
    window._hmt.push(['_trackPageview', '/#' + to.fullPath])
  }

  // sentry
  const $sentry = Vue.prototype.$sentry
  $sentry &&
    $sentry.configureScope(scope => {
      scope.setTag('url', to.fullPath)
      const toTitle = to.meta.title || to.meta.component_title
      if (toTitle) {
        scope.setTag('title', toTitle)
      }
    })

  // ****
  if (to.name == 'payment' || to.name == 'login') {
    const code = utils.getUrlKey(location.href, 'code')
    if (code) {
      const reg = new RegExp(`code=${code}&?`)
      const newHref = location.href.replace(reg, '')
      utils.setCookie('wx_code', code)
      window.location.href = newHref
      return
    }
  }

  // 正常情况下根据meta.isshowtabbar 判断是否展示底部TabBar，but有些页面需要动态展示（像cart购物车页面 若是从商品详情进入购物车就没有底部Tabbar），
  // 则可以设置meta.setIsShowTabBar，并在下边根据params中的该参数的值来来重置meta.isshowtabbar（参考./router.js中cart），
  // !!! 在业务代码中只需根据 meta.isshowtabbar 来判断即可，不要在业务代码中使用 meta.setIsShowTabBar 对应的params参数
  let metaData = to.meta
  if (metaData.setIsShowTabBar) {
    for (const key in to.params) {
      if (key == metaData.setIsShowTabBar) {
        metaData.isshowtabbar = parseInt(to.params[metaData.setIsShowTabBar])
      }
    }
  }

  // App 进入新页面时内重置 isTop
  const rootApp = router.app
  if (rootApp.isHHApp) {
    store.commit('SET_IS_TOP', false)
  }

  // App原生登录
  if ('login' == to.name && rootApp.isHHApp && rootApp.AppVersion >= 31) {
    rootApp.hhApp.openAppPage('hhmall://login')
    return
  }

  // -------------------- 原生v0.4.0 开始 判断打开原生页面还是h5页面
  // 判断从外部页面进来的（如 静态运营页）
  const isFromOut = !from.name
  let shouldBreak = false
  if (rootApp.isHHApp && rootApp.AppVersion >= 40) {
    // App原生页
    switch (to.name) {
      // 商品列表
      // 暂时使用h5页面 2020.01.20
      /*case 'products':
        rootApp.hhApp.openAppPage(encodeURIComponent(`hhmall://goodsList${getQuery(to.fullPath, 'products')}`))
        shouldBreak = true
        break*/
      // 搜索页
      /*case 'search':
        rootApp.hhApp.openAppPage('hhmall://searchGoods')
        shouldBreak = true
        break*/
      // 商家首页
      // 暂时使用h5页面 2020.01.20
      /*case 'Supplier':
        rootApp.hhApp.openAppPage(encodeURIComponent(`hhmall://storeDetail${getQuery(to.fullPath)}`))
        shouldBreak = true
        break*/
      // 地址管理
      case 'addressManage':
        rootApp.hhApp.openAppPage('hhmall://addressManage')
        shouldBreak = true
        break
      // 个人设置
      case 'setting':
        rootApp.hhApp.openAppPage('hhmall://setting')
        shouldBreak = true
        break
      // 我的订单
      // case 'order':
      //   rootApp.hhApp.openAppPage(encodeURIComponent(`hhmall://orderList?index=1`))
      //   shouldBreak = true
      //   break
      default:
        shouldBreak = false
    }
    if (shouldBreak) {
      if (isFromOut) {
        // 返回至原页面
        window.history.go(-1)
      }
      return
    }

    // 一级（tabBar）跳二级页时，须打开新webView
    if (
      (['home', 'category', 'myStore', 'profile'].includes(from.name) ||
        // 一级购物车页面
        ('cart' == from.name && from.meta.isshowtabbar)) &&
      !['home', 'category', 'myStore', 'cart', 'profile'].includes(to.name)
    ) {
      rootApp.hhApp.openNewPage(`${location.origin}${location.pathname}#${to.fullPath}`)
      return
    }
    // 跳 一级页面时，通过app 原生 打开
    if (from.name && ['home', 'category', 'myStore', 'profile'].includes(to.name)) {
      rootApp.hhApp.openAppPage(getTabSchema(to))
      return
    }
  }
  // -------------------- 原生v0.4.0 end

  next()
})

router.afterEach((to, from) => {
  document.title = (to.meta.title ? to.meta.title + '-' : '') + '换换商城'

  // --- start 通过压栈方式 判断是前进还是后退
  const routerStack = store.getters.routerStack
  if (to.fullPath === routerStack[routerStack.length - 1]) {
    console.log('后退')
    // 后退
    store.commit('popRouterStack')
    store.commit('popInclude', from.name)
  } else {
    console.log('前进')
    // 前进
    if ('/' !== from.fullPath) {
      store.commit('pushRouterStack', from.fullPath)
    }
    store.commit('pushInclude', to.name)
  }
  // --- end
  // --- tabBar切换货tab进入login时 强制清除from的keepAlive缓存
  if (tabBarRouteName.includes(from.name) && (tabBarRouteName.includes(to.name) || 'login' === to.name)) {
    store.commit('popInclude', from.name)
  }

  // pv
  /**获取到的document.location.href为上一个页面的url，两种解决方案
   * 1. 通过定时器，过1s后获取url，然后向后台发送pv信息
   * 2. 通过字符串拼接，document.location.origin + '/#' + to.fullPath
   */
  const params = {
    click_position: 'pv',
    url: document.location.origin + '/h5/#' + to.fullPath,
    referer: document.location.origin + '/h5/#' + from.fullPath
  }
  sendBuryingPointInfo(params)
})

export default router

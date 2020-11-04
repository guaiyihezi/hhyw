import Vue from 'vue'
import store from '../store/index'
import hhApp from '../assets/js/hhApp-bridge'
import utils from './util'

// for Test
// import { Toast } from 'mint-ui'

// 换换易物App js-bridge
Vue.prototype.hhApp = hhApp
// 换换易物App 腾讯应用宝下载地址
Vue.prototype.hhAppUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.huanhuanyiwu.mall&fromcase=40003'
// 是否 换换易物App
Vue.prototype.isHHApp = window.navigator.userAgent.indexOf('_HHMALL_') > -1 ? true : false

if (Vue.prototype.isHHApp) {
  const version = (Vue.prototype.AppVersion = utils.getHhAppVersion())
  // 0.4.0版本开始可以【同步】从app存储中读取数据
  if (version >= 40) {
    let user_info = hhApp.getData('user_info')
    if (user_info) {
      user_info = JSON.parse(user_info)

      // for Test
      // Toast('get user_info sucess')

      store.commit('signin', { token: user_info.token, user: user_info.user })
      store.dispatch('helperItzAuthCheck')
    }
  }

  // 给 0.4.0 以下版本用
  hhApp._ready_().then(() => {
    // 保存bridge已经ready的信息至store，理论上业务代码中应该使用该store来判断HHApp是否ready
    store.commit('SET_HHAPP_IS_READY', true)
  })
}

import Vue from 'vue'

import 'babel-polyfill'

import Mint from 'mint-ui'

import App from './App.vue' // app 容器
import router from './router/index'

import store from '../../store/index'

import utils from '../../util/util'
import '../../util/mixin_handleGoBack'

// App bridge相关处理
import '../../util/appBridgeReady'

import $cookie from 'js-cookie'

import 'mint-ui/lib/style.css'
import '../../assets/style/reset.scss'
import '../../assets/style/common.scss'
import '../../assets/style/my-mint.scss'
import '../../assets/style/font.scss'

// 注册全局公用组件
import '../../components/common'
// vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.use(Mint)

Vue.prototype.utils = utils
Vue.prototype.$cookie = $cookie

// 将时间戳转成日期
Vue.filter('convertTime', function(timeStamp) {
  return utils.formatDate('YYYY-MM-DD HH:mm:ss', timeStamp)
})
// 将时间戳转成日期
Vue.filter('convertTimeToDay', function(timeStamp) {
  return utils.formatDate('YYYY-MM-DD', timeStamp)
})
// 金额格式化
Vue.filter('formatMoney', function(value) {
  return utils.formatMoney(value, false)
})

//埋点
import '../../util/directive_buryPoint'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#appOperation')


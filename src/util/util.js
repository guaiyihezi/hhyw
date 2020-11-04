import Vue from 'vue'
import Accounting from 'accounting'
import Dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Cookies from 'js-cookie'
import { Toast } from 'mint-ui'
import hhApp from '../assets/js/hhApp-bridge.js'

// 支持 UTC 时间操作
Dayjs.extend(utc)

export default {
  // 换换logo（分享时可用于默认图片）
  app_icon: 'https://static.itzcdn.com/app/hhmall_res/app_icon.png',
  activityNameTmp: '玩转六一',
  getDomainA: {
    domain: document.domain
      .split('.')
      .slice(-2)
      .join('.')
  },

  /* ios 新版本提审 隐藏竞拍 */
  forIOSCheck() {
    return 1 == this.getOpenBrowser() && this.getHhAppVersion() == 56
  },
  checkTextIsAuction(text) {
    return /竞拍/g.test(text)
  },

  /**
   * localstrage
   */
  fetch(key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  save(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },

  /**
   *  arrayUnique: 数组去重
   */
  arrayUnique(arr) {
    return Array.from(new Set(arr))
  },

  /**
   * @param start  开始字符展示位置
   * @param end 结束字符展示位置
   * @param target 目标字符
   */
  replaceStr(target, start, end, length) {
    let str = ''
    if (start) {
      str = target.substr(start, length) + '***'
    } else if (end) {
      str = '***' + target.substr(end, length)
    } else {
      str = target.substr(0, 1) + '***' + target.substr(target.length - 1, 1)
    }
    return str
  },

  /**
   * Cookie
   */
  getCookie(key) {
    return Cookies.get(key)
  },
  setCookie(key, val, options) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    return Cookies.set(key, val, options)
  },
  removeCookie(key, options) {
    return Cookies.remove(key, options)
  },

  /**
   * fmt 显示的格式
   * date 日期
   */
  formatDate(format, date) {
    if (!date || date <= 0) {
      return ''
    }
    return Dayjs(date ? date * 1e3 : Date.now()).format(format)
  },

  /**
   * 将时间戳转换为 格式化的 北京时间
   */
  formatToBJDate(format, timestamp) {
    // + 8 *60 *60 为北京时间
    return Dayjs(timestamp + 28800000)
      .utc()
      .format(format)
  },

  /**
   * 根据当前时区，将时间戳转成人性化日期（当天 显示 时分，当年显示月日+时分 else 年 + 月日 + 时分）
   * date 日期时间戳 秒
   */
  formatDateLocal(date) {
    if (!date || date <= 0) {
      return ''
    }

    date = date * 1000
    // 是否 当天
    const today = new Date()
    const day_start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0).getTime()
    const day_end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime()
    if (date >= day_start && date <= day_end) {
      return Dayjs(date).format('HH:mm')
    }
    // 是否 当年
    const year_start = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0).getTime()
    const year_end = new Date(today.getFullYear() + 1, 0, 1, 0, 0, 0, 0).getTime() - 1
    if (date >= year_start && date <= year_end) {
      return Dayjs(date).format('MM-DD HH:mm')
    }

    return Dayjs(date).format('YYYY-MM-DD HH:mm')
  },

  /**
   * 转为千分位
   * keepDecimal 为真时保留小数点最后的0
   */
  formatMoney(price, keepDecimal) {
    price = Accounting.formatNumber(price, 2)
    if (!keepDecimal) {
      price = price.replace(/(\.00|0)$/, '')
    }
    return price
  },

  /**
   * 格式化浮点数
   * noDecimal 为真时去除小数点最后的0
   */
  formatFloat(float = 0, noDecimal = true) {
    if (isNaN(float)) {
      console.error('Not a Number! >>> util.formatFloat')
      float = 0
    }
    float = Number(float).toFixed(2)
    if (noDecimal) {
      float = float.replace(/(\.00|0)$/, '')
    }
    return float
  },

  /**
   * 前面补0
   */
  padLeftZero(str) {
    if (str >= 10) {
      return str
    }
    str = String(str)
    return ('00' + str).substr(str.length)
  },

  /**
   * 手机号脱敏
   */
  formatPhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },

  /**
   * 取得URL中的某参数
   */
  getUrlKey(url, name) {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || ['', ''])[1].replace(/\+/g, '%20')
      ) || null
    )
  },

  /**
   * getOpenBrowser: 获取打开的设备
   * ua : 1-ios ; 2-andriod ; 3-PC
   */
  getOpenBrowser() {
    let browser = {
      versions: (function() {
        var u = navigator.userAgent,
          app = navigator.appVersion
        return {
          //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        }
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    let returnUa = undefined
    if (browser.versions.mobile) {
      //判断是否是移动设备打开。
      let ua = navigator.userAgent.toLowerCase() //获取判断用的对象
      //在微信中打开
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      }
      //在新浪微博客户端打开
      if (ua.match(/WeiBo/i) == 'weibo') {
      }
      //在QQ空间打开
      if (ua.match(/QQ/i) == 'qq') {
      }
      //是否在IOS浏览器打开
      if (browser.versions.ios) {
        returnUa = 1
      }
      //是否在安卓浏览器打开
      if (browser.versions.android) {
        returnUa = 2
      }
    } else {
      //否则就是PC浏览器打开
      returnUa = 3
    }
    return returnUa
  },

  stopPrevent(event) {
    let e = event || window.event
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      window.event.returnValue = false //IE
    }
  },

  fillTheScreen(obj) {
    const isWX = /micromessenger/.test(navigator.userAgent.toLowerCase())
    // why? document.documentElement.clientHeight - document.documentElement.offsetHeight
    let height = isWX ? document.documentElement.clientHeight : document.documentElement.offsetHeight
    if (!obj.target || !obj.totalHeight) return
    height = 1 - obj.totalHeight / height
    obj.target.style.height = height * 100 + 'vh'
  },

  // requestAnimationFrame
  requestAnimationFrame() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame
    )
  },
  /**
   * 节流（控制function在高频操作中 以一定的频率触发）{例如监听 scroll 事件}，下边的实现 直接使用requestAnimationFrame保证触发频率>=16.7ms
   * 防抖（控制function在高频操作 结束后触发{如根据用户输入即时计算反馈}，若在wait时间内未操作，才可触发fuc）
   */
  throttle(func) {
    var ticking = false
    var raf = this.requestAnimationFrame()

    return function() {
      if (!ticking) {
        ticking = true

        raf(function() {
          ticking = false
          func()
        })
      }
    }
  },
  debounce(func, wait) {
    var timeout
    return function() {
      clearTimeout(timeout)
      // 指定 xx ms 后触发真正想进行的操作 handler
      timeout = setTimeout(func, wait)
    }
  },

  /**
   * beginAt 开始时间（时间戳）
   * endAt 结束时间（时间戳）
   */
  activityStatus(beginAt, endAt) {
    let status = -1 // (0: 未开始；1: 进行中；2: 已过期)
    let timestamp = Date.parse(new Date()) / 1000
    if (beginAt > timestamp) {
      status = 0
    } else if (timestamp > beginAt && timestamp < endAt) {
      status = 1
    } else if (timestamp > endAt) {
      status = 2
    }
    return status
  },

  /**
   * interval 时间间隔（单位为s）
   * 把秒数换为*天*时*分*秒的时间格式
   */
  formatTimeInterval(interval) {
    const day = parseInt(interval / 60 / 60 / 24)
    const hour = parseInt((interval / 60 / 60) % 24)
    const minute = parseInt((interval / 60) % 60)
    const second = interval % 60

    const showDay = day > 0
    const showHour = showDay || hour > 0
    const showMinute = showHour || minute > 0

    const format =
      (showDay ? day + ' 天 ' : '') +
      (showHour ? hour + '  小时 ' : '') +
      (showMinute ? minute + ' 分 ' : '') +
      second +
      ' 秒'
    return format
  },

  /**
   * getunreadCount: 获取未读消息数
   */
  getunreadCount(zhiManager, scoped, key) {
    zhiManager.on('unread.count', function(data) {
      console.log(data)
    })
    zhiManager.on('receivemessage', function(ret) {
      scoped.key = ret
      console.log(ret)
    })
  },
  /**
   * 编辑uri中get参数
   */
  updateGetParameter(uri, key, value) {
    if (!value) {
      return uri
    }
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
    var separator = uri.indexOf('?') !== -1 ? '&' : '?'
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2')
    } else {
      return uri + separator + key + '=' + value
    }
  },

  /**
   * 拆分商品价个、免限额的金额前端
   */
  splitMoneyLint(data, type) {
    if (Array.isArray(data)) {
      data.forEach((val, key) => {
        this.splitMoneyLint(data[key], type)
      })
    } else if (data) {
      let name = type ? type : 'current_price'
      data.HB_SHOW = data.money_line
      if (data.HB_SHOW == -1 || Number(data.HB_SHOW) > Number(data[name])) {
        data.HB_SHOW = data[name]
      }
      data['MONEY_SHOW'] = data[name] - data.HB_SHOW
    }
    return data
  },
  /**
   * fromatArray: 格式化数组
   */
  fromatArray(delimiter, arrays) {
    let data = ''
    if (delimiter) {
      data = arrays.join(delimiter)
    }
    return delimiter ? data : arrays
  },
  // 获取deviceID
  getDeviceID() {
    let isHHApp = window.navigator.userAgent.indexOf('_HHMALL_') > -1 ? true : false
    let deviceID = ''
    if (isHHApp) {
      deviceID = this.getOpenBrowser() === 1 ? hhApp.getDeviceIDFA() : hhApp.getDeviceAndroidID()
    } else {
      deviceID = this.getOpenBrowser() === 1 ? 'ios' : this.getOpenBrowser() === 2 ? 'android' : 'pc'
    }
    return deviceID
  },
  // 获取换换易物App版本号 et: 040
  getHhAppVersion() {
    // 通过UA 获取App版本号
    const reg = /(\_HHMALL\_IOS\_|\_HHMALL\_ANDROID\_|\_HHMALL\_)([\d\.]+)/
    const ua = window.navigator.userAgent
    const versionStr = ua.match(reg) ? ua.match(reg)[2] : '0'

    return parseInt(versionStr.replace(/\./g, ''))
  },
  /**
   * 滚动动画
   * element：dom元素
   * to(px)：滚动到哪个位置
   * duration(ms): 动画时长
   */
  scrollTopAni(element, to, duration) {
    if (duration <= 0) {
      element.scrollTop = to
      return
    }

    const diff = to - element.scrollTop
    const perTick = (diff / duration) * 16.67
    const raf = this.requestAnimationFrame()

    const animationLoop = () => {
      if ((diff >= 0 && element.scrollTop >= to) || (diff <= 0 && element.scrollTop <= to)) return
      raf(() => {
        element.scrollTop += perTick
        animationLoop()
      })
    }
    animationLoop()
  },
  /**
   * [timeSync 心跳（折半）时间同步]
   * @param  {int}      beginTime   [当前时间]ms
   * @param  {int}      endTime     [结束时间]ms
   * @param  {function} synchFunc   [时间同步方法] 需要返回promise
   * @param  {function} iterator    [每次同步完时间要做的事]
   * @return undefined
   */
  timeSync({ beginTime, endTime, synchFunc, iterator }) {
    let obj = {
      timeEnd: endTime,
      timeNow: beginTime
    }
    const timeGap = function() {
      return obj.timeEnd - obj.timeNow
    }
    // 计时器
    let timer
    // 默认时间校准方式为获取本地 时间戳
    const timeSynch =
      synchFunc ||
      (() => {
        return Promise.resolve(new Date().getTime())
      })
    const timerFn = function() {
      // setTimeout 的最大延时时长 为 2147483647 (大约24.8 天)时就会溢出，导致定时器将会被立即执行
      const delayTime = timeGap() / 2
      if (delayTime >= 2147483647) {
        return Toast('前端倒计时超出最长时间：2147483647ms，请检查数据合法性')
      }
      timer = setTimeout(function() {
        clearTimeout(timer)
        timeSynch().then(res => {
          obj.timeNow = res
          iterator(obj)
          reSynch()
        })
      }, delayTime)
    }
    const reSynch = function() {
      const t = timeGap()
      // 10s 内就不再同步了
      t > 10000 && timerFn()
    }

    reSynch()

    const clearTimer = () => {
      if (timer) clearTimeout(timer)
    }

    return clearTimer
  },
  /**
   * 获取服务器时间 (ms)
   * return promise
   */
  getNowTime() {
    const requestUrl = window.location.href

    return new Promise((resolve, reject) => {
      // 发送请求的时间点
      const request_time = new Date().getTime()
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (4 == xhr.readyState) {
          // 收到回复的时间点
          const response_time = new Date().getTime()
          // 单程的网络耗时
          const network_time = (response_time - request_time) / 2

          // 服务器端给的时间点
          const t = (xhr.getResponseHeader('date') && new Date(xhr.getResponseHeader('date'))) || new Date()
          xhr.onreadystatechange = null
          /**
           * time 加入网络耗时后校准的服务器时间，
           * origin_time 未校准网络耗时的服务器时间
           */
          resolve({
            time: t.getTime() + network_time,
            origin_time: t.getTime()
          })
        }
      }
      xhr.open('HEAD', requestUrl, !0)
      xhr.send(null)
    })
  },

  // 使用canvas压缩图片并转换base64
  getImgToBase64(url, callback) {
    //将图片转换为Base64并压缩
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image()
    img.crossOrigin = 'Anonymous' //表示允许跨域
    img.onload = function() {
      var width = img.width // 图片原始宽度
      var height = img.height // 图片原始长度
      // 宽高比例
      var scale = width / height
      var widthResult = 375
      var heightResult = parseInt(widthResult / scale)
      canvas.height = heightResult // 转换图片像素大小
      canvas.width = widthResult
      // 将图片的（0, 0）坐标到(0 + width , 0+ height)坐标也就是整张图片 画到 canvas（0, 0）到（widthResult，heightResult）也就是整个canvas内
      //drawImage是canvas绘制图案的API
      ctx.drawImage(img, 0, 0, width, height, 0, 0, widthResult, heightResult) //drawImage是canvas绘制图案的API
      var dataURL = canvas.toDataURL('image/png', 0.7) //通过canvas获取图片的base64的URL
      callback(dataURL)
      canvas = null
    }
    img.src = url
  },

  /**
   * 指定时间点到来时 触发回调
   * params: targetTime: 目标时间 ms
   * return promise
   * TODO: 针对定时器的系统级处理方案？？？
   */
  async callWhenTimeComesTo(targetTime) {
    const timeNow = await this.getNowTime()
    await new Promise((resolve, reject) => {
      this.timeSync({
        beginTime: timeNow,
        endTime: targetTime,
        synchFunc: this.getNowTime,
        iterator: ({ timeNow, timeEnd }) => {
          const timeLeft = targetTime - timeNow <= 0 ? 0 : targetTime - timeNow
          if (timeLeft < 20000) {
            setTimeout(() => {
              resolve()
            }, timeLeft)
          }
        }
      })
    })
  },

  /**
   * 上报日志，配置信息
   */
  setReportUser(user_id) {
    const isGio = typeof window.gio !== 'undefined'
    const $sentry = Vue.prototype.$sentry
    const $matomo = Vue.prototype.$matomo
    $sentry &&
      $sentry.configureScope(scope => {
        const appVer = this.getHhAppVersion()
        if (appVer) {
          scope.setTag('app.ver', appVer)
        }
        scope.setTag('api.ver', process.env.VUE_APP_APPSERVER_VERSION)
      })
    // https://growingio.gitbook.io/docs/sdk-integration/web-js-sdk#12
    if (user_id === null) {
      isGio && window.gio('clearUserId')
      $sentry &&
        $sentry.configureScope(scope => {
          scope.setTag('signin', 'no')
        })
      $matomo && $matomo.resetUserId()
    } else {
      isGio && window.gio('setUserId', user_id)
      // sentry 用户ID
      $sentry &&
        $sentry.configureScope(scope => {
          scope.setUser({ id: user_id })
          scope.setTag('signin', 'yes')
        })
      // matomo 用户ID
      $matomo && $matomo.setUserId('UID' + user_id)
    }
  }
}

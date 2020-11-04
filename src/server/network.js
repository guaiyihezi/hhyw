import router from '../router/index'
import axios from 'axios'
import qs from 'qs'
import XXTEA from '../assets/js/xxtea'
import CryptoJS from 'crypto-js'
import utils from '../util/util'
import { Toast } from 'mint-ui'

import store from '../store/index'
import { ENUM } from '../const/enum'

const SIGN_KEY = 'arc4random()'
const ENCRYPT_KEY = 'getprogname()'
function getUserAgent() {
  let userAgent = ''
  let platform = 'Mozilla'
  const { width, height } = window.screen
  // if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isWeixin()) {
  //   platform = 'Wechat'
  // }
  var lang = navigator.systemLanguage ? navigator.systemLanguage : navigator.language
  userAgent =
    'Platform/' +
    platform +
    ', Device/' +
    utils.getDeviceID() +
    ', Lang/' +
    lang +
    ', ScreenWidth/' +
    width +
    ', ScreenHeight/' +
    height +
    ', GID/' +
    utils.getCookie('grwng_uid')
  return userAgent
}

// 超时时间
axios.defaults.timeout = 12e3

// 请求
axios.interceptors.request.use(
  config => {
    // loading + 1
    // store.dispatch('SetLoading', true)
    if (config.url[0] === '/' && !config.baseURL) {
      config.baseURL = process.env.VUE_APP_APPSERVER_HOST
    }
    if (config.baseURL === process.env.VUE_APP_APPSERVER_HOST) {
      config.withCredentials = true

      let token = null
      if (store.getters.token) {
        token = store.getters.token
      }
      config.headers['X-HH-Authorization'] = token
      config.headers['X-HH-UserAgent'] = getUserAgent()
      config.headers['X-HH-Ver'] = process.env.VUE_APP_APPSERVER_VERSION

      if (config.method !== 'get' && !(config.data instanceof FormData)) {
        let post_body = qs.stringify(config.data)

        if (process.env.VUE_APP_ENCRYPTED) {
          // timestamp: 客户端秒级时间戳
          let timestamp = Date.parse(new Date()) / 1000 + ''
          // sign: HMAC-SHA256( timestamp + post_body, SIGN_KEY )
          let sign = CryptoJS.HmacSHA256(timestamp + post_body, SIGN_KEY)
          // xSign格式: sign,timestamp
          let xSign = sign + ',' + timestamp
          config.headers['X-HH-Sign'] = xSign

          let encry_post_body = ''
          let body = null
          if (post_body && post_body.length) {
            encry_post_body = XXTEA.encryptToBase64(post_body, ENCRYPT_KEY)
            body = qs.stringify({ x: encry_post_body })
          }
          config.data = body
        } else {
          config.data = post_body
        }
      }
    }
    return config
  },
  error => {
    // loading 清 0
    // setTimeout(() => {
    //   store.dispatch('SetLoading', 0)
    // }, 300)

    return Promise.reject(error)
  }
)

// 响应
axios.interceptors.response.use(
  response => {
    if (response) {
      if (response.config.baseURL === process.env.VUE_APP_APPSERVER_HOST) {
        let newToken = response.headers && response.headers['x-hh-new-authorization']
        if (newToken) {
          store.commit('saveToken', newToken)
        }

        if (process.env.VUE_APP_ENCRYPTED) {
          // 加密
          if (response.data && response.data.data) {
            var raw = XXTEA.decryptFromBase64(response.data.data, ENCRYPT_KEY)
            var json = JSON.parse(raw)
            if (json) {
              delete response.data.data
              for (var key in json) {
                response.data[key] = json[key]
              }
            }
            logResponseParams(response)
            return response.data
          } else if (response.data && response) {
            let errorMessage = response.data.message
            let errorCode = response.data.code
            if (response.data.error) {
              // return response.data;
              logErrorInfo(response.config.url, errorCode, errorMessage)
              onAuthInvaild(errorCode, response.data)
              return Promise.reject({ errorCode: errorCode, errorMsg: errorMessage })
            }
          }
        } else {
          if (response) {
            if (response.data && (response.data.code === ENUM.ERROR_CODE.OK || !response.data.code)) {
              logResponseParams(response)
              if (response.data.info) {
                Toast(response.data.info)
              }
              return response.data.data
            } else {
              let errorMessage = response.data.info
              let errorCode = response.data.code
              let data = response.data.data || {}
              logErrorInfo(response.config.url, errorCode, errorMessage)
              onAuthInvaild(errorCode, response.data)
              return Promise.reject({ errorCode: errorCode, errorMsg: errorMessage, data: data })
            }
          }
        }
      } else if (response.data) {
        return response.data
      }
      return response
    } else {
      console.log('网络错误')
    }
  },
  error => {
    // loading - 1
    // store.dispatch('SetLoading', false)
    if (error.response) {
      error = error.response
      if (error.data) {
        error = error.data
      }
    }
    return Promise.reject(error)
  }
)

function logResponseParams(response) {
  if (process.env.NODE_ENV === 'development') {
    let str = JSON.stringify(response.data)
    console.groupCollapsed(
      '%c' + utils.formatDate('HH:mm:ss.SSS') + '%c请求' + response.config.url + '\n',
      'font-weight:normal;color:#fff;background:#35495e;padding:2px 7px;border-radius:3px 0 0 3px;',
      'font-weight:normal;color:#fff;background:#41b883;padding:2px 7px;border-radius:0 3px 3px 0;',
      str.length < 80 ? str : str.substring(0, 80) + '...'
    )
    console.count('SN')
    // console.info(response);
    response.config.data && console.log('%c参数\n', 'color:#aaa', response.config.data)
    console.log('%c响应\n', 'color:#aaa', response.data)
    console.groupEnd()
  }
}

function logErrorInfo(url, errorCode, errorMessage) {
  if (process.env.NODE_ENV === 'development') {
    console.log('request url is: ', url)
    console.log('网络错误, 错误代码:=' + errorCode + '错误信息:=' + errorMessage)
  }
}

function onAuthInvaild(errorCode, data) {
  if (errorCode == ENUM.ERROR_CODE.TOKEN_INVALID) {
    // 前端登录状态 退出
    store.commit('signout')
    if (router.app.isHHApp) {
      router.app.hhApp.logout()
    }

    // 是否须去往登录页
    const currentRoute = router.currentRoute
    if (currentRoute && currentRoute.name && !currentRoute.meta.noLogin) {
      router.app.$router.replace({ name: 'login' })
    }
  }
}

// 删除对象中的 undefined
function removeUndefinedProps(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && (obj[prop] === null || obj[prop] === undefined)) {
      delete obj[prop]
    }
  }
}

// 请求接口成功返回处理
function handleSuccess(resolve) {
  return res => {
    if (Object.prototype.toString.call(res) === '[object Object]') {
      // 若可以把对象转回简单的类型就转
      let keys = Object.keys(res)
      if (keys.length == 1 && 'scalar' in res) {
        // 后端返回非数组、对象的类型时，会自动转为对象并给予键值 scalar，影响的类型有: 布林、数字、字符串
        res = res['scalar']
      } else if (
        Object.keys(res).every(function(value, index) {
          return value == index
        })
      ) {
        // 后端返回非数组类型时，会自动转为对象
        res = Object.values(res)
      }
    }
    resolve(res)
  }
}

// 请求接口失败返回处理
function handleError(reject) {
  return error => {
    let ifToast = true
    // 是否须提示 接口返回的异常信息
    // 举例：首页有展示用户的未读消息，当客户端是登录状态，请求消息接口，服务端告知客户端用户token失效了，此时不应该弹出Toast提示
    const currentRoute = router.currentRoute
    if (
      error.errorCode == ENUM.ERROR_CODE.TOKEN_INVALID &&
      currentRoute &&
      (!currentRoute.name || currentRoute.meta.noLogin)
    ) {
      ifToast = false
    }

    if (ifToast) {
      error.toastObj = Toast(
        /^\<\!DOCTYPE/.test(error)
          ? '网络繁忙，请稍后重试' // 接口代码报错
          : error.errorMsg
          ? error.errorMsg
          : '网络繁忙-2，请稍后重试'
      )
    }

    reject(error)
  }
}

export function fetchGet(url, params = {}, config = {}) {
  removeUndefinedProps(params)
  return new Promise((resolve, reject) => {
    axios.get(url, params, config).then(handleSuccess(resolve), handleError(reject))
  })
}

export function fetchPost(url, params = {}, config = {}) {
  removeUndefinedProps(params)
  return new Promise((resolve, reject) => {
    axios.post(url, params, config).then(handleSuccess(resolve), handleError(reject))
  })
}

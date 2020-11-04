import { Toast } from 'mint-ui'
import utils from '../util/util'
import store from '../store/index'

// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, url, params, success, failure, root = process.env.VUE_APP_WOSERVER_HOST) {
  if (params) {
    params = filterNull(params)
  }

  // token
  let token = null
  if (store.getters.token) {
    token = store.getters.token
  }

  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false,
    headers: { 'X-HH-Authorization': token }
  }).then(function(res) {
    success(res)
  })
}

// 工单用
export function fetchJavaEndPoint(
  reqUrl,
  type = 'POST',
  isSplicing = false,
  data = {},
  root = process.env.VUE_APP_WOSERVER_HOST
  // root = 'http://192.168.2.153:8991'
) {
  if (!reqUrl) {
    return
  }
  // isSplicing 是否把参数拼接在url后
  if (isSplicing && data && typeof data !== 'object') reqUrl = reqUrl + data
  type = type.toUpperCase()
  // token
  let token = null
  if (store.getters.token) {
    token = store.getters.token
  }
  let data0, params
  data0 = !isSplicing && (type === 'POST' || type === 'PUT') ? data : null
  params = !isSplicing && (type === 'GET' || type === 'DELETE') ? data : null

  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: reqUrl,
      data: data0,
      params,
      baseURL: root,
      withCredentials: false,
      headers: { 'X-HH-Authorization': token }
    }).then(
      res => {
        resolve(res.data)
        logResponseParams(res, root + reqUrl)
      },
      error => {
        if (error.errorMsg) {
          Toast(error.errorMsg)
        } else if (/^\<\!DOCTYPE/.test(error)) {
          // 接口代码报错
          Toast('网络繁忙，请稍后重试')
        } else {
          Toast('网络繁忙-2，请稍后重试')
        }

        reject(error)
      }
    )
  })
}

// Java商城业务
export function fetchJavaHdEndPoint(
  reqUrl,
  type = 'POST',
  isSplicing = false,
  data = {},
  root = process.env.VUE_APP_HDSERVER_HOST
) {
  if (!reqUrl) {
    return
  }
  // isSplicing 是否把参数拼接在url后
  if (isSplicing && data && typeof data !== 'object') reqUrl = reqUrl + data
  type = type.toUpperCase()
  // token
  let token = null
  if (store.getters.token) {
    token = store.getters.token
  }
  let data0, params
  data0 = !isSplicing && (type === 'POST' || type === 'PUT') ? data : null
  params = !isSplicing && (type === 'GET' || type === 'DELETE') ? data : null
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: reqUrl,
      data: data0,
      params,
      baseURL: root,
      withCredentials: false,
      headers: { 'X-HH-Authorization': token }
    }).then(
      res => {
        resolve(res.data)
        logResponseParams(res, root + reqUrl)
      },
      error => {
        if (error.errorMsg) {
          Toast(error.errorMsg)
        }else if (error.message) {
          Toast(error.message)
        } else if (/^\<\!DOCTYPE/.test(error)) {
          // 接口代码报错
          Toast('网络繁忙，请稍后重试')
        } else {
          Toast('网络繁忙-2，请稍后重试')
        }

        reject(error)
      }
    )
  })
}

function logResponseParams(response, url) {
  if (process.env.NODE_ENV === 'development') {
    let str = JSON.stringify(response.data)
    console.groupCollapsed(
      '%c' + utils.formatDate('HH:mm:ss.SSS') + '%c请求' + url + '\n',
      'font-weight:normal;color:#fff;background:#35495e;padding:2px 7px;border-radius:3px 0 0 3px;',
      'font-weight:normal;color:#fff;background:#0066cc;padding:2px 7px;border-radius:0 3px 3px 0;',
      str.length < 80 ? str : str.substring(0, 80) + '...'
    )
    console.count('SN')
    // console.info(response);
    console.log('%c响应\n', 'color:#aaa', response.data)
    console.groupEnd()
  }
}

// 返回在vue模板中的调用接口
export default {
  get: function(url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function(url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function(url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function(url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  get_limit: function(url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure, process.env.VUE_APP_JAVASERVER_HOST)
  }
}

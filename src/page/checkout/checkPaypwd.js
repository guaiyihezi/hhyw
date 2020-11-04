import Vue from 'vue'
import store from '../../store'
import { MessageBox } from 'mint-ui'
import router from '../../router/index'

import PayPasswordPanel from '../../components/common/PayPasswordPanel.vue'
const PannelConstructor = Vue.extend(PayPasswordPanel)

let instance = null
let PayResolve = null
let PayReject = null

const callback = action => {
  if ('close' === action) {
    PayReject()
  } else if ('saveCert' === action) {
    PayResolve(instance.pay_cert)
  }
}
const getAnInstance = () => {
  let ins = null
  if (instance) {
    ins = instance
  }
  ins = new PannelConstructor({
    el: document.createElement('div')
  })
  ins.show = false
  ins.pay_cert = ''
  ins.callback = callback
  ins.resetPaypwd = goResetPaypwd
  return ins
}

const goResetPaypwd = () => {
  router.app.$router.push({ name: 'transPwdSet' })
}

// 检查是否设置了支付密码
const checkPwd = async () => {
  // 同步用户信息
  await store.dispatch('syncUserInfo', { isLoading: true })
  return new Promise((resolve, reject) => {
    // 未设置支付密码
    if (!store.state.auth.user.is_set_pay_password) {
      MessageBox({
        title: '',
        message: `使用权益积分/浣豆支付时需校验权益支付密码，请您先设置权益支付密码`,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '立即设置'
      }).then(action => {
        if (action === 'confirm') {
          goResetPaypwd()
        }
      })
      reject()
      return
    }
    // 已设置支付密码
    resolve()
  })
}

/**
 * params.pay_amount 需支付的积分数
 */
export default async pay_amount => {
  let ifContinue = true
  try {
    await checkPwd()
  } catch (e) {
    ifContinue = false
  }
  return new Promise((resolve, reject) => {
    // 未设置密码
    if (!ifContinue) {
      reject()
      return
    }
    // 已设置密码，判断免密额度
    const freePayLimit = store.state.auth.user.pay_without_limit
    if (freePayLimit && pay_amount <= freePayLimit) {
      // 支付积分数小于免密额度，不需输入密码
      resolve()
      return
    }

    PayResolve = resolve
    PayReject = reject

    instance = getAnInstance()
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.show = true
    })
  })
}

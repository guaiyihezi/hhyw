import router from '../../router/index'
import { authCheck } from '../../api/auth-base'
import { ENUM } from '../../const/enum'
import { MessageBox, Indicator } from 'mint-ui'
import { goAuth } from '../../page/profile/goAuth'
import hhApp from '../../assets/js/hhApp-bridge'

let timer = null

// initial state
const state = {
  authStatus: false,
  authStep: 0,
  authStatusError: -1,
  showAuthPopup: false,
  auth_agreement: 0, // 授权第一步：协议签 => 0 未签署 1 已签署
  old_id_check_status: 0 // 原授权认证状态 => 0 未认证 1 已认证
}
const routerNameStatus = {
  product: '购买喜欢的商品',
  cart: '购买喜欢的商品',
  profile: '兑换权益'
}
// mutations
const mutations = {
  saveAuthData(state, payload) {
    let data = payload.data || {}
    state.authStatus = data.status || false
    state.authStep = data.step || 0
    state.auth_agreement = data.auth_agreement || 0
    state.authStatusError = payload.code || 0
    state.old_id_check_status = data.old_status || 0
    clearTimeout(timer)

    if (!state.authStatus) {
      timer = setTimeout(() => {
        // 每过5分钟秒自动重新获取授权状态
        state.authStatusError = -1
      }, 300e3)
    }
  },
  clearAuthStatus(state) {
    state.authStatus = null
    state.authStatusError = -1
  },
  closeAuthPopup(state) {
    state.showAuthPopup = false
  },
  openAuthPopup(state) {
    state.showAuthPopup = true
  },
  itzAuthGuide(state, payload) {
    if (!state.authStatus) {
      let message = '您暂未完成授权，请先'
      let routerName = router.currentRoute.name
      message += state.authStep == 1 ? '静待授权审核后再' : '完成授权后再'
      message += routerNameStatus[routerName] ? routerNameStatus[routerName] : '操作'

      // 老的已完成认证的用户
      if (state.old_id_check_status) {
        message = '尊敬的用户，请您签署新的债权兑换服务协议。'
      }
      MessageBox({
        title: '',
        message: message,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '立即前往'
      }).then(action => {
        if (action === 'confirm') {
          goAuth()
        } else if (payload && payload.goback) {
          payload.goback()
        }
      })
    }
  },
  saveAuthAgreement(state, payload) {
    // App内 授权 第一步保存
    state.auth_agreement = payload.auth_agreement
  }
}

// actions
const actions = {
  fetchItzAuthCheck({ commit, dispatch, state }, payload) {
    return new Promise((resolve, reject) => {
      payload = payload || {}
      if (payload.loading) {
        Indicator.open()
      }
      authCheck(1)
        .then(
          res => {
            if (res && res.data) {
              commit('saveAuthData', res)
            }
            resolve({
              status: state.authStatus,
              step: state.authStep
            })
          },
          error => {
            resolve(error)
          }
        )
        .finally(() => {
          if (payload.loading) {
            Indicator.close()
          }
        })
    })
  },
  helperItzAuthCheck({ commit, dispatch, state }, payload) {
    return new Promise((resolve, reject) => {
      payload = payload || {}
      if (state.authStatusError == -1) {
        // 首次加载授权请求
        payload = payload || {}
        payload.loading = true
        dispatch('fetchItzAuthCheck', payload).then(
          res => {
            resolve(res)
          },
          error => {
            reject(error)
          }
        )
      } else {
        resolve({
          status: state.authStatus,
          step: state.authStep,
          platform: state.platform
        })
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}

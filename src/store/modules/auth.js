import utils from '../../util/util'
import { balanceGet } from '../../api/balance'
import { bondGet } from '../../api/bond'
import { unReadMsg, unReadMsgNum } from '../../api/message'
import { userProfileGet } from '../../api/user'

import { Indicator } from 'mint-ui'

let timer = null

// initial state
const state = {
  isOnline: false,
  token: null,
  user: null,
  isTokenInvalid: false,
  flag: false,
  platform: 0,
  openId: '',
  inviteCode: '', // 邀请注册 小店SN
  userBondInfo: {
    balance: 0,
    amount: 0,
    errorCode: -1 // 用户是否应该重新请求查询
  },
  seckillToken: null, //购买秒杀商品 通过限流凭证
  hasUnReadMsg: false // 是否有未读消息
}

// mutations
const mutations = {
  signin(state, payload) {
    this.commit('saveUser', payload.user)
    this.commit('saveToken', payload.token)

    // 登录时读取购物车状态
    this.dispatch('fetchCartNumber')
    state.isTokenInvalid = false
  },
  signout(state) {
    this.commit('clearToken')
    this.commit('clearUser')

    // TabBar购物车商品数量
    this.commit('setCartNumber', 0)
    // 选中的收货地址
    this.commit('unselectAddressItem')
    // 购物车内数据
    this.commit('resetCartGoods')

    // 清除授权状态
    this.commit('clearAuthStatus')

    // 清空余额及债权信息
    this.commit('clearSharer')
    // 清除openid
    this.commit('clearOpenid')
    // 登出时清楚我的小店信息
    // this.commit('clearShopInfos')
  },
  saveUser(state, payload) {
    state.user = Object.assign({}, payload)
    utils.setReportUser(state.user.id)
    state.platform = state.user.user_platform
    if (!state.platform) {
      // 非爱投资用户不需要授权
      this.commit('saveAuthData', { data: { status: true } })
    }
  },
  saveToken(state, payload) {
    state.isOnline = true
    state.token = payload
    this.commit('setCookieFromToken')
  },
  setCookieFromToken(state) {
    utils.setCookie('auth_token', state.token, { domain: utils.getDomainA.domain })
  },
  clearUser(state) {
    state.user = null
    utils.setReportUser(null)
    state.platform = 0
  },
  clearToken(state) {
    state.isOnline = false
    state.token = null
    utils.removeCookie('auth_token', { domain: utils.getDomainA.domain })
  },
  changeFlag(state, value) {
    state.flag = value
  },
  saveOpenid(state, payload) {
    state.openId = payload
  },
  clearOpenid(state) {
    state.openId = ''
  },
  saveSharer(state, payload) {
    state.userBondInfo = { ...state.userBondInfo, ...payload }
  },
  clearSharer(state) {
    state.userBondInfo = {
      balance: 0,
      amount: 0,
      errorCode: -1 // 用户是否应该重新请求查询
    }
  },
  // 保存 特定商品(或店铺) 的阅读购买须知-》已知晓不再显示
  saveCheckShouldKnowBeforeBy(state, payload) {
    const read_marker = state.user.read_marker || []
    if (read_marker.indexOf(payload) == -1) {
      state.user.read_marker = [...read_marker, payload]
    }
  },
  saveInviteCode(state, payload) {
    state.inviteCode = payload
  },
  // 保存秒杀商品 限流凭证
  saveSeckillToken(state, value) {
    state.seckillToken = value
  },
  clearSeckillToken(state, value) {
    state.seckillToken = null
  },
  setHasUnReadMsg(state, value) {
    state.hasUnReadMsg = value
  }
}

const actions = {
  // 判断是否为换换客（有无权益余额且有无债权）
  fetchItzBondAuthCheck({ commit, dispatch, state }, payload) {
    return new Promise((resolve, reject) => {
      if (!state.isOnline) {
        commit('clearSharer')
        resolve({ userBondInfo: state.userBondInfo })
      }
      if (state.platform && (state.userBondInfo.errorCode || payload)) {
        Indicator.open()
        const pBalance = balanceGet()
        const pBond = bondGet()
        Promise.all([pBalance, pBond])
          .then(posts => {
            const balance = Number(posts[0].surplus)
            const amount = Number(posts[1])
            if (balance > 0 || amount > 0) {
              commit('saveSharer', { balance, amount, errorCode: 0 })
              resolve({ userBondInfo: { balance, amount, errorCode: 0 } })
              clearTimeout(timer)
              timer = setTimeout(() => {
                // 每过2分钟秒自动重新获取余额及债权
                commit('saveSharer', { errorCode: -1 })
              }, 120e3)
            } else {
              commit('clearSharer')
              resolve({ userBondInfo: state.userBondInfo })
            }
          })
          .catch(error => {
            resolve({ userBondInfo: state.userBondInfo })
            console.log(error)
          })
          .finally(() => {
            Indicator.close()
          })
      } else {
        resolve({ userBondInfo: state.userBondInfo })
      }
    })
  },
  checkUnReadMsg({ commit, dispatch, state }, payload) {
    if (!state.isOnline) {
      return commit('setHasUnReadMsg', false)
    }
    const msg_workOrder = unReadMsg()
    const msg_paipai = unReadMsgNum(1)
    Promise.all([msg_workOrder, msg_paipai])
      .then(res => {
        if (res[0].isRead == 'yes' || res[1].num > 0) {
          commit('setHasUnReadMsg', true)
        } else {
          commit('setHasUnReadMsg', false)
        }
      })
      .catch(error => {
        commit('setHasUnReadMsg', false)
        console.error(error.message || 'get unReadMsg error!')
      })
  },
  syncUserInfo({ commit, dispatch, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (payload.isLoading) Indicator.open()
      userProfileGet()
        .then(
          res => {
            commit('saveUser', res)
            resolve()
          },
          error => {
            reject(error)
          }
        )
        .finally(() => {
          if (payload.isLoading) Indicator.close()
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}

import { ENUM } from '../const/enum'

export const isOnline = state => {
  return state.auth.isOnline
}

export const token = state => {
  return state.auth.token
}

export const getUser = state => {
  return state.auth.user
}

export const authStatus = state => {
  return state.itouzi.authStatus
}

export const isAgree = state => {
  return state.itouzi.auth_agreement
}

export const authStep = state => {
  return state.itouzi.authStep
}

export const inviteCode = state => {
  return state.auth.inviteCode
}

export const keepAlive = state => {
  return state.keepAlive.include
}

export const routerStack = state => {
  return state.keepAlive.routerStack
}

// A类用户：账户有权益余额或者有爱投资在投债权
// 当前用户是否为A类用户
export const isHbUser = state => {
  if (!state.auth.isOnline || !state.auth.user) {
    return false
  }
  // 账户权益积分余额
  if (Number(state.auth.user.surplus) > 0) {
    return true
  }
  // 拥有权益积分的商家用户
  if (state.auth.user.suppliers_id != 0) {
    return true
  }
  // 是itz平台用户且itz可兑换债权大于0
  if (state.auth.platform == 1 && Number(state.bond.currentBond) > 0) {
    return true
  }
  return false
}

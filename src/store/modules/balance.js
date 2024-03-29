const state = {
  currentBalance: '', // 当前用户拥有余额

  currentTokenHD: '', // 浣豆余额
  currentTokenHDIsInt: false // 浣豆余额是否为整数
}

// mutations
const mutations = {
  saveCurrentBalanceState(state, value) {
    state.currentBalance = parseFloat(value)
  },
  saveCurrentTokenHDState(state, value) {
    state.currentTokenHD = parseFloat(value)
    state.currentTokenHDIsInt = Number.isInteger(state.currentTokenHD)
  }
}

export default {
  state,
  mutations
}

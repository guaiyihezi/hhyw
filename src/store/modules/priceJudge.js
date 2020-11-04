// initial state
const state = {
  productInfo: '' // 商品详情
}

// mutations
const mutations = {
  savePriceJudgeProduct(state, payload) {
    state.productInfo = payload
  }
}

export default {
  state,
  mutations
}

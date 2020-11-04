const state = {
  auctionInfo: {}
}

const mutations = {
  saveAuctionInfo(state, payload) {
    state.auctionInfo = payload
  }
}

export default {
  state,
  mutations
}

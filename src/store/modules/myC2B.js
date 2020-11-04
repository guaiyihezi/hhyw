import { getSysTime } from '../../util/getSysTime'
// myC2B
const state = {
  navId: 0, // default 已参与
  systemTime: 0 // 我的竞拍列表 判断状态用 当前系统时间
}

const mutations = {
  setMyC2BListNav(state, navId) {
    state.navId = navId
  },
  updateMyC2BSysTime(state, time) {
    state.systemTime = getSysTime()
  }
}

export default {
  state,
  mutations
}

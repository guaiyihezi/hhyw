import Vue from 'vue'
import store from '../../store/index'
import { Indicator, MessageBox } from 'mint-ui'
import router from '../../router/index'
import { productPurchase } from '../../api/product'
import { cartCheckout } from '../../api/cart'

// 要兑换的权益积分数
let local_need = 0
// 生成临时订单的api
let local_api = ''
// 生成临时订单接口需要的数据
let local_postData = {}

export const goExchange = async (need, api, postData) => {
  // 检查 授权认证（itz平台用户 && 未授权 && 可兑换债权>0）
  await store.dispatch('fetchItzAuthCheck', { loading: true })

  const authStatus = store.state.itouzi.authStatus
  const platform = store.state.auth.platform
  const currentBond = store.state.bond.currentBond

  if (!authStatus && 1 == platform && currentBond > 0) {
    store.commit('itzAuthGuide')
    return
  }

  const isExchangeAndPay = !!need
  const needbond = isExchangeAndPay ? need : 0
  const params = { need: needbond }
  if (!isExchangeAndPay) {
    params.canPartial = true
  }

  local_need = needbond
  local_api = api
  local_postData = postData
  // 兑换债权前 先生成临时订单
  let canExhange = true
  try {
    await createTmpOrderBefore()
  } catch (e) {
    canExhange = false
  }
  if (!canExhange) return

  params['debt_id'] = store.state.checkout.tmpOrder.debt_id
  router.app.$router.push({ name: 'bondDebt', params: params })
}

// 生成临时订单
const createTmpOrderBefore = () => {
  const data = { ...local_postData, reserved: local_need }
  return new Promise((resolve, reject) => {
    Indicator.open()
    local_api(data)
      .then(res => {
        store.commit('saveTmpOrder', res)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        Indicator.close()
      })
  })
}

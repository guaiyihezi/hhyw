import { fetchPost } from '../server/network'

// 【好友代付】获取代付订单详情
export const friendPayOrderGet = order =>
  fetchPost('/hh/sharepay/hh.order.get/guest', {
    sn: order // 代付订单ID
  })

// 【好友代付】确认页 获取页面信息
export const friendPayConfirmGet = order =>
  fetchPost('/hh/sharepay/hh.order.get', {
    sn: order // 代付订单ID
  })

// 【好友代付】确认页 确认支付接口
export const friendPayConfirmPay = order =>
  fetchPost('/hh/sharepay/hh.payment.pay', {
    sn: order, // 代付订单ID
    code: 'balance'
  })

// 【好友代付】结果页 获取代付结果
// export const friendPayResultGet = order =>
//   fetchPost('/hh/hh.friendPay.resultGet', {
//     order: order // 代付订单ID
//   })

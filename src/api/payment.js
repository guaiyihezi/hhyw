import { fetchPost } from '../server/network'

/**
 * 订单支付
 *
 * @param      {boolean}  isInstalment  是否是分期付款订单
 * @param      {Number}   order         订单id ( 大订单  或  小订单 )
 * @param      {String}   code          支付类型 ehking 易汇金 pay.alipay 支付宝支付    pay.weixin微信支付  pay.unionpay 银联支付   pay.code 货到付款 pay.teegon  天工
 * @param      {Boolean}  share_type    是否好友代付
 * @param      {String}   openid        微信支付用openID
 * @param      {Number}   token_type    1权益积分or2浣豆  【 token_type与partner都为0 则该订单为纯现金支付 】
 * @param      {String | Number}   partner        选择浣豆商户ID 选择我的浣豆为0
 * @return     {Promise}  返回接口.data
 */
export const paymentPay = (isInstalment, params) => {
  // 如果是分期付款订单，支付时提交的是小订单id
  if (isInstalment == 1) {
    return fetchPost('/hh/hh.payment.instalmentPay', params)
  } else {
    return fetchPost('/hh/hh.payment.pay', params)
  }
}

// 支付方式列表
export const paymentTypesList = type =>
  fetchPost('/hh/hh.payment.types.list', {
    type: type
  })

// 获取支付结果
export const getPayResult = order =>
  fetchPost('/hh/hh.payment.payResult', {
    order: order
  })

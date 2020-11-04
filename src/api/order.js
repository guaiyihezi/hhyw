import { fetchPost } from '../server/network'

// 订单详情
export const orderGet = (order, isInstalment, parent_order) => {
  if (isInstalment == 1) {
    return fetchPost('/hh/hh.order.instalment.get', {
      order: order, // 小订单ID
      parent_order: parent_order
    })
  } else {
    return fetchPost('/hh/hh.order.get', {
      order: order // 订单ID
    })
  }
}

// 代付方 代付订单详情
export const orderFriendPayGet = order =>
  fetchPost('/hh/sharepay/hh.order.get', {
    order: order // 订单ID
  })

// 订单列表
export const orderList = (page, size, status) =>
  fetchPost('/hh/hh.order.list', {
    page: page, // 当前第几页
    size: size, // 每页多少
    status: status // 按订单状态筛选（可选，不填则全部）
  })

// 好友代付订单列表
export const orderFriendPayList = (page, size, status) =>
  fetchPost('/hh/sharepay/hh.order.list', {
    page: page, // 当前第几页
    size: size, // 每页多少
    status: status // 按订单状态筛选（可选，不填则全部）
  })

// 确认收货
export const orderConfirm = order =>
  fetchPost('/hh/hh.order.confirm', {
    order: order // 订单ID
  })

// 获取退货原因
export const orderReasonList = () => fetchPost('/hh/hh.order.reason.list')

// 取消订单
export const orderCancel = (order, reason) =>
  fetchPost('/hh/hh.order.cancel', {
    order: order,
    reason: reason // 取消理由
  })

// 订单评价
export const commentSave = params => fetchPost('/hh/hh.product.comment.save', params)

// 订单追评
export const commentAppendSave = params => fetchPost('/hh/hh.product.comment.appendsave', params)

// 订单不同状态的数量统计
export const orderSubtotal = () => fetchPost('/hh/hh.order.subtotal')

// 订单价格计算
export const orderPrice = (products, consignee, activity, train_sn) =>
  fetchPost('/hh/hh.order.price', {
    products: products, // 商品信息数组
    consignee: consignee, // 收货人ID
    activity: activity, // 优惠券
    train_sn: train_sn //直通车商品sn
  })

// 用户当日 未支付订单数（待支付订单和已取消订单）
export const getUnfinishedOrderCount = () => fetchPost('/hh/hh.order.unpaid')

// 分期明细
export const getOrderInstalmentList = order =>
  fetchPost('/hh/hh.order.instalment.list', {
    order: order
  })

// 每期详细信息
export const getOrderEveryInstalmentInfo = order =>
  fetchPost('/hh/hh.order.instalment.get', {
    order: order
  })

// 生成临时订单
export const createTmpOrder = product =>
  fetchPost('/hh/hh.order.createTmpOrder', {
    product: product // 商品id
  })
// 取消临时订单（置为失效）
export const cancelTmpOrder = orderId =>
  fetchPost('/hh/hh.order.cancelTmpOrder', {
    product: orderId // 商品id
  })

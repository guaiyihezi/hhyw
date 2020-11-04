import { fetchPost } from '../server/network'

/**
 * 获取账单列表
 */
export const getMoneyHistory = params =>
  fetchPost('/hh/hh.money.history', {
    status: params.status,
    page: params.page,
    size: params.size,
    time_from: params.time_from,
    time_to: params.time_to
  })

// 获取账单详情
export const getBillDetail = id =>
  fetchPost('/hh/hh.money.get', {
    id: id
  })

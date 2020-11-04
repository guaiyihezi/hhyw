import { fetchPost } from '../server/network'

// 余额信息
export const balanceGet = (from = '') =>
  fetchPost('/hh/hh.balance.get', {
    from: from
  })

// 我的余额列表
export const balanceList = (status, page, size) =>
  fetchPost('/hh/hh.balance.history', {
    status: status, // 状态   全部  收入  支出
    page: page, // 当前第几页
    size: size // 每页多少
  })

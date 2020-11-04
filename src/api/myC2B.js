import { fetchPost } from '../server/network'

// 列表
export const getList = (page, status) =>
  fetchPost('/hh/hh.user.paipai.list', {
    page: page, // 当前第几页
    size: 10, // 每页多少
    status: status // 状态筛选（0 参与，1 竞拍中，2 已中拍）
  })

// 获取保证金详情
export const getDetailBzj = id =>
  fetchPost('/hh/hh.paipai.deposit', {
    id: id // 竞买商品id
  })

// 获取我的某个拍拍详情
export const getDetailPP = id =>
  fetchPost('/hh/hh.user.paipai.detail', {
    id: id // 竞买商品id
  })

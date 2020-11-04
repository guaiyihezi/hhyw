import { fetchPost } from '../../../server/network'

// 获取捐赠首页统计数据
export const getDonateData = () => fetchPost('/activity/donate.info', {})

// 获取最新爱心订单数据
export const getDonateOrderData = () => fetchPost('/activity/donate.order.info', {})

// 获取捐赠金额数据列表
export const getDonateJuanzengList = () => fetchPost('/activity/donate.list', {})

// 获取捐赠统计详情
export const getDonateStatDetail = log_id => fetchPost('/activity/donate.detail', { log_id })

// 获取捐赠关联商品订单
export const getDonateStatList = ({ log_id, page = 1, size = 10 }) =>
  fetchPost('/activity/donate.about.order', { log_id, page, size })

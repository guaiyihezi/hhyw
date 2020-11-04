import { fetchPost } from '../server/network'

// 获取爱心捐赠活动状态
export const getDonateEventStatus = () => fetchPost('/activity/donate.status', {})

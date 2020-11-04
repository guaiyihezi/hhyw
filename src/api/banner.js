import { fetchPost } from '../server/network'

// 广告列表
export const bannerList = () => fetchPost('/hh/hh.banner.list')

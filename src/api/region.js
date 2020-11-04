import { fetchPost } from '../server/network'

// 地区列表（三级地址）
export const regionList = last_at =>
  fetchPost('/hh/hh.region.list', {
    last_at: last_at
  })

import { fetchPost } from '../../../server/network'

// 获取活动页面内容（Html串）
export const getEventContent = (name, token) =>
  fetchPost('/hh/hh.static.act', {
    name: name,
    token: token
  })

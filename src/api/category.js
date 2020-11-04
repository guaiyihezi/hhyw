import { fetchPost } from '../server/network'

export const categoryList = deep =>
  fetchPost('/hh/hh.category.list', {
    deep: deep // 深度
  })

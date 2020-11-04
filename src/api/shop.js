import { fetchPost } from '../server/network'

// 店铺详情
export const shopGet = shop =>
  fetchPost('/hh/hh.shop.get', {
    shop: shop // 店铺id
  })

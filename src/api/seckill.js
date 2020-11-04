import { fetchPost } from '../server/network'

// 首页秒杀商品推荐
export const seckillRecommend = () => fetchPost('/hh/hh.secbuy.recommend')

// 秒杀专场场次清单
export const seckillTabs = () => fetchPost('/hh/hh.secbuy.tabs')

// 秒杀专场场次商品列表接口
export const seckillList = (id, page, size = 10) =>
  fetchPost('/hh/hh.secbuy.list', {
    id: id,
    page: page,
    size: size
  })

export const secPfoductDetail = id =>
  fetchPost('/hh/hh.secbuy.goods.info', {
    id: id
  })

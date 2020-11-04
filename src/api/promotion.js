import { fetchPost } from '../server/network'
import utils from '../util/util'

// 商品列表
export const productList = (id, page, size = 10) =>
  fetchPost('/hh/hh.secbuy.list', {
    id: id,
    page: page,
    size: size
  })

// 商品详情
export const secProductDetail = id => {
  return new Promise((resolve, reject) => {
    fetchPost('/hh/hh.secbuy.goods.info', { id }).then(
      res => {
        utils.splitMoneyLint(res)
        resolve(res)
      },
      error => {
        reject(error)
      }
    )
  })
}

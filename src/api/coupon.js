import { fetchPost } from '../server/network'
import utils from '../util/util'

// 个人中心优惠券数目
export const couponNumber = () => fetchPost('/hh/hh.coupon.number')

// 优惠券列表
export const couponList = status =>
  fetchPost('/hh/hh.user.coupon.list', {
    status: status
  })

/**
 * Gets the goods coupon list.
 *
 * @param      {Number}  id      goods id
 * @return     {Array}  The goods coupon list.
 */
export const getGoodsCouponList = id =>
  fetchPost('/hh/hh.goods.coupon.list', {
    goods_id: id
  })

// 获取单张优惠券info
export const couponInfo = coupon_id => fetchPost('/hh/hh.coupon.single.get', { coupon_id })

// 优惠券可用商品列表
export const couponGoodsList = params => {
  return new Promise((resolve, reject) => {
    fetchPost('/hh/hh.coupon.goods.list', params).then(res => {
      utils.splitMoneyLint(res.list)
      resolve(res)
    })
  })
}

/**
 * Gets a coupon.
 *
 * @param      {Number}  coupon_id  The coupon identifier
 * @return     {String}  A message.
 */
export const getACoupon = coupon_id => fetchPost('/hh/hh.coupon.receive', { coupon_id })

// 可合并的优惠券列表
export const getMergeCouponList = () => fetchPost('/hh/hh.merge.coupon.list', {})

// 合并
export const mergeCoupons = coupon_user_ids => fetchPost('/hh/hh.coupon.merge', { coupon_user_ids: coupon_user_ids })

// 确认合成
export const confirmMerge = params => fetchPost('/hh/hh.user.coupon.merge', params)

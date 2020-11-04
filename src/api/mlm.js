import { fetchPost } from '../server/network'
import utils from '../util/util'

/**
 * Gets the mlm list.
 *
 * @param      {Object}  params  请求参数{page|size}
 */
export const getMlmProductList = params => fetchPost('/hh/mlm/hh.product.list', params)

// 获取分销返佣商品详情
export const mlmProductGet = product => {
  return new Promise((resolve, reject) => {
    fetchPost('/hh/mlm/hh.product.get', {
      product: product // 商品id
    }).then(
      res => {
        if (res.origin_price) {
          utils.splitMoneyLint(res.origin_price)
        }
        resolve(res)
      },
      error => {
        reject(error)
      }
    )
  })
}

/**
 * 获取换换客分享详情
 *
 * @param      {product}  商品ID
 * @param      {page}     页码
 * @param      {size} 每页数量
 */
export const productLiveGet = params => fetchPost('/hh/mlm/hh.product.live', params)

/**
 * 保存并分享分销商品
 *
 * @params      {goods_id}    商品ID
 * @params      {remark}      好友说
 * @params      {shop_price}  换换客分销价
 * @params      {is_shop}     是否是店铺商品
 */
export const shareMlmProduct = params => fetchPost('/hh/mlm/hh.product.share', params)

/**
 * 换换客提现信息
 *
 */
export const getWithdrawAccount = () => fetchPost('/hh/mlm/hh.withdraw.accountInfo')

/**
 * 换换客提现提交
 *
 * @param      {money}            params  提现金额
 * @param      {payee_real_name}  params  姓名
 * @param      {payee_account}    params  支付宝账号
 */
export const withdrawMoneySubmit = params => fetchPost('/hh/mlm/hh.withdraw.do', params)

/**
 * 分销商品分销价格列表
 *
 * @param      {goods_id}   params  商品id
 */
export const getExclusivePrice = params => fetchPost('/hh/mlm/hh.exclusiveprice.list', params)

/**
 * 获取小店数据看板
 *
 */
export const getShopDashboard = () => fetchPost('/hh/mlm/hh.shop.board')

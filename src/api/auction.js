// auction interface DOC
import { fetchPost } from '../server/network'

/**
 * Gets the auction list.
 *
 * @param      {Object}  params  The parameters
 * @return     {Array}  The auction list.
 */
export const getAuctionList = params =>
  fetchPost('/hh/hh.paipai.list', {
    page: params.page, // pagination 页数
    size: params.size, // page size 每页数据量
    cat_id: params.cat_id // 分类
  })

/**
 * Gets the auction detail.
 *
 * @param      {Number}  id         The auction product's identifier
 * @param      {String}  preview    The preview code
 * @return     {Object}  The auction product's detail.
 */
export const getAuctionDetail = (id, preview) => fetchPost('/hh/hh.paipai.get', { id, preview })

/**
 * Gets the auction bid list.
 *
 * @param      {Number}  id      The auction product's identifier
 * @return     {Object}  The auction bid object.
 */
export const getAuctionBidList = id => fetchPost('/hh/hh.paipai.subscribe', { id })

// submit price
export const submitBidPrice = (id, cash, token) =>
  fetchPost('/hh/hh.paipai.bid', {
    id: id,
    cash: cash,
    token: token
  })

/**
 * 保证金支付
 *
 * @param      {Number}  params.id      The auction's identifier
 * @param      {String}  params.code    The pay type
 * @param      {String}  params.openid  wechat openid
 * @param      {String}  params.channel
 * @param      {String}  params.referer
 * @return     {Promise}  返回接口.data
 */
export const payBzj = params => fetchPost('/hh/hh.payment.payDeposit', params)

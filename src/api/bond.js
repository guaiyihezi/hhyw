import { fetchPost } from '../server/network'

// 可兑换债权金额
export const bondGet = () => fetchPost('/hh/hh.bond.get')

/**
 * 返回债券列表
 *
 * @params                {Object}  params  参数
 * @params.page           {Number}  params  页数
 * @params.size           {Array}   params  每页数据量
 * @params.product        {Number}  params  商品ID
 * @params.debt_type      {Number}  params  债权类型： 1-省心 2-智选
 * @param.debt_id         {Number}  params  兑换债权前生成的临时订单的关联id
 */
export const bondList = params =>
  fetchPost('/hh/hh.bond.list', {
    product: params.product,
    debt_type: params.debt_type,
    page: params.page || 1,
    size: params.size || 10,
    debt_id: params.debt_id
  })

/**
 * 兑换权益接口
 *
 * @param                {Object}  params  参数
 * @param.account        {Number}  params  兑换金额
 * @param.bond_ids       {Array}   params  省心计划兑换列表
 * @param.bond_wise_ids  {Array}   params  智选系列兑换列表
 * @param.order          {Number}  params  兑换时的订单
 * @param.debt_id        {Number}  params  兑换债权前生成的临时订单的关联id
 */
export const bondChange = params =>
  fetchPost('/hh/hh.bond.change', {
    account: params.account,
    bond_ids: params.bond_ids,
    bond_wise_ids: params.bond_wise_ids,
    order: params.order,
    debt_id: params.debt_id
  })

// 返回订单状态(cookie取得 || 最后一笔)
export const bondResult = order =>
  fetchPost('/hh/hh.bond.result', {
    order: order || ''
  })

// 返回订单明细
export const bondDetail = log_id =>
  fetchPost('/hh/hh.bond.detail', {
    log_id: log_id
  })

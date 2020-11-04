import { fetchPost } from '../server/network'

// 换换客个人信息
export const huanAccount = detail =>
  fetchPost('/hh/mlm/hh.dashboard.info', {
    detail: detail // 0个人中心 9全部
  })

// 佣金收支明细
export const huanMoneyHistory = (status, page, size) =>
  fetchPost('/hh/mlm/hh.money.history', {
    status: status,
    page: page,
    size: size
  })

// 分销订单列表
export const huanOrderList = (status, page, size) =>
  fetchPost('/hh/mlm/hh.order.list', {
    status: status,
    page: page,
    size: size
  })

// 分销订单详情
export const huanOrderGet = order =>
  fetchPost('/hh/mlm/hh.order.get', {
    order: order //订单id
  })

// 分销订单代付信息
export const huanPayInfo = order =>
  fetchPost('/hh/mlm/hh.payment.info', {
    order: order //订单id
  })

// 分销订单确认代付
export const huanPay = (order, code) =>
  fetchPost('/hh/mlm/hh.payment.pay', {
    order: order, //订单id 数组
    code: code //支付方式
  })

// 获取店铺基本信息 - 买家侧视角的换换客店铺
export const getShopInfo = ({ sn = '' }) => fetchPost('/hh/mlm/hh.shop.info.get', { shop_sn: sn })

// 获取店铺信息 - 卖家侧视角(需要验证身份)
export const getMyShopInfo = () => fetchPost('/hh/mlm/hh.shop.myinfo.get')

/**
 * 分销 & 自营分类不同，所以请求不同的分类接口, 两个分类接口，不能因为参数的不同而写成一个
 */
// 分销返佣分类
export const getHhkRetailCategory = () => fetchPost('/hh/mlm/hh.myshare.category.list')

// 获取商品列表 - 卖家侧，需要type区分分销 || 自营
export const getStoreProductList = params =>
  fetchPost('/hh/mlm/hh.share.hhk.list', {
    cat_id: params.cat_id,
    type: params.type,
    page: params.page,
    size: params.size
  })

// 移除小店
export const removeFromShop = goods_id =>
  fetchPost('/hh/mlm/hh.shop.shiftout', {
    goods_id: goods_id
  })

// 获取商品分类 - 买家侧视角的换换客店铺
// export const getHhkShopCategory = sn => fetchPost('/hh/mlm/hh.share.category.list', { shop_sn: sn })

// 商品列表 - 买家侧视角的换换客店铺
export const getHhkProductList = ({ sn = '' }) =>
  fetchPost('/hh/mlm/hh.share.list', {
    shop_sn: sn
  })

// 热销商品列表 - 卖家小店推荐热销商品
export const lotsOnShelf = goods_arr => fetchPost('/hh/mlm/hh.product.lotonshelf', { goods_arr: goods_arr })

// 推荐商品列表
export const recommendProduct = params =>
  fetchPost('/hh/hh.product.foryou', {
    mlm: 1,
    page: 1,
    size: 10
  })

// 获取池子商品分类
export const getCategory = () => fetchPost('/hh/mlm/hh.platform.category.list')

/**
 * @params:{
 *   cat_id: 商品分类
 *   sort_key: 1推荐数 2佣金数 3销量 4新品
 *   sort_value: 升、降序
 *   keyword: 搜索关键词
 *   page
 *   size
 * }
 */
// 分销商品列表
export const getPickProductList = params => fetchPost('/hh/mlm/hh.pick.product.list', params)

// 设置小店信息
export const setShopBaseInfo = ({ shop_icon = '', shop_name = '', shop_desc = '', shop_banner = '' }) =>
  fetchPost('/hh/mlm/hh.shop.info.set', {
    shop_icon: shop_icon,
    shop_name: shop_name,
    shop_desc: shop_desc,
    shop_banner: shop_banner
  })

// 商品置顶 && 取消置顶
export const setFirstInList = goods_id =>
  fetchPost('/hh/mlm/hh.mlmgoodscategory.hot', {
    goods_id: goods_id
  })

// 换换客小店商品取消置顶
export const cancelFirstList = goods_id =>
  fetchPost('/hh/mlm/hh.mlmgoodscategory.cancelhot', {
    goods_id: goods_id
  })

// 换换客小店分类修改
export const manageCategoryList = params =>
  fetchPost('/hh/mlm/hh.category.change', {
    shop_sn: params.shop_sn,
    category: params.category
  })

// 换换客个人分销商品列表
export const refreshProduct = params =>
  fetchPost('/hh/mlm/hh.share.hhk.list', {
    product: params.productID,
    cat_id: params.cat_id,
    type: params.type,
    page: 1,
    size: params.size
  })

// 获取小店海报
export const getStoreSharePhoto = params =>
  fetchPost('/hh/mlm/hh.share.shop.poster.get', {
    shop_sn: params.shop_sn
  })

// 获取分销商品海报
export const getProdSharePhoto = params =>
  fetchPost('/hh/mlm/hh.share.goods.poster.get', {
    mlm_id: params.mlm_id
  })

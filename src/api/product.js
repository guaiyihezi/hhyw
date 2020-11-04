import { fetchPost } from '../server/network'
import { fetchJavaHdEndPoint } from './WorkorderMessage'
import utils from '../util/util'

// 商品评价列表
export const getReviewList = (product, grade, show_reply, page, size) =>
  fetchPost('/hh/hh.review.product.list', {
    product: product, // 商品ID
    grade: grade, // 返回类型 0:全 1:差评 2:中评 3:好评
    show_reply: show_reply, // 是否显示回复
    page: page,
    size: size
  })

export const getCommentList = params => fetchPost('/hh/hh.product.comment.list', params)

// 获取单个最新评价
export const getComment = goods_id => fetchPost('/hh/hh.product.comment.first', { goods_id })

// 商品评价统计
export const getReviewsubtotal = product => fetchPost('/hh/hh.review.product.subtotal', { product: product })

// 商品列表
export const productList = params => {
  return new Promise((resolve, reject) => {
    if (params.category) {
      params.category = ('' + params.category).split(',')
    }
    fetchPost('/hh/hh.product.list', {
      brand_id: params.brand_id, // 品牌ID (选填)
      cat_id: params.category, // 分类ID (选填)
      // activity: params.activity, // 优惠活动id (选填) 2018.07.07 新增
      sort_key: params.sort_key, // 键
      sort_value: params.sort_value, // 值
      keyword: params.keyword, // 关键词
      filter: params.filter, // 筛选数据
      page: params.page, // 当前第几页
      size: params.size, // 每页多少
      shop: params.shop, // 所属商户ID(选填)
      admin_order: params.admin_order, // 根据后台配置的推荐排序值由小到大排序：1:是 0:否(默认)
      tags_id: params.tags_id, // 查询结果增加设置为指定tags的商品，与 cat_id(分类ID) 同时存在时则展示 tags_id∪cat_id 的商品
      is_newbie: params.is_newbie // 是否只查询新手限购的商品：1:是 0:否(默认)
    }).then(
      res => {
        utils.splitMoneyLint(res.list)
        resolve(res)
      },
      error => {
        reject(error)
      }
    )
  })
}

// 商品详情
export const productGet = (product, modproductkey) => {
  return new Promise((resolve, reject) => {
    fetchPost('/hh/hh.product.get', {
      product: product, // 商品ID
      preview: modproductkey // preview
    }).then(
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

// 分销 商品详情
export const productDistGet = (mlm_id, modproductkey) => {
  return new Promise((resolve, reject) => {
    fetchPost('/hh/hh.product.get', {
      mlm_id: mlm_id, // 商品分销id
      preview: modproductkey // preview
    }).then(
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

// 收藏商品
export const productLike = product =>
  fetchPost('/hh/hh.product.like', {
    product: product // 商品ID
  })

// 取消收藏商品
export const productUnlike = product =>
  fetchPost('/hh/hh.product.unlike', {
    product: product // 商品ID
  })

// 已收藏的商品
export const productLikedList = (page, size) =>
  fetchPost('/hh/hh.product.liked.list', {
    page: page, // 当前第几页
    size: size // 每页多少
  })

// 立即购买（非购物车计算）
export const productPurchase = params => {
  return fetchPost('/hh/hh.product.purchase', {
    product: params.product,
    mlm_id: params.mlm_id,
    property: params.property, // 用户选择的属性ID
    amount: params.amount, // 数量
    consignee: params.consignee, // 收货人ID
    comment: params.comment, // 留言
    coupon_id: params.coupon_id, // 优惠券
    instalment_id: params.instalment_id, // 分期id
    secbuy_id: params.secbuy_id, // 秒杀商品id
    tiket: params.tiket, // 秒杀通行证
    train_sn: params.train_sn, //直通车商品sn
    paipai_id: params.paipai_id, // 竞买商品id
    reserved: params.reserved, //兑换浣币总额，此参数大于0表示要生成临时订单
    pay_cert: params.pay_cert // 支付密码凭证
  })
}

// 临时订单 订单->提交接口
export const purchaseFromTmpOrder = ({ consignee, coupon_id, temp_order, reserved, pay_cert }) =>
  fetchPost('/hh/hh.product.accept', {
    consignee: consignee, // 收货地址
    coupon_id: coupon_id, // 临时订单 订单id 数组
    temp_order: temp_order, // 临时订单信息
    reserved: reserved, // 兑换浣币总额，此参数大于0表示要生成临时订单
    pay_cert: pay_cert // 支付密码凭证
  })

// 临时订单 取消用户当前的临时订单
export const cancelTmpOrder = () => fetchPost('/hh/hh.order.temp.cancel', {})

// 购买须知-> 已知晓 不再提示
export const saveHasRead = (tag = 1) =>
  fetchPost('/hh/hh.save.notification', {
    notification_tag: tag // 已知晓 不再提示
  })

// 获取直通车优惠信息
export const trainBill = products =>
  fetchPost('/hh/hh.train.bill', {
    products: products // 商品信息数组
  })

// 合单分组金额计算
export const groupTotalPrice = ({ consignee, products, train_sn, temp_order }) =>
  fetchPost('/hh/hh.product.group', {
    consignee: consignee,
    temp_order: temp_order, // 临时订单 订单id 数组
    products: products,
    train_sn: train_sn //直通车商品sn
  })

//获取双12优惠券借口
export const getCoupon = params => fetchPost('/hh/hh.coupon.pop', params)

//领取1212优惠券接口
export const receiveCoupon = params => fetchPost('/hh/hh.coupon.receive.many', params)

// 获取商品投诉状态
export const fetchProductJudgeStatus = id =>
  fetchJavaHdEndPoint('/hd/priceComplaint/front/status', 'GET', false, {
    goodsId: id
  })

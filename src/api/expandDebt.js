import { fetchPost } from '../server/network'

// hashid登录
export const hashLogin = hashid =>
  fetchPost('/activity/hh.out.login', {
    hashid: hashid
  })

// 获取推荐礼包list
export const outGoods = () => fetchPost('/activity/hh.out.outGoods')

// 获取选中礼包信息
export const giftDetail = product =>
  fetchPost('/activity/hh.product.outGet', {
    product: product
  })

// 获取推荐商品信息
export const recoList = () => fetchPost('/activity/hh.product.endPay')

// 确认兑换
export const confirmExchange = (product, consignee, mobile, address, country, province, city, district) =>
  fetchPost('/activity/hh.product.outPurchase', {
    product: product, //商品id
    consignee: consignee, //收货人
    mobile: mobile, //手机
    address: address, //详细地址
    country: country, //国家
    province: province, //省份
    city: city, //城市
    district: district //区域
  })

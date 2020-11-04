import { fetchPost } from '../server/network'

// 首页推荐商品列表
export const homeProductList = params =>
  fetchPost('/hh/hh.home.product.list', {
    show: params.show // 请求数据的数组 1-hotProducts ; 2-recentlyProducts ; 3-goodProducts
  })

// 首页弹窗地址
export const homePopupImg = () => fetchPost('/hh/hh.home.pop', {})

// 胶囊图片地址
export const homeCapsuleImg = () => fetchPost('/hh/hh.home.capsule', {})

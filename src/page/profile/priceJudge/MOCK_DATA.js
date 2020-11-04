// 模拟数据
export const LIST_DATA =
  // 待处理
  [
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177577, // 缴交的保证金
      goodsName: '商品名称001',
      status: 2
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 2
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 3
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 2
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 2
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 3
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 3
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 3
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 2
    },
    {
      id: Math.floor(Math.random() * 1000),
      createTime: 1577177557, // 缴交的保证金
      goodsName: '商品名称002商品名称002商品名称002商品名称002',
      status: 2
    }
  ]

// 未中拍list 数据模拟
// [
//   {
//     // 有保证金
//     id: Math.floor(Math.random() * 1000),
//     deposit: '20.00', // 缴交的保证金
//     name: '竞拍B',
//     thumb: STATIC_PATH + '/images/201908/thumb_img/9389_thumb_G_1565178558127.jpg',
//     status: 1, // 看拍拍商品实时状态
//     start_at: Math.floor(new Date().getTime() / 1000) + 10 * 60, // 开始时间
//     close_at: Math.floor(new Date().getTime() / 1000) + 20 * 60, // 截止时间
//     current_price: '10.00', // 当前最高出价
//     money_line: '3.00', // 权益抵扣
//     starting_price: '10.00', // 起拍价
//     is_buyer: false, // 最后出价人是我(状态=已参与才会有)
//     is_bid: false, // 我已出价(状态=已参与才会有)
//     paipai_status: 1, // 看拍拍状态(商家)
//     canceled_at: 0 // 尚未下单、付款时会有过期时间
//   },
//   {
//     // 无保证金
//     id: Math.floor(Math.random() * 1000),
//     deposit: '0.00', // 缴交的保证金
//     name: '竞拍B',
//     thumb: STATIC_PATH + '/images/201908/thumb_img/9389_thumb_G_1565178558127.jpg',
//     status: 1, // 看拍拍商品实时状态
//     start_at: Math.floor(new Date().getTime() / 1000) - 10 * 60, // 开始时间
//     close_at: Math.floor(new Date().getTime() / 1000) + 10 * 60, // 截止时间
//     current_price: '10.00', // 当前最高出价
//     money_line: '3.00', // 权益抵扣
//     starting_price: '10.00', // 起拍价
//     is_buyer: false, // 最后出价人是我(状态=已参与才会有)
//     is_bid: false, // 我已出价(状态=已参与才会有)
//     paipai_status: 1, // 看拍拍状态(商家)
//     canceled_at: 0 // 尚未下单、付款时会有过期时间
//   }
// ]

// 已参与list 数据模拟
// [
//   {
//     // 已报名 未出价 未开始
//     id: Math.floor(Math.random() * 1000),
//     deposit: '20.00', // 缴交的保证金
//     name: '竞拍B',
//     thumb: STATIC_PATH + '/images/201908/thumb_img/9389_thumb_G_1565178558127.jpg',
//     status: 1, // 看拍拍商品实时状态
//     start_at: Math.floor(new Date().getTime() / 1000) + 10 * 60, // 开始时间
//     close_at: Math.floor(new Date().getTime() / 1000) + 20 * 60, // 截止时间
//     current_price: '10.00', // 当前最高出价
//     money_line: '3.00', // 权益抵扣
//     starting_price: '10.00', // 起拍价
//     is_buyer: false, // 最后出价人是我(状态=已参与才会有)
//     is_bid: false, // 我已出价(状态=已参与才会有)
//     paipai_status: 1, // 看拍拍状态(商家)
//     canceled_at: 0 // 尚未下单、付款时会有过期时间
//   },
//   {
//     // 已报名 未出价 已开始
//     id: Math.floor(Math.random() * 1000),
//     deposit: '20.00', // 缴交的保证金
//     name: '竞拍B',
//     thumb: STATIC_PATH + '/images/201908/thumb_img/9389_thumb_G_1565178558127.jpg',
//     status: 1, // 看拍拍商品实时状态
//     start_at: Math.floor(new Date().getTime() / 1000) - 10 * 60, // 开始时间
//     close_at: Math.floor(new Date().getTime() / 1000) + 10 * 60, // 截止时间
//     current_price: '10.00', // 当前最高出价
//     money_line: '3.00', // 权益抵扣
//     starting_price: '10.00', // 起拍价
//     is_buyer: false, // 最后出价人是我(状态=已参与才会有)
//     is_bid: false, // 我已出价(状态=已参与才会有)
//     paipai_status: 1, // 看拍拍状态(商家)
//     canceled_at: 0 // 尚未下单、付款时会有过期时间
//   },
//   {
//     // 已报名 已出价(被超越) 已开始
//     id: Math.floor(Math.random() * 1000),
//     deposit: '20.00', // 缴交的保证金
//     name: '竞拍B',
//     thumb: STATIC_PATH + '/images/201908/thumb_img/9389_thumb_G_1565178558127.jpg',
//     status: 1, // 看拍拍商品实时状态
//     start_at: Math.floor(new Date().getTime() / 1000) - 10 * 60, // 开始时间
//     close_at: Math.floor(new Date().getTime() / 1000) + 10 * 60, // 截止时间
//     current_price: '10.00', // 当前最高出价
//     money_line: '3.00', // 权益抵扣
//     starting_price: '10.00', // 起拍价
//     is_buyer: false, // 最后出价人是我(状态=已参与才会有)
//     is_bid: true, // 我已出价(状态=已参与才会有)
//     paipai_status: 1, // 看拍拍状态(商家)
//     canceled_at: 0 // 尚未下单、付款时会有过期时间
//   },
//   {
//     // 已报名 已出价(领先中) 已开始
//     id: Math.floor(Math.random() * 1000),
//     deposit: '20.00', // 缴交的保证金
//     name: '竞拍B',
//     thumb: STATIC_PATH + '/images/201908/thumb_img/9389_thumb_G_1565178558127.jpg',
//     status: 1, // 看拍拍商品实时状态
//     start_at: Math.floor(new Date().getTime() / 1000) - 10 * 60, // 开始时间
//     close_at: Math.floor(new Date().getTime() / 1000) + 10 * 60, // 截止时间
//     current_price: '10.00', // 当前最高出价
//     money_line: '3.00', // 权益抵扣
//     starting_price: '10.00', // 起拍价
//     is_buyer: true, // 最后出价人是我(状态=已参与才会有)
//     is_bid: true, // 我已出价(状态=已参与才会有)
//     paipai_status: 1, // 看拍拍状态(商家)
//     canceled_at: 0 // 尚未下单、付款时会有过期时间
//   }
// ]

export const DETAIL_BZJ = {
  is_sign_up: true, // 我是否报名了
  // 如果is_sign_up=false下面就不传
  deposit_status: 3, // 看用户保证金状态
  deposit: '20.00', // 我缴交的保证金额
  created_at: 1000000000, // 缴交时间
  // 如果deposit_status!=2下面就不传
  unfreeze_at: 1560148219, // 释放时间
  refund_at: 1560148219 // 到账时间
}

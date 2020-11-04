import { ENUM } from '../../const/enum'

// 排序键
export const SORTKEY = [
  {
    key: ENUM.SORT_KEY.DEFAULT,
    name: '综合',
    value: ENUM.SORT_VALUE.DESC,
    isMore: true,
    id: 0,
    child: [
      {
        key: ENUM.SORT_KEY.DEFAULT,
        name: '综合',
        isMore: false,
        value: ENUM.SORT_VALUE.DESC,
        id: 1
      },
      {
        key: ENUM.SORT_KEY.SALES_FOR_WEEK,
        name: '销量',
        isMore: true,
        value: ENUM.SORT_VALUE.DESC,
        id: 2
      },
      {
        key: ENUM.SORT_KEY.DATE,
        name: '新品',
        isMore: false,
        value: ENUM.SORT_VALUE.DESC,
        id: 3
      }
    ]
  },
  {
    key: ENUM.SORT_KEY.PRICE,
    name: '价格',
    value: ENUM.SORT_VALUE.ASC,
    isTurn: true,
    childId: 0,
    id: 4,
    child: [
      {
        key: ENUM.SORT_KEY.PRICE,
        name: '价格从低到高',
        isMore: false,
        value: ENUM.SORT_VALUE.ASC,
        id: 5
      },
      {
        key: ENUM.SORT_KEY.PRICE,
        name: '价格从高到底',
        isMore: false,
        value: ENUM.SORT_VALUE.DESC,
        id: 6
      }
    ]
  },
  {
    key: ENUM.SORT_KEY.CASH,
    name: '现金',
    value: ENUM.SORT_VALUE.ASC,
    isTurn: true,
    childId: 0,
    id: 7,
    child: [
      {
        key: ENUM.SORT_KEY.CASH,
        name: '现金从低到高',
        isMore: false,
        value: ENUM.SORT_VALUE.ASC,
        id: 8
      },
      {
        key: ENUM.SORT_KEY.CASH,
        name: '现金从高到底',
        isMore: false,
        value: ENUM.SORT_VALUE.DESC,
        id: 9
      }
    ]
  },
  {
    key: ENUM.SORT_KEY.CREDITS,
    name: '权益积分',
    value: ENUM.SORT_VALUE.ASC,
    isTurn: true,
    childId: 0,
    id: 10,
    child: [
      {
        key: ENUM.SORT_KEY.CREDITS,
        name: '权益积分从低到高',
        isMore: false,
        value: ENUM.SORT_VALUE.ASC,
        id: 11
      },
      {
        key: ENUM.SORT_KEY.CREDITS,
        name: '权益积分从高到底',
        isMore: false,
        value: ENUM.SORT_VALUE.DESC,
        id: 12
      }
    ]
  },
  {
    key: '',
    name: '筛选',
    isFilter: true,
    child: [
      {
        key: 31,
        name: '服务',
        type: 'checkbox',
        options: {
          '1': '自营',
          '2': '包邮',
          '3': '24小时发货'
        }
      },
      {
        key: 32,
        name: '价格',
        type: 'range'
      },
      {
        key: 33,
        name: '现金',
        type: 'range'
      },
      {
        key: 34,
        name: '权益积分',
        type: 'range'
      }
    ]
  }
  // {
  //   key: ENUM.SORT_KEY.SALE,
  //   name: '销量排序',
  //   isMore: false,
  //   value: ENUM.SORT_VALUE.DESC,
  //   id: 5
  // }
]

// 616活动 期间增加的 商品sort
// export const ACT616_KEY = [
//   {
//     key: ENUM.SORT_KEY.ACT_61601,
//     name: '年中新人专享',
//     isMore: false,
//     value: ENUM.SORT_VALUE.DESC,
//     id: 51
//   },
//   {
//     key: ENUM.SORT_KEY.ACT_61602,
//     name: '年中精品特价',
//     isMore: false,
//     value: ENUM.SORT_VALUE.DESC,
//     id: 52
//   }
// ]

export const SALE_TYPE = {
  NORMAL_PRODUCT: 0,
  AUCTION_PRODUCT: 1
}

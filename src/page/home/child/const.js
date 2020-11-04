import { ENUM } from '../../../const/enum'

// 肺炎捐赠活动首页
const FEIYAN_DONATE_INDEX =
  'production' === process.env.NODE_ENV ? 'https://m.huanhuanyiwu.com/h5/operation.html#/donate' : '/operation/#/donate'
export const BANNER_BELOW_SLIDER = {
  thumb: require('../../../assets/image/home-banner-below-sliders/index-banner-donate.png'),
  link: FEIYAN_DONATE_INDEX
}

export const BANNER_ICON_CONFIG = [
  {
    name: '美妆',
    type: 'beautyMakeup',
    bg: require('../../../assets/image/hh-icon/b0-home/subbanner-beautyMakeup.png'),
    url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fmeizhuang_wap'
    // icon: 'car'
  },
  {
    name: '腕表',
    type: 'watch',
    bg: require('../../../assets/image/hh-icon/b0-home/subbanner-watch.png'),
    url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fbiaozhuanqu_wap'
  },
  {
    name: '美食',
    type: 'food',
    bg: require('../../../assets/image/hh-icon/b0-home/subbanner-food.png'),
    url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fshiping_wap'
  },
  {
    name: '旅行',
    type: 'travel',
    bg: require('../../../assets/image/hh-icon/b0-home/subbanner-travel.png'),
    url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Flvxing_wap'
  }
]

export const RECOMMEND_CONFIG = [
  [
    {
      type: 'huanhuanke',
      layout: 'f-t-two',
      title: '守护健康',
      subtitle: '宅在家里&nbsp;&nbsp;购物也无忧',
      subtitleDesc: '',
      bg: [
        require('../../../assets/image/hh-icon/b0-home/block-recommend/health_left.png'),
        require('../../../assets/image/hh-icon/b0-home/block-recommend/health_right.png')
      ],
      tag: require('../../../assets/image/hh-icon/b0-home/block-recommend/health_tag.png'),
      url: 'https://m.huanhuanyiwu.com/h5/operation.html#/operationPage/yiqing_wap'
      // router: {
      //   name: 'pickGoods'
      // }
    },
    {
      type: 'quanyi',
      layout: 'f-t-two',
      title: '汽车生活',
      subtitle: '权益租购&nbsp;&nbsp;买车更轻松',
      subtitleDesc: '',
      url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https://www.itouzi.com/e/chexilie_wap',
      bg: [require('../../../assets/image/hh-icon/b0-home/block-recommend/car.png')],
      router: {}
    }
  ],
  [
    {
      type: 'high-hb',
      layout: 'f-mdl-two',
      title: '高权益专区',
      subtitle: '权益占比高',
      subtitleDesc: '达80%以上',
      url: '',
      bg: [
        require('../../../assets/image/hh-icon/b0-home/block-recommend/highHB-left.png'),
        require('../../../assets/image/hh-icon/b0-home/block-recommend/highHB-right.png')
      ],
      router: {
        name: 'products',
        query: { tags_id: ENUM.TAGS_IDS.HIGH_HB }
      }
    },
    {
      type: 'special-offer',
      layout: 'f-mdl-two',
      title: '百元特价专区',
      subtitle: '低价享好物',
      subtitleDesc: '全场9.9元起',
      url: '',
      bg: [
        require('../../../assets/image/hh-icon/b0-home/block-recommend/100yuan-left.png'),
        require('../../../assets/image/hh-icon/b0-home/block-recommend/100yuan-right.png')
      ],
      router: {
        name: 'products',
        query: { tags_id: ENUM.TAGS_IDS.SPECIAL_OFFER }
      }
    }
  ]
]

export const HOT_TAGS = [
  require('../../../assets/image/hh-icon/b0-home/tag-pop.png'),
  require('../../../assets/image/hh-icon/b0-home/tag-hot.png'),
  require('../../../assets/image/hh-icon/b0-home/tag-celebrity.png'),
  require('../../../assets/image/hh-icon/b0-home/tag-reputably.png')
]

export const HOME_FLOOR = [
  {
    name: '食品生鲜',
    type: 'food-fresh',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.FOOD_FRESH,
      category: '805'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-food-fresh-bg.png')
  },
  {
    name: '美妆护肤',
    type: 'makeup',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.MAKEUP,
      category: '808'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-makeup-bg.png')
  },
  {
    name: '服装内衣',
    type: 'costume',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.COSTUME,
      category: '807'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-costume-bg.png')
  },
  {
    name: '家用电器',
    type: 'electric',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.ELECTRIC,
      category: '803'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-electric-bg.png')
  },
  {
    name: '珠宝配饰',
    type: 'jewelry',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.JEWELRY,
      category: '804'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-jewelry-bg.png')
  },
  {
    name: '居家清洁',
    type: 'clean',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.DAILY_NECESSITIES,
      category: '810'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-clean-bg.png')
  },
  {
    name: '箱包鞋靴',
    type: 'bags-shoes',
    params: {
      admin_order: ENUM.ADMIN_ORDER.ORDERED,
      tags_id: ENUM.TAGS_IDS.BAGS_SHOES,
      category: '809'
    },
    bg: require('../../../assets/image/hh-icon/b0-home/floor-bags-shoes-bg.png')
  }
]

// 首页 运营弹窗
export const HOME_POPUP = {
  switch: true, // 开关
  online: {
    src: require('../../../assets/image/hh-icon/b0-home/pop-online.png'),
    url: 'https://m.huanhuanyiwu.com/h5/#/sharerDetail?id=7875'
  },
  offline: {
    src: require('../../../assets/image/home-popup/index-popup-serviceOff.png'),
    url: ''
  }
}
// 胶囊banner
export const CAPSULE_BANNER = {
  switch: true, // 开关
  src: require('../../../assets/image/home-jiaolang/banner-springGoods-festival.gif'),
  url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fnianhuojie_wap'
}

// 2019-11-11 活动
const page_2019_1111 = 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fyure_wap'
const page_2019_10_to_11 =
  'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fshuangshiyibaofa_wap'
// 2019-双11入口配置
export const HOME_POPUP_1111 = {
  '2019-11-01': {
    src: require('../../../assets/image/2019-1111/popup/10.png'),
    url: page_2019_1111
  },
  '2019-11-02': {
    src: require('../../../assets/image/2019-1111/popup/9.png'),
    url: page_2019_1111
  },
  '2019-11-03': {
    src: require('../../../assets/image/2019-1111/popup/8.png'),
    url: page_2019_1111
  },
  '2019-11-04': {
    src: require('../../../assets/image/2019-1111/popup/7.png'),
    url: page_2019_1111
  },
  '2019-11-05': {
    src: require('../../../assets/image/2019-1111/popup/6.png'),
    url: page_2019_1111
  },
  '2019-11-06': {
    src: require('../../../assets/image/2019-1111/popup/5.png'),
    url: page_2019_1111
  },
  '2019-11-07': {
    src: require('../../../assets/image/2019-1111/popup/4.png'),
    url: page_2019_1111
  },
  '2019-11-08': {
    src: require('../../../assets/image/2019-1111/popup/3.png'),
    url: page_2019_1111
  },
  '2019-11-09': {
    src: require('../../../assets/image/2019-1111/popup/2.png'),
    url: page_2019_1111
  }
}
export const CAPSULE_BANNER_1111 = {
  '2019-11-01': {
    src: require('../../../assets/image/2019-1111/capsule/10.gif'),
    url: page_2019_1111
  },
  '2019-11-02': {
    src: require('../../../assets/image/2019-1111/capsule/9.gif'),
    url: page_2019_1111
  },
  '2019-11-03': {
    src: require('../../../assets/image/2019-1111/capsule/8.gif'),
    url: page_2019_1111
  },
  '2019-11-04': {
    src: require('../../../assets/image/2019-1111/capsule/7.gif'),
    url: page_2019_1111
  },
  '2019-11-05': {
    src: require('../../../assets/image/2019-1111/capsule/6.gif'),
    url: page_2019_1111
  },
  '2019-11-06': {
    src: require('../../../assets/image/2019-1111/capsule/5.gif'),
    url: page_2019_1111
  },
  '2019-11-07': {
    src: require('../../../assets/image/2019-1111/capsule/4.gif'),
    url: page_2019_1111
  },
  '2019-11-08': {
    src: require('../../../assets/image/2019-1111/capsule/3.gif'),
    url: page_2019_1111
  },
  '2019-11-09': {
    src: require('../../../assets/image/2019-1111/capsule/2.gif'),
    url: page_2019_1111
  },
  '2019-11-10': {
    src: require('../../../assets/image/2019-1111/capsule/11-11.gif'),
    url: page_2019_10_to_11
  },
  '2019-11-11': {
    src: require('../../../assets/image/2019-1111/capsule/11-11.gif'),
    url: page_2019_10_to_11
  },
  '2019-11-12': {
    src: require('../../../assets/image/2019-1111/capsule/11-11.gif'),
    url: page_2019_10_to_11
  },
  '2019-11-13': {
    src: require('../../../assets/image/2019-1111/capsule/11-11.gif'),
    url: page_2019_10_to_11
  }
}

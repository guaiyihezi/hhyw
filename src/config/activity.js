// 节日主题
const activity_tabar = {
  switch: true, // 是否启用活动主题底部导航（底部图片尺寸变大）
  startTime: 1579795200000, // 主题开始时间
  endTime: 1581177600000, // 主题结束时间
  bannerBg: require('../assets/image/chunjie0124/home-bg.png'), // 活动背景图
  tabColor: 'rgba(119, 37, 8, 1)', // 底部文字颜色 - 未激活
  tabActiveColor: 'rgba(196, 125, 29, 1)', // 底部文字颜色 - 激活
  data: [
    {
      name: '首页',
      link: 'home',
      key: 0,
      bgurl: require('../assets/image/chunjie0124/icon-home.png'),
      activeBgurl: require('../assets/image/chunjie0124/icon-home-active.png'),
      isActive: true
    },
    {
      name: '分类',
      link: 'category',
      key: 1,
      bgurl: require('../assets/image/chunjie0124/icon-class.png'),
      activeBgurl: require('../assets/image/chunjie0124/icon-class-active.png'),
      isActive: false
    },
    {
      name: '购物车',
      link: 'cart',
      params: { type: 1 },
      key: 3,
      bgurl: require('../assets/image/chunjie0124/icon-shop.png'),
      activeBgurl: require('../assets/image/chunjie0124/icon-shop-active.png'),
      isActive: false
    },
    {
      name: '我的',
      link: 'profile',
      key: 4,
      bgurl: require('../assets/image/chunjie0124/icon-person.png'),
      activeBgurl: require('../assets/image/chunjie0124/icon-person-active.png'),
      isActive: false
    }
  ],
  // barBg: require('../assets/image/hh-icon/activity/mid_autumn_festival/tab-bg.png'),
  BANNER_ICON_CONFIG: [
    {
      name: '美妆',
      type: 'beautyMakeup',
      bg: require('../assets/image/chunjie0124/icon-sub1.png'),
      url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fmeizhuang_wap'
      // icon: 'car'
    },
    {
      name: '腕表',
      type: 'watch',
      bg: require('../assets/image/chunjie0124/icon-sub2.png'),
      url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fbiaozhuanqu_wap'
    },
    // {
    //   name: '竞拍',
    //   type: 'auction',
    //   bg: require('../assets/image/shengdan1224/icon-sd3.png'),
    //   url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fjingpai_wap',
    //   // router: {
    //   //   name: 'auctionList'
    //   // },
    //   test: true
    // },
    {
      name: '美食',
      type: 'food',
      bg: require('../assets/image/chunjie0124/icon-sub3.png'),
      url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fshiping_wap'
    },
    {
      name: '旅行',
      type: 'travel',
      bg: require('../assets/image/chunjie0124/icon-sub4.png'),
      url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Flvxing_wap'
    },
    // {
    //   name: '玉石',
    //   type: 'tangka',
    //   bg: require('../assets/image/shengdan1224/icon-sd5.png'),
    //   url: 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fyouyuan_wap'
    // }
  ]
}

export { activity_tabar }

// home 首页
const Home = () => import(/* webpackChunkName: 'weight1' */ '@/page/home/Home')

// category 分类
const Category = () => import(/* webpackChunkName: 'weight1' */ '@/page/category/Category')

// product list 商品列表
const ProductList = () => import(/* webpackChunkName: 'weight1' */ '@/page/product-list/ProductList')

// search 搜索
const Search = () => import(/* webpackChunkName: 'weight1' */ '@/page/search/Search')

// 商品购买流程
// product detail 商品详情
const ProductDetail = () => import(/* webpackChunkName: 'weight1' */ '@/page/product-detail/ProductDetail')
// product 大连天宝 购买须知
const ProductShouldKnownBeforeby = () =>
  import(/* webpackChunkName: 'weight7' */ '@/page/product-detail/ShouldKnowBeforeBy')

// product comments
const ProductComments = () => import(/* webpackChunkName: 'weight7' */ '@/page/product-detail/ProductComments')
// product video
const ProductVideo = () => import(/* webpackChunkName: 'weight7' */ '@/page/product-detail/ProductVideo')
// checkout 确认订单
const Checkout = () => import(/* webpackChunkName: 'weight2' */ '@/page/checkout/Checkout')
const GoodsList = () => import(/* webpackChunkName: 'weight2' */ '@/page/checkout/GoodsList')
// payment 确认付款
const Payment = () => import(/* webpackChunkName: 'weight2' */ '@/page/payment/Payment')
const PaymentNew = () => import(/* webpackChunkName: 'weight2' */ '@/page/payment/PaymentNew')
const PaySucceed = () => import(/* webpackChunkName: 'weight2' */ '@/page/payment/PaySucceed')
const PayResult = () => import(/* webpackChunkName: 'weight2' */ '@/page/payment/PayResult')

// address 地址
const AddressList = () => import(/* webpackChunkName: 'weight7' */ '@/page/address/AddressList')
const AddressManage = () => import(/* webpackChunkName: 'weight7' */ '@/page/address/AddressManage')
const AddressEdit = () => import(/* webpackChunkName: 'weight7' */ '@/page/address/AddressEdit')
// bond 债权兑换
const Bond = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/Bond')
const BondHD = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/BondHD')
const BondDebt = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/BondDebt')
const BondRules = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/BondRules')
const BondResult = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/BondResult')
const BondHbDesc = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/HbDesc')
const BondHDRules = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/BondHDRules')
const Recharge = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/Recharge')
const RechargeTips = () => import(/* webpackChunkName: 'weight7' */ '@/page/bond/RechargeTips')

// 品牌列表页
const Brand = () => import(/* webpackChunkName: 'weight7' */ '@/page/brand/Brand')
const BrandSearch = () => import(/* webpackChunkName: 'weight7' */ '@/page/brand/BrandSearch')

// auth 用户账户相关
const Login = () => import(/* webpackChunkName: 'weight1' */ '@/page/login/Login')
const LoginGuide = () => import(/* webpackChunkName: 'weight3' */ '@/page/login/LoginGuide')
const LoginAgreeForApp = () => import(/* webpackChunkName: 'weight3' */ '@/page/login/LoginAgreeForApp')
const Agreement = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/Agreement')
const WebPage = () => import(/* webpackChunkName: 'weight2' */ '@/page/auth/WebPage')
const AuthPage = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/AuthPage')
const Auth = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/Auth')
const AgreementPage = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/AgreementPage')
const AuthResult = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/AuthResult')
const AuthFirstStepResult = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/AuthFirstStepResult')
const AuthManage = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/AuthManage')
const AuthPrePage = () => import(/* webpackChunkName: 'weight3' */ '@/page/auth/AuthPrePage')

// profile 用户信息
const Profile = () => import(/* webpackChunkName: 'weight1' */ '@/page/profile/Profile')
const Setting = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/Setting')
const Help = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/Help')
const ShopGuide = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/child/ShopGuide')
const Collection = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/Collection')
const About = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/About')
const DownLoadLead = () => import(/* webpackChunkName: 'weight1' */ '@/page/profile/DownLoadLead')
// 设置权益支付密码
const TransitionPwdSet = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/TransitionPwdSet')
// 修改权益支付密码
const TransitionPwdChange = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/TransitionPwdChange')
// 权益支付密码 免密设置
const SetTokenFreePayPwd = () => import(/* webpackChunkName: 'weight3' */ '@/page/profile/SetTokenFreePayPwd')

// order 订单
const Order = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/Order')
const OrderDetail = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/OrderDetail')
const OrderTrack = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/child/OrderTrack')
const OrderTrade = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/child/OrderTrade')
const OrderComment = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/child/OrderComment')
const OrderSubmit = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/child/OrderSubmit')
const OrderPayDetail = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/OrderPayDetail')
const OrderInstalDetail = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/OrderInstalDetail')
const OrderEveryInstalDetail = () => import(/* webpackChunkName: 'weight3' */ '@/page/order/OrderEveryInstalDetail')

// friendPayOrder 好友代付订单
const FriendPayOrder = () => import(/* webpackChunkName: 'weight3' */ '@/page/friendPayOrder/Order')
const FriendPayOrderDetail = () => import(/* webpackChunkName: 'weight3' */ '@/page/friendPayOrder/OrderDetail')
const FriendPayOrderPayDetail = () => import(/* webpackChunkName: 'weight3' */ '@/page/friendPayOrder/OrderPayDetail')

// balance
const BalanceHistory = () => import(/* webpackChunkName: 'weight3' */ '@/page/balance/BalanceHistory')

// refund 退款结果
const RefundResult = () => import(/* webpackChunkName: 'weight3' */ '@/page/refund/RefundResult')

// 消息提示
const Message = () => import(/* webpackChunkName: 'weight3' */ '@/page/message/Message')
const MessageList = () => import(/* webpackChunkName: 'weight3' */ '@/page/message/MessageList')

// 换换客 账户相关
const HuankeProfile = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeProfile')
const HuankeAccount = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeAccount')
const HuankeBalanceHistory = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeBalanceHistory')
const HuankeOrder = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeOrder')
const HuankeShareCheckout = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeShareCheckout')
const HuankeOrderDetail = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeOrderDetail')
const HuankeIntro = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeIntro')
const HuanKeConfirm = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeConfirm')
const HuanKeResult = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeResult')
const HuanKeOrderPayDetail = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeOrderPayDetail')
const HuankeWithdraw = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/HuankeWithdraw')
const WithdrawResult = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/WithdrawResult')

// 分销商品列表（池子）
const ChooseProductList = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/ChooseProductList')
// 换换客小店数据看板
const ShopDashboard = () => import(/* webpackChunkName: 'weight4' */ '@/page/huanhuanke/ShopDashboard')

// product list 分销商品列表
const MlmProductList = () => import(/* webpackChunkName: 'weight4' */ '@/page/product-dis-list/MlmProductList')
// mlm【换换客】买家流程
const MlmBuyerProductDetail = () => import(/* webpackChunkName: 'weight4' */ '@/page/product-dis-detail/BuyerDetail')
// mlm【换换客】分享流程
const MlmSharerProductDetail = () => import(/* webpackChunkName: 'weight4' */ '@/page/product-dis-detail/SharerDetail')

// 一键下车
const ExpandDebt = () => import(/* webpackChunkName: 'weight4' */ '@/page/expandDebt/ExpandDebt')

// 工单相关
//工单信息列表
const WorkorderMessage = () => import(/* webpackChunkName: 'weight5' */ '@/page/workorder/WorkorderMessage')
//添加工单信息
const Addmessage = () => import(/* webpackChunkName: 'weight5' */ '@/page/workorder/Addmessage')
//工单列表
const WorkorderList = () => import(/* webpackChunkName: 'weight5' */ '@/page/workorder/WorkorderList')
//创建工单
const AddWorkorder = () => import(/* webpackChunkName: 'weight5' */ '@/page/workorder/AddWorkorder')

// supplier 商家
const Supplier = () => import(/* webpackChunkName: 'weight2' */ '@/page/supplier/Supplier')
const SupplierInfo = () => import(/* webpackChunkName: 'weight6' */ '@/page/supplier/SupplierInfo')
const LicenseShow = () => import(/* webpackChunkName: 'weight6' */ '@/page/supplier/LicenseShow')

// friendPay 好友代付
const FriendPayIndex = () => import(/* webpackChunkName: 'weight6' */ '@/page/friendPay/Index')
const FriendPayConfirm = () => import(/* webpackChunkName: 'weight6' */ '@/page/friendPay/Confirm')
const FriendPayResult = () => import(/* webpackChunkName: 'weight6' */ '@/page/friendPay/Result')

// cart 购物车
const Cart = () => import(/* webpackChunkName: 'weight2' */ '@/page/cart/Cart')

// mystore 我的小店
const MyStore = () => import(/* webpackChunkName: 'weight1' */ '@/page/huanhuanke/MyStore')
// 我的小店基本信息设置
const ShopInfo = () => import(/* webpackChunkName: 'mystore' */ '@/page/huanhuanke/ShopInfo')
const ExitShopName = () => import(/* webpackChunkName: 'mystore' */ '@/page/huanhuanke/ExitShopName')
const ExitShopWelcome = () => import(/* webpackChunkName: 'mystore' */ '@/page/huanhuanke/ExitShopWelcome')
const ManageCategoryList = () => import(/* webpackChunkName: 'mystore' */ '@/page/huanhuanke/ManageCategoryList')

// 换换客店铺（买家视角
const ShopForBuyer = () => import(/* webpackChunkName: 'weight8' */ '@/page/huanhuanke/ShopForBuyer')

// const Error = () => import(/* webpackChunkName: 'weight6' */ '@/components/common/Error')

// 秒杀页面
const Seckill = () => import(/* webpackChunkName: 'weight8' */ '@/page/seckill/SeckillList')
const SeckillProduct = () => import(/* webpackChunkName: 'weight8' */ '@/page/product-sec-detail/ProductDetail')

// 账单
const BillDetail = () => import(/* webpackChunkName: 'weight9' */ '@/page/bill/BillDetail')

// 优惠券
const CouponList = () => import(/* webpackChunkName: 'weight9' */ '@/page/coupon/CouponList')
const CouponProductList = () => import(/* webpackChunkName: 'weight9' */ '@/page/coupon/CouponProductList')
const ReceiveCoupon = () => import(/* webpackChunkName: 'weight9' */ '@/page/coupon/ReceiveCoupon')
const CouponMerge = () => import(/* webpackChunkName: 'weight9' */ '@/page/coupon/CouponMerge')

// 竞拍
const AuctionList = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionList')
const AuctionDetail = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionDetail')
const AuctionRules = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionRules')
const AuctionAgreement = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionAgreement')
const AuctionOffer = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionOffer')
const AuctionBzjCheckout = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionBzjCheckout')
const AuctionBzjPay = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionBzjPay')
const AuctionBzjResult = () => import(/* webpackChunkName: 'weight8' */ '@/page/auction/AuctionBzjResult')

// 我的竞拍
const MyC2B = () => import(/* webpackChunkName: 'myc2b' */ '@/page/myC2B/Index')
const DetailBzj = () => import(/* webpackChunkName: 'myc2b' */ '@/page/myC2B/DetailBzj')
// 拍拍 消息
const MessagePaipaiList = () => import(/* webpackChunkName: 'weight3' */ '@/page/message/MessagePaipaiList')

// 限时促销
const PromotionList = () => import(/* webpackChunkName: 'weight1' */ '@/page/promotions/PromotionList')
const PromotionDetail = () => import(/* webpackChunkName: 'weight1' */ '@/page/promotions/PromotionDetail')

// 活动跳转页面
const ActiveLoadingPage = () => import(/* webpackChunkName: 'weight10' */ '@/page/festival/LoadingPage')

//价格投诉
const GoodsPriceComplaint = () => import(/* webpackChunkName: 'weight9' */ '@/page/PriceComplaint/goodsPriceComplaint')
const GoodsPriceComplaintDetail = () =>
  import(/* webpackChunkName: 'weight9' */ '@/page/PriceComplaint/GoodsPriceComplaintDetail')

// 价格投诉说明页
const PriceJudgeDesc = () => import(/*webpackChunkName: 'weight9'*/ '@/page/profile/priceJudge/PriceJudgeDesc')
// 我的价格投诉记录
const MyPriceJudge = () => import(/*webpackChunkName: 'weight9'*/ '@/page/profile/priceJudge/MyPriceJudge')
//隐私政策
const PrivacyPolicy = () => import(/* webpackChunkName: 'weight11' */ '@/page/login/PrivacyPolicy')

// 商城公告
const Notice = () => import(/*webpackChunkName: 'weight10'*/ '@/page/notice/Notice')

export default [
  {
    name: '',
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
      noLogin: true,
      isshowtabbar: true
    }
  },
  {
    name: 'category',
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
      noLogin: true,
      isshowtabbar: true
    }
  },
  // 我的小店
  {
    name: 'myStore',
    path: '/myStore',
    component: MyStore,
    meta: {
      title: '我的小店',
      isshowtabbar: true
    }
  },
  // 我的小店基本信息设置
  {
    name: 'shopInfo',
    path: '/shopInfo',
    component: ShopInfo,
    meta: {
      title: '我的小店基本信息'
    }
  },
  {
    name: 'exitShopName',
    path: '/exitShopName',
    component: ExitShopName,
    meta: {
      title: '小店昵称'
    }
  },
  {
    name: 'exitShopWelcome',
    path: '/exitShopWelcome',
    component: ExitShopWelcome,
    meta: {
      title: '小店迎宾语'
    }
  },
  {
    name: 'manageCategoryList',
    path: '/manageCategoryList',
    component: ManageCategoryList,
    meta: {
      title: '分类列表管理'
    }
  },
  {
    name: 'products',
    path: '/products',
    component: ProductList,
    meta: {
      component_title: '商品',
      noLogin: true
    }
  },
  {
    name: 'mlmProducts',
    path: '/mlmProducts',
    component: MlmProductList,
    meta: {
      component_title: '分销返佣'
    }
  },
  // search
  {
    name: 'search',
    path: '/search',
    component: Search,
    meta: {
      component_title: '搜索',
      noLogin: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      noLogin: true
    }
  },
  {
    name: 'loginGuide',
    path: '/loginGuide',
    component: LoginGuide,
    meta: {
      title: '登录引导',
      noLogin: true
    }
  },
  {
    name: 'LoginAgreeForApp',
    path: '/LoginAgreeForApp',
    component: LoginAgreeForApp,
    meta: {
      title: '登录协议',
      noLogin: true
    }
  },
  {
    name: 'agreement',
    path: '/agreement',
    component: Agreement,
    meta: {
      title: '协议',
      noLogin: true
    }
  },
  {
    name: 'webPage',
    path: '/webPage',
    component: WebPage,
    meta: {
      component_title: '帮助webview',
      noLogin: true
    }
  },
  {
    name: 'authPage',
    path: '/authPage',
    component: AuthPage,
    meta: {
      component_title: '跳转授权'
    }
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth,
    meta: {
      component_title: '授权'
    }
  },
  {
    name: 'agreementPage',
    path: '/agreementPage',
    component: AgreementPage,
    meta: {
      title: '第1步 签署协议'
    }
  },
  {
    name: 'AuthFirstStepResult',
    path: '/AuthFirstStepResult',
    component: AuthFirstStepResult,
    meta: {
      title: '签署成功'
    }
  },
  {
    name: 'AuthManage',
    path: '/AuthManage',
    component: AuthManage,
    meta: {
      title: '授权管理'
    }
  },
  {
    name: 'authResult',
    path: '/authResult/:result',
    component: AuthResult,
    meta: {
      title: '授权结果'
    }
  },
  {
    name: 'authPrePage',
    path: '/authPrePage',
    component: AuthPrePage,
    meta: {
      title: '授权认证'
    }
  },
  // profile
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    meta: {
      component_title: '我的',
      isshowtabbar: true
    }
  },
  {
    name: 'downloadapp',
    path: '/downloadapp',
    component: DownLoadLead,
    meta: {
      title: '下载APP',
      noLogin: true
    }
  },
  {
    name: 'setting',
    path: '/setting',
    component: Setting,
    meta: {
      title: '设置'
    }
  },
  {
    name: 'help',
    path: '/help',
    component: Help,
    meta: {
      title: '帮助中心'
    }
  },
  {
    name: 'shopGuide',
    path: '/shopGuide',
    component: ShopGuide,
    meta: {
      title: '购物指南',
      noLogin: true
    }
  },
  {
    name: 'Collection',
    path: '/collection',
    component: Collection,
    meta: {
      title: '我的收藏'
    }
  },
  {
    name: 'About',
    path: '/about',
    component: About,
    meta: {
      title: '关于换换',
      noLogin: true
    }
  },
  // address
  {
    name: 'addressList',
    path: '/addressList',
    component: AddressList,
    meta: {
      title: '收货地址'
    }
  },
  {
    name: 'addressManage',
    path: '/addressManage',
    component: AddressManage,
    meta: {
      title: '管理收货地址',
      keepAlive: false
    }
  },
  {
    name: 'addressEdit',
    path: '/addressManage/addressEdit',
    component: AddressEdit,
    meta: {
      title: '修改收货地址',
      keepAlive: false
    }
  },
  {
    name: 'transPwdSet',
    path: '/transPwdSet',
    component: TransitionPwdSet,
    meta: {
      title: '设置交易密码'
    }
  },
  {
    name: 'transPwdChange',
    path: '/transPwdChange',
    component: TransitionPwdChange,
    meta: {
      title: '修改交易密码'
    }
  },
  {
    name: 'setTokenFreePayPwd',
    path: '/setTokenFreePayPwd',
    component: SetTokenFreePayPwd,
    meta: {
      title: '小额权益免密支付'
    }
  },
  // bond
  {
    name: 'bond',
    path: '/bond',
    component: Bond,
    meta: {
      title: '我的权益'
    }
  },
  {
    name: 'BondHD',
    path: '/bondhd',
    component: BondHD,
    meta: {
      title: '我的浣豆'
    }
  },
  {
    name: 'bondDebt',
    path: '/bondDebt',
    component: BondDebt,
    meta: {
      title: '选择债权'
    }
  },
  {
    name: 'bondRules',
    path: '/bondRules',
    component: BondRules,
    meta: {
      title: '兑换规则'
    }
  },
  {
    name: 'bondResult',
    path: '/bondResult',
    component: BondResult,
    meta: {
      title: '兑换结果页'
    }
  },
  {
    name: 'hbDesc',
    path: '/hbDesc',
    component: BondHbDesc,
    meta: {
      title: '权益说明'
    }
  },
  {
    name: 'BondHDRules',
    path: '/BondHDRules',
    component: BondHDRules,
    meta: {
      title: '浣豆说明'
    }
  },
  {
    name: 'recharge',
    path: '/recharge',
    component: Recharge,
    meta: {
      title: '权益充值'
    }
  },
  {
    name: 'rechargeTips',
    path: '/rechargeTips',
    component: RechargeTips,
    meta: {
      title: '权益充值卡密说明'
    }
  },
  {
    name: 'brand',
    path: '/brand',
    component: Brand,
    meta: {
      title: '品牌列表页'
    }
  },
  {
    name: 'brandSearch',
    path: '/brandSearch',
    component: BrandSearch,
    meta: {
      title: '品牌搜索页'
    }
  },
  // checkout
  {
    name: 'checkout',
    path: '/checkout/:isCart?',
    component: Checkout,
    meta: {
      title: '确认订单',
      keepAlive: false
    }
  },
  {
    name: 'goodsList',
    path: '/checkout/goodsList',
    component: GoodsList,
    meta: {
      title: '配送方式'
    }
  },
  // payment
  // 原订单支付页，现只给分期商品用
  {
    name: 'paymentHuan',
    path: '/paymentHuan',
    component: Payment,
    meta: {
      title: '订单支付'
    }
  },
  // 新订单支付页，只支持现金支付
  {
    name: 'payment',
    path: '/payment',
    component: PaymentNew,
    meta: {
      title: '订单支付'
    }
  },
  {
    name: 'paySucceed',
    path: '/paySucceed',
    component: PaySucceed,
    meta: {
      title: '购买成功'
    }
  },
  {
    name: 'payResult',
    path: '/payResult',
    component: PayResult,
    meta: {
      title: '购买结果'
    }
  },
  // order
  {
    name: 'order',
    path: '/order/:order?/',
    component: Order,
    meta: {
      title: '我的订单'
    }
  },
  {
    name: 'orderDetail',
    path: '/orderDetail/:orderDetail?/',
    component: OrderDetail,
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'orderPayDetail',
    path: '/orderPayDetail/:orderPayDetail?/',
    component: OrderPayDetail,
    meta: {
      title: '权益支付明细'
    }
  },
  {
    name: 'orderInstalDetail',
    path: '/orderInstalDetail/:orderInstalDetail?/',
    component: OrderInstalDetail,
    meta: {
      title: '分期明细'
    }
  },
  {
    name: 'orderEveryInstalDetail',
    path: '/orderEveryInstalDetail/:orderEveryInstalDetail?/',
    component: OrderEveryInstalDetail,
    meta: {
      title: '分期详细信息'
    }
  },
  // refund
  {
    name: 'refundResult',
    path: '/refundResult',
    component: RefundResult,
    meta: {
      title: '退款申请结果'
    }
  },
  {
    name: 'Supplier',
    path: '/Supplier/:id?/',
    component: Supplier,
    meta: {
      title: '店铺首页',
      noLogin: true
    }
  },
  {
    name: 'SupplierInfo',
    path: '/SupplierInfo/:id?/',
    component: SupplierInfo,
    meta: {
      title: '店铺信息',
      noLogin: true
    }
  },
  {
    name: 'LicenseShow',
    path: '/LicenseShow',
    component: LicenseShow,
    meta: {
      title: '执照展示',
      noLogin: true
    }
  },
  // friendOrder
  {
    name: 'friendPayOrder',
    path: '/friendPayOrder/:order?/',
    component: FriendPayOrder,
    meta: {
      title: '我的订单'
    }
  },
  {
    name: 'friendPayOrderDetail',
    path: '/friendPayOrderDetail/:orderDetail?/',
    component: FriendPayOrderDetail,
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'friendPayOrderPayDetail',
    path: '/friendPayOrderPayDetail/:orderPayDetail?/',
    component: FriendPayOrderPayDetail,
    meta: {
      title: '权益支付明细'
    }
  },
  {
    name: 'orderTrack',
    path: '/orderTrack/:orderTrack?',
    component: OrderTrack,
    meta: {
      title: '订单跟踪'
    }
  },
  {
    name: 'orderTrade',
    path: '/orderTrade',
    component: OrderTrade,
    meta: {
      title: '交易成功'
    }
  },
  {
    name: 'orderComment',
    path: '/orderComment',
    component: OrderComment,
    meta: {
      title: '评价宝贝'
    }
  },
  {
    name: 'orderSubmit',
    path: '/orderSubmit',
    component: OrderSubmit,
    meta: {
      title: '评价成功'
    }
  },
  // product detail
  {
    name: 'product',
    path: '/product/:id?/:productId?',
    component: ProductDetail,
    meta: {
      title: '商品详情',
      noLogin: true
    }
  },
  // product ProductShouldKnownBefore
  {
    name: 'shouldKnownBefore',
    path: '/shouldKnownBefore',
    component: ProductShouldKnownBeforeby,
    meta: {
      title: '购买须知',
      noLogin: true
    }
  },
  // product comments
  {
    name: 'comments',
    path: '/comments/:id?',
    component: ProductComments,
    meta: {
      title: '商品评论',
      noLogin: true
    }
  },
  // product vedio
  {
    name: 'video',
    path: '/video/:src?',
    component: ProductVideo,
    meta: {
      title: '视频',
      noLogin: true
    }
  },
  // cart
  {
    name: 'cart',
    path: '/cart/:type?',
    component: Cart,
    meta: {
      component_title: '购物车',
      isshowtabbar: true,
      setIsShowTabBar: 'type'
    }
  },
  // other
  {
    name: 'balanceHistory',
    path: '/balanceHistory',
    component: BalanceHistory,
    meta: {
      title: '资金明细'
    }
  },
  {
    name: 'friendPayIndex',
    path: '/friendPayIndex/:id?',
    component: FriendPayIndex,
    meta: {
      title: '求代付'
    }
  },
  {
    name: 'friendPayConfirm',
    path: '/friendPayConfirm/:id?',
    component: FriendPayConfirm,
    meta: {
      title: '确认代付'
    }
  },
  {
    name: 'friendPayResult',
    path: '/friendPayResult/:orderId/:isSuccess?/:msg?',
    component: FriendPayResult,
    meta: {
      title: '代付结果'
    }
  },
  // product detail
  {
    name: 'buyerProduct',
    path: '/buyerProduct/:mlmId?',
    component: MlmBuyerProductDetail,
    meta: {
      title: '商品详情',
      noLogin: true
    }
  },
  // product detail
  {
    name: 'sharerDetail',
    path: '/sharerDetail/:id?',
    component: MlmSharerProductDetail,
    meta: {
      title: '商品详情',
      noLogin: true
    }
  },
  // 换换客
  {
    name: 'HuankeProfile',
    path: '/HuankeProfile',
    component: HuankeProfile,
    meta: {
      title: '换换客'
    }
  },
  {
    name: 'HuankeAccount',
    path: '/HuankeAccount',
    component: HuankeAccount,
    meta: {
      title: '账户佣金'
    }
  },
  {
    name: 'HuankeBalanceHistory',
    path: '/HuankeBalanceHistory',
    component: HuankeBalanceHistory,
    meta: {
      title: '收支明细'
    }
  },
  {
    name: 'HuankeOrder',
    path: '/HuankeOrder/:order?',
    component: HuankeOrder,
    meta: {
      title: '分销订单列表'
    }
  },
  {
    name: 'huankeShareCheckout',
    path: '/huankeShareCheckout/:id?',
    component: HuankeShareCheckout,
    meta: {
      title: '分销返佣详情'
    }
  },
  {
    name: 'HuankeOrderDetail',
    path: '/HuankeOrderDetail/:orderDetail?/',
    component: HuankeOrderDetail,
    meta: {
      title: '订单详情'
    }
  },
  {
    name: 'huankeIntro',
    path: '/huankeIntro',
    component: HuankeIntro,
    meta: {
      title: '分销返佣攻略'
    }
  },
  {
    name: 'HuanKeConfirm',
    path: '/HuanKeConfirm/:id?',
    component: HuanKeConfirm,
    meta: {
      title: '确认付款'
    }
  },
  {
    name: 'HuanKeResult',
    path: '/HuanKeResult/:id?',
    component: HuanKeResult,
    meta: {
      title: '支付成功'
    }
  },
  {
    name: 'HuanKeOrderPayDetail',
    path: '/HuanKeOrderPayDetail/:id?',
    component: HuanKeOrderPayDetail,
    meta: {
      title: '支付明细'
    }
  },
  {
    name: 'huankeWithdraw',
    path: '/huankeWithdraw',
    component: HuankeWithdraw,
    meta: {
      title: '提现'
    }
  },
  {
    name: 'shop',
    path: '/shop/:id',
    component: ShopForBuyer,
    meta: {
      title: '店铺'
    }
  },
  {
    name: 'shopDashboard',
    path: '/shopDashboard/:id?',
    component: ShopDashboard,
    meta: {
      title: '店铺数据看板'
    }
  },
  {
    name: 'withdrawResult',
    path: '/withdrawResult',
    component: WithdrawResult,
    meta: {
      title: '提现'
    }
  },
  {
    name: 'pickGoods',
    path: '/pickGoods',
    component: ChooseProductList,
    meta: {
      title: '分销商品列表'
    }
  },
  {
    name: 'WorkorderMessage',
    path: '/WorkorderMessage/:id?/:status?/:from?',
    component: WorkorderMessage,
    meta: {
      title: '工单信息详情'
    }
  },
  {
    name: 'Addmessage',
    path: '/Addmessage/:id',
    component: Addmessage,
    meta: {
      title: '新增反馈'
    }
  },
  {
    name: 'WorkorderList',
    path: '/WorkorderList/:id?',
    component: WorkorderList,
    meta: {
      title: '工单列表'
    }
  },
  {
    name: 'AddWorkorder',
    // path: '/AddWorkorder/:order_sn?/:goods_id?',
    path: '/AddWorkorder/:id?',
    component: AddWorkorder,
    meta: {
      title: '新建工单'
    }
  },
  {
    name: 'ExpandDebt',
    path: '/ExpandDebt/:hashid?',
    component: ExpandDebt,
    meta: {
      title: '债权兑换'
    }
  },

  {
    name: 'Seckill',
    path: '/Seckill',
    component: Seckill,
    meta: {
      title: '秒杀商品列表',
      noLogin: true
    }
  },
  {
    name: 'SeckillProduct',
    path: '/SeckillProduct/:id?',
    component: SeckillProduct,
    meta: {
      title: '秒杀商品详情',
      noLogin: true
    }
  },
  {
    name: 'billDetail',
    path: '/BillDetail/:id?',
    component: BillDetail,
    meta: {
      title: '账单详情页'
    }
  },
  {
    name: 'coupon',
    path: '/coupon',
    component: CouponList,
    meta: {
      title: '我的优惠券'
    }
  },
  {
    name: 'couponProductList',
    path: '/couponProductList/:id?',
    component: CouponProductList,
    meta: {
      title: '我的优惠券'
    }
  },
  {
    name: 'receiveCoupon',
    path: '/receiveCoupon/:id?',
    component: ReceiveCoupon,
    meta: {
      title: '领取优惠券'
    }
  },
  {
    name: 'couponMerge',
    path: '/couponMerge',
    component: CouponMerge,
    meta: {
      title: '合并优惠券'
    }
  },
  {
    name: 'auctionList',
    path: '/auctionList',
    component: AuctionList,
    meta: {
      title: '竞拍商品列表',
      noLogin: true
    }
  },
  {
    name: 'auctionDetail',
    path: '/auctionDetail/:id?',
    component: AuctionDetail,
    meta: {
      title: '竞拍商品详情',
      noLogin: true
    }
  },
  {
    name: 'message',
    path: '/message',
    component: Message,
    meta: {
      title: '消息'
    }
  },
  {
    name: 'messageList',
    path: '/messageList',
    component: MessageList,
    meta: {
      title: '消息'
    }
  },
  {
    name: 'auctionRules',
    path: '/auctionRules',
    component: AuctionRules,
    meta: {
      title: '竞拍规则',
      noLogin: true
    }
  },
  {
    name: 'auctionAgreement',
    path: '/auctionAgreement',
    component: AuctionAgreement,
    meta: {
      title: '竞拍规则',
      noLogin: true
    }
  },
  {
    name: 'auctionOffer',
    path: '/auctionOffer',
    component: AuctionOffer,
    meta: {
      title: '竞价'
    }
  },
  {
    name: 'auctionBzjCheckout',
    path: '/auctionBzjCheckout/:id?',
    component: AuctionBzjCheckout,
    meta: {
      title: '竞拍报名'
    }
  },
  {
    name: 'auctionBzjPay',
    path: '/auctionBzjPay',
    component: AuctionBzjPay,
    meta: {
      title: '保证金支付'
    }
  },
  {
    name: 'auctionBzjResult',
    path: '/auctionBzjResult',
    component: AuctionBzjResult,
    meta: {
      title: '保证金支付结果'
    }
  },
  {
    name: 'myc2b',
    path: '/myc2b',
    component: MyC2B,
    meta: {
      title: '我的竞拍'
    }
  },
  {
    name: 'detailBzj',
    path: '/detailBzj',
    component: DetailBzj,
    meta: {
      title: '保证金详情'
    }
  },
  {
    name: 'messagePaipaiList',
    path: '/messagePaipaiList',
    component: MessagePaipaiList,
    meta: {
      title: '消息'
    }
  },
  {
    name: 'promotionList',
    path: '/promotionList/:id?',
    component: PromotionList,
    meta: {
      title: '促销商品列表',
      noLogin: true
    }
  },
  {
    name: 'promotionDetail',
    path: '/promotionDetail/:id?',
    component: PromotionDetail,
    meta: {
      title: '促销商品详情',
      noLogin: true
    }
  },
  {
    name: 'activeLoadingPage',
    path: '/activeLoadingPage',
    component: ActiveLoadingPage,
    meta: {
      title: '活动跳转页面',
      noLogin: true
    }
  },
  {
    name: 'priceJudgeDesc',
    path: '/priceJudgeDesc',
    component: PriceJudgeDesc,
    meta: {
      title: '价格投诉说明'
    }
  },
  {
    name: 'myPriceJudge',
    path: '/myPriceJudge',
    component: MyPriceJudge,
    meta: {
      title: '我的价格投诉'
    }
  },
  {
    name: 'goodspricecomplaint',
    path: '/goodspricecomplaint',
    component: GoodsPriceComplaint,
    meta: {
      title: '价格投诉'
    }
  },
  {
    name: 'goodspricecomplaintDetail',
    path: '/goodspricecomplaintDetail/:id?',
    component: GoodsPriceComplaintDetail,
    meta: {
      title: '价格投诉详情'
    }
  },
  {
    name: 'notice',
    path: '/notice',
    component: Notice,
    meta: {
      title: '商城公告'
    }
  },
  {
    name: 'privacyPolicy',
    path: '/privacyPolicy',
    component: PrivacyPolicy,
    meta: {
      title: '隐私政策'
    }
  },
  {
    path: '*',
    name: 'error',
    redirect: '/home'
    // meta: {
    //   title: '找不到页面'
    // }
  }
]

// Error
const ErrorPage = () => import(/* webpackChunkName: 'bundleOperation' */ '../page/Error')
// 运营静态活动页
const OperationPage = () => import(/* webpackChunkName: 'bundleOperation' */ '../page/iXiu/Index')
// 肺炎 捐赠
const DonateIndex = () => import(/* webpackChunkName: 'bundleOperation' */ '../page/donate/Index')
// 捐赠统计明细
const DonateStatDetail = () => import(/* webpackChunkName: 'bundleOperation' */ '../page/donate/StatisticsDetail')

export default [
  {
    name: 'operationPage',
    path: '/operationPage/:id',
    component: OperationPage,
    meta: {
      title: '运营页'
    }
  },
  {
    name: 'donate',
    path: '/donate',
    component: DonateIndex,
    meta: {
      title: '爱心捐赠'
    }
  },
  {
    name: 'donateStatDetail',
    path: '/donateStatDetail/:log_id',
    component: DonateStatDetail,
    meta: {
      title: '捐赠明细'
    }
  },
  {
    // 首页
    path: '/',
    redirect: '/mall'
  },
  {
    // 进入商城
    name: 'mall',
    path: '/mall',
    beforeEnter: (to, from, next) => {
      const mallPath = 'production' === process.env.NODE_ENV ? '/h5' : '/index'
      window.location.href = mallPath
    }
  },
  {
    path: '*',
    name: 'error',
    component: ErrorPage
  }
]

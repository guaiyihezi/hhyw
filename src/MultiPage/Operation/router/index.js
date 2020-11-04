import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
})

router.afterEach((to, from) => {
  document.title = (to.meta.title ? to.meta.title + '-' : '') + '换换商城'
})

Vue.use(VueRouter)

export default router

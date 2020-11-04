<template>
  <div class="container">
    <home-header
      class="header-home"
      :headerBackgroundOpacite="headerBackgroundOpacite"
      :style="{
        backgroundColor: 'rgba(255, 255, 255, ' + headerBackgroundOpacite + ')'
      }"
      ref="h_head"
    ></home-header>
    <div class="list js-home-list scroll-container-keepAlive" @scroll="handleScroll">
      <div class="home-banner">
        <home-banner v-if="banners && banners.length > 0" :items="banners"></home-banner>
      </div>

      <banner-below-slider></banner-below-slider>

      <!-- banner下方的模块 -->
      <div class="wrapper-container">
        <home-sub-banner></home-sub-banner>
        <!-- 2019-09-10 新人专享临时下线 --from 运营 -->
        <!-- <home-new-user :items="newUserList" v-if="newUserList.length > 0"></home-new-user> -->
        <!-- 2019-09-10 首页换换小店临时下线 --from 运营 -->
        <capsule-banner></capsule-banner>
      </div>

      <!-- 秒杀专区 -->
      <home-seckill ref="seckill"></home-seckill>

      <!-- 品牌专区 -->
      <home-brand></home-brand>

      <!-- 特色推荐专区 -->
      <home-recommend></home-recommend>

      <!-- 24H top榜 -->
      <home-product-dayhot
        :items="hotProducts"
        :type="suppliersDay"
        v-if="hotProducts && hotProducts.length > 0"
      ></home-product-dayhot>

      <!-- 新品首发 -->
      <home-product-new></home-product-new>

      <!-- 权益租赁汽车 -->
      <!-- <a class="ad-car" href="https://lx.huanhuanyiwu.com/abs_base_web/webpage/huanhuan/index.html">
        <img src="../../assets/image/hh-icon/b0-home/car_bg.png" />
      </a> -->

      <template v-for="(item, index) in HOME_FLOOR">
        <home-product-floor :cur="index" :config="item" :ref="`floor${index}`" :key="index"></home-product-floor>
      </template>

      <!-- 新手banner 长期保留（后期会用到） -->
      <router-link tag="div" :to="{ name: 'mlmProducts' }" class="new-user-banner" v-if="false">
        <img src="../../assets/image/hh-icon/b0-home/home-new-user.png" alt="" />
      </router-link>
    </div>
    <back-top v-if="isshowBacktop" :target="target" :bottom="70"></back-top>

    <home-popup></home-popup>
    <coupon-toast></coupon-toast>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { HeaderItem } from '../../components/common'
import BackTop from '../../components/common/BackTop'
import HomeHeader from './child/HomeHeader'
import HomeBanner from './child/HomeBanner'
import HomeSeckill from './child/HomeSeckill'
import HomeProductDayhot from './child/HomeProductDayhot'
import HomeProductNew from './child/HomeProductNew'
import CouponToast from './child/couponToast'
import { ENUM } from '../../const/enum'
import { productList, getCoupon, receiveCoupon } from '../../api/product'

import HomeSubBanner from './child/HomeSubBanner'
import HomeRecommend from './child/HomeRecommend'
import HomeBrand from './child/HomeBrand'
import HomeProductFloor from './child/HomeProductFloor'
import { HOME_FLOOR } from './child/const'

// 运营弹图
import HomePopup from './child/HomePopup'
// 胶囊Banner
import CapsuleBanner from './child/CapsuleBanner'
// slider下方Banner
import BannerBelowSlider from './child/BannerBelowSlider'

export default {
  name: 'home',
  data() {
    return {
      headerBackgroundOpacite: 0,
      authAccreditFixed: false,
      isshowBacktop: false,
      suppliersDay: ENUM.SORT_KEY.SALES_FOR_TODAY,
      HOME_FLOOR,
      newUserList: [] // 新人专享区块数据
    }
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user,
      config: state => state.config.config,
      banners: state => state.home.banners,
      hotProducts: state => state.home.hotProducts
    })
  },
  components: {
    HomeHeader,
    HomeBanner,
    HomeSeckill,
    HomeProductDayhot,
    HomeProductNew,
    BackTop,
    CouponToast,
    HomeSubBanner,
    HomeRecommend,
    HomeBrand,
    HomeProductFloor,
    HomePopup,
    CapsuleBanner,
    BannerBelowSlider
  },
  mounted() {
    this.handleScroll()
    this.target = document.querySelector('.list')
    this.saveAuthInfo()

    for (let i = 0; i < this.HOME_FLOOR.length; i++) {
      setTimeout(() => {
        // 注意：该定时器 理论上应该在页面离开时销毁，要不组件销毁后this.$ref为空（but当前页面使用了keepAlive缓存，所以暂时没事
        this.$refs[`floor${i}`][0].getList()
      }, (i + 1) * 500)
    }
  },
  created() {
    if (!(this.banners && this.banners.length)) {
      this.$indicator.open()
    }

    this.getHomeBanner()
    this.getHomeProducts()

    // 获取新人专享列表
    // 2019-09-10 新人专享临时下线 --from 运营
    // this.getNewUserList()

    // this.loadConfig()   // 中断不走wx 20181224
    // if (this.isOnline) {
    //   // 获取推荐分成链接
    //   this.loadBonusData()
    // }
  },

  // keepAlive 被唤醒时
  activated() {
    this.handleScroll()
    // 更新秒杀商品
    this.$refs.seckill.fetchHomeSeckillProducts()
    // check未读消息
    this.checkUnReadMsg()
    // this.postCoupon()
  },

  methods: {
    ...mapMutations({
      saveToken: 'saveToken',
      setIsTop: 'SET_IS_TOP'
    }),
    ...mapActions({
      fetchHomeBanner: 'fetchHomeBanner',
      fetchHomeProduct: 'fetchHomeProduct',
      checkUnReadMsg: 'checkUnReadMsg'
      // fetchConfig: 'fetchConfig'
    }),

    // 获取首页banner数据
    getHomeBanner() {
      this.fetchHomeBanner().then(
        res => {
          this.$indicator.close()
        },
        error => {
          this.$indicator.close()
          this.$toast(error.errorMsg)
        }
      )
    },

    // 获取首页商品数据
    getHomeProducts() {
      this.fetchHomeProduct().then(
        res => {
          this.$indicator.close()
        },
        error => {
          this.$indicator.close()
          this.$toast(error.errorMsg)
        }
      )
    },

    /**
     * 获取推荐分成链接
     */
    loadBonusData() {
      let wechat = this.config ? this.config['wechat.web'] : null
      if (wechat) {
        // 其实这里根本不会进来，因为config没有赋值
        this.setWechatConfig(wechat, location.href + '?u=' + this.user.id)
      }
    },
    setWechatConfig(config, link) {
      this.wxApi.wxRegister(config, '推荐分成', null, '点击链接关注小店成为推广员，拿取更多分成', link)
    },
    saveAuthInfo() {
      let openid = this.$cookie.get('o')
      let token = this.$cookie.get('t')
      if (openid && token && !self.isOnline) {
        this.saveToken(token)
      }
    },

    /**
     * 监听首页滚动事件
     *
     * @param      {Object}  event   滚动事件
     */
    handleScroll(event) {
      const dom = (event && event.target) || document.querySelector('.list')
      const OpacityFlag = 150 // 滚动到多少px 搜索框变成不透明

      // 授权吸顶框，0319需求不做，后期有可能加上
      // if (params.top >= 297) {
      //   this.authAccreditFixed = true
      // } else {
      //   this.authAccreditFixed = false
      // }

      const params = {
        top: dom.scrollTop,
        height: dom.scrollHeight
      }
      if (params.top >= OpacityFlag) {
        this.headerBackgroundOpacite = 1
      } else {
        this.headerBackgroundOpacite = (params.top / OpacityFlag).toFixed(2)
      }

      // 回到顶部按钮出现的距离
      if (params.top >= 600) {
        this.isshowBacktop = true
      } else {
        this.isshowBacktop = false
      }
      // 告知原生App是否isTop
      if (this.isHHApp) {
        if (dom.scrollTop <= 0) {
          this.setIsTop(true)
        } else {
          this.setIsTop(false)
        }
      }
    },

    /**
     * 获取新人专享列表
     * 先判断是否为新人
     */
    getNewUserList() {
      if (this.isOnline && !this.user.is_newbie) {
        return
      }
      productList({
        sort_value: 2,
        page: 1,
        size: 3,
        is_newbie: 1,
        tags_id: ENUM.TAGS_IDS.NEWBIE
      }).then(
        res => {
          this.newUserList = res.list
        },
        error => {}
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setIsTop(false)
    if (to.name == 'payResult') {
      next({ name: 'profile' })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: auto;
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;

  .header-home {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
  }
  .list {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    width: 100%;
    z-index: 1;
  }
  .home-banner {
    position: relative;
    .home-promise {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.75);
      bottom: 0;
      height: 28px;
      padding: 0 15px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: $baseColor;
      img {
        width: 6px;
        height: 11px;
      }
    }
  }
  .wrapper-container {
    margin-bottom: 10px;
  }

  .new-user-banner {
    margin-bottom: 10px;
    display: block;
    font-size: 0;
    background: #fff;
    img {
      width: 100%;
    }
  }
}
.has-fixed {
  height: 40px;
  margin-top: -10px;
  margin-bottom: 10px;
}
.ad-car {
  display: block;
  font-size: 0;
  margin: 15px 0;
  img {
    width: 100%;
  }
}
.user-popup {
  background-color: transparent;
  width: 300px;
  text-align: center;
  a {
    font-size: 0;
    display: block;
    img {
      width: 100%;
    }
  }
  .icon-close {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="auction-detail-contianer">
    <auction-detail-header
      v-if="!isPreviewPicture"
      :headerBackgroundOpacite="headerBackgroundOpacite"
      :prodDetailOfstHt="prodDetailOfstHt"
    ></auction-detail-header>
    <!-- body -->
    <div class="ui-detail-swiper" v-if="info.id">
      <!-- 轮播图 -->
      <info-goods-swipe></info-goods-swipe>

      <!-- 竞拍时间 -->
      <auction-time></auction-time>

      <!-- 商品信息 -->
      <auction-info-item></auction-info-item>

      <!-- 出价信息 -->
      <auction-info-bid></auction-info-bid>

      <!-- 竞拍信息 -->
      <auction-info></auction-info>

      <!-- 商家信息 -->
      <info-supplier-msg class="auction-supplier"></info-supplier-msg>

      <!-- 为你推荐商品  -->
      <recommend-item class="auction-recommend"></recommend-item>
      <product-desc :prodDetailIsFixed="prodDetailIsFixed" :prodDetailOfstHt="prodDetailOfstHt"></product-desc>
    </div>

    <auction-detail-footer v-if="info.id"></auction-detail-footer>

    <!-- 预览图片 -->
    <preview-picture v-if="isPreviewPicture" :defaultindex="swipeId" :isshow="isPreviewPicture"></preview-picture>

    <!-- 回到顶部 -->
    <v-back-top v-if="isshowBacktop" :target="target"></v-back-top>
  </div>
</template>

<script>
import AuctionDetailHeader from './AuctionDetailHeader'
import AuctionDetailFooter from './AuctionDetailFooter'

import ProductDesc from './child/AuctionProductDesc'
import AuctionInfoItem from './child/AuctionInfoItem'
import AuctionInfoBid from './child/AuctionInfoBid'
import AuctionInfo from './child/AuctionInfo'
import AuctionTime from './child/AuctionTime'

import BackTop from '../product-detail/child/DetailBackTop'
import PreviewPicture from '../product-detail/child/PreviewPicture'
import InfoGoodsSwipe from '../product-detail/child/InfoGoodsSwipe'
import InfoSupplierMsg from '../product-detail/child/InfoSupplierMsg'
import RecommendItem from '../product-detail/child/RecommendItem'

import { getAuctionDetail } from '../../api/auction'
// import { mlmProductGet, productLiveGet } from '../../api/auction'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'auctionDetail',
  data() {
    return {
      product: this.$route.query.id ? this.$route.query.id : '',
      info: {},
      isshowBacktop: false,
      target: null,
      headerBackgroundOpacite: 0,
      isLoading: true,
      // 用来控制详情页二级固定
      prodDetailOfstHt: 0, // 详情页距离父顶的高度
      prodDetailIsFixed: false // 是否可以fixed
    }
  },

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      isPreviewPicture: state => state.detail.isPreviewPicture,
      swipeId: state => state.detail.swipeId,
      auctionInfo: state => state.auction.auctionInfo
    })
  },

  components: {
    InfoGoodsSwipe,
    ProductDesc,
    PreviewPicture,
    AuctionInfoItem,
    AuctionInfoBid,
    AuctionInfo,
    AuctionTime,
    RecommendItem,
    InfoSupplierMsg,
    AuctionDetailHeader,
    AuctionDetailFooter,
    'v-back-top': BackTop
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 从我的竞拍列表过来带有 query toOffer 参数的直接前往竞价页
      const arr = ['myc2b', 'messagePaipaiList', 'auctionBzjResult']
      if (vm.$route.query.toOffer && arr.indexOf(from.name) > -1) {
        vm.$router.push({ name: 'auctionOffer', query: { id: vm.$route.query.id } })
        return
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    if (to.name == 'auctionBzjResult') {
      next('/auctionList')
    } else {
      next()
    }
  },

  created() {
    this.getDetail()
  },

  methods: {
    ...mapMutations({
      changeIndex: 'changeIndex',
      saveInfo: 'saveDetailInfo',
      setCurrentProductId: 'setCurrentProductId',
      saveAuctionInfo: 'saveAuctionInfo'
    }),

    /*
      getDetail: 获取商品详情， 并且存入状态管理
    */
    getDetail() {
      this.$indicator.open()
      getAuctionDetail(this.product, this.$route.query.modproductkey)
        .then(res => {
          this.info = res
          this.saveInfo(res.goods)
          this.saveAuctionInfo(res)
          this.setCurrentProductId(res.goods.id)
        })
        .finally(() => {
          this.$indicator.close()
          this.isLoading = false
        })
    },

    /**
     * 绑定滚动事件
     * 1、顶部透明度控制
     * 2、“回到顶部”按钮显示控制
     * 3、商品详情信息tab吸顶控制
     */
    bindScrollEvent() {
      const headerHeight = document.querySelector('.ui-detail-header').offsetHeight
      let element = document.querySelector('.ui-detail-swiper')
      let scrollHeight = document.querySelector('.ui-common-swiper').offsetHeight - headerHeight
      const prodDetailEle = document.querySelector('.ui-detail')
      this.target = element
      element.addEventListener('scroll', event => {
        let params = {
          top: element.scrollTop,
          height: element.scrollHeight
        }

        // 顶部商品/详情 tabs切换
        this.prodDetailOfstHt = prodDetailEle.offsetTop - headerHeight
        if (params.top >= this.prodDetailOfstHt) {
          this.prodDetailIsFixed = true
          this.changeIndex(1)
        } else {
          this.prodDetailIsFixed = false
          this.changeIndex(0)
        }

        if (params.top >= scrollHeight) {
          this.isshowBacktop = true
          this.headerBackgroundOpacite = 1
        } else {
          this.isshowBacktop = false
          this.headerBackgroundOpacite = Number((params.top / scrollHeight).toFixed(1))
        }
      })
    }
  },

  watch: {
    isLoading: function(newv, oldv) {
      this.$nextTick(() => {
        this.bindScrollEvent()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-detail-swiper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 0;
  /* border: 1px solid red; */
  background: rgba(240, 242, 245, 1);
  .auction-supplier {
    margin-bottom: 0;
    @include thin-border(#dbdbdb, 0, true);
  }
  .auction-recommend {
    margin-top: 0;
    margin-bottom: 14px;
  }
}
.product-detail-wrapper {
  height: 100%;
  width: auto;
}
</style>

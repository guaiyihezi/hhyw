<template>
  <div :class="pageWrapperClass">
    <template v-if="productDetail.id && !notAvailable">
      <!-- body -->
      <div class="ui-detail-swiper">
        <product-info></product-info>
        <product-desc
          :prodDetailIsFixed="prodDetailIsFixed"
          :prodDetailOfstHt="prodDetailOfstHt"
          :isBuyer="true"
        ></product-desc>
      </div>

      <!-- footer -->
      <detail-footer></detail-footer>

      <!-- 预览图片 -->
      <preview-picture v-if="isPreviewPicture" :defaultindex="swipeId" :isshow="isPreviewPicture"></preview-picture>

      <!-- 服务说明popup -->
      <popup-serve-tag v-if="isShowServeTag" :isShowServeTag="isShowServeTag"></popup-serve-tag>

      <!-- 回到顶部 -->
      <v-back-top v-if="isshowBacktop" :target="target"></v-back-top>
    </template>

    <div v-if="notAvailable" class="content-empty">
      <img class="content-empty-img" src="../../assets/image/hh-icon/mlm/content-empty@2x.png" alt="商品不可用" />
      <h2 class="content-empty-title">商品已下架</h2>
      <p class="content-empty-des">3s后跳转至换换商城首页</p>
      <div class="content-empty-toIndex">
        <a href>进入换换商城首页</a>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfo from './child/ProductInfo'
import ProductDesc from './child/ProductDesc'
import DetailFooter from './BuyerFooter'

import PreviewPicture from '../product-detail/child/PreviewPicture'
import PopupServeTag from '../product-detail/child/PopupServeTag'

import { productDistGet } from '../../api/product'
import { balanceGet } from '../../api/balance'
import { mapState, mapMutations, mapActions } from 'vuex'
import BackTop from '../product-detail/child/DetailBackTop'

export default {
  data() {
    return {
      mlmId: this.$route.params.mlmId ? this.$route.params.mlmId : '', // 分销商品 标识Id

      // isExchange: false,
      productDetail: {},
      hideFooter: false,
      popupVisible: true,
      // currentScore: 0,
      currentBalance: 0,
      isshowBacktop: false,
      target: null,
      isLoading: true,
      notAvailable: false,

      prodDetailOfstHt: 0, // 详情页距离父顶的高度
      prodDetailIsFixed: false // 是否可以fixed
    }
  },

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      isPreviewPicture: state => state.detail.isPreviewPicture,
      swipeId: state => state.detail.swipeId,
      isShowServeTag: state => state.detail.isShowServeTag
    }),
    pageWrapperClass() {
      return 'product-detail-wrapper' + (this.notAvailable ? ' product-not-available' : '')
    }
  },

  components: {
    ProductInfo,
    ProductDesc,
    DetailFooter,
    PreviewPicture,
    PopupServeTag,
    'v-back-top': BackTop
  },

  created() {
    this.getDetail()
    this.saveCartState(false)
    // this.saveIsExchangedState(this.isExchange)

    if (this.isOnline) {
      balanceGet().then(res => {
        this.currentBalance = parseFloat(res.surplus)
        this.saveCurrentBalanceState(this.currentBalance)
      })
    }
  },

  watch: {
    notAvailable: function(newv, oldv) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 3000)
      })
    },
    isLoading: function(newv, oldv) {
      this.$nextTick(() => {
        // 页面滚动时 的 一些效果
        let element = document.querySelector('.ui-detail-swiper')
        let scrollHeight = document.querySelector('.ui-common-swiper').offsetHeight
        const prodDetailEle = document.querySelector('.ui-detail')
        this.target = element
        element.addEventListener('scroll', event => {
          let params = {
            top: element.scrollTop,
            height: element.scrollHeight
          }
          this.prodDetailOfstHt = prodDetailEle.offsetTop
          if (params.top >= this.prodDetailOfstHt) {
            this.prodDetailIsFixed = true
          } else {
            this.prodDetailIsFixed = false
          }

          if (params.top >= scrollHeight) {
            this.isshowBacktop = true
          } else {
            this.isshowBacktop = false
          }
        })
      })
    }
  },

  methods: {
    ...mapMutations({
      saveInfo: 'saveDetailInfo',
      saveCartState: 'saveCartState',
      setCurrentProductId: 'setCurrentProductId',
      savePrice: 'savePrice',
      saveCurrentBalanceState: 'saveCurrentBalanceState',
      saveInviteCode: 'saveInviteCode'
    }),

    /**
     *  获取商品详情
     */
    getDetail() {
      this.$indicator.open()

      this.setCurrentProductId(this.mlmId)
      productDistGet(this.mlmId)
        .then(
          res => {
            this.productDetail = res
            this.saveInfo(res)

            // 设置页面title
            document.title = this.productDetail.name

            // this.saveExchangeScoreState(this.productDetail.exchange_score)
            // this.saveSeckillItems(res.promos)
            this.savePrice(res.current_price)

            // 记录 换换小店 sn
            this.saveInviteCode(res.seller.shop_id)
          },
          error => {
            // 商品已下架
            this.notAvailable = true
          }
        )
        .finally(() => {
          this.isLoading = false
          this.$indicator.close()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-detail-wrapper {
  height: 100%;
  width: auto;

  &.product-not-available {
    background-color: #fff;
  }
}
.ui-detail-swiper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 0;
  /* border: 1px solid red; */
  background: rgba(240, 242, 245, 1);
  &.hide-promotion-bottom {
    bottom: 0;
  }
}
.content-empty {
  text-align: center;
  padding-top: 30px;

  .content-empty-img {
    width: 135px;
  }
  .content-empty-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 25px;
    margin-top: 13px;
  }
  .content-empty-des {
    font-size: 15px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 21px;
    margin-top: 15px;
  }
  .content-empty-toIndex {
    margin-top: 50px;
    a {
      display: inline-block;
      border-radius: 2px;
      border: 1px solid rgba(85, 46, 32, 1);
      line-height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(85, 46, 32, 1);
      line-height: 20px;
      padding: 7px 12px;
    }
  }
}
</style>

<template>
  <div class="ui-product container">
    <div class="product-header">
      <!-- 商品头部 -->
      <product-header ref="header" :value="params.keyword" :isHb="isOnlyForHbUser"></product-header>
      <!-- 商品筛选 -->
      <product-filter
        ref="filter"
        :value="params.sort_key"
        :isHb="isOnlyForHbUser"
        v-if="!isOnlyForHbUser"
      ></product-filter>
      <!-- 权益专区隐藏商品筛选部分 -->
    </div>
    <!-- 商品列表 -->
    <div
      class="product-body"
      :class="{
        'is-empty': productList.length <= 0 && !isMore,
        'empty-full': isEmptyFull(),
        'scroll-container-keepAlive': true,
        'hide-product-list': isShowProductModel,
        'show-product-list': !isShowProductModel
      }"
      v-infinite-scroll="getMore"
      infinite-scroll-distance="10"
    >
      <!-- 无限加载滚动列表 -->
      <div class="clearfix">
        <template v-for="(item, index) in productList">
          <product-body
            :key="item.id"
            :item="item"
            v-if="item.sale_type == SALE_TYPE.NORMAL_PRODUCT"
            :productId="item.id"
            :requestparams="params"
          >
          </product-body>
          <auction-list-body
            :key="item.id"
            :isProdList="true"
            :item="buildAuctionItem(item)"
            :index="index"
            v-if="item.sale_type == SALE_TYPE.AUCTION_PRODUCT"
            @countDownEnd="countDownEnd"
          ></auction-list-body>
        </template>

        <!-- 表示是否还有更多数据的状态 -->
        <div class="loading-wrapper">
          <p v-if="!isMore && productList.length > 0">没有更多了</p>
          <mt-spinner type="triple-bounce" color="#FD9F21" v-if="isMore"></mt-spinner>
        </div>

        <div class="wrapper-list-empty" v-if="productList.length <= 0 && !isMore">
          <div>
            <img src="../../assets/image/hh-icon/b0-home/搜索-为空@2x.png" />
            <p>
              <template v-if="isEmptyFull()">
                未找到“<span class="special-text">{{ params.keyword }}</span
                >”相关品牌
              </template>
              <template v-else>
                未找到商品
              </template>
            </p>
          </div>
        </div>
        <div
          :class="{ full: isShowProductModel == 2 }"
          class="show-product-model"
          v-if="isShowProductModel"
          @click="closeProductModel"
        ></div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <v-back-top v-if="productList.length > 10" :target="target"></v-back-top>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import productHeader from './child/ProductListHeader'
import productBody from './child/ProductListBody'
import productFilter from './child/ProductListFilter'
import { productList } from '../../api/product'
import BackTop from '../../components/common/BackTop'
import AuctionListBody from '../auction/child/AuctionListBody'
import { SALE_TYPE } from './static.js'
import { AUCTION_STATE } from '../auction/static'
export default {
  name: 'products',
  components: {
    productHeader,
    productFilter,
    productBody,
    AuctionListBody,
    'v-back-top': BackTop
  },
  data() {
    return {
      SALE_TYPE,
      AUCTION_STATE,
      params: {
        brand_id: this.$route.query.brand_id ? this.$route.query.brand_id : '',
        category: this.$route.query.category ? this.$route.query.category : '',
        shop: this.$route.query.shop ? this.$route.query.shop : '',
        sort_key: this.$route.query.sort_key ? this.$route.query.sort_key : 0,
        sort_value: 2,
        filter: {},
        page: 0,
        size: 10,
        admin_order: this.$route.query.admin_order ? this.$route.query.admin_order : '', // 根据后台配置的推荐排序值由小到大排序：1:是 0:否(默认)
        keyword: this.$route.query.keywords ? this.$route.query.keywords : '',
        tags_id: this.$route.query.tags_id ? this.$route.query.tags_id : '',
        is_newbie: this.$route.query.is_newbie ? this.$route.query.is_newbie : ''
      },
      productList: [], //商品列表
      loading: false, //是否正在加载数据 防止并发加载
      isMore: true, //是否有更多

      from: this.$route.query.from || '' // 来源，主要需要标识是否来自A类用户的用户中心权益专区入口
    }
  },

  computed: {
    ...mapState({
      isShowProductModel: state => state.product.isShowProductModel
    }),
    ...mapGetters({
      isHbUser: 'isHbUser'
    }),
    isOnlyForHbUser() {
      return this.isHbUser && this.from === 'ucenter' && this.params.sort_key == '6'
    }
  },

  created() {
    //todo
    this.getUrlParams()

    this.$on('change-list', data => {
      document.activeElement.blur()
      let res = data
      this.params.page = 1
      this.productList = []
      this.loading = true
      this.isMore = true
      this.setParamsByData(res)
      this.getProductList()
    })

    this.$on('get-cart-quantity', () => {
      this.fetchCartNumber()
    })

    if (this.$route.query.keywords) {
      document.activeElement.blur()
    }
  },

  mounted() {
    // 计算内容高度
    this.target = document.querySelector('.product-body')
    // let totalHeight = 89
    // const target = this.target
    // this.utils.fillTheScreen({ target, totalHeight })
    // this.$nextTick(() => {
    //   // this.utils.fillTheScreen({target, totalHeight});
    // })
  },

  methods: {
    ...mapMutations({
      changeIsShowProductModel: 'changeIsShowProductModel'
    }),
    ...mapActions({
      fetchCartNumber: 'fetchCartNumber'
    }),

    /*
     * closeProductModel: 关闭筛选模态框
     */
    closeProductModel() {
      this.changeIsShowProductModel(0)
      this.$refs.filter.closeFiler()
    },

    /*
     * getMore: 无限滚动加载
     * TODO by dlj: 该方法存在被异常、重复 等触发的情况，先增加loading flag解决一下，待debug...
     */
    getMore() {
      if (this.loading) return

      // console.log('getMore Triggered...')

      if (this.isMore) {
        this.params.page = ++this.params.page
        this.loading = true

        this.getProductList(true)
      }
    },

    /*
     *  getUrlParams: 获取url上的参数
     *  @param： category
     *  @param: brand
     *  @param: shop
     *  @param: keywords
     */
    getUrlParams() {
      // console.log(this.$route.query);
      // this.params.brand = this.$route.query.brand ? this.$route.query.brand : '';
      // this.params.category = this.$route.query.category ? this.$route.query.category : '';
      // this.params.shop = this.$route.query.shop ? this.$route.query.shop : '';
      // this.params.keyword = this.$route.query.keywords ? this.$route.query.keywords : '';
    },

    /*
     * getProductList: 获取商品列表
     * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
     */
    getProductList(ispush) {
      productList(this.params).then(res => {
        this.buildData(ispush, res)
      })
    },

    /*
     *  getList: 构建数据
     *  @param: ispush 是否改变向元数据追加数据
     *  @param: res 接口请求返回的数据
     */
    buildData(ispush, res) {
      this.loading = false

      if (ispush) {
        this.productList = [...this.productList, ...res.list]
      } else {
        this.productList = res.list
      }

      this.isMore = res.paged.more == 1 ? true : false
      if (res.list.length < 10) {
        this.isMore = false
      }
    },

    /*
        setLocal: 历史搜索
       */
    setLocal(key) {
      let current = this.utils.fetch('keyword')
      current.push('' + key + '')
      current = this.utils.arrayUnique(current)
      this.utils.save('keyword', current)
    },

    /*
     * setParamsByData 根据事件传递的值来对请求列表重新赋值
     * @param data 事件传递的参数
     */
    setParamsByData(data) {
      let params = this.params
      for (let item in params) {
        for (let list in data) {
          if (item == list) {
            params[item] = data[list]
          }
        }
      }
      return params
    },

    countDownEnd(item, index) {
      if (item.status == this.AUCTION_STATE.STATUS_NOTSTARTED) {
        this.list[index].status = this.AUCTION_STATE.STATUS_STARTED
      } else if (item.status == this.AUCTION_STATE.STATUS_STARTED) {
        this.list[index].status = this.AUCTION_STATE.STATUS_CLOSED
      }
    },

    buildAuctionItem(item) {
      const o = {
        ...item.paipai,
        name: item.name,
        thumb: item.thumb
      }
      return o
    },
    isEmptyFull() {
      return !!this.params.keyword && !Object.keys(this.params.filter).length
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-product {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  .product-header {
    height: 100px;
    width: 100%;
  }
  div.product-body {
    position: relative;
    width: 100%;
    background-color: #fff;
    flex-grow: 1;
    overflow: auto;
    &.is-empty {
      &.empty-full {
        margin-top: -54px;
      }
      @include thin-top-border();
    }
    .loading-wrapper {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 44px;
      p {
        color: #7c7f88;
        font-size: 12px;
        font-weight: 'Regular';
        padding: 0;
        margin: 0;
      }
      span {
        display: inline-block;
      }
      /deep/ .mint-spinner-triple-bounce-bounce1,
      /deep/ .mint-spinner-triple-bounce-bounce2,
      /deep/ .mint-spinner-triple-bounce-bounce3 {
        background-color: #f0f0f0 !important;
      }
    }
    .wrapper-list-empty {
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding-top: 96px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 120px;
          height: 110px;
        }
        p {
          font-size: 17px;
          text-align: center;
          margin-top: 20px;
          color: #666666;
          .special-text {
            color: #772508;
          }
        }
      }
    }
  }
}
// .hide-product-list {
//   overflow: hidden;
//   height: 80vh;
// }
// .show-product-list {
//   height: 100%;
//   overflow: auto;
// }
.show-product-model {
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  height: 100%;
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  &.full {
    top: 0;
  }
}
</style>

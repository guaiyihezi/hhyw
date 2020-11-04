<template>
  <div class="promotion-container">
    <!-- <product-header ref="header" :value="params.keyword"></product-header> -->
    <!-- 商品筛选 -->
    <!-- <product-filter ref="filter" :value="params.sort_key"></product-filter> -->
    <mt-header class="header" title="限时促销">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <!-- 商品列表倒计时 -->
    <div class="img-wrapper">
      <div class="countdown">
        <span v-if="seckillStatus == 2">活动已结束</span>
        <span v-else>距{{ status }}</span>
        <sec-countdown v-if="seckillStatus != 2" :end_at="countdown_end" from_class="promotion-list"></sec-countdown>
      </div>
    </div>
    <!-- 商品列表 -->
    <div
      class="product-body"
      v-bind:class="{
        'scroll-container-keepAlive': true,
        'hide-product-list': isShowProductModel,
        'show-product-list': !isShowProductModel
      }"
      v-infinite-scroll="getMore"
      infinite-scroll-distance="10"
    >
      <!-- 无限加载滚动列表 -->
      <div class="clearfix">
        <template v-for="item in productList">
          <product-body :key="item.id" :item="item" :productId="item.id"> </product-body>
        </template>

        <!-- 表示是否还有更多数据的状态 -->
        <div class="loading-wrapper">
          <p v-if="!isMore && productList.length > 0">没有更多了</p>
          <mt-spinner type="triple-bounce" color="#FD9F21" v-if="isMore"></mt-spinner>
        </div>

        <div class="wrapper-list-empty" v-if="productList.length <= 0 && !isMore">
          <div>
            <img src="../../assets/image/change-icon/empty_goods@2x.png" />
            <p>暂无任何商品</p>
          </div>
        </div>
        <div class="show-product-model" v-if="isShowProductModel" @click="closeProductModel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
// import productHeader from '../product-list/child/ProductListHeader'
// import productFilter from '../product-list/child/ProductListFilter'

import SecCountdown from '../../components/common/SecCountdown'
import productBody from './child/ProductListBody'
import { productList } from '../../api/promotion'
export default {
  name: 'PromotionList',
  data() {
    return {
      params: {
        id: this.$route.params.id,
        page: 0,
        size: 10
      },
      productList: [], //商品列表
      loading: false, //是否正在加载数据 防止并发加载
      isMore: true, //是否有更多
      countdown_end: 0, // 活动结束时间
      change_code: false, // 倒计时结束 是否正在切换状态
      now: this.getSysTime(), // 系统时间
      info: {} //活动开始结束时间
    }
  },
  components: {
    // productHeader,
    // productFilter,
    productBody,
    SecCountdown
  },
  created() {
    this.$on('change-list', data => {
      document.activeElement.blur()
      let res = data
      this.params.page = 1
      this.productList = []
      this.loading = true
      this.isMore = true
      this.getProductList()
    })
  },
  watch: {
    seckillStatus(val) {
      this.countdown()
    }
  },
  computed: {
    ...mapState({
      isShowProductModel: state => state.product.isShowProductModel,
      seckillStatus: state => state.seckillList.seckillStatus
    }),
    status() {
      let status = ''
      switch (this.seckillStatus) {
        case 1:
          status = '结束'
          break
        default:
          status = '开始'
      }
      return status
    },
    activity_st() {
      return (this.info && this.info.start_at) || 0
    },
    activity_et() {
      return (this.info && this.info.end_at) || 0
    }
  },
  methods: {
    ...mapMutations({
      changeIsShowProductModel: 'changeIsShowProductModel',
      setSeckillStatus: 'setSeckillStatus',
      clearSeckillStatus: 'clearSeckillStatus'
    }),
    /*
     * getProductList: 获取商品列表
     * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
     */
    getProductList(ispush) {
      productList(this.params.id, this.params.page).then(res => {
        if (res.info && res.info.type == 0) {
          this.$router.push({ name: 'Seckill' })
        }
        if (!res.list.length) this.$toast('活动不存在')
        this.buildData(ispush, res)
        this.info = res.info
        this.getTime()
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
    getMore() {
      if (this.loading) return

      if (this.isMore) {
        this.params.page = ++this.params.page
        this.loading = true

        this.getProductList(true)
      }
    },
    /*
     * closeProductModel: 关闭筛选模态框
     */
    closeProductModel() {
      this.changeIsShowProductModel(0)
      this.$refs.filter.closeFiler()
    },
    goBack() {
      this.$_goBack()
    },
    // 倒计时相关
    getTime() {
      const now = this.now
      const start_at = this.activity_st * 1e3
      const end_at = this.activity_et * 1e3

      if (now < start_at) {
        this.countdown_end = start_at
        this.setSeckillStatus(0)
      } else if (now > start_at && now < end_at) {
        this.countdown_end = end_at
        this.setSeckillStatus(1)
      } else {
        this.countdown_end = 0
        this.setSeckillStatus(2)
      }
    },
    countdown() {
      if (this.change_code) {
        switch (this.seckillStatus) {
          case 1:
            this.countdown_end = this.activity_et * 1000
            break
          case 2:
            this.countdown_end = 0
            break
        }
        this.change_code = false
      }
    },
    changeState() {
      // 倒计时结束后 更改倒计时的status
      if (this.seckillStatus < 2) {
        this.change_code = true
        this.setSeckillStatus(this.seckillStatus + 1)
      }
    }
    // 倒计时结束
  },
  beforeDestroy() {
    this.clearSeckillStatus()
  }
}
</script>
<style lang="scss" scoped>
.header {
  @include thin-border(#f4f4f4);
}
.img-wrapper {
  width: 100%;
  height: 76px;
  background: url('../../assets/image/hh-icon/promotion/bg-list-header.png') no-repeat #fff;
  background-size: 375px 76px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  .countdown {
    height: 21px;
    margin: 0 23px 18px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      font-size: 12px;
      color: $seckillColor;
      line-height: 17px;
      margin-right: 10px;
    }
  }
}
.promotion-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  div.product-body {
    position: relative;
    width: 100%;
    background-color: #fff;
    flex: 1;
    overflow: auto;
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
      padding-top: 45%;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 75px;
          height: 75px;
        }
        p {
          text-align: center;
          margin-top: 27px;
          color: #a4aab3;
        }
      }
    }
  }
}
.show-product-model {
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  height: 100%;
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<template>
  <div class="contianer-auction">
    <mt-header class="header" title="竞拍">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"> </header-item>
    </mt-header>
    <div class="category-filter" v-if="CATEGORY_LIST.length > 0">
      <div class="category-list-wrapper">
        <template v-for="(item, index) in CATEGORY_LIST">
          <div class="cat-list-item" :key="index" @click="catClick(item)" :class="{ active: params.cat_id == item.id }">
            {{ item.name }}
          </div>
        </template>
      </div>
    </div>
    <div
      class="product-body scroll-container-keepAlive"
      v-infinite-scroll="getMore"
      infinite-scroll-distance="10"
      infinite-scroll-disabled="loading"
    >
      <auction-list-body
        v-for="(item, index) in list"
        :item="item"
        :index="index"
        :key="item.id"
        @countDownEnd="countDownEnd"
      ></auction-list-body>
      <!-- 表示是否还有更多数据的状态 -->
      <div class="loading-wrapper">
        <p v-if="!isMore && list.length > 0">没有更多了</p>
        <mt-spinner type="triple-bounce" color="#FD9F21" v-if="isMore"></mt-spinner>
      </div>
      <div class="wrapper-list-empty" v-if="list.length <= 0 && !isMore">
        <div>
          <img src="../../assets/image/hh-icon/empty-list-icon.png" />
          <p>暂无任何商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuctionList } from '../../api/auction'
import AuctionListBody from './child/AuctionListBody'
import { CATEGORY_LIST, AUCTION_STATE } from './static'
export default {
  name: 'auctionList',
  data() {
    return {
      CATEGORY_LIST,
      AUCTION_STATE,
      params: {
        page: 0,
        size: 10,
        cat_id: this.$route.query.cat_id || 0
      },
      list: [],
      isMore: true,
      loading: false
    }
  },

  beforeRouteLeave(to, from, next) {
    if (to.name == 'auctionBzjResult') {
      next('/home')
    } else {
      next()
    }
  },

  components: {
    AuctionListBody
  },

  methods: {
    goBack() {
      this.$_goBack()
    },

    /*
     * getMore: 无限滚动加载
     * TODO by dlj: 该方法存在被异常、重复 等触发的情况，先增加loading flag解决一下，待debug...
     */
    getMore() {
      if (!this.isMore) {
        return
      }
      this.params.page = ++this.params.page
      this.loading = true
      this.getList(true)
    },

    /*
     * getList: 获取商品列表
     * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
     */
    getList(ispush) {
      getAuctionList(this.params).then(res => {
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
        this.list = [...this.list, ...res.list]
      } else {
        this.list = res.list
      }

      this.isMore = res.paged.more == 1 ? true : false
      if (res.list.length < this.params.size) {
        this.isMore = false
      }
    },

    /**
     * 点击分类
     *
     * @param      {Object}  item    当前点击分类对象
     */

    catClick(item) {
      if (this.params.cat_id == item.id) {
        return
      }
      this.params.cat_id = item.id
      this.params.page = 1
      document.querySelector('.product-body').scrollTop = 0
      this.getList(false)
    },

    countDownEnd(item, index) {
      if (item.status == this.AUCTION_STATE.STATUS_NOTSTARTED) {
        this.list[index].status = this.AUCTION_STATE.STATUS_STARTED
      } else if (item.status == this.AUCTION_STATE.STATUS_STARTED) {
        this.list[index].status = this.AUCTION_STATE.STATUS_CLOSED
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contianer-auction {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header {
  flex-shrink: 0;
  @include thin-border();
}
.category-filter {
  background-color: #ffffff;
  height: 40px;
  flex-shrink: 0;
  .category-list-wrapper {
    height: 40px;
    display: flex;
    align-items: stretch;
    overflow-x: auto;
    .cat-list-item {
      font-size: 12px;
      color: #666666;
      min-width: 93px;
      text-align: center;
      line-height: 40px;
      position: relative;
      flex: 1;
      &:before {
        content: '';
        width: 48px;
        height: 2px;
        background-color: transparent;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      &.active {
        color: $primaryColor;
        &:before {
          background-color: $primaryColor;
        }
      }
    }
  }
}
.product-body {
  position: relative;
  width: 100%;
  background-color: #fff;
  flex-grow: 1;
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
    padding-top: 30%;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 135px;
        height: 135px;
      }
      p {
        margin-top: 10px;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 25px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>

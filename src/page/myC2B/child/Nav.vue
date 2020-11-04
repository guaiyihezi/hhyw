<template>
  <div class="order-wrapepr js-order-list">
    <!-- header -->
    <div class="order-header">
      <ul>
        <li
          class="item"
          v-for="item in NAV"
          v-bind:key="item.id"
          v-bind:class="{ active: navId == item.id }"
          v-on:click="setNavActive(item.id)"
        >
          <span>{{ item.name }}</span>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <!-- list -->
    <div class="order-body">
      <div v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <c-item :item="item" v-for="item in list" :key="item.paipai_id"></c-item>
      </div>
      <div class="order-air" v-if="list.length <= 0 && !isMore">
        <img src="../../../assets/image/hh-icon/empty-list-icon.png" />
        <p>列表为空</p>
        <gk-button class="button" type="primary-secondary-white" v-on:click="goVisit">随便逛逛</gk-button>
      </div>
      <recommend-list v-if="!isMore" :params="recommendParams"></recommend-list>
    </div>
  </div>
</template>

<script>
import { ENUM } from '../../../const/enum'
import { NAV } from '../static'
import { mapState, mapMutations } from 'vuex'

import Item from './Item'
import RecommendList from '../../recommend/RecommendList'
import BackTop from '../../../components/common/BackTop'

// import { LIST_DATA } from '../MOCK_DATA'
import { getList } from '../../../api/myC2B'

export default {
  name: 'c2bListNav',
  data() {
    return {
      NAV: NAV,
      listParams: { page: 0, status: [] },
      list: [],
      loading: false,
      isMore: true,

      target: null, // 滚动dom，回到顶部用
      recommendParams: {} // 为你推荐额外的请求参数
    }
  },
  computed: {
    ...mapState({
      navId: state => state.myC2B.navId
    })
  },
  created() {
    this.saveQueryStatus()
  },
  mounted() {
    this.$nextTick(() => {
      this.target = document.querySelector('.order-body')
    })
  },
  methods: {
    ...mapMutations({
      setNav: 'setMyC2BListNav'
    }),
    saveQueryStatus() {
      const navId = this.$route.query.nav
      typeof navId !== 'undefined' && this.setNav(navId)
    },
    setNavActive(id) {
      // 这样可以改变地址~
      this.$router.replace({
        name: this.$router.history.current.name,
        query: { nav: id }
      })
    },

    // 获取订单列表
    getList(ispush) {
      this.$indicator.open()
      let data = this.listParams
      data.status = this.navId

      getList(data.page, data.status).then(res => {
        if (ispush) {
          this.list = [...this.list, ...res.list]
        } else {
          this.list = res.list
        }
        this.isMore = res.paged.more == 1 ? true : false
        this.$indicator.close()
      })
    },
    //  加载更多数据
    getMore() {
      this.loading = true
      this.listParams.page = ++this.listParams.page
      if (this.isMore) {
        this.loading = false
        this.getList(true)
      }
    },
    // 随便逛逛 去竞买列表
    goVisit() {
      this.$router.push({ name: 'auctionList' })
    }
  },
  components: {
    'c-item': Item,
    RecommendList,
    'v-back-top': BackTop
  }
}
</script>

<style lang="scss" scoped>
.order-wrapepr {
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .order-header {
    height: 40px;
    width: 100%;

    ul {
      list-style: none;
      width: auto;
      display: flex;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      li {
        font-size: 14px;
        color: #666;
        height: 100%;
        text-align: center;
        line-height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          height: 33px;
        }
        .line {
          width: 67%;
          height: 2px;
          background: rgba(0, 0, 0, 0);
          margin-top: 3px;
        }
        &.active {
          color: #562f21;
          .line {
            background: #562f21;
          }
        }
      }
    }
  }
  .order-body {
    background-color: #fff;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    .loading-wrapper {
      text-align: center;
      color: #b5b6b6;
      font-size: 13px;
      font-weight: 'Regular';
      margin: 10px auto;
    }
  }

  .order-air {
    width: 100%;
    vertical-align: middle;
    text-align: center;
    background-color: #ffffff;
    padding: 30px 0 70px;
    text-align: center;
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
    }
    .button {
      @include button($margin: 0, $radius: 2px, $spacing: 2px);
      width: 140px;
      height: 36px;
      font-size: 14px;
      margin-top: 40px;
    }
    label {
      font-size: 16px;
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      height: 16px;
      line-height: 16px;
    }
  }
}
</style>

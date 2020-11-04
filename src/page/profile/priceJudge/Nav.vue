<template>
  <div class="order-wrapepr">
    <!-- nav header -->
    <div class="order-header">
      <ul>
        <li
          class="item"
          v-for="item in NAV"
          v-bind:key="item.id"
          v-bind:class="{ active: cur_nav_id == item.id }"
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
        <c-item :item="item" v-for="item in list" :key="item.id"></c-item>
      </div>
      <div class="order-air" v-if="list.length <= 0 && !isMore">
        <img src="../../../assets/image/hh-icon/empty-list-icon.png" />
        <p>列表为空</p>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './ListItem'

import { LIST_DATA } from './MOCK_DATA'
import { getMyPriceJudgeRecordList } from '../../../api/user'

export default {
  name: 'MyPriceJudgeListNav',
  data() {
    return {
      NAV: [{ id: 1, name: '待处理' }, { id: 2, name: '已处理' }],

      list: [],
      page: 0,

      loading: false,
      isMore: true,
      cur_nav_id: 1
    }
  },
  computed: {
    searchPrams() {
      return { page: this.page, status: this.curStatus }
    },
    curStatus() {
      // map local to interface accept data
      // see enum.PRICE_JUDGE_STATUS
      return { 1: 1, 2: 0 }[this.cur_nav_id]
    }
  },
  watch: {
    searchPrams(oldv, newv) {
      this.getList()
    }
  },
  created() {
    this.saveQueryParams()
  },
  methods: {
    saveQueryParams() {
      const navId = this.$route.query.nav
      typeof navId !== 'undefined' && (this.cur_nav_id = navId)
    },
    // 切换tab
    setNavActive(id) {
      this.cur_nav_id = id
      this.page = 1
      this.list = []
      this.loading = false
      this.isMore = true
    },

    // 获取订单列表
    getList() {
      if (this.searchPrams.page < 1) return

      this.loading = true
      this.$indicator.open()
      // setTimeout(() => {
      //   this.loading = false
      //   this.$indicator.close()
      //   this.list = [...this.list, ...LIST_DATA]
      // }, 1000)
      getMyPriceJudgeRecordList(this.searchPrams)
        .then(res => {
          this.list = [...this.list, ...res.rows]
          this.isMore = res.rows.length < 10 ? false : true
        })
        .finally(() => {
          this.$indicator.close()
        })
    },
    //  加载更多数据
    getMore() {
      if (!this.isMore) {
        return
      }
      ++this.page
    }
  },
  components: {
    'c-item': Item
  }
}
</script>

<style lang="scss" scoped>
.order-wrapepr {
  width: 100%;
  flex: 1 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;

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
    background-color: #f4f4f4;
    width: 100%;
    flex: 1 0 0;
    overflow-y: auto;

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
  }
}
</style>

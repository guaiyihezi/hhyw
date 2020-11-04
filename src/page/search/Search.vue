<template>
  <div class="search-wrapper">
    <search-header ref="header" :keyword="keywords"></search-header>
    <div class="search-body" :class="{ test: isTesMode }">
      <div class="list current-search" v-if="currenKeywords.length > 0">
        <div class="list-header" @click="test(1)">
          <span>最近搜索</span>
          <img src="../../assets/image/hh-icon/b0-home/icon-垃圾桶.svg" @click="deleteCurrent" />
        </div>
        <ul>
          <li class="item" v-for="(item, index) in currenKeywords" @click="getKey(item)" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="list hot-wrapper" v-if="!shop">
        <div class="list-header" @click="test(0)">
          <span>热门搜索</span>
        </div>
        <ul>
          <li
            class="item"
            v-for="(item, index) in hotKeywords"
            :key="index"
            v-stat="{ id: `search_keyword_${index}` }"
            @click="getKey(item)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import searchHeader from './child/SearchHeader'
import { searchKeywordList } from '../../api/search'

export default {
  name: 'search',
  data() {
    return {
      hotKeywords: [],
      currenKeywords: [],
      shop: this.$route.query.shop ? this.$route.query.shop : '',
      keywords: this.$store.state.search.currentKey ? this.$store.state.search.currentKey : '',
      clickTotal: 0
    }
  },

  components: {
    searchHeader
  },

  computed: {
    ...mapState({
      currentKey: state => state.search.currentKey,
      isTesMode: state => state.test.isTesMode
    })
  },

  created() {
    this.getHotKeywords()
    this.getCurrentKey()
  },

  methods: {
    ...mapMutations({
      changeKey: 'changeKey',
      readyTest: 'readyTest',
      changeTest: 'changeTest'
    }),

    getHotKeywords() {
      searchKeywordList().then(res => {
        this.hotKeywords = Object.assign([], res, this.hotKeywords)
      })
    },

    getKey(item) {
      if (item.content) {
        this.keywords = item.content
      } else {
        this.keywords = item
      }
      this.changeKey(this.keywords)
      this.$refs.header.search(null, this.keywords)
    },

    deleteCurrent() {
      if (this.isTesMode) {
        this.$_goBack()
      } else {
        this.utils.save('keyword', [])
        this.currenKeywords = this.utils.fetch('keyword')
      }
    },

    getCurrentKey() {
      this.currenKeywords = this.utils.fetch('keyword')
    },

    test(status) {
      // 连续点热门搜索标题5次，然后点最近搜索标题1次，开启测试模式(背景色变色)
      // 然后点击[清空最近搜索]离开此页，或是点击右上角[取消]来取消测试模式并离开
      if (!status) {
        if (this.clickTotal == 0) {
          setTimeout(() => {
            this.clickTotal = 0
          }, 4e3)
        } else if (this.clickTotal == 4) {
          this.readyTest()
        }
        this.clickTotal++
      } else {
        this.changeTest(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  height: 100%;
  width: auto;
  background-color: $mainbgColor;
  display: flex;
  flex-direction: column;
  .search-body {
    @include thin-top-border();
    padding: 30px 15px 0;
    background: #fff;
    flex-grow: 1;
    &.test {
      background: #dea78e;
    }
    div.list {
      margin-bottom: 20px;
      .list-header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        span {
          color: #0e0324;
          font-size: 12px;
          align-self: flex-end;
          font-weight: bold;
        }
        img {
          width: 15px;
          height: 15px;
          cursor: pointer;
        }
      }
      ul {
        display: flex;
        padding-top: 20px;
        flex-wrap: wrap;
        margin-right: -20px;
        li {
          height: 28px;
          min-width: 32px;
          padding: 0 10px;
          background-color: #f2f2f2;
          color: #775a51;
          text-align: center;
          font-size: 12px;
          line-height: 28px;
          margin: 0 20px 20px 0;
          border-radius: 14px;
        }
      }
    }
  }
}
</style>

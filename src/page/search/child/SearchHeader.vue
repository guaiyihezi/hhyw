<!-- SearchHeader.vue -->
<template>
  <div class="ui-search-header">
    <form action="#" v-on:submit.prevent="search($event, keywords)">
      <div class="search-header">
        <div class="search-container" :class="{ active: keywords || isFocks }">
          <div class="icon-search">
            <img src="../../../assets/image/hh-icon/b0-home/icon-搜索.svg" />
          </div>
          <div class="input-search">
            <input
              type="search"
              class="search"
              :placeholder="placeholderTxt"
              v-model="keywords"
              @click="setSearchFocus(true)"
              @blur="setSearchFocus(false)"
              autocomplete="off"
            />
            <div class="icon-delete">
              <img src="../../../assets/image/change-icon/e2_delete@2x.png" @click="clear" v-if="keywords.length > 0" />
            </div>
          </div>
        </div>
        <span class="cancel-btn" v-on:click="cancel">取消</span>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { sendBuryingPointInfo } from '../../../api/buryingPoint'

export default {
  data() {
    return {
      isFocks: false,
      shop: this.$route.query.shop ? this.$route.query.shop : '',
      keywords: this.keyword ? this.keyword : '',
      currenKeywords: this.utils.fetch('keyword')
    }
  },
  props: ['keyword'],
  computed: {
    ...mapState({
      isTesMode: state => state.test.isTesMode
    }),
    placeholderTxt() {
      return this.shop ? '店内搜索' : '搜索更多品质好物'
    }
  },
  methods: {
    ...mapMutations({
      changeKey: 'changeKey',
      changeTest: 'changeTest'
    }),
    // 分类列表进入到搜索，完成后跳转到商品列表页面
    search(e, value) {
      if (value.replace(/\s+/g, '').length <= 0) {
        this.$toast('请输入您要搜索的关键字')
        return false
      } else {
        this.keywords = value
      }
      if (value) {
        this.currenKeywords.push(value)
        let data = this.utils.arrayUnique(this.currenKeywords)
        this.utils.save('keyword', data)
      }
      // 获取搜索框内容并发送
      sendBuryingPointInfo({
        click_position: 'search_content_' + value
      })
      this.$router.push({
        name: 'products',
        query: { keywords: this.keywords, shop: this.shop }
      })
      if (e) {
        this.utils.stopPrevent(e)
      }
    },

    // 取消返回上一级
    cancel() {
      if (this.isTesMode) {
        this.changeTest(false)
      }
      this.clear()
      this.$_goBack()
    },

    clear() {
      this.keywords = ''
      this.changeKey(this.keywords)
    },

    /**
     * 搜索框是否focus
     */
    setSearchFocus(value) {
      this.isFocks = value
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-search-header {
  background-color: #fff;
  .search-header {
    display: flex;
    height: 30px;
    padding: 8px 15px;
    align-content: center;
    align-items: center;
  }
  .search-container {
    width: 100%;
    height: 30px;
    line-height: 26px;
    background: #f2f2f2;
    border-radius: 15px;
    padding-left: 22px;
    display: flex;
    img {
      vertical-align: top;
    }
    .icon-search {
      display: flex;
      height: 100%;
      align-items: center;
      img {
        width: 15px;
        height: 15px;
      }
    }
    .icon-delete {
      display: flex;
      height: 100%;
      align-items: center;
      margin-right: 8px;
      img {
        width: 16px;
        height: 16px;
      }
    }
    .input-search {
      display: flex;
      flex: 1 1 auto;
      justify-content: flex-start;
      align-items: center;
    }
    .search {
      width: 100%;
      height: 25px;
      line-height: normal;
      line-height: 25px;
      color: #404040;
      font-size: 15px;
      background: transparent;
      border: 0;
      padding: 0 8px;
      vertical-align: top;
      &:focus {
        outline-offset: 0;
        outline: none;
      }
      &::placeholder {
        color: #9c9c9c;
      }
    }
  }
  .cancel-btn {
    font-size: 16px;
    line-height: 30px;
    color: #552e20;
    margin-left: 12px;
    white-space: nowrap;
    font-weight: 400;
  }
}
</style>

<template>
  <div class="container">
    <div class="search-wrapper">
      <div class="search-header">
        <div class="search-container" :class="{ active: keywords || isFocks }">
          <div class="icon-search">
            <img src="../../assets/image/hh-icon/b0-home/icon-搜索.svg" />
          </div>
          <div class="input-search">
            <input
              type="search"
              class="search"
              :placeholder="placeholder"
              v-model="keywords"
              @click="setSearchFocus(true)"
              @blur="setSearchFocus(false)"
              @keyup.enter="search"
              autocomplete="off"
            />
            <div class="icon-delete">
              <img src="../../assets/image/change-icon/e2_delete@2x.png" @click="clear" v-if="keywords.length > 0" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <category-body></category-body>
  </div>
</template>

<script>
import { PLACEHOLDER } from '../huanhuanke/static'
import CategoryBody from './child/CategoryBody'
export default {
  name: 'category',
  data() {
    return {
      placeholder: PLACEHOLDER,
      isFocks: false,
      keywords: ''
    }
  },
  components: {
    CategoryBody
  },
  methods: {
    search() {
      if (!this.keywords.length) return
      this.$router.push({ name: 'products', query: { keywords: this.keywords } })
    },

    /**
     * 搜索框是否focus
     */
    setSearchFocus(value) {
      this.isFocks = value
    },
    /**
     * 清空关键词
     */
    clear() {
      this.keywords = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-wrapper {
  background-color: #fff;
  .search-header {
    display: flex;
    height: 30px;
    padding: 8px 20px;
    align-content: center;
    align-items: center;
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
        padding-left: 62px;
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
      &.active {
        .icon-search {
          padding-left: 0px;
        }
      }
    }
  }
}
</style>

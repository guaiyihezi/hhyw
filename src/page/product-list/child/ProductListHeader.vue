<!-- ProductListHeader.vue -->
<template>
  <div class="ui-product-header">
    <form action="#" v-on:submit.prevent="search($event)">
      <div class="search-header">
        <img src="../../../assets/image/hh-icon/icon-返回.svg" class="icon-back" @click="goBack" />
        <div class="search-container" :class="{ active: keywords || isFocks }">
          <div class="icon-search">
            <img src="../../../assets/image/hh-icon/b0-home/icon-搜索.svg" />
          </div>
          <div class="input-search">
            <input
              type="search"
              class="search"
              placeholder="搜索更多品质好物"
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
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['value'],

  data() {
    return {
      isFocks: false,
      keywords: this.value ? this.value : '' //关键字
    }
  },

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      cartNumber: state => state.tabBar.cartNumber
    }),
    getCarCount() {
      if (this.cartNumber < 100) {
        return this.cartNumber
      } else {
        return '99+'
      }
    }
  },

  watch: {
    value: function(value) {
      if (value) {
        this.keywords = value
      }
    }
  },

  methods: {
    /*
     * search: 搜索
     */
    search(e) {
      let data = {
        keyword: this.keywords
      }
      // debugger
      // if (!data.keyword) {
      //   this.$toast('请输入您要搜索的关键字')
      //   return
      // }
      this.$parent.$emit('change-list', data)
      if (e) {
        this.utils.stopPrevent(e)
      }
    },

    /*
     * goBack: 返回上一级
     */
    goBack() {
      let isFromHome = this.$route.params.isFromHome
      if (isFromHome) {
        this.$router.push({ name: 'home' })
      } else {
        this.$_goBack()
      }
    },

    /*
     *  goCart: 跳转到购物车列表
     */
    goCart() {
      if (this.isOnline) {
        this.$router.push({ name: 'cart', params: { type: 0 } })
      } else {
        this.$router.push({ name: 'signin' })
      }
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
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-product-header {
  background-color: #fff;
  .search-header {
    display: flex;
    height: 30px;
    padding: 8px 8px 8px 19px;
    align-content: center;
    align-items: center;
    .icon-back {
      width: 15px;
      height: 21px;
      display: block;
    }
    .search-container {
      flex: 1 0 0;
      height: 30px;
      line-height: 26px;
      background: #f2f2f2;
      border-radius: 15px;
      margin: 0 20px 0 13px;
      padding-left: 22px;
      display: flex;
      img {
        vertical-align: top;
      }
      .icon-search {
        display: flex;
        height: 100%;
        align-items: center;
        padding-left: 57px;
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
        flex: 1 0 0;
        display: flex;
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

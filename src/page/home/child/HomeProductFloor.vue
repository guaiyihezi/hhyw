<template>
  <div class="products-list-new-wrapper" v-if="list.length > 0">
    <div class="products-list-new" v-lazy:background-image="lazy">
      <div class="product-list-header" @click="productListClick" v-stat="{ id: `index_type${cur}_more` }"></div>
      <div class="product-list">
        <div class="product-list-body-swipe">
          <swiper :auto="0" v-if="list.length" :options="swiperOption" class="swiper-container">
            <template v-for="(pageItem, pageIndex) in pageArr">
              <swiper-slide :key="pageIndex">
                <div class="product-list-body">
                  <template v-for="(item, index) in list">
                    <home-product-floor-body
                      :item="item"
                      :index="index"
                      v-if="index < (pageIndex + 1) * 6 && index >= pageIndex * 6"
                      v-bind:key="index"
                      v-stat="{ id: `index_type${cur}_${pageIndex}_${index}` }"
                    ></home-product-floor-body>
                  </template>
                </div>
              </swiper-slide>
            </template>
          </swiper>
        </div>
        <div :class="['pagination',`swiper-pagination-${cur}`]" slot="pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeProductFloorBody from './HomeProductFloorBody'
import { productList } from '../../../api/product'
import { ENUM } from '../../../const/enum'

export default {
  name: 'HomeProductHot',
  data() {
    return {
      swiperOption:{
        direction: 'horizontal',
        pagination:{
          el:`.swiper-pagination-${this.cur}`
        },
        on: {
        },
      },
      list: [],
      lazy: {
        src: this.config.bg,
        error: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-floor-bg.png'),
        loading: require('../../../assets/image/hh-icon/y0-lazy-load/lazy-floor-bg.png')
      }
    }
  },
  props: ['type', 'title', 'config', 'cur'],
  created() {
    // this.getList()
  },
  components: {
    HomeProductFloorBody
  },
  computed: {
    pageArr() {
      return new Array(Math.ceil(this.list.length / 6))
    }
  },
  methods: {
    productListClick: function() {
      if (this.config.name == '以物抵债') {
        this.$router.push({
          name: 'products',
          query: {
            sort_key: 6
          }
        })
      } else {
        this.$router.push({
          name: 'products',
          query: this.config.params
        })
      }
    },

    getList() {
      productList({
        sort_value: 2,
        page: 1,
        size: 12,
        ...this.config.params
      }).then(
        res => {
          this.list = res.list
        },
        error => {}
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.products-list-new-wrapper {
  margin-bottom: 10px;
  padding: 0 10px;
  .products-list-new {
    border-radius: 4px;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .product-list-header {
    height: 104px;
  }
  .product-list{
    // height: 376px;
    padding-bottom: 10px;
    box-sizing: border-box;
    position: relative;
    background-color: #ffffff;
    border-radius: 2px;
    .pagination{
      // position: absolute;
      // bottom: 0px;
      // left: 0;
      text-align: center;
      width: 100%;
      // height: 5px;
      margin-top: 0px;
    }
    .pagination /deep/ span {
      width:5px;
      height:2px;
      background: #ccc;
      opacity:1;
      display: inline-block;
      margin-right: 6px;
    }
    .pagination /deep/ span:last-child {
      margin-right: 0px;
    }
    .pagination /deep/ .swiper-pagination-bullet-active{
      background:#772508;
    }
  }
  .product-list-body-swipe {
    
    height: 326px;
  }
  .product-list-body {
    padding-bottom: 0;
    width: 100%;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
  /deep/ .mint-swipe-indicator {
    border-radius: 0;
    width: 5px;
    height: 2px;
    background: #cccccc;
    opacity: 1;
    margin: 0 3px;
    &.is-active {
      background: $primaryColor;
    }
  }
}
</style>

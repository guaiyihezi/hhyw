<template>
  <div class="products-list-new-wrapper">
    <div class="products-list-new">
      <div class="product-list-header" @click="productListClick" v-stat="{ id: 'index_new_products_more' }">
        <img src="../../../assets/image/hh-icon/b0-home/new-title.png" />
        <span>更多...</span>
      </div>
      <div class="product-list">
        <div class="product-list-body-swipe">
          <swiper :options="swiperOption" class="swiper-container">
            <template v-for="(pageItem, pageIndex) in pageArr">
              <swiper-slide :key="pageIndex" class="swiper-item">
                <div class="product-list-body">
                  <template v-for="(item, index) in list">
                    <home-product-new-body
                      :item="item"
                      :index="index"
                      v-if="index < (pageIndex + 1) * 6 && index >= pageIndex * 6"
                      v-bind:key="index"
                      v-stat="{ id: `index_new_products_${pageIndex}_${index}` }"
                    ></home-product-new-body>
                  </template>
                </div>
              </swiper-slide>
            </template>
          </swiper>
        </div>
        <div class="pagination swiper-pagination-xp"  slot="pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeProductNewBody from './HomeProductNewBody'
import { productList } from '../../../api/product'
import { ENUM } from '../../../const/enum'

export default {
  name: 'HomeProductHot',
  data() {
    return {
      swiperOption:{
        direction: 'horizontal',
        pagination:{
          el:".swiper-pagination-xp"
        },
        on: {
        },
        loop:true,
      },
      list: [],
      type: ENUM.SORT_KEY.DATE
    }
  },
  created() {
    this.getList()
  },
  components: {
    HomeProductNewBody
  },
  computed: {
    pageArr() {
      return new Array(Math.ceil(this.list.length / 6))
    }
  },
  methods: {
    productListClick: function() {
      this.$router.push({
        name: 'products',
        query: { sort_key: this.type }
      })
    },

    getList() {
      productList({
        sort_key: 5,
        sort_value: 2,
        page: 1,
        size: 12
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
    padding-top: 15px;
    background: #fff;
    border-radius: 4px;
  }
  .product-list-header {
    height: 20px;
    font-size: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 10px;
    img {
      height: 20px;
    }
    span {
      display: inline-block;
      @include sc(9px, #999999, right center);
    }
  }
  .product-list{
    position: relative;
    padding-bottom: 9px;
    box-sizing: border-box;
    .pagination{
      // position: absolute;
      // bottom: 0px;
      // left: 0;
      text-align: center;
      width: 100%;
      // height: 5px;
      margin-top: -8px;
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
    margin-top: 20px;
    height: 290px;
  }
  .product-list-body {
    padding: 0 10px;
    padding-bottom: 0;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-between;
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

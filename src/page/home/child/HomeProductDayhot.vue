<template>
  <div class="product-new-wrapper">
    <div class="product-new">
      <div class="product-new-header" @click="productListClick" v-stat="{ id: `index_hot_more` }">
        <img src="../../../assets/image/hh-icon/b0-home/24h-bg.png" />
        <span>更多...</span>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" class="product-new-body">
        <swiper-slide
          class="product-new-swiper"
          :key="`index_hot_${item.id}`"
          v-for="(item, index) in first5Goods"
          v-stat="{ id: `index_hot_${index}` }"
        >
          <home-product-dayhot-body :item="item" :index="index"></home-product-dayhot-body>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import HomeProductDayhotBody from './HomeProductDayhotBody'

export default {
  name: 'HomeProductDayhot',
  data() {
    return {
      swiperOption: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 5,
        freeMode: true
      }
    }
  },
  props: ['items', 'type'],
  components: {
    HomeProductDayhotBody
  },
  computed: {
    first5Goods() {
      return this.items.slice(0, 5)
    }
  },
  methods: {
    productListClick: function() {
      this.$router.push({
        name: 'products',
        query: { sort_key: this.type }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-new-wrapper {
  padding: 0 10px;
  margin-bottom: 10px;
}
.product-new {
  padding: 15px 0 20px;
  background-color: #ffffff;
  margin-bottom: 10px;
  border-radius: 4px;
  .product-new-header {
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
  .product-new-body {
    margin-top: 20px;
    padding: 0 10px;
    .product-new-swiper {
      width: auto;
    }
    .swiper-pagination /deep/ .swiper-pagination-bullet {
      width: 5px;
      height: 2px;
      border-radius: 0;
      background: #ccc;
      margin: 0 2.5px;
    }
    .swiper-pagination /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background: $primaryColor;
    }
  }
}
</style>

<!-- 商品详情  -->
<template>
  <div class="ui-detail-swiper">
    <product-info :type="type"></product-info>
    <product-desc :prodDetailIsFixed="prodDetailIsFixed" :prodDetailOfstHt="prodDetailOfstHt"></product-desc>
  </div>
</template>

<script>
import ProductInfo from './child/ProductInfo'
import ProductDesc from './child/ProductDesc'
export default {
  data() {
    return {}
  },

  props: ['prodDetailIsFixed', 'prodDetailOfstHt', 'type'],

  components: {
    ProductInfo,
    ProductDesc
  }
}
</script>

<style lang="scss" scoped>
.ui-detail-swiper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 0;
  /* border: 1px solid red; */
  background: rgba(240, 242, 245, 1);
  &.hide-promotion-bottom {
    bottom: 0;
  }
}
</style>

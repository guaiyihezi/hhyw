<!-- 商品详情  -->
<template>
  <div class="prod-comments">
    <mt-header class="header" title="全部评论">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"> </header-item>
    </mt-header>
    <product-review></product-review>
    <!-- 预览图片 -->
    <preview-picture v-if="isPreviewPicture" :defaultindex="swipeId" :isshow="isPreviewPicture"></preview-picture>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ProductReview from './child/ProductReview'
import PreviewPicture from './child/PreviewPicture'
export default {
  data() {
    return {
      id: this.$route.query.id ? this.$route.query.id : ''
    }
  },

  props: ['isStock'],

  components: {
    ProductReview,
    PreviewPicture
  },

  computed: {
    ...mapState({
      isPreviewPicture: state => state.detail.isPreviewPicture,
      swipeId: state => state.detail.swipeId
    })
  },

  methods: {
    goBack() {
      this.$_goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.prod-comments {
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}
.header {
  @include thin-border();
}
/* 评论大图样式 */

/deep/ .ui-common-swiper {
  width: 100%;
  height: 100%;
  background-color: #000;
}
/deep/ .mint-swipe-item {
  width: 100%;
  height: 100%;
}
/deep/ .ui-common-swiper .mint-swipe-items-wrap .mint-swipe-item img {
  width: 100%;
  height: auto;

  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
</style>

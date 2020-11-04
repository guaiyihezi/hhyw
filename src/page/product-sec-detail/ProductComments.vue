<!-- 商品详情  -->
<template>
  <div class="prod-comments">
    <mt-header class="header" title="全部评论">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"> </header-item>
    </mt-header>
    <product-review :id="id"></product-review>
  </div>
</template>

<script>
import ProductReview from './child/ProductReview'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },

  props: ['isStock'],

  components: {
    ProductReview
  },

  computed: {
    ...mapState({
      id: state => state.detail.detailInfo.id
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
</style>

<template>
  <div class="price-judge-container">
    <mt-header class="header" title="我的价格投诉">
      <header-item slot="left" :isBack="true" v-on:onclick="goBack"></header-item>
      <span class="toDesc" slot="right" @click="toDesc">投诉说明</span>
    </mt-header>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import Nav from './Nav'
export default {
  name: 'MyPriceJudge',
  data() {
    return {}
  },
  components: {
    'nav-bar': Nav
  },
  methods: {
    goBack() {
      this.$_goBack()
    },
    toDesc() {
      this.$router.push({ name: 'priceJudgeDesc' })
    }
  }
}
</script>

<style lang="scss" scoped>
.price-judge-container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.header {
  @include header;
}
.toDesc {
  font-size: 16px;
  font-weight: 400;
  color: rgba(85, 46, 32, 1);
  line-height: 20px;
}
</style>

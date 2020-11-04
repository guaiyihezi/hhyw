<template>
  <div v-if="!!banner.thumb" @click="handleClick" class="banner-below-slider">
    <img :src="banner.thumb" />
  </div>
</template>

<script>
import { BANNER_BELOW_SLIDER } from './const'
export default {
  name: 'BannerBelowSlider',
  data() {
    return {
      banner: BANNER_BELOW_SLIDER
    }
  },
  methods: {
    handleClick() {
      // 外链
      this.Jump(this.banner.link)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-below-slider {
  padding: 10px 12px 10px;
  background-color: #fff;

  img {
    display: block;
    width: 100%;
  }
}
</style>

<template>
  <div class="c2b-container">
    <div class="header-wrapper">
      <mt-header class="header" title="我的竞拍">
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
      </mt-header>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Nav from './child/Nav'
export default {
  name: 'myc2b',
  data() {
    return {}
  },
  components: {
    'nav-bar': Nav
  },
  created() {
    this.updateMyC2BSysTime()
  },
  methods: {
    ...mapMutations({
      updateMyC2BSysTime: 'updateMyC2BSysTime'
    }),
    goBack() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="scss" scoped>
.c2b-container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.header-wrapper {
  height: 44px;
  width: 100%;
}
.header {
  @include header;
  @include thin-border(#f4f4f4);
  width: 100%;
}
</style>

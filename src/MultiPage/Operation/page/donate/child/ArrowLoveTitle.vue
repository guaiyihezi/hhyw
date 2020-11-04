<template>
  <div class="container-comp-arrow-love-title">
    <img src="../../../assets/image/donate/arrow-left@2x.png" class="arrow-icon" />
    <span class="txt">{{ title }}</span>
    <img src="../../../assets/image/donate/arrow-right@2x.png" class="arrow-icon" />
  </div>
</template>

<script>
export default {
  name: 'ArrowLoveTitle',
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container-comp-arrow-love-title {
  display: inline-block;
  font-size: 0;

  .txt {
    height: 20px;
    font-size: 14px;
    color: rgba(64, 64, 64, 1);
    line-height: 20px;
    vertical-align: middle;
    margin: 0 9px;
  }
  .arrow-icon {
    width: 27px;
    vertical-align: middle;
  }
}
</style>

<template>
  <div class="container-comp-num-split-block">
    <span class="item" v-for="(v, i) in numArr" :key="i">{{ v }}</span>
    <span class="unit">{{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: 'NumSplitBlock',
  data() {
    return {}
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    }
  },
  computed: {
    numArr() {
      return parseInt(this.value)
        .toString()
        .split('')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-comp-num-split-block {
  display: inline-block;
  font-size: 0;

  .item {
    display: inline-block;
    width: 33px;
    height: 39px;
    background: rgba(252, 62, 54, 1);
    border-radius: 4px;
    margin-right: 10px;
    font-size: 30px;
    font-weight: bolder;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1px;
    line-height: 39px;
    text-align: center;
  }
  .unit {
    font-size: 23px;
    font-weight: 600;
    color: rgba(252, 62, 54, 1);
    line-height: 32px;
  }
}
</style>

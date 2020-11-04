<template>
  <div class="msg-item" @click="onclick">
    <div class="time-wrapper">
      <span>{{ time | formatDateLocal }}</span>
    </div>
    <div class="msg-content">
      <div class="title">
        <h3>{{ title }}</h3>
      </div>
      <p class="msg-detail">{{ content }}</p>
      <div class="more">
        <span class="label">查看详情</span>
        <img src="../../../assets/image/hh-icon/icon-enter-列表箭头.svg" alt="查看详情" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['title', 'time', 'content'],
  methods: {
    onclick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-item {
  width: 100%;
  background-color: transparent;

  .time-wrapper {
    height: 49px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      display: inline-block;
      text-align: center;
      min-width: 66px;
      padding: 0 10px;
      height: 20px;
      line-height: 20px;
      background: rgba(185, 194, 207, 1);
      border-radius: 10px;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
    }
  }

  .msg-content {
    margin: 0 20px;
    padding: 12px 17px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    .title {
      h3 {
        font-size: 16px;
        font-weight: bold;
        color: rgba(64, 64, 64, 1);
        line-height: 22px;
      }
    }
    .msg-detail {
      margin-top: 12px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      word-wrap: break-word;
      white-space: normal;
      word-break: break-all;
    }
    .more {
      @include thin-border(#f4f4f4, 0, auto, false, false);
      height: 41px;
      margin-top: 8px;
      padding-left: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label {
        font-size: 12px;
        font-weight: 400;
        color: rgba(191, 191, 191, 1);
      }
    }
  }
}
</style>

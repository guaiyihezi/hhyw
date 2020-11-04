<template>
  <div class="notice-container">
    <img src="../../assets/image/love-donate/notice-love-donate@2x.png" />
    <p>凝聚爱心 每下一笔订单 换换出力捐款1元</p>
  </div>
</template>

<script>
export default {
  name: 'DonateLoveNotice',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.notice-container {
  height: 40px;
  background: linear-gradient(270deg, rgba(255, 34, 32, 1) 0%, rgba(255, 34, 32, 1) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;

  img {
    height: 100%;
  }
  p {
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1px;
    margin-left: 9px;
  }
}
</style>

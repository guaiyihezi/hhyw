<template>
  <div class="line-container">
    <img src="../../assets/image/hh-icon/activity/guoqing_line/icon-horn.png" alt="" />
    <div class="p-wrapper" ref="line_wrapper">
      <div>
        <p ref="line" :style="`margin-left:${m_l * -1}px`">
          国庆长假期间，从9月30日至10月7日所下订单将延迟至节假日之后发货；请您妥善安排下单时间，由此给您带来的不便敬请谅解，我们将在节后尽快处理订单安排发货，将物品早日送达您的手中，再次感谢您的支持，祝您生活愉快。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      m_l: 0,
      l_w_width: 0, //div容器宽度
      l_width: 825 //p标签宽度
    }
  },
  created() {},
  methods: {
    move() {
      this.timer = setInterval(() => {
        if (this.m_l >= this.l_width) {
          this.m_l = this.l_w_width * -1
        }
        this.m_l += 2
      }, 50)
    }
  },
  mounted() {
    // this.l_width = this.$refs.line.offsetWidth
    this.l_w_width = this.$refs.line_wrapper.offsetWidth
    this.settimer = setTimeout(() => {
      this.move()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearTimeout(this.settimer)
  }
}
</script>

<style lang="scss" scoped>
.line-container {
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  height: 30px;
  background: rgba(255, 248, 235, 1);
  border-radius: 2px;
  display: flex;
  align-items: center;
  img {
    @include wh(18px, 18px);
  }
  .p-wrapper {
    flex: 1;
    overflow: hidden;
    margin-left: 10px;
    p {
      white-space: nowrap;
      font-size: 12px;
      font-weight: 300;
      color: rgba(127, 94, 32, 1);
      line-height: 17px;
    }
  }
}
</style>

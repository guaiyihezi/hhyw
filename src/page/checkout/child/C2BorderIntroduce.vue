<template>
  <div class="container-introduce">
    <p class="title">竞拍成功，待买家支付</p>
    <div class="count-down-container">
      <div class="c-t-wrapper">
        <count-down v-if="isCountDown" :end_at="end_at" :separatorConf="separatorConf"></count-down>
      </div>
      <span>后未支付，订单将关闭并扣除保证金</span>
    </div>
  </div>
</template>

<script>
import CountDown from '../../../components/common/SecCountdown'

export default {
  data() {
    return {
      separatorConf: {
        hour: '小时',
        minute: '分钟',
        second: '秒'
      },
      now: this.getSysTime()
    }
  },
  props: {
    goods: {
      type: Object
    }
  },
  computed: {
    end_at() {
      return this.goods.canceled_at * 1000
    },
    isCountDown() {
      return this.now < this.end_at
    }
  },
  methods: {
    changeState() {
      this.showEnd()
    },
    showEnd() {
      this.$messagebox({
        title: '系统提示',
        message: '您未能在指定时间内完成支付，订单已关闭且扣除保证金',
        closeOnClickModal: false,
        confirmButtonText: '知道了'
      }).then(action => {
        this.$_goBack()
      })
    }
  },
  mounted() {
    if (!this.isCountDown) {
      this.showEnd()
    }
  },
  components: {
    'count-down': CountDown
  }
}
</script>

<style lang="scss" scoped>
.container-introduce {
  background-color: #f0ddd7;
  padding: 16px 0 14px 16px;
  margin-bottom: -4px;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: rgba(85, 46, 32, 1);
    line-height: 25px;
  }

  .count-down-container {
    .c-t-wrapper {
      display: inline-block;
    }
    margin-top: 3px;
    font-size: 11px;
    font-weight: normal;
    color: rgba(85, 46, 32, 1);
    line-height: 16px;
  }
}
</style>

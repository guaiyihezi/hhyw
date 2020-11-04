<template>
  <div class="pro-c-wrapper" v-if="isPromotion">
    <div class="pro-c">
      <img src="../../../assets/image/hh-icon/promotion/icon-pro.png" alt="" />
      <div class="countdown">
        <span v-if="seckillStatus == 2">已结束</span>
        <span v-else>距{{ status }}仅剩</span>
        <sec-countdown v-if="seckillStatus != 2" :end_at="countdown_end" from_class="promotion"></sec-countdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import SecCountdown from '../../../components/common/SecCountdown'
export default {
  name: 'ProCountdown',
  data() {
    return {
      countdown_end: 0, // 活动结束时间
      change_code: false, // 倒计时结束 是否正在切换状态
      now: this.getSysTime() // 系统时间
    }
  },
  components: {
    SecCountdown
  },
  watch: {
    seckillStatus(val) {
      this.countdown()
    }
  },
  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo,
      seckillStatus: state => state.seckillList.seckillStatus
    }),
    isPromotion() {
      return this.$route.name === 'promotionDetail'
    },
    status() {
      let status = ''
      switch (this.seckillStatus) {
        case 1:
          status = '结束'
          break
        default:
          status = '开始'
      }
      return status
    },
    activity_st() {
      return (this.detailInfo.secbuy && this.detailInfo.secbuy.start_at) || 0
    },
    activity_et() {
      return (this.detailInfo.secbuy && this.detailInfo.secbuy.end_at) || 0
    }
  },
  created() {
    this.getTime()
  },
  methods: {
    ...mapMutations({
      setSeckillStatus: 'setSeckillStatus',
      clearSeckillStatus: 'clearSeckillStatus'
    }),
    getTime() {
      const now = this.now
      const start_at = this.activity_st * 1e3
      const end_at = this.activity_et * 1e3

      if (now < start_at) {
        this.countdown_end = start_at
        this.setSeckillStatus(0)
      } else if (now > start_at && now < end_at) {
        this.countdown_end = end_at
        this.setSeckillStatus(1)
      } else {
        this.countdown_end = 0
        this.setSeckillStatus(2)
      }
    },
    countdown() {
      if (this.change_code) {
        switch (this.seckillStatus) {
          case 1:
            this.countdown_end = this.activity_et * 1000
            break
          case 2:
            this.countdown_end = 0
            break
        }
        this.change_code = false
      }
    },
    changeState() {
      // 倒计时结束后 更改倒计时的status
      if (this.seckillStatus < 2) {
        this.change_code = true
        this.setSeckillStatus(this.seckillStatus + 1)
      }
    }
  },
  beforeDestroy() {
    this.clearSeckillStatus()
  }
}
</script>
<style lang="scss" scoped>
.pro-c-wrapper {
  background-color: #fff;
}
.pro-c {
  padding: 10px 18px 10px 15px;
  background: linear-gradient(90deg, rgba(224, 32, 89, 1) 0%, rgba(250, 90, 0, 1) 100%, rgba(250, 90, 0, 1) 100%);
  border-radius: 21px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  width: 109px;
  height: 22px;
}
.countdown {
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    color: #fff;
    line-height: 17px;
    margin-right: 8px;
  }
}
</style>

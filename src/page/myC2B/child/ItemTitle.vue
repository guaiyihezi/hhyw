<template>
  <div class="title" v-if="showTitle">
    <div :class="titleClass">
      <span>{{ statusDesc }}</span>
    </div>
    <div class="title-right" v-if="isCountDown">
      <span class="label">{{ countDownLable }}</span>
      <div class="count-wrapper">
        <count-down :end_at="end_at" :from_class="'c2b-list-countdown'"></count-down>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { ENUM } from '../../../const/enum'
import { STATUS_TXT } from '../static'

import CountDown from '../../../components/common/SecCountdown'

export default {
  data() {
    return {}
  },
  props: {
    item: Object,
    status: Number,
    isTimeout: Boolean,
    isPayed: Boolean
  },
  computed: {
    ...mapState({
      systemTime: state => state.myC2B.systemTime
    }),
    showTitle() {
      return this.status != ENUM.C2B_STATUS.MISSED
    },
    titleClass() {
      return {
        'title-left': true,
        color_C08225: [STATUS_TXT.IS_LEADING, STATUS_TXT.CON_COMPETE, STATUS_TXT.WIN].includes(this.statusDesc),
        color_999999: [STATUS_TXT.CONNOT_COMPETE, STATUS_TXT.TIMEOUT, STATUS_TXT.ST_CANCEL].includes(this.statusDesc),
        color_9B210B: [STATUS_TXT.NOT_LEADING].includes(this.statusDesc),
        color_404040: [STATUS_TXT.SUCCESS].includes(this.statusDesc)
      }
    },
    statusDesc() {
      let t = ''
      switch (this.status) {
        case ENUM.C2B_STATUS.HAS_ENROLL:
          t =
            this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_CANCEL
              ? STATUS_TXT.ST_CANCEL
              : this.systemTime < this.item.start_at
              ? STATUS_TXT.CONNOT_COMPETE
              : STATUS_TXT.CON_COMPETE
          break
        case ENUM.C2B_STATUS.COMPETING:
          t =
            this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_CANCEL
              ? STATUS_TXT.ST_CANCEL
              : this.item.is_buyer
              ? STATUS_TXT.IS_LEADING
              : STATUS_TXT.NOT_LEADING
          break
        case ENUM.C2B_STATUS.WINNING:
          t = this.isTimeout ? STATUS_TXT.TIMEOUT : this.isPayed ? STATUS_TXT.SUCCESS : STATUS_TXT.WIN
          break
        default:
          break
      }
      return t
    },
    countDownLable() {
      let t = ''
      switch (this.status) {
        case ENUM.C2B_STATUS.HAS_ENROLL:
          t = this.systemTime < this.item.start_at ? '距开始' : '距结束'
          break
        case ENUM.C2B_STATUS.COMPETING:
          t = '距结束'
          break
        case ENUM.C2B_STATUS.WINNING:
          t = this.isTimeout ? '' : this.isPayed ? '' : '付款倒计时'
          break
        default:
          break
      }
      return t
    },
    isCountDown() {
      // 商品未下架 && （还未结束 || 已中拍还未付款未超时）
      return (
        this.item.paipai_status != ENUM.PAIPAI_STATUS.ST_CANCEL &&
        (this.systemTime < this.item.close_at ||
          (this.status == ENUM.C2B_STATUS.WINNING && !this.isPayed && this.systemTime < this.item.canceled_at))
      )
    },
    end_at() {
      // 已中拍时 为订单失效时间 else 为竞拍开始或结束时间
      return this.status == ENUM.C2B_STATUS.WINNING
        ? this.item.canceled_at
        : this.item.start_at > this.systemTime
        ? this.item.start_at
        : this.item.close_at
    }
  },
  methods: {
    ...mapMutations({
      updateMyC2BSysTime: 'updateMyC2BSysTime'
    }),
    changeState() {
      // 倒计时结束时 更新systemTime
      this.updateMyC2BSysTime()
    }
  },
  components: {
    'count-down': CountDown
  }
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  margin: 0 10px;
  font-size: 14px;
  overflow: hidden;
  @include thin-border(rgba(85, 46, 32, 0.2), 0, auto, true);

  .title-left {
    color: #888;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;

    &.color_C08225 {
      color: #c08225;
    }
    &.color_999999 {
      color: #999999;
    }
    &.color_9B210B {
      color: #9b210b;
    }
    &.color_404040 {
      color: #404040;
    }
  }
  .title-right {
    display: flex;
    align-items: center;

    .label {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      margin-right: 12px;
    }
    .count-wrapper {
      display: inline-block;
    }
  }
}
</style>

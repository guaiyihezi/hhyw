<template>
  <div class="c2b-container">
    <div class="h-container">
      <mt-header class="header" title="保证金详情">
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="$_goBack"></header-item>
      </mt-header>
    </div>
    <div class="content" v-if="!isLoading">
      <div class="money-wrapper">
        <h2>保证金</h2>
        <p class="status-txt">{{ statusTxt }}</p>
        <p :class="amountClass">¥{{ detail.deposit }}</p>
        <span class="has-deduct" v-if="hasDeduct"></span>
      </div>
      <ul>
        <li>
          <label>缴纳时间</label>
          <span>{{ this.detail.created_at | convertTime }}</span>
        </li>
        <template v-if="!hasDeduct">
          <li v-if="this.detail.unfreeze_at">
            <label>释放时间</label>
            <span>{{ this.detail.unfreeze_at | convertTime }}</span>
          </li>
          <li v-if="this.detail.refund_at">
            <label>到账时间</label>
            <span>{{ this.detail.refund_at | convertTime }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { ENUM } from '../../const/enum'
import { getDetailBzj } from '../../api/myC2B'
import { DETAIL_BZJ } from './MOCK_DATA'

export default {
  name: 'detailBzj',
  data() {
    return {
      id: this.$route.query.id,
      isLoading: true,
      detail: {
        deposit: '0.00',
        paipai_status: 0, // 拍拍状态(商家)
        deposit_status: 1, // 保证金状态
        created_at: 0, // 缴纳时间
        unfreeze_at: 0, // 释放时间
        refund_at: 0, // 到账时间
        is_buyer: false // 当前用户是否是最后的买家
      }
    }
  },
  computed: {
    statusTxt() {
      let t = ''
      if (this.detail.deposit_status == ENUM.PAIPAI_BZJ_STATUS.ST_REFUND) {
        if (this.detail.is_buyer) {
          t = '订单已支付成功，已释放保证金'
        } else {
          t = '您未中拍，已释放保证金'
        }
      } else if (this.detail.deposit_status == ENUM.PAIPAI_BZJ_STATUS.ST_DEDUCT) {
        t = '24小时内未付款，订单超时关闭，扣除保证金！'
      } else if (this.detail.deposit_status == ENUM.PAIPAI_BZJ_STATUS.ST_PAYED) {
        t = '您已缴纳保证金'
      }
      return t
    },
    hasDeduct() {
      // 保证金是否已扣除
      return this.detail.deposit_status == ENUM.PAIPAI_BZJ_STATUS.ST_DEDUCT ? true : false
    },
    amountClass() {
      return {
        amount: true,
        deduct: this.hasDeduct
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$indicator.open()

      getDetailBzj(this.id).then(res => {
        this.isLoading = false
        this.$indicator.close()
        this.detail = { ...this.detail, ...res }
      })
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
  background-color: #fff;
}
.h-container {
  flex-basic: 44px;
  height: 44px;
  width: 100%;
}
.header {
  @include header;
  @include thin-border(#f4f4f4);
  width: 100%;
}
.content {
  width: 100%;
  flex: 1 0 0;
  padding-top: 26px;
}
.money-wrapper {
  position: relative;
  margin: 0 24px;
  height: 85px;
  background: linear-gradient(313deg, rgba(251, 200, 163, 1) 0%, rgba(255, 237, 217, 1) 100%);
  border-radius: 4px;
  padding: 16px 0 0 15px;
  box-sizing: border-box;
  overflow: hidden;

  h2 {
    font-size: 19px;
    font-weight: normal;
    color: rgba(133, 65, 16, 1);
    line-height: 26px;
  }
  .status-txt {
    font-size: 12px;
    color: rgba(170, 94, 39, 1);
    line-height: 17px;
    margin-top: 14px;
  }
  .amount {
    position: absolute;
    font-size: 24px;
    font-weight: 600;
    color: rgba(133, 65, 16, 1);
    line-height: 33px;
    top: 12px;
    right: 15px;

    &.deduct {
      color: rgba(133, 65, 16, 0.2);
    }
  }
  .has-deduct {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    width: 35px;
    height: 35px;
    background: url(../../assets/image/hh-icon/a0-auction/has_deduct@3x.png) no-repeat 0 0;
    background-size: contain;
  }
}
ul {
  margin: 20px 24px;
  background: rgba(246, 246, 246, 1);
  border-radius: 4px;

  li {
    padding: 19px 15px 0;
    font-size: 13px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 18px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      padding-bottom: 20px;
    }
  }
}
</style>

<template>
  <div class="operation">
    <div class="btns" v-if="showBtns">
      <button class="default" v-if="btnToDetail" @click="toDetail">
        去看看
      </button>
      <button class="primary" v-if="btnToCompete" @click="toCompete">
        去出价
      </button>
      <button class="primary" v-if="btnToBzj" @click="toBzj">
        查看保证金
      </button>
      <button class="primary" v-if="btnToPay" @click="toPay">
        待支付
      </button>
      <button class="primary" v-if="btnToOrderDetail" @click="toOrderDetail">
        查看订单
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { ENUM } from '../../../const/enum'

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
    showBtns() {
      return this.btnToDetail || this.btnToCompete || this.btnToBzj || this.btnToPay || this.btnToOrderDetail
    },
    goodsDisable() {
      // 竞拍取消 && 保证金为0
      return this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_CANCEL && Number(this.item.deposit) <= 0
    },
    btnToDetail() {
      // 去商品详情页的按钮
      return (
        (this.status == ENUM.C2B_STATUS.HAS_ENROLL && this.systemTime < this.item.start_at) ||
        (this.status == ENUM.C2B_STATUS.COMPETING && this.item.is_buyer) ||
        this.status == ENUM.C2B_STATUS.MISSED ||
        this.status == ENUM.C2B_STATUS.WINNING ||
        this.goodsDisable
      )
    },
    btnToCompete() {
      // 去出价的按钮
      return (
        !this.goodsDisable &&
        ((this.status == ENUM.C2B_STATUS.HAS_ENROLL && this.systemTime >= this.item.start_at) ||
          (this.status == ENUM.C2B_STATUS.COMPETING && !this.item.is_buyer))
      )
    },
    btnToBzj() {
      // 查看保证金按钮
      return (
        !this.goodsDisable &&
        (Number(this.item.deposit) > 0 &&
          (this.status == ENUM.C2B_STATUS.MISSED ||
            this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_CANCEL ||
            this.isTimeout ||
            this.isPayed))
      )
    },
    btnToPay() {
      // 待支付按钮
      return (
        !this.goodsDisable &&
        this.status == ENUM.C2B_STATUS.WINNING &&
        (this.systemTime < this.item.canceled_at && !this.isPayed)
      )
    },
    btnToOrderDetail() {
      // 支付成功 查看订单详情按钮
      return this.status == ENUM.C2B_STATUS.WINNING && this.isPayed
    }
  },
  methods: {
    ...mapMutations({
      saveSelectedCartGoods: 'saveSelectedCartGoods'
    }),
    toDetail() {
      // 商品已下架提醒
      if (this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_CANCEL) {
        return this.$toast('商品已下架')
      }
      this.$router.push({ name: 'auctionDetail', query: { id: this.item.paipai_id } })
    },
    toCompete() {
      this.$router.push({ name: 'auctionDetail', query: { id: this.item.paipai_id, toOffer: 1 } })
    },
    toBzj() {
      this.$router.push({ name: 'detailBzj', query: { id: this.item.paipai_id } })
    },
    toPay() {
      // 是否已提交订单
      if (this.item.paipai_status == ENUM.PAIPAI_STATUS.ST_DEAL) {
        // 已提交 则直接进入确认付款页
        this.$router.push({
          name: 'payment',
          query: {
            order: JSON.stringify([this.item.order_id]),
            total: this.item.current_price - this.item.money_line,
            isInstalment: 0,
            canceled_at: this.item.canceled_at / 1000,
            isC2B: true // 标识为竞拍
          }
        })
        return
      }

      // 否则 进入提交订单页
      const cartGoods = [
        {
          goods: {
            ...this.item,
            start_at: this.item.start_at / 1000,
            close_at: this.item.close_at / 1000,
            canceled_at: this.item.canceled_at / 1000
          }, //商品内容
          amount: 1, // 购买数量
          isC2B: true // 标识为竞拍
        }
      ]
      this.saveSelectedCartGoods({ cartGoods: cartGoods })
      this.$router.push({ name: 'checkout' })
    },
    toOrderDetail() {
      this.$router.push({ name: 'orderDetail', query: { id: this.item.order_id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.operation {
  .btns {
    padding: 0 10px 10px;
    display: flex;
    justify-content: flex-end;
    button {
      display: inline-block;
      box-sizing: border-box;
      padding: 0 9px;
      border-radius: 2px;
      font-size: 13px;
      border: 1px solid $primaryColor;
      height: 26px;
      line-height: 26px;
      margin-left: 16px;

      &.default {
        color: $primaryColor;
        background: #fff;
      }
      &.primary {
        color: #fff;
        background: rgba(119, 37, 8, 1);
      }
    }
  }
}
</style>

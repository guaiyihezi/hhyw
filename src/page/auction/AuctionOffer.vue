<template>
  <div class="container-offer">
    <mt-header class="header" title="竞价">
      <header-item slot="left" :isBack="true" @onclick="goBack"> </header-item>
    </mt-header>
    <!-- 商品信息 -->
    <div class="good-info-wrapper">
      <auction-list-body
        :item="auctionInfo"
        :needTimer="false"
        :needBidder="false"
        v-if="auctionInfo.id"
      ></auction-list-body>
    </div>
    <!-- 出价 -->
    <div class="out-price-wrapper">
      <div class="add-step">
        <img src="../../assets/image/hh-icon/a0-auction/left-triangle@2x.png" alt="" />
        <span class="step"
          >每次加价幅度: ￥{{ auctionInfo.cash_range | formatMoney }} + 权益{{
            auctionInfo.huanbi_range | formatMoney
          }}</span
        >
        <img src="../../assets/image/hh-icon/a0-auction/right-triangle@2x.png" alt="" />
      </div>
      <!-- 总价 -->
      <div class="total-price">
        <span class="price-tips">您将出价</span>
        <span class="price-unit">￥</span>
        <span class="price-num">{{ outPrice | formatMoney }}</span>
      </div>
      <!-- 现金加价 -->
      <div class="current-price">
        <img
          :class="{ forbidden: cashCount === 1 }"
          src="../../assets/image/hh-icon/a0-auction/reduce2x.png"
          alt=""
          @click="reduceCash"
        />
        <p>
          <span class="before-price">{{ outCash | formatMoney }}</span
          ><br />
          <span class="after-price">您将出现金{{ outCash | formatMoney }}</span>
        </p>
        <img src="../../assets/image/hh-icon/a0-auction/increase@2x.png" alt="" @click="increaseCash" />
      </div>
      <!-- 权益加价 -->
      <div class="current-price">
        <img
          :class="{ forbidden: tokenCount === 1 }"
          src="../../assets/image/hh-icon/a0-auction/reduce2x.png"
          alt=""
          @click="reduceToken"
        />
        <p>
          <span class="before-price">{{ outToken | formatMoney }}</span
          ><br />
          <span class="after-price">您将出权益{{ outToken | formatMoney }}</span>
        </p>
        <img src="../../assets/image/hh-icon/a0-auction/increase@2x.png" alt="" @click="increaseToken" />
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn-group-wrapper">
      <button class="btn-style" @click="confirmOut">立即出价</button>
    </div>
  </div>
</template>

<script>
import AuctionListBody from './child/AuctionListBody'
import { getAuctionDetail, getAuctionBidList, submitBidPrice } from '../../api/auction'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'auctionOffer',
  data() {
    return {
      product: this.$route.query.id ? this.$route.query.id : '',
      cashCount: 1, // 现金出价次数,默认增加一个幅度，定义为1
      tokenCount: 1, // 权益出价次数
      auctionInfo: {}
    }
  },
  components: { AuctionListBody },
  computed: {
    outPrice() {
      return Number(this.outCash) + Number(this.outToken)
    },
    outCash() {
      // 初始化现金出价： 当前价-权益抵扣价+现金增幅
      let that = this.auctionInfo
      return Number(that.current_price) - Number(that.money_line) + Number(that.cash_range) * this.cashCount || 0
    },
    outToken() {
      let that = this.auctionInfo
      return Number(that.money_line) + Number(that.huanbi_range) * this.tokenCount || 0
    },
    hasBidders() {
      return this.auctionInfo.current_price > this.auctionInfo.starting_price
    }
  },
  created() {
    this.getDetail()
  },
  watch: {
    auctionInfo: {
      handler() {
        this.auctionInfo.name = this.auctionInfo.goods.name
        this.auctionInfo.thumb = this.auctionInfo.goods.thumb
      },
      deep: true
    }
  },
  methods: {
    getDetail() {
      let that = this
      this.$indicator.open()
      return new Promise((resolve, reject) => {
        getAuctionDetail(this.product)
          .then(
            res => {
              if (res.status == 6) {
                this.$toast('竞拍已结束')
                setTimeout(() => {
                  that.goBack()
                }, 1500)
              } else {
                this.auctionInfo = { ...res }
                resolve(res)
              }
            },
            err => {
              console.log(err)
            }
          )
          .finally(() => {
            this.$indicator.close()
          })
      })
    },
    goBack() {
      this.$_goBack()
    },
    /*goProductDetail() {
      this.$router.push({ name: 'auctionDetail', query: { id: this.auctionInfo.id } })
    },*/
    reduceCash() {
      if (this.cashCount === 1) return
      this.cashCount--
    },
    increaseCash() {
      this.cashCount++
    },
    reduceToken() {
      if (this.tokenCount === 1) return
      this.tokenCount--
    },
    increaseToken() {
      this.tokenCount++
    },
    initCount() {
      this.cashCount = 1
      this.tokenCount = 1
    },
    confirmOut() {
      // 重新请求接口，比较最新数据
      Promise.all([getAuctionDetail(this.product), getAuctionBidList(this.product)]).then(res => {
        /*if (new Date().getTime() > res[0].close_at * 1e3) {
          this.$toast('竞拍已结束')
          this.goBack()
          return
        }*/
        if (
          !(
            this.outCash > Number(res[0].current_price) - Number(res[0].money_line) &&
            this.outToken > Number(res[0].money_line)
          )
        ) {
          this.$toast('已有买家出价，当前您的出价不符合出价规则，请重新出价!')
          // 重新计价
          this.initCount()
          this.auctionInfo = { ...res[0] }
          return
        }
        // 判断目前自己是最高出价者
        if (res[1].is_buyer) {
          this.$toast('您是领先者，不允许重复出价！')
          return
        }
        let price = this.hasBidders ? '当前价' : '起始价'
        const htmlContent = `<div class="msgstyle"><p>${price}: ￥${this.utils.formatFloat(
          this.auctionInfo.current_price
        )}</p><p><b>您将出价: ￥${this.outPrice}</b></p></div>`
        this.$messagebox({
          title: '您确定是否出价？',
          message: htmlContent,
          showCancelButton: true,
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel-button',
          confirmButtonClass: 'confirm-button-red',
          confirmButtonText: '确定出价'
        }).then(action => {
          if (action === 'confirm') {
            this.$indicator.open()
            submitBidPrice(this.product, this.outCash, this.outToken)
              .then(
                res => {
                  this.initCount()
                  // this.getDetail()
                  this.auctionInfo.current_price = res.current_price
                  this.auctionInfo.money_line = res.money_line
                  let str = res.is_delay ? '出价成功，竞拍结束时间延迟3分钟' : '出价成功'
                  this.$toast(str)
                },
                err => {
                  console.log(err)
                  this.goBack()
                }
              )
              .finally(() => {
                this.$indicator.close()
              })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-offer {
  .good-info-wrapper {
    margin-top: 11px;
    background-color: #fff;
  }
  .out-price-wrapper {
    height: 314px;
    background-color: #fff9ed;
    text-align: center;
    color: $primaryColor;
    .add-step {
      display: flex;
      justify-content: center;
      height: 28px;
      font-size: 12px;
      font-weight: 400;
      color: #ba924b;
      line-height: 28px;
      img {
        height: 100%;
      }
      .step {
        display: inline-block;
        background-color: #ffedd1;
      }
    }
    .total-price {
      display: flex;
      justify-content: center;
      align-items: baseline;
      margin-top: 15px;
      .price-tips {
        font-size: 12px;
        font-weight: 400;
        color: #707070;
      }
      .price-unit {
        font-size: 15px;
        font-weight: bold;
      }
      .price-num {
        font-size: 23px;
        font-weight: bold;
      }
      .price-unit,
      .price-num {
        position: relative;
        top: 1px;
      }
    }
    .current-price {
      margin: 27px 29px 42px;
      display: flex;
      justify-content: space-between;
      img {
        width: 66px;
        height: 66px;
      }
      .forbidden {
        opacity: 0.3;
      }
      .before-price {
        font-size: 36px;
        font-weight: 600;
      }
      .after-price {
        position: relative;
        top: -5px;
        font-size: 12px;
        font-weight: 400;
        color: #707070;
      }
    }
  }
  .btn-group-wrapper {
    margin: 40px 24px;
    .btn-style {
      width: 100%;
      height: 46px;
      font-size: 18px;
      font-weight: 400;
      border-radius: 2px;
      color: #fff;
      background-color: $primaryColor;
    }
  }
}
</style>

<style lang="scss">
.mint-msgbox-message {
  .msgstyle {
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>

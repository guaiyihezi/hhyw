<template>
  <div class="ui-detail-footer" v-if="detailInfo">
    <!-- 爱心捐赠 提示横幅 -->
    <donate-love-notice></donate-love-notice>

    <div class="footer-flex">
      <div class="footer-item icon-item service" @click="isShowService = true">
        <div></div>
      </div>
      <div class="footer-item footer-btns">
        <template v-if="auctionInfo.status == AUCTION_STATE.STATUS_CLOSED">
          <div class="footer-item usable" @click="checkoutMyB2C">查看我的竞拍</div>
        </template>
        <template v-else-if="auctionInfo.is_sign_up">
          <div v-if="auctionInfo.status == AUCTION_STATE.STATUS_NOTSTARTED" class="footer-item disabled">去出价</div>
          <div v-else class="footer-item usable" @click="goBid">去出价</div>
        </template>
        <div v-else class="footer-item usable" @click="joininAuction">
          <span class="injoin-txt">参与竞拍</span>
          <span class="deposit">( 保证金￥{{ utils.formatMoney(auctionInfo.deposit) }} )</span>
        </div>
      </div>
    </div>

    <!-- 服务联系方式 -->
    <mt-popup v-model="isShowService" position="bottom">
      <div class="pop-container">
        <div class="title">
          <p>联系方式</p>
          <img src="../../assets/image/hh-icon/detail/icon-close@3x.png" @click="isShowService = false" alt="" />
        </div>
        <div class="content" v-if="detailInfo.supplier">
          <a
            v-if="detailInfo.supplier.service_tel"
            :href="'tel:' + (isIos ? '//' : '') + detailInfo.supplier.service_tel"
            class="serviceType-wrapper"
          >
            <div class="content-line">
              <div class="content-left">
                <p class="content-title">客服电话</p>
                <p class="content-num">{{ detailInfo.supplier.service_tel }}</p>
              </div>
              <div class="content-right">
                <img src="../../assets/image/hh-icon/detail/icon-tel@3x.png" alt="" />
              </div>
            </div>
          </a>

          <a
            :href="'mqq://im/chat?chat_type=wpa&uin=' + detailInfo.supplier.service_qq + '&version=1&src_type=web'"
            class="serviceType-wrapper"
          >
            <div class="content-line" v-if="detailInfo.supplier.service_qq">
              <div class="content-left">
                <p class="content-title">客服QQ</p>
                <p class="content-num">{{ detailInfo.supplier.service_qq }}</p>
              </div>
              <div class="content-right">
                <img src="../../assets/image/hh-icon/detail/icon-qq@3x.png" alt="" />
              </div>
            </div>
          </a>

          <div
            class="content-none"
            v-if="detailInfo.supplier && !detailInfo.supplier.service_tel && !detailInfo.supplier.service_qq"
          >
            <p>该商家未提供客服联系方式</p>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { AUCTION_STATE } from './static'
import { mapState, mapActions, mapMutations } from 'vuex'

import DonateLoveNotice from '../../components/common/DonateLoveNotice'

export default {
  data() {
    return {
      AUCTION_STATE,
      isShowService: false,
      mlmId: this.$route.params.mlmId,
      isIos: false
    }
  },
  computed: {
    ...mapState({
      auctionInfo: state => state.auction.auctionInfo,
      detailInfo: state => state.detail.detailInfo,
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user
    }),

    subBtnTxt() {
      let txt = ''
      if (this.auctionInfo.deposit == 0) {
        txt = '免保证金'
      } else {
        txt = `保证金￥${this.auctionInfo.deposit}`
      }
      return txt
    }
  },
  created() {
    this.isIos = 1 == this.utils.getOpenBrowser() ? true : false
  },
  methods: {
    // 去出价
    goBid() {
      if (!this.isOnline) {
        this.$router.push({ name: 'login' })
        return
      }
      this.$router.push({ name: 'auctionOffer', query: { id: this.auctionInfo.id } })
    },

    // 查看我的竞拍
    checkoutMyB2C() {
      if (!this.isOnline) {
        this.$router.push({ name: 'login' })
        return
      }
      this.$router.push({ name: 'myc2b' })
    },

    // 参与竞拍
    joininAuction() {
      if (!this.isOnline) {
        this.$router.push({ name: 'login' })
        return
      }
      this.$router.push({ name: 'auctionBzjCheckout', query: { id: this.auctionInfo.id } })
    }
  },
  components: {
    DonateLoveNotice
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.ui-detail-footer {
  background: rgba(255, 255, 255, 1);
  width: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  .footer-flex {
    flex: 1;

    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    height: 50px;
    font-size: 16px;
    div.footer-item {
      height: 50px;
      width: 50px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #fafafa;
      line-height: 50px;
      &.icon-item {
        font-size: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          margin-top: 2px;
          display: inline-block;
          @include sc(8px, #552e20, center);
          line-height: 1;
        }
      }
      & + div.footer-item {
        @include thin-left-border(#cccccc, 0, auto);
      }
      img {
        width: 23px;
        height: 23px;
        flex-shrink: 0;
      }
      span.icon {
        position: absolute;
        right: 2px;
        top: 8px;
        @include sc(10px, #fff);
        line-height: 14px;
        width: 18px;
        height: 14px;
        background: #ef3338;
        border-radius: 20px;
        text-align: center;
      }
      &.service {
        div {
          width: 23px;
          height: 23px;
          background-image: url('../../assets/image/change-icon/service@3x.png');
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: center;
          &:hover {
            background-image: url('../../assets/image/change-icon/service_hover@3x.png');
          }
        }
      }
      &.cart {
        background-image: url('../../assets/image/change-icon/icon-cart.png');
        background-repeat: no-repeat;
        background-size: 23px 23px;
        background-position: center;
        &:hover {
          background-image: url('../../assets/image/change-icon/icon-cart_hover.png');
        }
      }
      &.add-cart {
        flex: 1;
        color: #552e20;
        &:hover {
          background-color: #f4f4f4;
        }
      }
      &.footer-btns {
        flex-grow: 1;
        display: flex;
      }
      &.usable {
        background-color: $primaryColor;
        color: #ffffff;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: #672108;
        }
        span {
          line-height: 1;
          &.injoin-txt {
            font-size: 16px;
          }
          &.deposit {
            margin-top: 3px;
            display: inline-block;
            @include sc(10px, #ffffff);
          }
        }
      }
      &.disabled {
        flex: 1;
        background-color: rgba(119, 37, 8, 0.3);
        color: #fff;
      }
    }
    .price {
      height: 25px;
      font-size: 21px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;

      .price-unit {
        font-size: 15px;
        font-weight: 600;
      }
    }
    .btn-txt {
      font-size: 11px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 14px;
    }
  }
  .pop-container {
    // padding: 0 15px;
    .title {
      height: 50px;
      padding: 0 15px;
      border-bottom: 1px dotted #d8d8d8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 14px;
        line-height: 20px;
        color: #404040;
        margin: 0;
      }
      img {
        width: 14px;
        height: 14px;
      }
    }
    .content {
      padding: 0 15px;

      .serviceType-wrapper {
        display: block;
        text-decoration: none;
      }

      .content-line {
        height: 85px;
        border-bottom: 1px dotted #d8d8d8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 13px;
          line-height: 20px;
        }
        .content-title {
          color: #999;
          margin-bottom: 5px;
        }
        .content-num {
          color: #333;
          margin: 0;
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
      .content-none {
        height: 85px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>

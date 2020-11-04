<template>
  <div class="container-supplier" @scroll="scrollEvent">
    <!-- <div class="container" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" @scroll="scrollEvent"> -->
    <div class="topImg" :class="{ trans: move }" id="topImg">
      <mt-header class="header" fixed>
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
        <div slot="right" class="top-right">
          <img src="../../assets/image/hh-icon/supplier/icon-search.png" alt="" @click="search" />
          <img v-if="this.isHHApp" src="../../assets/image/hh-icon/supplier/icon-share.png" alt="" @click="share" />
        </div>
      </mt-header>
      <!-- <img src="../../assets/image/hh-icon/supplier/supplier-bg.png" alt="" /> -->
    </div>
    <div class="supplier-msg">
      <div class="supplier-msg-body">
        <div class="supplier-msg-img">
          <img :src="getUrl" v-if="supplier.icon" />
          <img src="../../assets/image/hh-icon/supplier/icon-shop.png" v-else alt="" />
        </div>
        <div class="supplier-msg-content">
          <div class="supplier-name" @click="goShopInfo">
            <p>{{ supplier.shop_name }}</p>
            <img src="../../assets/image/hh-icon/supplier/icon-tip.png" alt="" />
          </div>
          <div class="supplier-type">
            <!-- 以物抵债 -> 权益商家 -->
            <!-- <span v-if="supplier.type == 1" class="type type1"><span>&nbsp;以物抵债&nbsp;</span></span> -->
            <span v-if="supplier.type == 1" class="type type1"><span>&nbsp;权益商家&nbsp;</span></span>
            <span v-if="supplier.type == 3" class="type type3"><span>&nbsp;权益商家&nbsp;</span></span>
            <span v-if="supplier.type == 5" class="type type5"><span>&nbsp;个人商家&nbsp;</span></span>
            <!-- <span v-if="supplier.type == 3" class="type type3"><span>&nbsp;以物抵债&nbsp;</span></span> -->
            <span class="supplier-desc" v-if="supplier.signature">{{ supplier.signature }}</span>
          </div>
        </div>
        <p class="more-supplier" @click="showService" v-stat="{ id: 'supplier_customeService' }">联系客服</p>
      </div>
    </div>
    <div class="line"></div>
    <supplier-goods-list :isTop="isTop" ref="supplierList" class="good-list"></supplier-goods-list>

    <!-- 服务联系方式 -->
    <mt-popup v-model="isShowService" position="bottom">
      <div class="pop-container">
        <div class="title">
          <p>联系方式</p>
          <img src="../../assets/image/hh-icon/detail/icon-close@3x.png" @click="isShowService = false" alt="" />
        </div>
        <div class="content">
          <a
            :href="'tel:' + (isIos ? '//' : '') + supplier.service_tel"
            v-if="supplier.service_tel"
            class="serviceType-wrapper"
            v-stat="{ id: 'supplier_phone' }"
          >
            <div class="content-line">
              <div class="content-left">
                <p class="content-title">客服电话</p>
                <p class="content-num">{{ supplier.service_tel }}</p>
              </div>
              <div class="content-right">
                <img src="../../assets/image/hh-icon/detail/icon-tel@3x.png" alt="" />
              </div>
            </div>
          </a>

          <a
            :href="'mqq://im/chat?chat_type=wpa&uin=' + supplier.service_qq + '&version=1&src_type=web'"
            class="serviceType-wrapper"
            v-stat="{ id: 'supplier_qq' }"
          >
            <div class="content-line" v-if="supplier.service_qq">
              <div class="content-left">
                <p class="content-title">客服QQ</p>
                <p class="content-num">{{ supplier.service_qq }}</p>
              </div>
              <div class="content-right">
                <img src="../../assets/image/hh-icon/detail/icon-qq@3x.png" alt="" />
              </div>
            </div>
          </a>

          <div class="content-line" v-if="isService">
            <div class="content-left" style="width:100%">
              <p class="content-title">服务时间</p>
              <p class="content-num">
                <span v-if="svcTime.weekdays_s && svcTime.weekdays_e"
                  >工作日：{{ svcTime.weekdays_s }}-{{ svcTime.weekdays_e }}</span
                ><span v-if="svcTime.holiday_s && svcTime.holiday_e"
                  >节假日：{{ svcTime.holiday_s }}-{{ svcTime.holiday_e }}</span
                >
              </p>
            </div>
          </div>

          <div class="content-none" v-if="!supplier.service_tel && !supplier.service_qq">
            <p>该商家未提供客服联系方式</p>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Header } from 'mint-ui'
import SupplierGoodsList from './child/SupplierGoodsList'
import { shopGet } from '../../api/shop'
export default {
  name: 'Supplier',
  components: {
    SupplierGoodsList
  },
  data() {
    return {
      startY: 0,
      clientY: 0,
      move: true,

      id: this.$route.query.id ? this.$route.query.id : null,
      supplier: { service_time: {} },
      isTop: false,

      isShowService: false,
      isIos: false
    }
  },

  beforeRouteLeave(to, from, next) {
    from.meta.scrollTop = document.querySelector('.container-supplier').scrollTop
    from.meta.listScrollTop = document.querySelector('.product-body').scrollTop
    next()
  },
  // keepAlive 被唤醒时
  activated() {
    if (this.id != this.$route.query.id) {
      this.id = this.$route.query.id
      this.supplier = { service_time: {} }
      this.getSupplierInfo()
      this.$refs.supplierList.getList(true)
    } else {
      const scrollTop = this.$route.meta.scrollTop
      const listScrollTop = this.$route.meta.listScrollTop
      if (scrollTop > 0) {
        document.querySelector('.container-supplier').scrollTop = scrollTop
        document.querySelector('.product-body').scrollTop = listScrollTop
      }
    }
  },

  created() {
    this.getSupplierInfo()
    this.isIos = 1 == this.utils.getOpenBrowser() ? true : false
  },
  computed: {
    getUrl() {
      return this.supplier.icon ? this.supplier.icon : 'https://static.itzcdn.com/app/hhmall_res/app_icon.png'
    },
    isService() {
      if ((this.svcTime.weekdays_s && this.svcTime.weekdays_e) || (this.svcTime.holiday_s && this.svcTime.holiday_e)) {
        return true
      } else {
        return false
      }
    },
    svcTime() {
      let data = this.supplier.svc_time || {}
      let weekdays = data.weekdays || {}
      let holiday = data.holiday || {}
      return {
        weekdays_s: weekdays.s,
        weekdays_e: weekdays.e,
        holiday_s: holiday.s,
        holiday_e: holiday.e
      }
    }
  },
  methods: {
    getSupplierInfo() {
      shopGet(this.id).then(
        res => {
          this.supplier = res
        },
        error => {
          console.log(error)
        }
      )
    },
    touchS(e) {
      this.move = !this.move
      let touch = e.touches[0]
      this.startY = touch.pageY
      this.clientY = touch.clientY
    },
    touchM(e) {
      let touch = e.touches[0]
      // 向上滑动
      if (touch.pageY - this.startY <= 0) {
        return
      }
      if (this.startY != this.clientY) {
        return
      }
      let top = document.getElementById('topImg')
      let height = touch.pageY - this.startY
      height = height > 200 ? 200 : height
      top.style.height = 90 + height / 2 + 'px'
      //图片放大尺寸
      let image = top.children[1]
      let scale = height / 300 + 1.0
      image.style.transform = 'scale(' + scale + ',' + scale + ')'
    },
    touchE(e) {
      this.move = !this.move
      let touch = event.changedTouches[0]
      let top = document.getElementById('topImg')
      top.style.height = 90 + 'px'
      let image = top.children[1]

      image.style.transform = 'none'
    },
    scrollEvent(e) {
      if (e.target.scrollTop >= this.$refs.supplierList.$refs.filterList.offsetTop - 1) {
        this.isTop = true
      } else {
        this.isTop = false
      }
    },
    goShopInfo() {
      this.$router.push({ name: 'SupplierInfo', query: { id: this.id } })
    },
    goBack() {
      this.$_goBack()
    },
    showService() {
      this.isShowService = true
    },
    share() {
      this.hhApp.share(
        this.supplier.name,
        this.getUrl,
        'WechatSession,WechatTimeline',
        'hh-supplier-share',
        '换换商城',
        encodeURIComponent(location.href),
        '换换商城'
      )
    },
    search() {
      this.$router.push({
        name: 'search',
        query: {
          shop: this.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container-supplier {
  position: relative;
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
.topImg {
  height: 66px;
  overflow: hidden;
  position: relative;
  background-color: #f4f4f4;
  .header {
    background: rgba(255, 255, 255, 0);
    padding-top: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: auto !important;
  }
  .top-right,
  .top-left {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      height: 31px;
      width: auto;
      & + img {
        margin-left: 12px;
      }
    }
  }
  .top-left {
    justify-content: flex-start;
  }
}
.supplier-msg {
  position: relative;
  height: 82px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 15px;
  .supplier-msg-body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .supplier-msg-img {
      margin-right: 16px;
      margin-top: -24px;
      width: 72px;
      height: 72px;
      background: #fff;
      border-radius: 3px;
      box-shadow: 0px 2px 8px 0px rgba(216, 216, 216, 0.5);

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 72px;
        height: 72px;
        border-radius: 3px;
      }
    }
    .supplier-msg-content {
      flex: 1;
    }
    .supplier-name {
      width: 180px;
      display: flex;
      align-items: center;
      p {
        color: #404040;
        font-size: 13px;
        line-height: 18px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img {
        width: 3px;
        height: 5px;
        margin-left: 6px;
      }
    }
    .supplier-type {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 4px;
      .type {
        height: 14px;
        padding: 0;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        span {
          margin: 0 -6px;
          line-height: 1;
          @include sc(8px, #ffffff, center center);
        }
        &.type1 {
          background-color: #d8aab7;
        }
        &.type2 {
          background-color: #c2b5cf;
        }
        &.type3 {
          background-color: #d8aab7;
        }
        &.type5 {
          background-color: #b5c884;
        }
      }
      .supplier-desc {
        @include sc(11px, #999999, left center);
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .more-supplier {
    position: absolute;
    right: 10px;
    @include sc(11px, #552e20, right center);
    width: 65px;
    height: 22px;
    border-radius: 11px;
    border: 1px solid #552e20;
    text-align: center;

    font-weight: 400;
    color: #552e20;
    line-height: 22px;
  }
}
.line {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.trans {
  transition: 0.3s;
  img {
    transition: 0.3s;
  }
}
.mint-popup-bottom {
  height: 440px;
  .pop-container {
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
        @include thin-border(rgba(85, 46, 32, 0.2), 0, auto, true);
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
          display: flex;
          align-items: center;
          justify-content: space-between;
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

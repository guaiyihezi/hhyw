<template>
  <div class="coupon-merge-container">
    <mt-header class="header" title="合并优惠券">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <div class="main-content" v-if="couponMergeList.length">
      <div class="tip-word">
        <span>可合成的优惠券面值：</span><br />
        <div class="price-step">
          <span class="every-price" v-for="(item, index) in allPriceSteps">{{ formatNum(item) }}</span>
        </div>
      </div>
      <div class="coupon-list-body-wrapper">
        <div class="coupon-list-body" v-for="(item, index) in couponMergeList" :key="index">
          <coupon-item
            :item="item"
            :opacity="currentId !== 1"
            :isUsed="currentId === 2"
            v-on:onclick="goGoodsList(item)"
          ></coupon-item>
          <div class="list-checkbox">
            <input
              type="checkbox"
              class="checkbox"
              :id="item.coupon_user_id + '-' + item.coupon_id"
              v-model="item.checked"
            />
            <label :for="item.coupon_user_id + '-' + item.coupon_id"></label>
          </div>
        </div>
      </div>
      <div class="merge-btn" @click.stop="merge">
        合并优惠券
      </div>
    </div>
    <div class="coupon-list-body-none" v-else>
      <img src="../../assets/image/hh-icon/coupon/icon-list-none.png" alt="" />
      <label>暂无可合并的优惠券</label>
    </div>

    <mt-popup v-model="showMergedCoupon">
      <p class="popup-title">即将生成优惠券</p>
      <div class="popup-coupon-wrapper">
        <coupon-item
          :item="mergedCoupon"
          :opacity="currentId !== 1"
          :isUsed="currentId === 2"
          v-on:onclick="goGoodsList(mergedCoupon)"
        ></coupon-item>
      </div>
      <div class="btn-group">
        <button class="cancel" @click="showMergedCoupon = false">取消</button>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import CouponItem from './child/CouponItem'
import { getMergeCouponList, mergeCoupons, confirmMerge } from '../../api/coupon'
export default {
  name: 'couponMerge',
  data() {
    return {
      couponMergeList: [],
      mergedCoupon: {},
      mergePrice: '',
      currentId: 1,
      showMergedCoupon: false
    }
  },
  components: { CouponItem },
  computed: {
    checkedList() {
      let arr = []
      this.couponMergeList.forEach(item => {
        if (item.checked) {
          arr.push(item.coupon_user_id)
        }
      })
      return arr
    },
    coupon_user_ids() {
      return this.checkedList.join(',')
    },
    allPriceSteps() {
      return this.mergePrice.split('、')
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$indicator.open()
      // this.couponMergeList = list
      getMergeCouponList()
        .then(res => {
          this.mergePrice = res.description
          this.couponMergeList = res.list
          this.couponMergeList.forEach(
            item => {
              item.checked = false
            },
            err => {
              this.$toast(err.errorMsg)
            }
          )
        })
        .finally(() => {
          this.$indicator.close()
        })
    },
    formatNum(n) {
      let num = n.indexOf('￥') > -1 ? n.replace('￥', '') : n
      return `￥${this.utils.formatMoney(num)}`
    },
    goGoodsList(item) {
      this.$router.push({ name: 'couponProductList', query: { id: item.coupon_id } })
    },
    merge() {
      if (this.checkedList.length < 2) {
        this.$messagebox.alert('至少选择两个优惠券才可进行合并', '')
        return
      }
      this.$indicator.open()
      mergeCoupons(this.coupon_user_ids)
        .then(
          res => {
            this.showMergedCoupon = true
            this.mergedCoupon = res
          },
          err => {
            err.toastObj.close()
            this.$messagebox.alert(err.errorMsg, '')
          }
        )
        .finally(() => {
          this.$indicator.close()
        })
    },
    confirm() {
      this.$indicator.open()
      confirmMerge({ coupon_id: this.mergedCoupon.coupon_id, coupon_user_ids: this.coupon_user_ids })
        .then(
          res => {
            this.showMergedCoupon = false
            this.$toast('合并成功')
            this.getList()
          },
          err => {
            this.$toast(err.errorMsg)
          }
        )
        .finally(() => {
          this.$indicator.close()
        })
    },
    goBack() {
      this.$_goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-merge-container {
  min-height: 100%;
  background: #fff;
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tip-word {
      margin-top: 10px;
      width: 335px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
      span {
        display: inline-block;
        height: 19px;
        line-height: 19px;
      }
      .price-step {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        .every-price {
          min-width: 16.6%;
        }
      }
    }
    .merge-btn {
      width: 100%;
      height: 46px;
      background: rgba(119, 37, 8, 1);
      text-align: center;
      line-height: 46px;
      color: #fff;
      font-size: 18px;
      position: fixed;
      bottom: 0;
    }
    .coupon-list-body-wrapper {
      overflow: auto;
      flex: 1;
      width: 100%;
    }
    .coupon-list-body {
      padding: 0 15px;
      display: flex;
      /deep/ .coupon-container {
        width: 306px;
      }
      &:nth-last-child(1) {
        margin-bottom: 70px;
      }
      div.list-checkbox {
        margin-top: 41px;
        margin-left: 16px;
        width: 23px;
        height: 22px;
        flex-basis: 22px;
        flex-shrink: 0;
        position: relative;
        label {
          @include wh(22px, 22px);
          @include thin-border-2019([top, left, bottom, right], #979797, 50%);
          position: absolute;
          top: 0;
          left: 1px;
          display: inline-block;
        }
        input {
          display: none;
          &:checked + label {
            @include wh(22px, 22px);
            @include thin-border-2019([top, left, bottom, right], #d0b482, 50%);
            background: url('../../assets/image/hh-icon/coupon/coupon-checked.png') no-repeat;
            background-size: cover;
          }
          &:focus {
            outline-offset: 0;
          }
          &.pre-sale + label {
            background-color: #e2e2e2;
          }
        }
      }
    }
  }
  .coupon-list-body-none {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      @include wh(135px, 135px);
      margin-top: 115px;
    }
    label {
      margin-top: 13px;
      font-size: 17px;
      font-weight: 400;
      color: #666;
      line-height: 24px;
    }
  }
  /deep/ .mint-popup {
    width: 342px;
    border-radius: 2px;
    .popup-title {
      height: 28px;
      font-size: 18px;
      font-weight: bold;
      color: #404040;
      line-height: 28px;
      text-align: center;
      margin-top: 15px;
    }
    .popup-coupon-wrapper {
      margin: -5px 18px 15px;
    }
    .btn-group {
      border-top: 0.5px solid #efefef;
      button {
        font-size: 16px;
        font-weight: 400;
        color: #333;
        background: #fff;
        width: 50%;
        height: 48px;
      }
      .confirm {
        background: #772508;
        color: #fff;
      }
    }
  }
}
</style>

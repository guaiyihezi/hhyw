<template>
  <div class="container">
    <mt-header class="header" title="选择债权">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
      <header-item slot="right" title="兑换规则" v-on:onclick="goRules" v-if="order"></header-item>
    </mt-header>
    <div class="bond-wrapper">
      <div class="bond-content-wrapper">
        <mt-navbar class="navbar-container" v-model="selectedNavbar">
          <mt-tab-item class="navbar-container-item" id="1">省心计划</mt-tab-item>
          <mt-tab-item class="navbar-container-item" id="2">智选系列</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container class="tab-container" v-model="selectedNavbar">
          <mt-tab-container-item class="tab-container-item" id="1">
            <base-list
              class="items-wrapper"
              :items="items"
              :isMore="isMore"
              :isLoaded="isLoaded"
              v-on:loadMore="loadMore"
            >
              <bond-debt-item
                v-for="(item, index) in items"
                :key="index"
                :index="index"
                :item="item"
                :checkId="checkId[index]"
                :disabledCheckbox="disabledCheckbox"
                @clickBondId="clickBondId"
              >
              </bond-debt-item>
              <div class="no-data" v-if="isLoaded && items.length === 0">
                暂无数据
              </div>
            </base-list>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab-container-item" id="2">
            <base-list
              class="items-wrapper"
              v-if="selectedNavbar == '2' || navbar2Inited"
              :items="itemsWise"
              :isMore="isMoreWise"
              :isLoaded="isLoadedWise"
              v-on:loadMore="loadMoreWise"
            >
              <bond-debt-item
                v-for="(item, index) in itemsWise"
                :key="index"
                :index="index"
                :item="item"
                :checkId="checkIdWise[index]"
                :disabledCheckbox="disabledCheckbox"
                @clickBondId="clickBondIdWise"
              >
              </bond-debt-item>
              <div class="no-data" v-if="isLoadedWise && itemsWise.length === 0">
                暂无数据
              </div>
            </base-list>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div class="wrapper-bottom">
        <div class="content">
          <label>所需债权金额：{{ utils.formatMoney(exchangeBond) }}</label>
          <label
            >已选债权金额：<span class="red">{{ utils.formatMoney(selectedTotal) }}</span></label
          >
        </div>
        <gk-button :type="pass ? 'primary-secondary' : 'disable-secondary'" class="button" v-on:click="pass && submit()"
          >兑换</gk-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import $cookie from 'js-cookie'
import { mapState, mapMutations, mapActions } from 'vuex'
import { HeaderItem, Button, BaseList } from '../../components/common'
import BondDebtItem from './child/BondDebtItem'
import { Header } from 'mint-ui'
import { bondList, bondChange } from '../../api/bond'
import { ENUM } from '../../const/enum'
export default {
  name: 'bondDebt',
  components: {
    BondDebtItem
  },
  beforeRouteEnter(to, from, next) {
    let routename = ['payment', 'friendPayConfirm', 'checkout', 'paymentHuan']
    if (routename.indexOf(from['name']) != -1) {
      let path = { path: from['path'], query: from['query'] }
      $cookie.set('bondForm', JSON.stringify(path))
    }
    next()
  },
  data() {
    return {
      total: 0,
      pass: false,
      disabledCheckbox: false,

      checkId: [],
      selectedTotal: 0,
      lastAccount: 0,

      isLoaded: false,
      page: 1,
      items: [],
      isMore: 1,

      isLoadedWise: false,
      itemsWise: [],
      checkIdWise: [],
      isMoreWise: 1,
      pageWise: 1,

      selectedNavbar: '1', // 选中的tab
      navbar2Inited: false // 第二个tab 内容是否已初始化
    }
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      exchangeBond: state => state.bond.exchangeBond,
      canExchangePartially: state => state.bond.canExchangePartially,
      order: state => state.bond.exchangeBondOrderId,
      product: state => state.bond.exchangeBondProductId,
      debt_id: state => state.bond.debt_id
    })
  },
  watch: {
    total(total) {
      let pass = false
      let disabledCheckbox = false
      if (total >= this.exchangeBond) {
        let syzq = total - this.exchangeBond // 选择的债权剩余债权
        pass = true
        disabledCheckbox = true
        if (syzq < 100 || (total < 200 && syzq < 200)) {
          // 剩余债权全兑换
          // 兑换后债权小于100
        } else if (this.exchangeBond < 100) {
          // 最少兑换 100 权益
          total = 100
        } else {
          total = this.exchangeBond
        }
      }
      if (this.canExchangePartially && total > 0) {
        pass = true
      }
      this.selectedTotal = Math.abs(total)
      this.pass = pass
      this.disabledCheckbox = disabledCheckbox
    }
  },
  created() {
    // 债权兑换页面的入口 1、确认支付页（下单支付、好友代付） 2、规则说明页 3、无入口 直接进入
    if (!this.isOnline) {
      return this.goBack()
    }

    // 1、从 确认支付页 过来，将相关参数记录到store
    if (this.$route.params.need) {
      this.saveExchangeBondState({
        bond: this.$route.params.need,
        order: this.$route.params.order || '', // 订单id
        product: this.$route.params.product || '', // 商品id
        canPartial: this.$route.params.canPartial, // 只有混合支付(没有订单号)才允许选择部份债权
        debt_id: this.$route.params.debt_id // 兑换债权前生成的临时订单的关联id
      })
    }

    // 2、从 规则说明页 过来 doNothing，相关信息只需要从 store 中获取
    // 3、无入口 直接进入，则 跳回去
    if (!this.exchangeBond) {
      return this.goBack()
    }

    // 检查 itz 授权状态
    this.helperItzAuthCheck().then(res => {
      if (!res.status) {
        this.itzAuthGuide({ goback: this.goBack })
      }
    })
  },
  mounted() {
    // 3、无入口 直接进入，则 跳回去
    if (!this.exchangeBond) {
      this.goBack()
    }
  },
  methods: {
    ...mapMutations({
      itzAuthGuide: 'itzAuthGuide',
      saveExchangeBondState: 'saveExchangeBondState'
    }),
    ...mapActions({
      helperItzAuthCheck: 'helperItzAuthCheck'
    }),
    loadPageData(type) {
      type = type || 1
      let page
      if (type == 1) {
        page = this.page
        this.page += 1
        this.isLoaded = false
      } else if (type == 2) {
        page = this.pageWise
        this.pageWise += 1
        this.isLoadedWise = false
      }

      const params = {
        page: page,
        size: 10,
        product: this.product,
        debt_type: type,
        debt_id: this.debt_id
      }

      const showLoad = !!(1 == page && 1 == type)

      if (showLoad) {
        this.$indicator.open()
      }
      bondList(params)
        .then(res => {
          if (type == 1) {
            this.items = [...this.items, ...res.list]
            this.isMore = res.paged.more
            this.isLoaded = true
          } else if (type == 2) {
            this.itemsWise = [...this.itemsWise, ...res.list]
            this.isMoreWise = res.paged.more
            this.isLoadedWise = true
          }
        })
        .finally(() => {
          if (showLoad) {
            this.$indicator.close()
          }
        })
    },
    clickBondId(index) {
      this.checkId[index] = !this.checkId[index]
      // 精度计算修正，若需求量大可以考虑 https://github.com/nefe/number-precision
      this.getTotalCount()
    },
    clickBondIdWise(index) {
      this.checkIdWise[index] = !this.checkIdWise[index]
      // 精度计算修正，若需求量大可以考虑 https://github.com/nefe/number-precision
      this.getTotalCount()
    },
    submit() {
      let msg = '<p class="info">'
      let sendVal = this.selectedTotal
      if (!this.order || sendVal == this.exchangeBond) {
        msg = `确认将所选债权兑换 <label class="mark-color">${this.utils.formatMoney(sendVal)}</label> 个权益积分`
      } else {
        msg = `所选债权兑换 <label class="mark-color">${this.utils.formatMoney(
          sendVal
        )}</label> 个权益积分，超出订单价格部份将发放至权益积分余额。`
      }
      if (this.product) {
        msg = `您已选定<label class="mark-color">${this.utils.formatMoney(
          sendVal
        )}</label>元指定债权<br />用于购买“一对一专区商品”商品兑换权益积分后无法回退。 `
      }
      msg += '</p><p class="subinfo">确认兑换后需要输入新网交易密码</p>'
      msg += '</p><p class="subinfo">订单支付后，若发生售后退款问题，原债权仅退回至权益积分，无法退回至原有债权</p>'

      this.$messagebox.confirm(msg, '').then(
        action => {
          if (action === 'confirm') {
            let bond_ids = this.checkId.reduce((accumulator, val, key) => {
              if (val) {
                accumulator.push(this.items[key].id)
              }
              return accumulator
            }, [])
            let bond_wise_ids = this.checkIdWise.reduce((accumulator, val, key) => {
              if (val) {
                accumulator.push(this.itemsWise[key].id)
              }
              return accumulator
            }, [])
            this.$indicator.open('您即将前往存管银行')
            let time = new Date().getTime()
            const params = {
              account: sendVal,
              bond_ids: bond_ids, // 数组
              bond_wise_ids: bond_wise_ids, // 数组
              order: this.order,
              debt_id: this.debt_id
            }
            bondChange(params).then(
              res => {
                const timer = setTimeout(() => {
                  location.href = encodeURI(res)
                }, time + 2e3 - new Date().getTime())
                this.$once('hook:beforeDestroy', () => {
                  this.$indicator.close()
                  clearTimeout(timer)
                })
              },
              error => {
                this.$indicator.close()
                this.$toast(error.errorMsg)
                this.goBack()
              }
            )
          }
        },
        cancel => {}
      )
    },
    loadMore() {
      if (this.isMore) {
        this.loadPageData(1)
      }
    },
    loadMoreWise() {
      if (this.isMoreWise) {
        this.loadPageData(2)
      }
      this.navbar2Inited = true
    },
    goBack() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
      } else {
        this.$_goBack()
      }
    },
    goRules() {
      this.$router.push('/bondRules')
    },
    clear() {
      this.bond = ''
    },

    /**
     * 计算当前选中的债权总和
     */
    getTotalCount() {
      this.total = parseFloat(
        this.checkId
          .reduce((accumulator, val, key) => {
            if (val) {
              if (accumulator >= this.exchangeBond) {
                this.checkId[key] = false
              } else {
                accumulator += this.$accounting.unformat(this.items[key].account)
                this.lastAccount = this.items[key].account
              }
            }
            return accumulator
          }, 0)
          .toPrecision(12)
      )
      this.total = parseFloat(
        this.checkIdWise
          .reduce((accumulator, val, key) => {
            if (val) {
              if (accumulator >= this.exchangeBond) {
                this.checkIdWise[key] = false
              } else {
                accumulator += this.$accounting.unformat(this.itemsWise[key].account)
                this.lastAccount = this.itemsWise[key].account
              }
            }
            return accumulator
          }, this.total || 0)
          .toPrecision(12)
      )
    }
  }
}
</script>

<style>
.mint-msgbox .info {
  color: #404040;
  font-size: 15px;
  line-height: 24px;
}
.mint-msgbox .subinfo {
  color: #888;
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
}
</style>
<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: $mainbgColor;
  .header {
    @include header;
    @include thin-border(#f4f4f4, 0, 0);
  }
  .button {
    @include button($margin: 10px 20px 10px);
    width: 90px;
  }
  .bond-wrapper {
    flex: 1 0 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .bond-content-wrapper {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    .navbar-container {
      @include thin-border(#f4f4f4, 0, 0);
      flex-shrink: 0;
      .navbar-container-item {
        box-sizing: border-box;
        padding: 10px;
        &.is-selected {
          margin-bottom: 0;
          border: none;
          color: #562f21;
          position: relative;
          &:before {
            content: '';
            display: block;
            width: 50px;
            height: 2px;
            background-color: #562f21;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .tab-container {
      flex-grow: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      /deep/ .mint-tab-container-wrap {
        overflow: hidden;
        flex-grow: 1;
      }
      .tab-container-item {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .items-wrapper {
    overflow: auto;
    flex-grow: 1;
    /deep/ .no-data {
      padding-top: 10px;
      font-size: 14px;
      color: #404040;
      text-align: center;
    }
  }
  .wrapper-bottom {
    color: $baseColor;
    font-size: 14px;
    line-height: 19px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    height: 64px;
    .content {
      width: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 8px 20px;
    }
    label {
      flex: 1;
      .red {
        color: $primaryColor;
      }
    }
  }
}
</style>

<template>
  <div class="container-token-free-pay-pwd">
    <mt-header class="header" title="小额权益免密支付">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="$_goBack"></header-item>
    </mt-header>
    <div class="content">
      <div class="item switch-wr">
        <div class="left">
          <span class="title">免密支付</span
          ><span :class="{ status: true, enable: switchStatus }">{{ statusTxt }}</span>
        </div>
        <div class="right">
          <mt-switch v-model="switchStatus" @change="handleChangeSwitch"></mt-switch>
        </div>
      </div>
      <div v-if="switchStatus" class="items-wrapper">
        <div class="item switch-limit">
          <label class="lable-radio-cover" for="limit200"></label>
          <input class="input-radio" type="radio" id="limit200" value="200" v-model="radioValue" />
          <div class="row-1">
            <span class="title">200限额</span>
            <div class="btn-radio">
              <label class="lable-radio"></label>
            </div>
          </div>
          <p class="desc">
            选择此项，之后的交易中，支付额小于或等于200积分/浣豆时，将无需输入权益支付密码
          </p>
        </div>
        <div class="item switch-limit">
          <label class="lable-radio-cover" for="limit500"></label>
          <input class="input-radio" type="radio" id="limit500" value="500" v-model="radioValue" />
          <div class="row-1">
            <span class="title">500限额</span>
            <div class="btn-radio">
              <label class="lable-radio"></label>
            </div>
          </div>
          <p class="desc">
            选择此项，之后的交易中，支付额小于或等于500积分/浣豆时，将无需输入权益支付密码
          </p>
        </div>
        <div class="item switch-limit">
          <label class="lable-radio-cover" for="limit1000"></label>
          <input class="input-radio" type="radio" id="limit1000" value="1000" v-model="radioValue" />
          <div class="row-1">
            <span class="title">1000限额</span>
            <div class="btn-radio">
              <label class="lable-radio"></label>
            </div>
          </div>
          <p class="desc">
            选择此项，之后的交易中，支付额小于或等于1000积分/浣豆时，将无需输入权益支付密码
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { setTokenFreepayLimit } from '../../api/user'
const DefaultRadio = 1000

export default {
  name: 'SetTokenFreePayPwd',
  data() {
    return {
      switchStatus: false,
      radioValue: 0
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    statusTxt() {
      return this.switchStatus ? '已开启' : '未开启'
    },
    limitNumber() {
      return this.switchStatus ? this.radioValue : 0
    }
  },
  watch: {
    limitNumber(value) {
      setTokenFreepayLimit(value)
    }
  },
  async created() {
    await this.syncUserInfo({ isLoading: true })
    this.switchStatus = this.user.pay_without_limit > 0 ? true : false
    this.radioValue = this.switchStatus ? this.user.pay_without_limit : DefaultRadio

    // await new Promise((resolve, reject) => {
    //   this.$indicator.open()
    //   setTimeout(() => {
    //     this.$indicator.close()
    //     resolve()
    //   }, 1500)
    // })
    // const pay_without_limit = 500
    // this.switchStatus = pay_without_limit > 0 ? true : false
    // this.radioValue = pay_without_limit
  },
  methods: {
    ...mapActions({
      syncUserInfo: 'syncUserInfo'
    }),
    handleChangeSwitch(event) {
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-token-free-pay-pwd {
  height: 100%;
  background-color: #fff;
}
.content {
  padding: 0 15px;
  .item {
    @include thin-border-2019(bottom, rgba(85, 46, 32, 0.2));
  }
  .switch-wr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0 8px;

    .left {
      .title {
        display: block;
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      .status {
        font-size: 11px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
        margin-top: 4px;

        &.enable {
          color: rgba(85, 46, 32, 1);
        }
      }
    }
  }
  .switch-limit {
    position: relative;
    padding: 17px 0 15px;

    .row-1 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 15px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      .btn-radio {
        width: 22px;
        height: 22px;

        .lable-radio {
          display: block;
          width: 100%;
          height: 100%;
          background: url('../../assets/image/hh-icon/icon-checkbox.png') no-repeat center center;
          background-size: contain;
        }
      }
    }
    .input-radio {
      display: none;
      &:checked + .row-1 {
        .lable-radio {
          background-image: url('../../assets/image/hh-icon/icon-checkbox-active.png');
        }
      }
    }
    .lable-radio-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }

    .desc {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-top: 10px;
    }
  }
}
</style>

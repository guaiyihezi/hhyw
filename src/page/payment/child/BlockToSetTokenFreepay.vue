<template>
  <div class="token-freepay-set-content" v-if="canShow">
    <h3>开启小额权益免密支付</h3>
    <p>在之后的交易中，支付额小于限额积分/浣豆时,将无需输入权益支付密码。</p>
    <a class="button" @click="toSetFreepay">立即开启</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const DefaultValue = -1

export default {
  data() {
    return {
      ifShow: false
    }
  },
  props: {
    showFromProp: {
      type: [Boolean, Number],
      default: DefaultValue
    }
  },
  async created() {
    await this.syncUserInfo()
    this.ifShow = !!!this.user.pay_without_limit
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    canShow() {
      if (DefaultValue !== this.showFromProp) {
        // 有prop传入时 以prop为准
        return !!this.showFromProp
      }
      return this.ifShow
    }
  },
  methods: {
    ...mapActions({
      syncUserInfo: 'syncUserInfo'
    }),
    toSetFreepay() {
      this.$router.push({ name: 'setTokenFreePayPwd' })
    }
  }
}
</script>

<style lang="scss" scoped>
.token-freepay-set-content {
  margin-top: 40px;
  background: url('../../../assets/image/pay-result/block-set-token-freepay-backImg@2x.png') no-repeat center center;
  background-size: cover;
  padding: 20px 0 24px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: rgba(177, 102, 80, 1);
    line-height: 25px;
    text-align: center;
  }
  p {
    margin-top: 12px;
    padding: 0 20px;
    font-size: 15px;
    color: rgba(195, 146, 132, 1);
    line-height: 25px;
    letter-spacing: 1px;
  }
  .button {
    display: block;
    margin: 20px auto 0;
    width: 218px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    background: linear-gradient(180deg, rgba(255, 154, 118, 1) 0%, rgba(255, 92, 50, 1) 100%);
    box-shadow: 0px 2px 7px 0px rgba(253, 58, 0, 0.73);
    border-radius: 22px;

    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
}
</style>

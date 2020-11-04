<template>
  <numeric-input-local
    v-model="show"
    title="请输入权益支付密码"
    @done="savePwd"
    @resetPwd="goResetPaypwd"
    @clickBack="clickBack"
    :count="count"
  ></numeric-input-local>
</template>

<script>
import { apiVerifyPaypwd } from '../../api/user'
import NumericInputLocal from './NumericInputLocal'
import { ENUM } from '../../const/enum'

export default {
  name: 'PayPasswordPanel',
  data() {
    return {
      show: false,
      pay_cert: '',
      callback: null,
      resetPaypwd: null,
      count: 0
    }
  },
  watch: {
    show(newV) {
      console.log('show Changed:' + newV)
    }
  },
  methods: {
    async savePwd(val) {
      console.log('get total payPwd: ' + val)

      // 校验支付密码
      let isPwdValid = true
      try {
        await this.verifyPaypwd(val)
      } catch (e) {
        if (e === -1) {
          // 须重置密码
          this.show = false
          this.callback('close')
        }
        if (e === 1) {
          // 密码错误
          this.count++
        }
        isPwdValid = false
      }
      if (!isPwdValid) {
        return
      }
      // 得到凭证
      this.callback('saveCert')
      this.show = false
    },
    verifyPaypwd(pwd) {
      return new Promise((resolve, reject) => {
        this.$indicator.open()
        apiVerifyPaypwd({ password: pwd })
          .then(
            res => {
              // 支付密码校验通过凭证
              this.pay_cert = res.pay_cert
              resolve()
            },
            error => {
              // 处理 errorCode 3306 密码输入错误超多3次，须重置密码
              if (ENUM.ERROR_CODE.PAYPWD_ERROR_OUT_OF_LIMIT == error.errorCode) {
                error.toastObj && error.toastObj.close()
                this.$messagebox({
                  title: '',
                  message: error.errorMessage || '您输入密码错误次数已超过限制，请重新设置支付密码',
                  showCancelButton: true,
                  closeOnClickModal: false,
                  cancelButtonText: '取消',
                  confirmButtonText: '去设置'
                }).then(action => {
                  if (action === 'confirm') {
                    this.goResetPaypwd()
                  }
                })
                reject(-1)
                return
              }
              // 支付密码 错误等
              reject(1)
            }
          )
          .finally(() => {
            this.$indicator.close()
          })
      })
    },
    goResetPaypwd() {
      this.resetPaypwd()
    },
    clickBack() {
      this.callback('close')
    }
  },
  components: {
    NumericInputLocal
  }
}
</script>

<style lang="scss" scoped></style>

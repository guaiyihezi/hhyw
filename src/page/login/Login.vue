<template>
  <div class="page-wrapper">
    <div class="header-container">
      <mt-header class="header">
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
      </mt-header>
    </div>
    <div class="container-wrapper" v-if="!isAgreement">
      <div class="logo"></div>
      <!-- 手机号 + 验证码提交表单 -->
      <form-submit-by-phone-and-code v-on:submit-success="submitSuccess"></form-submit-by-phone-and-code>

      <div class="agreement">
        <p>
          注册/登录即表示阅读并同意
          <span @click="goAgreement">《换换商城注册及服务协议》</span>
        </p>
      </div>

      <login-with-third></login-with-third>
    </div>
    <!-- 三方登录 绑定手机号 -->
    <third-login-bind-phone></third-login-bind-phone>
    <!-- 登录/注册 协议 -->
    <login-agreement v-if="isAgreement"></login-agreement>
  </div>
</template>
<script>
import $cookie from 'js-cookie'
import { mapState, mapMutations, mapActions } from 'vuex'
import { bondGet } from '../../api/bond'
import { HeaderItem } from '../../components/common'
import LoginAgreement from './LoginAgreement'
import { Header } from 'mint-ui'
import FormSubmitByPhoneAndCode from './child/ComponentSubmitByPhoneAndCode'
import ThirdLoginBindPhone from './child/ThirdLoginBindPhone'
import LoginWithThird from './child/LoginWithThird'

export default {
  name: 'login',
  data() {
    return {
      isAgreement: false
    }
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user
    })
  },
  components: {
    LoginAgreement,
    ThirdLoginBindPhone,
    FormSubmitByPhoneAndCode,
    LoginWithThird
  },
  beforeRouteEnter(to, from, next) {
    // 默认 登录后 跳转 地址
    if (from['name'] && from['name'] != 'home' && from['name'] !== 'agreement' && from['name'] !== 'loginGuide') {
      $cookie.set('signinForm', JSON.stringify({ path: from['path'], query: from['query'] }))
    }
    next()
  },
  created() {
    this.$indicator.close()
    // 自定义 登录后 跳转 地址
    let redirect = this.$route.query.redirect
    if (redirect) {
      $cookie.set('signinFormRedirect', redirect)
    }

    // 若已是 登录状态
    if (this.isOnline) {
      return this.goPrev()
    }
  },
  methods: {
    ...mapMutations({
      saveAuthInfo: 'signin',
      saveCurrentBondState: 'saveCurrentBondState'
    }),
    ...mapActions({
      helperItzAuthCheck: 'helperItzAuthCheck'
    }),
    submitSuccess(res) {
      setTimeout(() => {
        this.goPrev()
      }, 1000)
      this.saveAuthInfo({ token: res.token, user: res.user })
      // 若是itz用户（user_platform==1）查询itz在投债权
      res.user.user_platform === 1 && this.getItzLastDebt()
      // 获取itz 授权状态
      res.user.user_platform === 1 && this.helperItzAuthCheck()
      // 通知App登录成功
      this.isHHApp && this.hhApp.loginSuccess(res.token)
    },
    // 返回进入前页面 默认个人中心
    goPrev() {
      let from = { path: '/profile' }
      let signinFormRedirect = $cookie.get('signinFormRedirect')

      if (signinFormRedirect) {
        $cookie.remove('signinFormRedirect')
        signinFormRedirect = decodeURIComponent(signinFormRedirect)
        if (signinFormRedirect.substr(0, 4) == 'http') {
          // 跳往一个http uri（非换换Vue架构），后续没办法通过token获取用户信息，故需带上hashId，作登录后用户标识
          location.href = this.utils.updateGetParameter(signinFormRedirect, 'hashid', this.user.id)
          return
        } else {
          from = { path: signinFormRedirect }
        }
      } else {
        const signinForm = $cookie.get('signinForm')
        if (signinForm) {
          $cookie.remove('signinForm')
          from = JSON.parse(signinForm)
        }
      }

      this.$router.replace(from)
    },
    goBack() {
      if (this.isAgreement) {
        this.isAgreement = false
      } else {
        this.$_goBack()
      }
    },
    goAgreement() {
      this.isAgreement = true
    },
    getAppVersion() {
      let appVersion = this.hhApp.getAppVersion()
      appVersion = parseInt(appVersion.replace(/\./g, ''))
      return appVersion
    },
    getItzLastDebt() {
      bondGet().then(res => {
        this.saveCurrentBondState(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  min-height: 100%;
  padding-bottom: 1px;
  background: #fff;
}
.header {
  height: 50px;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.container-wrapper {
  padding: 0 24px;

  .logo {
    width: 100%;
    height: 148px;
    background: url('../../assets/image/hh-icon/login/logo@2x.png') no-repeat 50% 47px;
    background-size: 65px 95px;
  }

  .agreement {
    height: 20px;
    margin-top: 15px;
    p {
      color: #ccc;
      font-size: 12px;
      line-height: 20px;
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>

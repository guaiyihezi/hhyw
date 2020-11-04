<template>
  <div class="container">
    <mt-header class="header" title="设置">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <div class="top-info-wrapper" v-if="isOnline">
      <div class="avatar-wrapper">
        <img class="avatar" v-bind:src="user.avatar" v-if="isOnline && user && user.avatar" />
        <img class="avatar" src="../../assets/image/hh-icon/f0-profile/icon-head.png" v-else />
      </div>
      <label class="nickname">{{ nickname }}</label>
    </div>

    <div class="body-wrapper">
      <link-column
        class="section-header"
        v-if="isInHHApp && version031"
        v-on:onclick="goAccount"
        title="账户安全"
      ></link-column>

      <link-column
        v-on:onclick="goAuthPath"
        v-bind:class="{ 'section-header': !isInHHApp || !version031 }"
        v-if="platform"
      >
        <template slot="title">
          <label class="column-title link-column-title">授权</label>
          <span class="my-status">{{ authTxt }}</span>
        </template>
      </link-column>

      <link-column v-on:onclick="goPassword">
        <template slot="title">
          <label class="column-title link-column-title">权益支付密码</label>
          <span class="my-status">{{ isSetPayPwd ? '修改' : '未设置' }}</span>
        </template>
      </link-column>

      <link-column v-on:onclick="goSetTokenFreepay">
        <template slot="title">
          <label class="column-title link-column-title">小额权益免密支付</label>
          <span class="my-status">{{ isSetTokenFreepat ? '修改' : '未开启' }}</span>
        </template>
      </link-column>

      <link-column v-if="isInHHApp && version020" v-on:onclick="goCommom" title="通用"></link-column>
      <link-column
        v-on:onclick="$router.push({ name: 'agreement' })"
        class="section-footer"
        title="用户协议"
        v-stat="{ id: 'profile_agreement' }"
      ></link-column>
      <link-column v-if="isInHHApp" v-on:onclick="goAbout" class="section-header" v-stat="{ id: 'profile_aboutus' }">
        <template slot="title">
          <label class="column-title link-column-title">关于换换</label>
          <span class="my-status">版本 v {{ version }}</span>
        </template>
      </link-column>
    </div>
    <gk-button class="button" v-on:click="signout" v-if="isOnline" v-stat="{ id: 'profile_logout' }"
      >退出登录</gk-button
    >
  </div>
</template>

<script>
import LinkColumn from '../../components/common/LinkColumn'
import { HeaderItem, Button } from '../../components/common'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Header, Switch } from 'mint-ui'
import { goAuth } from './goAuth'

export default {
  data() {
    return {
      about_url: '',
      isInHHApp: false
    }
  },
  created() {
    this.isInHHApp = this.isHHApp
    this.fetchItzAuthCheck({ loading: true })
    this.syncUserInfo()
  },
  components: {
    LinkColumn
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      platform: state => state.auth.platform,
      user: state => state.auth.user,
      authStatus: state => state.itouzi.authStatus,
      authStep: state => state.itouzi.authStep,
      time: state => state.profile.time,
      type: state => state.profile.type
    }),
    nickname() {
      let title = '登录/注册'
      if (this.isOnline) {
        if (this.user && typeof this.user != 'undefined' && JSON.stringify(this.user) != '{}') {
          title = this.user.nickname
          title = this.utils.formatPhone(title)
        }
      }
      return title
    },
    getAvatarUrl() {
      let url = null
      if (this.isOnline) {
        if (this.user && typeof this.user != 'undefined' && JSON.stringify(this.user) != '{}') {
          url = this.user.avatar
        }
      }
      if (url === null) {
        url = require('../../assets/image/change-icon/e0_head1@2x.png')
      }
      return url
    },
    authTxt() {
      if (this.authStatus) {
        return '已授权'
      } else if (this.authStep) {
        return '待审核'
      } else {
        return '未授权'
      }
    },
    version() {
      let version = this.hhApp.getAppVersion()
      if (version) {
        return version
      } else {
        return '0.1.0'
      }
    },
    AppVersion() {
      let appVersion = this.hhApp.getAppVersion() || ''
      appVersion = parseInt(appVersion.replace(/\./g, ''))
      return appVersion
    },
    /*
     *app版本是否大于0.2.0
     */
    version020() {
      return this.AppVersion >= 20 ? true : false
    },
    /*
     *app版本是否大于0.3.0
     */
    version031() {
      return this.AppVersion >= 31 ? true : false
    },
    isSetPayPwd() {
      return this.user.is_set_pay_password == 1
    },
    isSetTokenFreepat() {
      return this.user.pay_without_limit > 0
    }
  },
  methods: {
    ...mapMutations({
      clearToken: 'signout'
    }),
    ...mapActions({
      fetchItzAuthCheck: 'fetchItzAuthCheck',
      syncUserInfo: 'syncUserInfo'
    }),
    goAuthPath() {
      if (this.platform && this.authStatus) {
        return
      }
      goAuth()
    },
    goBack() {
      this.$_goBack()
    },
    goHome() {
      this.$router.push({ name: 'home', params: {} })
    },
    goAbout() {
      this.$router.push({ name: 'About', params: {} })
    },
    goCommom() {
      this.hhApp.openAppPage('hhmall://app_common')
    },
    signout() {
      this.$messagebox.confirm('确认退出', '').then(action => {
        this.clearToken()
        this.goHome()

        // 清除cookie
        this.$cookie.remove('o', this.utils.getDomainA)
        this.$cookie.remove('t', this.utils.getDomainA)

        if (this.isHHApp) {
          this.hhApp.logout()
        }
      })
    },
    // app账户安全页
    goAccount() {
      this.hhApp.openAppPage('hhmall://accountSecurity')
    },
    goPassword() {
      if (!this.isSetPayPwd) {
        this.$router.push({ name: 'transPwdSet' })
      } else {
        this.$router.push({ name: 'transPwdChange' })
      }
    },
    goSetTokenFreepay() {
      this.$router.push({ name: 'setTokenFreePayPwd' })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .header {
    @include header;
  }

  .button {
    font-size: 15px;
    @include button($margin: 50px 0 0);
  }
  .top-info-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    margin-top: 10px;
  }
  .avatar-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 61px;
    height: 61px;
    margin: 20px;
    .avatar {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
  }
  .nickname {
    color: $baseColor;
    font-size: 20px;
    font-weight: 600;
    line-height: 61px;
    width: 100%;
    flex: 1;
    -webkit-box-orient: vertical;
    @include limit-line(1);
  }
  .body-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-top: 10px;
  }
  .my-status {
    @include sc(15px, $subbaseColor);
  }
}
</style>

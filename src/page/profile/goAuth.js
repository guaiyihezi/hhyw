import store from '../../store/index'
import { authCheck } from '../../api/auth-base'
import Vue from 'vue'
import router from '../../router/index'
import { Toast } from 'mint-ui'

export const goAuth = (replace = false) => {
  const $router = router.app.$router
  const $pageChangeMethod = replace ? $router.replace.bind($router) : $router.push.bind($router)

  const authStatus = store.state.itouzi.authStatus
  if (authStatus) {
    Toast('您已授权完成，不需要再授权')
    return false
  }

  // 待审核状态跳转爱投资授权页面（原爱投资手动上传照片认证需人工审核）
  if (store.getters.authStep == 1) {
    $pageChangeMethod({ name: 'authPage' })
    return true
  }

  // 同意签署过【债权兑换服务协议】则 直接去签署成功页（下一步是身份验证）
  if (store.getters.isAgree) {
    $pageChangeMethod({ name: 'AuthFirstStepResult' })
    return true
  }
  if (store.state.itouzi.old_id_check_status) {
    // 老的已经授权完成的用户 直接进入第一步签署协议
    $pageChangeMethod({ name: 'agreementPage' })
    return true
  }
  $pageChangeMethod({ name: 'auth' })
  return true
}

// 判断app是否为 有app人脸生物识别的版本
// const checkAppHigherVersion = judgeVersion => {
//   if (!Vue.prototype.isHHApp) return false

//   const current_version = Vue.prototype.AppVersion
//   if (Number(current_version) >= Number(judgeVersion.replace(/\./g, ''))) {
//     return true
//   }
//   return false
// }

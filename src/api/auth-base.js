import { fetchPost } from '../server/network'

// 去授权设置页
export const authSettingURL = () => fetchPost('/hh/hh.auth.setting')

// 授权状态检查
export const authCheck = (clearCache = 0) =>
  fetchPost('/hh/hh.auth.check', {
    refresh: clearCache
  })

// app内签署协议
export const saveAgreement = () => fetchPost('/hh/hh.save.agreement')

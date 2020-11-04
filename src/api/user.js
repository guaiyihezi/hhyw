import { fetchPost } from '../server/network'
import { fetchJavaHdEndPoint } from './WorkorderMessage'

import store from '../store/index'

// 获取用户资料
export const userProfileGet = () => fetchPost('/hh/hh.user.profile.get')

// 【登录】发送验证码
export const getVelCode = (mobile, is_voice, wx_bind = 0) =>
  fetchPost('/hh/hh.send.smscode', {
    mobile: mobile,
    is_voice: is_voice, //验证码种类 0短信验证码 1语音验证码
    wx_bind: wx_bind // 是否三方登录 绑定手机号发送验证码
  })

// 登录login
export const getLogin = ({ mobile, valicode, invite_code, openid }) =>
  fetchPost('/hh/hh.reg.login', {
    mobile: mobile,
    valicode: valicode,
    invite_code: invite_code || store.getters.inviteCode, //邀请注册 小店SN
    openid: openid // 三方登录时 绑定手机号的 openid
  })

/**
 * 充值权益
 *
 * @param   {String}  params.cardSec1  卡密1
 * @param    {String}  params.cardSec2  卡密2
 */
export const rechargeHB = params =>
  fetchPost('/hh/hh.user.card.change', {
    cardSec1: params.cardSec1,
    cardSec2: params.cardSec2
  })

/**
 * 获取最近失败次数
 */
export const getRechargeFailedTime = () => fetchPost('/hh/hh.user.card.info')

/**
 * 获取我的价格投诉 列表
 */
export const getMyPriceJudgeRecordList = ({ page = 1, status = 1 }) =>
  fetchJavaHdEndPoint('/hd/priceComplaint/front/list', 'GET', false, {
    page: page,
    type: status
  })

// 【设置权益支付密码】step1：获取短信验证码&校验手机号
export const apiGetVelCode = phone =>
  fetchPost('/hh/hh.sms.send.logined', {
    mobile: phone
  })

// 【设置权益支付密码】step1：提交手机号&短信验证码
export const apiValidatePhoneCode = ({ mobile, valicode }) =>
  fetchPost('/hh/hh.smscode.verify', {
    mobile: mobile,
    valicode: valicode
  })

/**
 * 【设置权益支付密码】step2：提交新设置的权益支付密码
 *
 * @param   {String}  params.password 密码
 * @param   {String}  params.token 上一步验证码校验接口成功后返回的token
 */
export const apiSetNewTransitionPwd = ({ password, token }) =>
  fetchPost('/hh/hh.set.pay.password', {
    pay_password: password,
    confirm_pay_password: password,
    token: token
  })

// 【修改交易密码】提交旧的权益支付密码和新设置的权益支付密码
export const apiChangeTransitionPwd = ({ oldPassword, newPassword }) =>
  fetchPost('/hh/hh.modify.pay.password', {
    old_pay_password: oldPassword,
    pay_password: newPassword,
    confirm_pay_password: newPassword
  })

// 验证权益支付密码
export const apiVerifyPaypwd = ({ password }) =>
  fetchPost('/hh/hh.verify.pay.password ', {
    pay_password: password
  })

// 设置权益支付密码 免密支付 额度
export const setTokenFreepayLimit = limitNumber =>
  fetchPost('/hh/hh.set.pay.without.limit ', {
    amount: limitNumber
  })
